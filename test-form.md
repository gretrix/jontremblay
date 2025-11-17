# How to Test the Contact Form

## Step 1: Make Sure Database is Ready

```powershell
# Generate Prisma client
npx prisma generate

# Run migrations (creates tables)
npx prisma migrate dev --name init

# Optional: Open database GUI
npx prisma studio
```

## Step 2: Start Development Server

```powershell
npm run dev
```

Server will start at: http://localhost:3000

## Step 3: Test the Form

1. Open http://localhost:3000 in your browser
2. Scroll down to the "Get In Touch" section
3. Fill out the form:
   - Name: Test User
   - Email: your-email@example.com
   - Phone: (optional)
   - Company: (optional)
   - Inquiry Purpose: Select one
   - Message: Test message

4. Click "Send Message"

## Step 4: Verify Everything Works

### ✅ Check 1: Terminal Output
Look at your PowerShell terminal - you should see:
- No errors
- API request logged

### ✅ Check 2: Database
Open Prisma Studio:
```powershell
npx prisma studio
```
- Open http://localhost:5555
- Click "ContactSubmission"
- You should see your test submission!

### ✅ Check 3: Emails
Check these two emails:

**Email 1: To the submitter**
- Subject: "Thank You for Reaching Out - Jonathan Tremblay"
- Beautiful HTML email confirming receipt

**Email 2: To admin (you)**
- Subject: "New Contact Form Submission - Test User"
- Contains all the form details

### ✅ Check 4: Browser
You should see a success message:
"Thank you for your message! Check your email for confirmation. I'll get back to you soon."

## Troubleshooting

### Issue: "Can't connect to database"
```powershell
# Check if PostgreSQL is running
# Make sure DATABASE_URL in .env is correct
```

### Issue: "Email not sending"
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- For Gmail, use App Password (not regular password)
- Check spam folder
- Look at terminal for error messages

### Issue: "Module not found"
```powershell
npm install
npx prisma generate
```

## Quick Database Check

To see all submissions:
```powershell
npx prisma studio
```

Or use SQL:
```sql
SELECT * FROM contact_submissions ORDER BY "createdAt" DESC;
```

## Success! 🎉

If you see:
1. ✅ Submission in database (Prisma Studio)
2. ✅ Two emails sent
3. ✅ Success message on website
4. ✅ No errors in terminal

**Everything is working perfectly!**

