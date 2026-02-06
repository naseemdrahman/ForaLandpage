# Google Sheets Integration Setup

This guide will help you set up Google Sheets to automatically collect waitlist and contact form submissions.

## Step 1: Create Google Sheets

1. Create a new Google Sheet (or use an existing one)
2. Create two sheets within it:
   - **Sheet 1:** Name it "Waitlist"
   - **Sheet 2:** Name it "Contacts"

3. Add headers to each sheet:

   **Waitlist sheet (Row 1):**
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`

   **Contacts sheet (Row 1):**
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`
   - Column D: `Message`

## Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## Step 3: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in:
   - **Service account name:** `fora-sheets` (or any name)
   - **Service account ID:** (auto-generated)
   - Click "Create and Continue"
4. Skip the optional steps and click "Done"

## Step 4: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Click "Create" - this will download a JSON file
6. **Save this file securely** - you'll need it in the next step

## Step 5: Share Google Sheet with Service Account

1. Open your Google Sheet
2. Click the "Share" button (top right)
3. Get the service account email from the JSON file you downloaded:
   - Open the JSON file
   - Find the `client_email` field (looks like: `fora-sheets@your-project.iam.gserviceaccount.com`)
4. Paste this email in the "Share" dialog
5. Give it "Editor" permissions
6. Click "Send" (you can uncheck "Notify people" if you want)

## Step 6: Get Your Sheet IDs

1. Open your Google Sheet
2. Look at the URL in your browser
3. The URL will look like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
4. Copy the `SHEET_ID_HERE` part - this is your Sheet ID
5. You'll need this ID for both sheets (they can be the same sheet with different tabs, or different sheets)

## Step 7: Set Up Environment Variables

### For Local Development (.env.local)

Create a `.env.local` file in your project root:

```env
# Google Sheets Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_WAITLIST_SHEET_ID=your-waitlist-sheet-id
GOOGLE_CONTACT_SHEET_ID=your-contact-sheet-id
```

**Important:**
- Copy the `client_email` from your JSON file to `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- Copy the `private_key` from your JSON file to `GOOGLE_PRIVATE_KEY`
  - Keep the quotes and include the `\n` characters
  - The private key should be on a single line with `\n` where line breaks are
- Use the same Sheet ID for both if using tabs, or different IDs if using separate sheets

### For Vercel Production

1. Go to your Vercel project dashboard
2. Go to "Settings" > "Environment Variables"
3. Add each variable:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (paste the entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
   - `GOOGLE_WAITLIST_SHEET_ID`
   - `GOOGLE_CONTACT_SHEET_ID`
4. Make sure to add them for "Production", "Preview", and "Development" environments
5. Redeploy your application

## Step 8: Install Dependencies

```bash
npm install
```

This will install the `googleapis` package.

## Step 9: Test It Out

1. Start your development server: `npm run dev`
2. Fill out the waitlist form on your site
3. Check your Google Sheet - you should see a new row appear!
4. Fill out the contact form
5. Check the Contacts sheet - you should see another row!

## Troubleshooting

### "GOOGLE_WAITLIST_SHEET_ID not configured"
- Make sure your `.env.local` file exists and has all the required variables
- Restart your development server after adding environment variables

### "Permission denied" errors
- Make sure you shared the Google Sheet with the service account email
- The service account needs "Editor" permissions

### "Invalid credentials" errors
- Double-check that you copied the `private_key` correctly
- Make sure the `\n` characters are included in the private key
- The private key should be wrapped in quotes in your `.env.local` file

### Data not appearing in sheets
- Check the browser console and server logs for errors
- Verify the sheet names match exactly: "Waitlist" and "Contacts"
- Make sure the headers are in row 1

## Security Notes

- **Never commit your `.env.local` file to git** (it's already in `.gitignore`)
- **Never commit the service account JSON file to git**
- The service account only has access to the specific sheets you share with it
- You can revoke access at any time by removing the service account from the sheet's sharing settings

## Viewing Your Data

Simply open your Google Sheet to see all submissions in real-time! You can:
- Sort and filter the data
- Export to CSV
- Set up email notifications
- Create charts and visualizations
- Share with your team
