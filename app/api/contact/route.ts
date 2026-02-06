import { NextRequest, NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/googleSheets';

interface ContactData {
  name: string;
  email: string;
  message?: string;
  timestamp: string;
}

async function saveContact(contact: ContactData): Promise<boolean> {
  try {
    const spreadsheetId = process.env.GOOGLE_CONTACT_SHEET_ID;
    
    if (!spreadsheetId) {
      console.error('GOOGLE_CONTACT_SHEET_ID not configured');
      return false;
    }

    // Append to Google Sheet
    // Format: [Timestamp, Name, Email, Message]
    await appendToSheet(
      spreadsheetId,
      'Contacts!A:D',
      [contact.timestamp, contact.name, contact.email, contact.message || '']
    );

    return true;
  } catch (error) {
    console.error('Error saving contact:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

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

    // Save contact
    const contactData: ContactData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      message: message?.trim() || '',
      timestamp: new Date().toISOString(),
    };

    await saveContact(contactData);

    return NextResponse.json(
      { message: 'Contact information received! We\'ll be in touch soon.', contact: contactData },
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

