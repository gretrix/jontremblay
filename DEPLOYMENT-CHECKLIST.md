# 🚀 Deployment Checklist

## Changes Ready to Deploy

- ✅ Clickable business links (Gretrix, Pivotal Tech, etc.)
- ✅ Google Analytics & GTM tracking
- ✅ reCAPTCHA bot protection

## Pre-Deployment Steps

### 1. Get reCAPTCHA Keys
- [ ] Go to https://www.google.com/recaptcha/admin
- [ ] Create new site (reCAPTCHA v3)
- [ ] Add domain: `jontremblay.com` and `localhost`
- [ ] Copy Site Key (starts with 6L...)
- [ ] Copy Secret Key (starts with 6L...)

### 2. Update Local .env
- [ ] Open `.env` file
- [ ] Replace `NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your_site_key_here"`
- [ ] Replace `RECAPTCHA_SECRET_KEY="your_secret_key_here"`
- [ ] Save file

### 3. Test Locally (Optional)
- [ ] Run `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] Test contact form
- [ ] Check console for reCAPTCHA messages

## Deployment Steps

### 4. Commit & Push
```bash
git add .
git commit -m "Add clickable business links, GA4/GTM tracking, and reCAPTCHA bot protection"
git push origin main
```

### 5. Deploy to EC2
SSH into your server and run:

```bash
cd /var/www/jontremblay
git pull origin main
nano .env
```

In nano:
- [ ] Add your `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- [ ] Add your `RECAPTCHA_SECRET_KEY`
- [ ] Press `Ctrl+X`, then `Y`, then `Enter` to save

Continue deployment:
```bash
npm install
npm run build
pm2 restart jontremblay --update-env
pm2 logs jontremblay --lines 20
```

## Post-Deployment Verification

### 6. Test the Site
- [ ] Visit https://jontremblay.com
- [ ] Click on business cards (Gretrix, Pivotal Tech, etc.) - should open websites
- [ ] Fill out contact form and submit
- [ ] Check email for confirmation

### 7. Verify Analytics
- [ ] Open Google Analytics Realtime
- [ ] Visit your site in another tab
- [ ] Confirm you see yourself as active user

### 8. Check Logs
```bash
pm2 logs jontremblay --lines 50
```

Look for:
- [ ] `✅ Human verified` (reCAPTCHA working)
- [ ] `📧 FORM SUBMISSION RECEIVED` (form working)
- [ ] No errors

### 9. Monitor for Bots
Over the next few days, check for blocked bots:
```bash
pm2 logs jontremblay | grep "BOT DETECTED"
```

## Success Criteria

✅ Business links are clickable and open correct websites
✅ Google Analytics shows real-time visitors
✅ Contact form works for real users
✅ Bots are blocked (check logs)
✅ No spam emails received

## Rollback Plan (If Needed)

If something goes wrong:
```bash
cd /var/www/jontremblay
git log --oneline  # Find previous commit hash
git reset --hard <previous-commit-hash>
npm run build
pm2 restart jontremblay
```

---

**Estimated Time**: 15-20 minutes total
**Difficulty**: Easy - just follow the steps!
