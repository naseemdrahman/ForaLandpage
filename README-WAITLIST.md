# Waitlist Email Collection

## How It Works

When someone enters their email in the waitlist form:
1. The email is validated (format check)
2. It's saved to `data/waitlist-emails.json`
3. Duplicate emails are prevented
4. User receives success/error feedback

## Viewing Collected Emails

### Option 1: View the JSON file directly
```bash
cat data/waitlist-emails.json
```

### Option 2: Use the API endpoint (development only)
Visit: `http://localhost:3000/api/waitlist`

This will return all collected emails in JSON format.

**⚠️ Important:** Remove or secure the GET endpoint before production deployment!

## Production Deployment Considerations

The current implementation uses file-based storage, which works for development but has limitations:

### For Vercel Deployment:
File system writes don't persist on Vercel's serverless functions. You'll need to use a database:

**Recommended Options:**
1. **Vercel Postgres** (Recommended)
   - Native Vercel integration
   - Free tier available
   - Easy to set up

2. **Vercel KV** (Redis)
   - Fast key-value storage
   - Good for simple data

3. **Supabase**
   - Free PostgreSQL database
   - Easy to integrate

4. **External Email Service**
   - Resend + their database
   - Mailchimp
   - ConvertKit

### Quick Migration Guide

To migrate to Vercel Postgres:

1. Install dependencies:
```bash
npm install @vercel/postgres
```

2. Update `app/api/waitlist/route.ts` to use Postgres instead of file system

3. Set up Vercel Postgres in your Vercel dashboard

4. Add environment variables for database connection

## Current Storage Location

Emails are stored in: `data/waitlist-emails.json`

This file is gitignored to protect user privacy.
