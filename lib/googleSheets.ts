import { google } from 'googleapis';

// Initialize Google Sheets API
async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

// Append a row to a Google Sheet
export async function appendToSheet(
  spreadsheetId: string,
  range: string,
  values: (string | number)[]
): Promise<boolean> {
  try {
    const sheets = await getSheetsClient();
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    console.log('✅ Successfully appended to Google Sheet:', {
      spreadsheetId: spreadsheetId.substring(0, 20) + '...',
      range,
      updatedRows: response.data.updates?.updatedRows || 0,
      values: values
    });
    return true;
  } catch (error: any) {
    console.error('❌ Error appending to Google Sheet:', {
      spreadsheetId: spreadsheetId?.substring(0, 20) + '...',
      range,
      errorMessage: error.message,
      errorCode: error.code,
      errorDetails: error.response?.data || error
    });
    throw error;
  }
}

// Check if email already exists in a sheet
export async function emailExistsInSheet(
  spreadsheetId: string,
  range: string,
  email: string
): Promise<boolean> {
  try {
    const sheets = await getSheetsClient();
    
    console.log('🔍 Checking email in sheet:', { 
      spreadsheetId: spreadsheetId.substring(0, 20) + '...', 
      range, 
      email 
    });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];
    console.log(`📊 Rows found in sheet: ${rows.length}`);
    
    // Skip header row if it exists
    const dataRows = rows.length > 0 && rows[0]?.[0]?.toLowerCase().includes('email') 
      ? rows.slice(1) 
      : rows;
    
    const emailColumnIndex = 1; // Email is in column B (index 1)
    const normalizedEmail = email.toLowerCase().trim();
    
    const exists = dataRows.some((row) => {
      const rowEmail = row[emailColumnIndex]?.toLowerCase().trim();
      return rowEmail === normalizedEmail;
    });
    
    console.log(exists ? '✅ Email already exists' : '✅ Email is new');
    return exists;
  } catch (error: any) {
    console.error('❌ Error checking email in Google Sheet:', {
      spreadsheetId: spreadsheetId?.substring(0, 20) + '...',
      range,
      email,
      errorMessage: error.message,
      errorCode: error.code,
      errorDetails: error.response?.data || error
    });
    // If check fails, allow submission (don't block on check errors)
    return false;
  }
}
