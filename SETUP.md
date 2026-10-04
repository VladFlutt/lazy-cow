# Lazy Cow Studio - Setup Guide

## Project Overview
A beautiful landing page for a craft leather studio with product showcase and order management system built with Next.js, Tailwind CSS, and Supabase.

## Features
- 🎨 Modern landing page with brown-green theme
- 📦 Product showcase (Belts, Bags, Wallets)
- 📋 Order form with email notifications
- 💾 Supabase database for order storage
- 📧 Email notifications on order submission
- 🔒 Row-level security with Supabase

## Setup Instructions

### 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Run the SQL migration to create the orders table:
   - Go to **SQL Editor** in your Supabase project
   - Create a new query
   - Copy the contents of `supabase/migrations/01_create_orders_table.sql`
   - Run the query

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see your landing page!

### 4. GitHub Setup

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Lazy Cow landing page"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/lazy-cow.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 5. Vercel Deployment

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select the `lazy-cow` repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

### 6. Email Configuration (Optional)

To enable actual email notifications:

1. Sign up for [Resend](https://resend.com) or [SendGrid](https://sendgrid.com)
2. Get your API key
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=your_api_key
   ```
4. Update `/app/api/send-email/route.ts` to use the email service

## Viewing Orders

1. Go to your Supabase project
2. Select **Table Editor**
3. Click on the `orders` table
4. All submissions will appear here with customer details

## Project Structure

```
lazy-cow/
├── app/
│   ├── api/
│   │   └── send-email/        # Email notification endpoint
│   ├── components/             # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Products.tsx
│   │   ├── OrderForm.tsx
│   │   └── Footer.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                # Home page
├── supabase/
│   └── migrations/             # Database migrations
│       └── 01_create_orders_table.sql
├── public/                     # Static assets
├── .env.example               # Environment template
└── package.json
```

## Customization

### Colors
- Primary (Brown): `from-amber-900 to-green-900`
- Background: `bg-amber-50`
- Accents: `text-green-700`

Update these classes in components to change the theme.

### Products
Edit the `products` array in `/app/components/Products.tsx` to add/remove products.

### Contact Information
Update footer contact info in `/app/components/Footer.tsx`

## Troubleshooting

**"Cannot find module @supabase/supabase-js"**
- Run `npm install @supabase/supabase-js`

**"Supabase connection failed"**
- Check environment variables in `.env.local`
- Ensure Supabase project is active

**"Orders not appearing in database"**
- Verify the `orders` table exists in Supabase
- Check RLS policies allow public inserts

## Support
For issues or questions, check:
- Next.js docs: [nextjs.org](https://nextjs.org)
- Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Tailwind docs: [tailwindcss.com](https://tailwindcss.com)

---
Happy crafting! 🐄✨
