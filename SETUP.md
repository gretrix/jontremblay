# Quick Setup Guide

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.local` to `.env` and fill in your values:

```bash
cp .env.local .env
```

### 3. Set Up Database

You need PostgreSQL installed locally. Then:

```bash
# Create database
createdb jontremblay

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed data or open Prisma Studio
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Test Contact Form

1. Fill out the contact form
2. Check your terminal for any errors
3. Check your email (both submitter and admin) for notifications
4. Check database with `npx prisma studio`

## Email Setup Options

### Option 1: Gmail (Easiest for Testing)

1. Enable 2FA on your Google account
2. Create an App Password: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use in `.env`:

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-16-char-app-password"
```

### Option 2: SendGrid

1. Sign up at [https://sendgrid.com](https://sendgrid.com)
2. Create API key
3. Use in `.env`:

```env
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT="587"
EMAIL_USER="apikey"
EMAIL_PASSWORD="your-sendgrid-api-key"
```

### Option 3: AWS SES (Production Recommended)

1. Set up AWS SES in your region
2. Verify your sending email
3. Create SMTP credentials
4. Use in `.env`:

```env
EMAIL_HOST="email-smtp.us-east-1.amazonaws.com"
EMAIL_PORT="587"
EMAIL_USER="your-smtp-username"
EMAIL_PASSWORD="your-smtp-password"
```

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Common Issues

### "Can't connect to database"

- Make sure PostgreSQL is running: `brew services start postgresql` (Mac) or `sudo service postgresql start` (Linux)
- Check your DATABASE_URL is correct
- Try: `psql -U postgres` to test connection

### "Email not sending"

- Check your email credentials
- For Gmail, make sure you're using an App Password, not your regular password
- Check spam folder
- Look at terminal logs for error messages

### "Port 3000 already in use"

```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

## Next Steps

1. **Customize Content**: Update text and images in the components
2. **Add Images**: Replace placeholder with actual portrait photo
3. **Test Form**: Thoroughly test the contact form
4. **Set Up Domain**: Configure your domain to point to your server
5. **Deploy**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for AWS EC2 deployment

## File Structure

```
Key files you might want to edit:
- components/*.tsx - UI components (Hero, About, Story, etc.)
- app/globals.css - Global styles and animations
- prisma/schema.prisma - Database schema
- lib/email.ts - Email templates
```

## Need Help?

Contact: jtremblay@jontremblay.com

