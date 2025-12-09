# Google Analytics & Tag Manager Setup Guide

## ✅ What's Already Done

Your site now has both Google Analytics (GA4) and Google Tag Manager (GTM) installed:
- **GA4 Measurement ID**: G-6E43E06NER
- **GTM Container ID**: GTM-M37FBP9S

## 🎯 What to Do in Google Tag Manager (GTM)

### Step 1: Create a GA4 Configuration Tag
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Select your container: **GTM-M37FBP9S**
3. Click **Tags** → **New**
4. Name it: "GA4 Configuration"
5. Click **Tag Configuration**
6. Select **Google Analytics: GA4 Configuration**
7. Enter your Measurement ID: **G-6E43E06NER**
8. Click **Triggering** → Select **All Pages**
9. Click **Save**

### Step 2: Set Up Event Tracking (Optional but Recommended)

#### Track Contact Form Submissions
1. Create a new tag: **Tags** → **New**
2. Name: "GA4 Event - Contact Form Submit"
3. Tag Type: **Google Analytics: GA4 Event**
4. Configuration Tag: Select "GA4 Configuration" (from Step 1)
5. Event Name: `contact_form_submit`
6. Trigger: Create a new trigger
   - Trigger Type: **Form Submission**
   - Name: "Contact Form Submit"
   - Check "Wait for Tags" and set timeout to 2000ms
   - Enable "Check Validation"
7. Save both trigger and tag

#### Track Outbound Links to Your Businesses
1. Create a new tag: **Tags** → **New**
2. Name: "GA4 Event - Outbound Click"
3. Tag Type: **Google Analytics: GA4 Event**
4. Configuration Tag: Select "GA4 Configuration"
5. Event Name: `outbound_click`
6. Add Event Parameters:
   - Parameter Name: `link_url`
   - Value: `{{Click URL}}`
7. Trigger: Create a new trigger
   - Trigger Type: **Click - All Elements**
   - Name: "Outbound Links"
   - This trigger fires on: **Some Clicks**
   - Click URL matches RegEx: `^https?://(gretrix|pivotaltech|pivotalinstitute|fortuneleo|thejoyful)\.`
8. Save both trigger and tag

### Step 3: Publish Your Changes
1. Click **Submit** (top right)
2. Add Version Name: "Initial GA4 Setup"
3. Add Description: "Added GA4 configuration and event tracking"
4. Click **Publish**

## 🎯 What to Do in Google Analytics (GA4)

### Verify Installation
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property (Stream: **JT Website**)
3. Go to **Admin** → **Data Streams** → Click your stream
4. You should see real-time data coming in

### Set Up Conversions (Recommended)
1. Go to **Admin** → **Events**
2. Wait for events to appear (after GTM is published and site is visited)
3. Mark important events as conversions:
   - `contact_form_submit` → Toggle "Mark as conversion"
   - `outbound_click` → Toggle "Mark as conversion"

### Create Custom Reports
1. Go to **Explore** → **Blank**
2. Create reports for:
   - Contact form submissions
   - Outbound link clicks to your businesses
   - Page views by section

## 🧪 Testing

### Test GTM Installation
1. Install [Google Tag Assistant](https://tagassistant.google.com/)
2. Visit your site: https://jontremblay.com
3. Verify both GTM and GA4 tags are firing

### Test Real-Time Data
1. Go to GA4 → **Reports** → **Realtime**
2. Visit your site in another tab
3. You should see yourself as an active user

## 📊 What You'll Be Able to Track

- **Page views** on all sections
- **Contact form submissions**
- **Clicks on business links** (Gretrix, Pivotal Tech, etc.)
- **User demographics** and behavior
- **Traffic sources** (where visitors come from)
- **Device types** (mobile, desktop, tablet)

## 🚀 Next Steps

1. Publish your GTM container with the GA4 configuration
2. Wait 24-48 hours for data to populate
3. Set up custom dashboards in GA4
4. Consider adding more event tracking for:
   - Email clicks
   - Phone number clicks
   - Social media links
   - Section scrolling depth

---

**Need Help?** Both GA4 and GTM are now installed on your site. Just publish the GTM container and you're good to go!
