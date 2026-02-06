import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Simple contact storage (for development)
// For production, replace this with a database like Vercel Postgres, Supabase, or Vercel KV
const CONTACT_STORAGE_PATH = path.join(process.cwd(), 'data', 'contacts.json');

interface ContactData {
  name: string;
  email: string;
  message?: string;
  timestamp: string;
}

async function ensureDataDir() {
  const dataDir = path.dirname(CONTACT_STORAGE_PATH);
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

async function readContacts(): Promise<ContactData[]> {
  try {
    await ensureDataDir();
    if (existsSync(CONTACT_STORAGE_PATH)) {
      const data = await readFile(CONTACT_STORAGE_PATH, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading contacts:', error);
    return [];
  }
}

async function saveContact(contact: ContactData): Promise<boolean> {
  try {
    await ensureDataDir();
    const contacts = await readContacts();
    
    // Add new contact
    contacts.push(contact);
    
    // Save to file
    await writeFile(CONTACT_STORAGE_PATH, JSON.stringify(contacts, null, 2), 'utf-8');
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

// Optional: GET endpoint to view contacts (remove in production or add authentication)
export async function GET() {
  try {
    const contacts = await readContacts();
    return NextResponse.json({ contacts, count: contacts.length });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve contacts' },
      { status: 500 }
    );
  }
}
