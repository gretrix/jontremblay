# 🚀 Quick Start Guide

Get the jontremblay.com website up and running in minutes!

## ⚡ Super Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.local .env

# 3. Edit .env and add your database and email credentials
nano .env  # or use any text editor

# 4. Set up database (requires PostgreSQL installed)
npx prisma generate
npx prisma migrate dev

# 5. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📧 Quick Email Setup (Gmail)

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Create new app password
3. Add to `.env`:

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-16-character-app-password"
EMAIL_FROM="jtremblay@jontremblay.com"
ADMIN_EMAIL="jtremblay@jontremblay.com"
```

## 🗄️ Database Setup

### Mac (using Homebrew)
```bash
brew install postgresql
brew services start postgresql
createdb jontremblay
```

### Ubuntu/Debian
```bash
sudo apt install postgresql
sudo -u postgres createdb jontremblay
```

### Windows
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

## 🚀 Deploy to AWS EC2 (Production)

### Option 1: Automated Setup (Recommended)

```bash
# 1. SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# 2. Download and run setup script
wget https://raw.githubusercontent.com/yourusername/jontremblay/main/scripts/setup-ec2.sh
chmod +x setup-ec2.sh
./setup-ec2.sh

# 3. Upload your code
# From your local machine:
scp -i your-key.pem -r ./* ubuntu@your-ec2-ip:/var/www/jontremblay/

# 4. SSH back in and complete setup
ssh -i your-key.pem ubuntu@your-ec2-ip
cd /var/www/jontremblay
npm install
npm run build
pm2 start ecosystem.config.js
pm2 startup systemd
pm2 save

# 5. Set up SSL
sudo certbot --nginx -d jontremblay.com -d www.jontremblay.com
```

### Option 2: Manual Setup

Follow the detailed guide in [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Project Structure

```
jontremblay/
├── app/                    # Next.js app directory
│   ├── api/contact/       # Contact form API
│   ├── page.tsx           # Main page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Hero.tsx          # Hero section
│   ├── Contact.tsx       # Contact form
│   └── ...               # Other sections
├── lib/                   # Utilities
│   ├── db.ts             # Database client
│   └── email.ts          # Email functions
├── prisma/               # Database schema
└── scripts/              # Deployment scripts
```

## 🧪 Test the Contact Form

1. Start the dev server: `npm run dev`
2. Go to [http://localhost:3000](http://localhost:3000)
3. Scroll to contact form
4. Fill it out and submit
5. Check:
   - Terminal for any errors
   - Your email for auto-response
   - Admin email for notification
   - Database: `npx prisma studio`

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server

# Database
npx prisma studio       # Open database GUI
npx prisma migrate dev  # Create new migration
npx prisma generate     # Generate Prisma client

# Deployment
pm2 start ecosystem.config.js  # Start with PM2
pm2 logs jontremblay          # View logs
pm2 restart jontremblay       # Restart app
pm2 status                    # Check status
```

## 📞 Need Help?

- **Full Setup Guide**: [SETUP.md](./SETUP.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **README**: [README.md](./README.md)
- **Contact**: jtremblay@jontremblay.com

## ✅ Checklist

### Local Development
- [ ] Node.js 18+ installed
- [ ] PostgreSQL installed and running
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created and configured
- [ ] Database migrations run
- [ ] Dev server running
- [ ] Contact form tested

### Production Deployment
- [ ] EC2 instance launched
- [ ] Domain DNS configured
- [ ] Server dependencies installed
- [ ] Application code uploaded
- [ ] `.env` configured with production values
- [ ] Database set up and migrated
- [ ] Application built (`npm run build`)
- [ ] PM2 running application
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Backup script set up
- [ ] All features tested

---

**You're all set! 🎉**

The website is now running with:
✅ Modern Next.js framework
✅ Database storage for form submissions
✅ Email notifications (auto-response + admin alert)
✅ Professional design
✅ Mobile responsive
✅ Production ready

