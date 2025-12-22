# 🔍 Google Search Console Setup Guide

## What Was Added

✅ **Sitemap** - `sitemap.xml` automatically generated at https://jontremblay.com/sitemap.xml
✅ **Robots.txt** - `robots.txt` automatically generated at https://jontremblay.com/robots.txt

## Deploy First

Before submitting to Google Search Console, deploy these changes:

### On Your Local Machine:
```bash
git add .
git commit -m "Add sitemap and robots.txt for SEO"
git push origin main
```

### On EC2 Server:
```bash
cd /var/www/jontremblay
git pull origin main
nano .env
```

**In nano, make sure you have:**
```env
SITE_NAME="JonathanTremblay.com"
```

**Continue:**
```bash
npm run build
pm2 restart jontremblay --update-env
pm2 logs jontremblay --lines 20
```

## Verify Sitemap Works

After deployment, visit these URLs to confirm they work:
- https://jontremblay.com/sitemap.xml
- https://jontremblay.com/robots.txt

You should see XML/text content, not a 404 error.

## Google Search Console Setup

### Step 1: Add Your Property

1. Go to https://search.google.com/search-console
2. Click **Add Property**
3. Choose **URL prefix**
4. Enter: `https://jontremblay.com`
5. Click **Continue**

### Step 2: Verify Ownership

Choose one of these verification methods:

#### Option A: HTML File Upload (Easiest)
1. Google will give you a file like `google1234567890abcdef.html`
2. Download it
3. Upload to your server:
   ```bash
   scp google1234567890abcdef.html ec2-user@your-server:/var/www/jontremblay/public/
   ```
4. Verify it's accessible: `https://jontremblay.com/google1234567890abcdef.html`
5. Click **Verify** in Google Search Console

#### Option B: HTML Tag (Alternative)
1. Google will give you a meta tag like:
   ```html
   <meta name="google-site-verification" content="abc123..." />
   ```
2. Add it to your `app/layout.tsx` in the `<head>` section
3. Deploy the change
4. Click **Verify** in Google Search Console

#### Option C: Google Analytics (If Already Setup)
1. Since you already have GA4 installed, you can verify through that
2. Select "Google Analytics" method
3. Click **Verify**

### Step 3: Submit Your Sitemap

Once verified:

1. In Google Search Console, go to **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**
4. Status should show "Success" after a few minutes

### Step 4: Request Indexing

1. Go to **URL Inspection** (left sidebar)
2. Enter: `https://jontremblay.com`
3. Click **Request Indexing**
4. Wait for Google to crawl your site (can take 1-7 days)

## What's in Your Sitemap

Your sitemap includes all main sections:

| URL | Priority | Change Frequency |
|-----|----------|------------------|
| Homepage | 1.0 | Monthly |
| #ventures | 0.9 | Monthly |
| #contact | 0.9 | Monthly |
| #about | 0.8 | Monthly |
| #story | 0.8 | Yearly |
| #faith | 0.7 | Monthly |
| #leadership | 0.6 | Yearly |

## Robots.txt Configuration

Your robots.txt tells search engines:
- ✅ **Allow**: All pages (`/`)
- 🚫 **Disallow**: API routes (`/api/`) and Next.js internals (`/_next/`)
- 📍 **Sitemap**: Points to your sitemap.xml

## Monitoring & Maintenance

### Check Indexing Status
1. Go to Google Search Console
2. Click **Coverage** or **Pages**
3. See how many pages are indexed

### Check for Errors
1. Go to **Coverage** → **Excluded**
2. Fix any errors shown

### Monitor Performance
1. Go to **Performance**
2. See clicks, impressions, CTR, and position
3. Track which keywords bring traffic

### Update Sitemap (When Needed)
If you add new pages/sections, update `app/sitemap.ts` and redeploy.

## Expected Timeline

- **Sitemap submitted**: Instant
- **First crawl**: 1-3 days
- **Indexed in search**: 3-7 days
- **Ranking in results**: 2-4 weeks

## Bonus: Submit to Bing

1. Go to https://www.bing.com/webmasters
2. Add your site
3. Import from Google Search Console (easiest)
4. Submit sitemap: `https://jontremblay.com/sitemap.xml`

## Troubleshooting

### Sitemap not found (404)
- Make sure you deployed the changes
- Check: `https://jontremblay.com/sitemap.xml`
- Rebuild: `npm run build` and restart PM2

### Verification failed
- Try a different verification method
- Make sure the verification file is in `/public/` folder
- Check file is accessible in browser

### Pages not indexed
- Wait 7 days (Google is slow)
- Request indexing manually
- Check robots.txt isn't blocking pages

## Apply to Other Sites

For your other sites (Gretrix, Pivotal Tech, etc.):

1. Copy `app/sitemap.ts` and `app/robots.ts`
2. Update the `baseUrl` in sitemap.ts
3. Update the sitemap URL in robots.ts
4. Deploy
5. Add to Google Search Console
6. Submit sitemap

---

**Your site is now ready for Google Search Console!** 🚀

After deployment, visit:
- https://jontremblay.com/sitemap.xml
- https://jontremblay.com/robots.txt

Then submit to Google Search Console.
