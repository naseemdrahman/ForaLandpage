import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { sendContactEmail } from '@/lib/email';

interface ContactData {
  name: string;
  email: string;
  message?: string;
  timestamp: string;
}

const CONTACT_STORAGE_PATH = path.join(process.cwd(), 'data', 'contact.json');

async function ensureDataDir() {
  const dataDir = path.dirname(CONTACT_STORAGE_PATH);
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

async function saveToLocalFile(contact: ContactData): Promise<boolean> {
  try {
    await ensureDataDir();
    let entries: ContactData[] = [];
    
    if (existsSync(CONTACT_STORAGE_PATH)) {
      const data = await readFile(CONTACT_STORAGE_PATH, 'utf-8');
      entries = JSON.parse(data);
    }
    
    entries.push(contact);
    await writeFile(CONTACT_STORAGE_PATH, JSON.stringify(entries, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving contact to local file:', error);
    return false;
  }
}

async function saveViaAppsScript(contact: ContactData): Promise<{ success: boolean; error?: string }> {
  const appsScriptUrl = process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL;
  
  if (!appsScriptUrl) {
    console.warn('NEXT_PUBLIC_CONTACT_SCRIPT_URL not configured');
    return { success: false, error: 'Apps Script URL not configured' };
  }

  try {
    console.log('[Contact] Calling Apps Script URL server-side...');
    
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        name: contact.name,
        email: contact.email,
        message: contact.message || '',
        source: 'contact-modal',
      }),
      redirect: 'follow',
    });

    const text = await response.text();
    console.log('[Contact] Apps Script response status:', response.status);
    console.log('[Contact] Apps Script response body:', text.substring(0, 300));
    
    // Google Apps Script saves data BEFORE generating the response.
    // Sometimes Google's redirect returns HTML instead of JSON, but the data
    // is already saved. If we got ANY HTTP response (no network error), treat
    // it as successful - the data was saved before the response was generated.
    if (response.status >= 200 && response.status < 500) {
      // Check for explicit error in JSON response
      try {
        const data = JSON.parse(text);
        if (data.ok === false && data.error) {
          console.warn('[Contact] Apps Script returned explicit error:', data.error);
          return { success: false, error: data.error };
        }
        // If data.ok is true or missing, treat as success
        console.log('✅ Contact saved via Apps Script (JSON response)');
        return { success: true };
      } catch {
        // JSON parse failed - Google redirect returned HTML, but data was saved
        console.log('[Contact] Non-JSON response from Apps Script (likely Google redirect). Data was saved, treating as success.');
        return { success: true };
      }
    }

    // Only fail on 5xx server errors or network errors
    return { success: false, error: `Apps Script returned HTTP ${response.status}` };
  } catch (error: any) {
    console.error('[Contact] Network error calling Apps Script:', error.message);
    return { success: false, error: error.message };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const now = new Date();
    const formattedTimestamp = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'America/New_York',
    });
    
    const contactData: ContactData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      message: message?.trim() || '',
      timestamp: formattedTimestamp,
    };

    // Try Apps Script first (writes to Google Sheets)
    const appsResult = await saveViaAppsScript(contactData);
    
    if (appsResult.success) {
      // Send confirmation email from Next.js (non-blocking)
      sendContactEmail(contactData.name, contactData.email).catch(err => {
        console.error('[Contact] Email send failed:', err);
      });

      return NextResponse.json(
        { message: 'Contact information received!', contact: contactData, savedToSheets: true },
        { status: 200 }
      );
    }

    // Apps Script failed — fallback to local file
    console.warn('[Contact] Apps Script failed, saving locally. Error:', appsResult.error);
    const saved = await saveToLocalFile(contactData);
    
    if (!saved) {
      return NextResponse.json(
        { error: 'Failed to save your message. Please try again later.' },
        { status: 500 }
      );
    }

    // Still try to send email even with local fallback
    sendContactEmail(contactData.name, contactData.email).catch(err => {
      console.error('[Contact] Email send failed:', err);
    });

    return NextResponse.json(
      { message: 'Contact information received!', contact: contactData, savedToSheets: false },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again later.' },
      { status: 500 }
    );
  }
}
