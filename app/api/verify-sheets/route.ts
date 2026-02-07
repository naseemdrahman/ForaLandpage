import { NextResponse } from 'next/server';
import { appendToSheet, emailExistsInSheet } from '@/lib/googleSheets';

export async function GET() {
  try {
    const waitlistSheetId = process.env.GOOGLE_WAITLIST_SHEET_ID;
    const contactSheetId = process.env.GOOGLE_CONTACT_SHEET_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    const results: any = {
      config: {
        hasWaitlistSheetId: !!waitlistSheetId,
        hasContactSheetId: !!contactSheetId,
        hasServiceAccountEmail: !!serviceAccountEmail,
        hasPrivateKey: !!privateKey,
        waitlistSheetId: waitlistSheetId ? `${waitlistSheetId.substring(0, 15)}...` : 'NOT SET',
        contactSheetId: contactSheetId ? `${contactSheetId.substring(0, 15)}...` : 'NOT SET',
      },
      tests: {} as any,
    };

    if (!serviceAccountEmail || !privateKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing Google Sheets credentials',
        ...results,
      });
    }

    // Test Waitlist Sheet
    if (waitlistSheetId) {
      try {
        const testEmail = `test-${Date.now()}@example.com`;
        const testTimestamp = new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: 'America/New_York',
        });

        // Test email check
        await emailExistsInSheet(waitlistSheetId, 'Waitlist!B:B', testEmail);
        
        // Test append
        await appendToSheet(
          waitlistSheetId,
          'Waitlist!A:C',
          [testTimestamp, 'TEST USER', testEmail]
        );

        results.tests.waitlist = {
          status: 'success',
          message: 'Waitlist sheet is working correctly',
        };
      } catch (error: any) {
        results.tests.waitlist = {
          status: 'error',
          message: 'Failed to write to Waitlist sheet',
          error: error.message || String(error),
        };
      }
    } else {
      results.tests.waitlist = {
        status: 'skipped',
        message: 'GOOGLE_WAITLIST_SHEET_ID not configured',
      };
    }

    // Test Contact Sheet
    if (contactSheetId) {
      try {
        const testTimestamp = new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: 'America/New_York',
        });

        await appendToSheet(
          contactSheetId,
          'Contact Us!A:D',
          [testTimestamp, 'TEST USER', 'test@example.com', 'This is a test message']
        );

        results.tests.contact = {
          status: 'success',
          message: 'Contact sheet is working correctly',
        };
      } catch (error: any) {
        results.tests.contact = {
          status: 'error',
          message: 'Failed to write to Contact Us sheet',
          error: error.message || String(error),
        };
      }
    } else {
      results.tests.contact = {
        status: 'skipped',
        message: 'GOOGLE_CONTACT_SHEET_ID not configured',
      };
    }

    const allTestsPassed = 
      results.tests.waitlist?.status === 'success' && 
      results.tests.contact?.status === 'success';

    return NextResponse.json({
      status: allTestsPassed ? 'success' : 'partial',
      message: allTestsPassed 
        ? 'All Google Sheets connections are working!' 
        : 'Some tests failed. Check the details below.',
      ...results,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Verification failed',
      error: error.message || String(error),
    });
  }
}
