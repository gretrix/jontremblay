# Jonathan Tremblay Personal Website

A modern, faith-centered personal website built with Next.js, featuring contact form submission with database storage and email notifications.

## 🚀 Features

- **Modern Design**: Clean, elegant UI with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **Contact Form**: Full-featured contact form with validation
- **Database Storage**: Form submissions stored in PostgreSQL
- **Email Notifications**: 
  - Auto-response email to form submitters
  - Admin notification email with submission details
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Built with Next.js 14 for optimal performance

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- PostgreSQL database
- Email SMTP credentials (Gmail, SendGrid, etc.)

## 🛠️ Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/jontremblay?schema=public"

# Email Configuration (using Gmail SMTP as example)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="jtremblay@jontremblay.com"

# Admin email to receive form submissions
ADMIN_EMAIL="jtremblay@jontremblay.com"

# Site URL
NEXT_PUBLIC_SITE_URL="https://jontremblay.com"
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Optional: Open Prisma Studio to view database
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📧 Email Configuration

### Using Gmail

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use the App Password in your `.env` file

### Using SendGrid

```env
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT="587"
EMAIL_USER="apikey"
EMAIL_PASSWORD="your-sendgrid-api-key"
```

### Using AWS SES

```env
EMAIL_HOST="email-smtp.us-east-1.amazonaws.com"
EMAIL_PORT="587"
EMAIL_USER="your-smtp-username"
EMAIL_PASSWORD="your-smtp-password"
```

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. The main table:

```prisma
model ContactSubmission {
  id             String   @id @default(cuid())
  name           String
  email          String
  phone          String?
  company        String?
  inquiryPurpose String
  message        String   @db.Text
  createdAt      DateTime @default(now())
}
```

## 📁 Project Structure

```
jontremblay/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── About.tsx                 # About section
│   ├── Contact.tsx               # Contact form
│   ├── Faith.tsx                 # Faith & community section
│   ├── Footer.tsx                # Footer
│   ├── Hero.tsx                  # Hero section
│   ├── Leadership.tsx            # Leadership traits section
│   ├── Navigation.tsx            # Navigation bar
│   ├── Story.tsx                 # Story section
│   └── Ventures.tsx              # Companies & ventures section
├── lib/
│   ├── db.ts                     # Prisma client
│   └── email.ts                  # Email utilities
├── prisma/
│   └── schema.prisma             # Database schema
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind CSS config
└── tsconfig.json                 # TypeScript config
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for AWS EC2.

## 🔒 Security Notes

- Never commit `.env` file to version control
- Use strong database passwords
- Enable SSL for production database connections
- Use environment-specific email credentials
- Keep dependencies updated

## 📝 License

Copyright © 2025 Jonathan Tremblay. All rights reserved.

## 📞 Support

For questions or issues, contact:
- Email: jtremblay@jontremblay.com
- Phone: 404-374-9322

