# 📧 Site Name in Email Notifications

## Problem Solved

When you receive contact form submissions from multiple sites (JonathanTremblay.com, Gretrix.com, PivotalTech.solutions, etc.) in the same Gmail inbox, you couldn't tell which site they came from.

## Solution

Added site name to email notifications in **two prominent places**:

### 1. Email Subject Line
**Before:** `New Contact Form Submission - John Doe`
**After:** `[JonathanTremblay.com] New Contact Form - John Doe`

### 2. Email Header (Visual Badge)
A colored badge at the top of the email showing:
```
📍 From: JonathanTremblay.com
```

## How It Works

The site name comes from the `SITE_NAME` environment variable in your `.env` file:

```env
SITE_NAME="JonathanTremblay.com"
```

## Deploy Instructions

### On Your Local Machine:
```bash
git add .
git commit -m "Add site name to email notifications for multi-site identification"
git push origin main
```

### On EC2 Server:
```bash
cd /var/www/jontremblay
git pull origin main

# Add SITE_NAME to .env
nano .env
```

**In nano, add this line after NEXT_PUBLIC_SITE_URL:**
```env
SITE_NAME="JonathanTremblay.com"
```

Press `Ctrl+X`, then `Y`, then `Enter` to save.

**Continue deployment:**
```bash
npm run build
pm2 restart jontremblay --update-env
pm2 logs jontremblay --lines 20
```

## Example Email You'll Receive

```
Subject: [JonathanTremblay.com] New Contact Form - John Smith

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔔 New Contact Form Submission
📍 From: JonathanTremblay.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: John Smith
Email: john@example.com
Phone: 404-555-1234
Company: ABC Corp
Inquiry Purpose: Business
Message: I'd like to discuss...
```

## Apply to Your Other Sites

For each of your other sites, add the `SITE_NAME` to their `.env` files:

### Gretrix.com
```env
SITE_NAME="Gretrix.com"
```

### PivotalTech.solutions
```env
SITE_NAME="PivotalTech.solutions"
```

### PivotalInstitute.solutions
```env
SITE_NAME="PivotalInstitute.solutions"
```

### FortuneLeo.com
```env
SITE_NAME="FortuneLeo.com"
```

### TheJoyful.solutions
```env
SITE_NAME="TheJoyful.solutions"
```

## Gmail Filtering (Bonus Tip)

Now that emails have `[SiteName]` in the subject, you can create Gmail filters:

1. Go to Gmail Settings → Filters and Blocked Addresses
2. Create filter: `subject:[JonathanTremblay.com]`
3. Apply label: "JT Personal Site"
4. Repeat for each site

This way, submissions are automatically organized by site!

## Benefits

✅ **Instant identification** - Know which site at a glance
✅ **Better organization** - Filter by site in Gmail
✅ **Easier tracking** - See which sites get more inquiries
✅ **Professional** - Clear, branded notifications

---

**Now you'll never wonder "Which site did this come from?" again!** 🎉
