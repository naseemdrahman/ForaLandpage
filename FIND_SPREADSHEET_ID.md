# How to Find Your Google Sheet ID

## Method 1: From the URL

1. Open your Google Sheet
2. Look at the URL in your browser
3. The URL will look like:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
4. Copy the part between `/d/` and `/edit`
   - That's your Spreadsheet ID!

## Example:
If your URL is:
```
https://docs.google.com/spreadsheets/d/1yTaUUzGNiTE_FhRneQbzXBQ-maBVpI23i11aNWR1lDo/edit
```

Then your Spreadsheet ID is:
```
1yTaUUzGNiTE_FhRneQbzXBQ-maBVpI23i11aNWR1lDo
```

## Method 2: Create a New Sheet

If you don't have a sheet yet:

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Create two tabs:
   - Tab 1: Name it **"Waitlist"** (exact match, case-sensitive)
     - Add headers in row 1: `Timestamp | Name | Email`
   - Tab 2: Name it **"Contact Us"** (exact match, case-sensitive)
     - Add headers in row 1: `Timestamp | Name | Email | Message`
4. Copy the Spreadsheet ID from the URL

## After You Have the ID

1. Go to [script.google.com](https://script.google.com)
2. Open your script project
3. Find this line in the code:
   ```javascript
   const SPREADSHEET_ID = "1yTaUUzGNiTE_FhRneQbzXBQ-maBVpI23i11aNWR1lDo";
   ```
4. Replace `"1yTaUUzGNiTE_FhRneQbzXBQ-maBVpI23i11aNWR1lDo"` with your actual Spreadsheet ID
5. Save the script
6. Deploy → Manage deployments → Edit → Deploy (to update with the new ID)
