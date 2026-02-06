import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Simple email storage (for development)
// For production, replace this with a database like Vercel Postgres, Supabase, or Vercel KV
const EMAIL_STORAGE_PATH = path.join(process.cwd(), 'data', 'waitlist-emails.json');

async function ensureDataDir() {
  const dataDir = path.dirname(EMAIL_STORAGE_PATH);
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

async function readEmails(): Promise<string[]> {
  try {
    await ensureDataDir();
    if (existsSync(EMAIL_STORAGE_PATH)) {
      const data = await readFile(EMAIL_STORAGE_PATH, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading emails:', error);
    return [];
  }
}

async function saveEmail(email: string): Promise<boolean> {
  try {
    await ensureDataDir();
    const emails = await readEmails();
    
    // Check if email already exists
    if (emails.includes(email.toLowerCase().trim())) {
      return false; // Email already exists
    }
    
    // Add new email
    emails.push(email.toLowerCase().trim());
    
    // Save to file
    await writeFile(EMAIL_STORAGE_PATH, JSON.stringify(emails, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving email:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save email
    const saved = await saveEmail(email);
    
    if (!saved) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully joined waitlist!', email },
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

// Optional: GET endpoint to view emails (remove in production or add authentication)
export async function GET() {
  try {
    const emails = await readEmails();
    return NextResponse.json({ emails, count: emails.length });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve emails' },
      { status: 500 }
    );
  }
}
