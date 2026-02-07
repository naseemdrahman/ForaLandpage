# Combined Apps Script for Both Forms

Since you're using the same script URL for both Waitlist and Contact, your Apps Script needs to handle both. Here's the combined code:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { name, email, message, source, ua } = data;

    // Validate
    if (!name || !email) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Name and email are required" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Open your spreadsheet (replace with your actual spreadsheet ID)
    const SPREADSHEET_ID = "1yTaUUzGNiTE_FhRneQbzXBQ-maBVpI23i11aNWR1lDo";
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    // Determine which sheet based on source
    let sheet;
    if (source === "waitlist-modal") {
      sheet = spreadsheet.getSheetByName("Waitlist");
      if (!sheet) {
        return ContentService.createTextOutput(
          JSON.stringify({ ok: false, error: "Waitlist sheet not found" })
        ).setMimeType(ContentService.MimeType.JSON);
      }

      // Check if email already exists in Waitlist
      const emailColumn = sheet.getRange("C:C").getValues().flat();
      const emailExists = emailColumn.some(
        (existingEmail) => existingEmail.toString().toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        return ContentService.createTextOutput(
          JSON.stringify({ ok: false, error: "Email already registered" })
        ).setMimeType(ContentService.MimeType.JSON);
      }

      // Add timestamp
      const timestamp = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "America/New_York",
      });

      // Find the last row with actual data by checking the email column (column C)
      // This avoids issues with empty/formatted rows
      const emailColumn = sheet.getRange("C:C").getValues();
      let lastRow = 1; // Start at row 1 (headers)
      
      // Loop backwards from the end to find the last row with an email
      for (let i = emailColumn.length - 1; i >= 1; i--) {
        if (emailColumn[i][0] && emailColumn[i][0].toString().trim() !== "") {
          lastRow = i + 1; // +1 because array is 0-indexed, rows are 1-indexed
          break;
        }
      }

      // Insert row right after the last row with data (row 2 if sheet is empty)
      const nextRow = lastRow + 1;
      sheet.getRange(nextRow, 1, 1, 3).setValues([[timestamp, name, email]]);
    } else if (source === "contact-modal") {
      sheet = spreadsheet.getSheetByName("Contact Us");
      if (!sheet) {
        return ContentService.createTextOutput(
          JSON.stringify({ ok: false, error: "Contact Us sheet not found" })
        ).setMimeType(ContentService.MimeType.JSON);
      }

      // Add timestamp
      const timestamp = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "America/New_York",
      });

      // Find the last row with actual data by checking the email column (column C)
      // This avoids issues with empty/formatted rows
      const emailColumn = sheet.getRange("C:C").getValues();
      let lastRow = 1; // Start at row 1 (headers)
      
      // Loop backwards from the end to find the last row with an email
      for (let i = emailColumn.length - 1; i >= 1; i--) {
        if (emailColumn[i][0] && emailColumn[i][0].toString().trim() !== "") {
          lastRow = i + 1; // +1 because array is 0-indexed, rows are 1-indexed
          break;
        }
      }

      // Insert row right after the last row with data (row 2 if sheet is empty)
      const nextRow = lastRow + 1;
      sheet.getRange(nextRow, 1, 1, 4).setValues([[timestamp, name, email, message || ""]]);
    } else {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Invalid source" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Steps to Update Your Script

1. Go to [script.google.com](https://script.google.com)
2. Open your script project
3. Replace ALL the code with the code above
4. **Important**: Replace `SPREADSHEET_ID` with your actual spreadsheet ID (I've put a placeholder)
5. Make sure your Google Sheet has:
   - A tab named **"Waitlist"** with columns: Timestamp | Name | Email
   - A tab named **"Contact Us"** with columns: Timestamp | Name | Email | Message
6. Click **Save** (Ctrl+S or Cmd+S)
7. Click **Deploy** → **Manage deployments**
8. Click the **pencil icon** to edit your deployment
9. Click **Deploy** again (this updates it with the new code)

## After Updating

1. Restart your dev server:
   ```bash
   npm run dev
   ```
2. Test the forms - they should work now!
