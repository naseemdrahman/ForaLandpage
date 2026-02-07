import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { sendWaitlistEmail } from '@/lib/email';

interface WaitlistEntry {
  name: string;
  email: string;
  timestamp: string;
}

const WAITLIST_STORAGE_PATH = path.join(process.cwd(), 'data', 'waitlist.json');

async function ensureDataDir() {
  const dataDir = path.dirname(WAITLIST_STORAGE_PATH);
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

async function saveToLocalFile(entry: WaitlistEntry): Promise<boolean> {
  try {
    await ensureDataDir();
    let entries: WaitlistEntry[] = [];
    
    if (existsSync(WAITLIST_STORAGE_PATH)) {
      const data = await readFile(WAITLIST_STORAGE_PATH, 'utf-8');
      entries = JSON.parse(data);
    }
    
    // Allow duplicate emails - just append the entry
    entries.push(entry);
    await writeFile(WAITLIST_STORAGE_PATH, JSON.stringify(entries, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving to local file:', error);
    return false;
  }
}

async function saveViaAppsScript(entry: WaitlistEntry): Promise<{ success: boolean; error?: string }> {
  const appsScriptUrl = process.env.NEXT_PUBLIC_WAITLIST_SCRIPT_URL;
  
  if (!appsScriptUrl) {
    console.warn('NEXT_PUBLIC_WAITLIST_SCRIPT_URL not configured');
    return { success: false, error: 'Apps Script URL not configured' };
  }

  try {
    console.log('[Waitlist] Calling Apps Script URL server-side...');
    
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        name: entry.name,
        email: entry.email,
        source: 'waitlist-modal',
      }),
      redirect: 'follow',
    });

    const text = await response.text();
    console.log('[Waitlist] Apps Script response status:', response.status);
    console.log('[Waitlist] Apps Script response body:', text.substring(0, 300));
    
    // Google Apps Script saves data BEFORE generating the response.
    // Sometimes Google's redirect returns HTML instead of JSON, but the data
    // is already saved. If we got an HTTP response (no network error), treat
    // it as successful.
    if (response.ok) {
      // Try to parse JSON to check for explicit errors from our script
      try {
        const data = JSON.parse(text);
        if (data.ok === false && data.error) {
          console.warn('[Waitlist] Apps Script returned error:', data.error);
          return { success: false, error: data.error };
        }
      } catch {
        // JSON parse failed but HTTP 200 — Google redirect returned HTML.
        // Data was still saved to the sheet.
        console.log('[Waitlist] Non-JSON response from Apps Script (likely Google redirect). Treating as success.');
      }
      console.log('✅ Waitlist entry saved via Apps Script');
      return { success: true };
    }

    // Non-200 HTTP status
    return { success: false, error: `Apps Script returned HTTP ${response.status}` };
  } catch (error: any) {
    // Actual network error (timeout, DNS, etc.)
    console.error('[Waitlist] Network error calling Apps Script:', error.message);
    return { success: false, error: error.message };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

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
    
    const entry: WaitlistEntry = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      timestamp: formattedTimestamp,
    };

    // Try Apps Script first (writes to Google Sheets)
    const appsResult = await saveViaAppsScript(entry);
    
    if (appsResult.success) {
      // Send confirmation email from Next.js (non-blocking)
      sendWaitlistEmail(entry.name, entry.email).catch(err => {
        console.error('[Waitlist] Email send failed:', err);
      });

      return NextResponse.json(
        { message: 'Successfully joined waitlist!', entry, savedToSheets: true },
        { status: 200 }
      );
    }

    // Apps Script failed — fallback to local file
    console.warn('[Waitlist] Apps Script failed, saving locally. Error:', appsResult.error);
    await saveToLocalFile(entry);

    // Still try to send email even with local fallback
    sendWaitlistEmail(entry.name, entry.email).catch(err => {
      console.error('[Waitlist] Email send failed:', err);
    });

    return NextResponse.json(
      { message: 'Successfully joined waitlist!', entry, savedToSheets: false },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again later.' },
      { status: 500 }
    );
  }
}
