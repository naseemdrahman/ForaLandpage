import { NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/googleSheets';

export async function GET() {
  try {
    const spreadsheetId = process.env.GOOGLE_WAITLIST_SHEET_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    const config = {
      hasSpreadsheetId: !!spreadsheetId,
      hasServiceAccountEmail: !!serviceAccountEmail,
      hasPrivateKey: !!privateKey,
      spreadsheetId: spreadsheetId ? `${spreadsheetId.substring(0, 10)}...` : 'NOT SET',
    };

    if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing environment variables',
        config,
      });
    }

    // Try to append a test row
    try {
      await appendToSheet(
        spreadsheetId,
        'Waitlist!A:C',
        [new Date().toISOString(), 'TEST', 'test@example.com']
      );
      return NextResponse.json({
        status: 'success',
        message: 'Successfully connected to Google Sheets!',
        config,
      });
    } catch (error: any) {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to write to Google Sheets',
        error: error.message || String(error),
        config,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Test failed',
      error: error.message || String(error),
    });
  }
}
