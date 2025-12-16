# 🛡️ reCAPTCHA Bot Protection Setup Guide

## ✅ What's Been Implemented

Your contact form now has Google reCAPTCHA v3 protection that:
- **Invisible to real users** - No "I'm not a robot" checkbox
- **Blocks bots automatically** - Uses AI scoring (0.0 = bot, 1.0 = human)
- **Threshold set at 0.5** - Submissions below this score are rejected
- **Logs all attempts** - You can see bot attempts in your server logs

## 🔑 Step 1: Get Your reCAPTCHA Keys

1. Go to https://www.google.com/recaptcha/admin
2. Click the **"+"** button to create a new site
3. Fill in the form:
   - **Label**: JT Website (or any name you want)
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add `jontremblay.com` (and `localhost` for testing)
   - Accept the terms
4. Click **Submit**
5. You'll see two keys:
   - **Site Key** (starts with 6L...)
   - **Secret Key** (starts with 6L...)

## 🔧 Step 2: Add Keys to Your .env File

Open your `.env` file and replace the placeholder values:

```env
# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
RECAPTCHA_SECRET_KEY="6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**IMPORTANT**: 
- The Site Key is public (NEXT_PUBLIC_) and goes in the browser
- The Secret Key is private and stays on the server
- Never commit the real keys to Git!

## 🚀 Step 3: Deploy to EC2

After adding your keys locally, deploy to your server:

### On Your Local Machine:
```bash
git add .
git commit -m "Add reCAPTCHA bot protection to contact form"
git push origin main
```

### On Your EC2 Server (SSH):
```bash
cd /var/www/jontremblay

# Pull the latest code
git pull origin main

# Update the .env file with your reCAPTCHA keys
nano .env
# Add your keys, then press Ctrl+X, Y, Enter to save

# Rebuild and restart
npm install
npm run build
pm2 restart jontremblay --update-env
pm2 logs jontremblay --lines 20
```

## 🧪 Step 4: Test It

### Test as a Human:
1. Visit https://jontremblay.com
2. Fill out the contact form normally
3. Submit - it should work fine
4. Check your email for confirmation

### Check the Logs:
```bash
pm2 logs jontremblay --lines 50
```

You should see:
```
🔒 reCAPTCHA verification: { success: true, score: 0.9, action: 'contact_form' }
📧 FORM SUBMISSION RECEIVED (✅ Human verified):
```

### Simulate a Bot (for testing):
Bots will get a low score (< 0.5) and see:
```
🤖 BOT DETECTED - Form submission blocked
```

## 📊 How It Works

1. **User fills form** → Clicks submit
2. **reCAPTCHA runs** → Analyzes behavior (mouse movements, typing patterns, etc.)
3. **Score generated** → 0.0 (bot) to 1.0 (human)
4. **Token sent to server** → Your API verifies with Google
5. **Decision made**:
   - Score ≥ 0.5 → ✅ Form submitted
   - Score < 0.5 → 🚫 Blocked as bot

## 🎯 Adjusting the Threshold

If you're getting too many false positives (real people blocked), lower the threshold in `app/api/contact/route.ts`:

```typescript
// Current: 0.5 (balanced)
return data.success && data.score >= 0.5

// More lenient: 0.3 (fewer false positives, but may let some bots through)
return data.success && data.score >= 0.3

// Stricter: 0.7 (blocks more bots, but may block some humans)
return data.success && data.score >= 0.7
```

## 📈 Monitor Bot Attempts

Check your PM2 logs regularly to see blocked attempts:

```bash
pm2 logs jontremblay | grep "BOT DETECTED"
```

You'll see how many bots are being blocked!

## 🔄 Apply to Other Sites

To add this to your other sites (Gretrix, Pivotal Tech, etc.):

1. Create a new reCAPTCHA site for each domain
2. Copy the same code changes from this implementation
3. Update each site's .env with its own keys
4. Deploy!

**Pro Tip**: You can use the same reCAPTCHA keys across multiple domains by adding all domains in the reCAPTCHA admin panel.

## ❓ Troubleshooting

### "reCAPTCHA not loaded" error
- Make sure the script is in your `layout.tsx`
- Check browser console for errors
- Verify your Site Key is correct

### All submissions blocked
- Check your Secret Key is correct
- Lower the threshold temporarily
- Check PM2 logs for the actual scores

### Still getting spam
- Lower the threshold (try 0.3)
- Check the logs to see the scores bots are getting
- Consider adding a honeypot field as additional protection

## 🎉 You're Protected!

No more spam submissions! Real users won't notice anything different, but bots will be blocked automatically.

---

**Need help?** Check the PM2 logs or test the form yourself to see the reCAPTCHA scores.
