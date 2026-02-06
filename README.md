# FORA - Debate Platform Landing Page

A premium landing page for FORA, a competitive text-based debate platform.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
- **React 18**

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Deployment on Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect Next.js and configure the build settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

### Build Settings (Auto-detected by Vercel)

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Node Version:** 18.x or higher

## Project Structure

```
├── app/
│   ├── (marketing)/
│   │   └── page.tsx          # Landing page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Features

- ✅ Fully responsive design
- ✅ Optimized for performance
- ✅ SEO-friendly metadata
- ✅ Accessible components
- ✅ Interactive elements (FAQ accordion, modals)
- ✅ Vercel-optimized build

## Environment Variables

No environment variables required for basic deployment.

## License

Private
