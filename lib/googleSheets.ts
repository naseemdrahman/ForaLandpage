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
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    return true;
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
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
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];
    const emailColumnIndex = 1; // Assuming email is in column B (index 1)
    
    return rows.some((row) => row[emailColumnIndex]?.toLowerCase().trim() === email.toLowerCase().trim());
  } catch (error) {
    console.error('Error checking email in Google Sheet:', error);
    return false; // If check fails, allow submission
  }
}
