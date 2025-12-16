# 🛡️ Bot Protection Implementation Summary

## What Was Done

Added Google reCAPTCHA v3 to your contact form to block spam bots.

## Files Changed

1. ✅ `components/Contact.tsx` - Added reCAPTCHA token generation
2. ✅ `app/api/contact/route.ts` - Added server-side verification
3. ✅ `app/layout.tsx` - Added reCAPTCHA script
4. ✅ `.env` - Added placeholder for keys
5. ✅ `env.template` - Added template for keys

## What You Need to Do

### 1. Get reCAPTCHA Keys (5 minutes)
- Go to: https://www.google.com/recaptcha/admin
- Create new site (reCAPTCHA v3)
- Add domain: `jontremblay.com`
- Copy Site Key and Secret Key

### 2. Add Keys to .env
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your_site_key_here"
RECAPTCHA_SECRET_KEY="your_secret_key_here"
```

### 3. Deploy to EC2
```bash
# Local
git add .
git commit -m "Add reCAPTCHA bot protection"
git push origin main

# EC2
cd /var/www/jontremblay
git pull origin main
nano .env  # Add your keys
npm install
npm run build
pm2 restart jontremblay --update-env
pm2 logs jontremblay --lines 20
```

## How It Works

- **Invisible to users** - No checkbox, no friction
- **Scores 0.0 to 1.0** - AI determines if human or bot
- **Threshold: 0.5** - Below this = blocked
- **Logs everything** - See bot attempts in PM2 logs

## Testing

After deployment:
1. Fill out your contact form
2. Check PM2 logs: `pm2 logs jontremblay`
3. Look for: `✅ Human verified` or `🤖 BOT DETECTED`

## Result

✅ No more spam emails from bots!
✅ Real users won't notice any difference
✅ You'll see blocked attempts in logs

---

See `RECAPTCHA-SETUP.md` for detailed instructions.
