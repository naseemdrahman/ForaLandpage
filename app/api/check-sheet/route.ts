import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    const spreadsheetId = process.env.GOOGLE_WAITLIST_SHEET_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing environment variables',
      });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get all sheet tabs
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheetTabs = spreadsheet.data.sheets?.map(sheet => ({
      title: sheet.properties?.title,
      sheetId: sheet.properties?.sheetId,
    })) || [];

    // Try to read from Waitlist tab
    let waitlistData = null;
    let waitlistError = null;
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Waitlist!A:C',
      });
      waitlistData = {
        rows: response.data.values?.length || 0,
        firstRow: response.data.values?.[0] || null,
        lastRow: response.data.values?.[response.data.values.length - 1] || null,
      };
    } catch (error: any) {
      waitlistError = error.message || String(error);
    }

    return NextResponse.json({
      status: 'success',
      sheetTabs,
      waitlistTab: {
        exists: sheetTabs.some(tab => tab.title === 'Waitlist'),
        data: waitlistData,
        error: waitlistError,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message || String(error),
    });
  }
}
