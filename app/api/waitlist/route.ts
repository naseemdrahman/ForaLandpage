import { NextRequest, NextResponse } from 'next/server';
import { appendToSheet, emailExistsInSheet } from '@/lib/googleSheets';

interface WaitlistEntry {
  name: string;
  email: string;
  timestamp: string;
}

async function saveWaitlistEntry(entry: WaitlistEntry): Promise<boolean> {
  try {
    const spreadsheetId = process.env.GOOGLE_WAITLIST_SHEET_ID;
    
    if (!spreadsheetId) {
      console.error('GOOGLE_WAITLIST_SHEET_ID not configured');
      return false;
    }

    // Check if email already exists in Google Sheet
    const exists = await emailExistsInSheet(spreadsheetId, 'Waitlist!B:B', entry.email);
    if (exists) {
      return false; // Email already exists
    }

    // Append to Google Sheet
    // Format: [Timestamp, Name, Email]
    await appendToSheet(
      spreadsheetId,
      'Waitlist!A:C',
      [entry.timestamp, entry.name, entry.email]
    );

    return true;
  } catch (error) {
    console.error('Error saving waitlist entry:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validate required fields
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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save waitlist entry
    const entry: WaitlistEntry = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      timestamp: new Date().toISOString(),
    };

    const saved = await saveWaitlistEntry(entry);
    
    if (!saved) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully joined waitlist!', entry },
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

