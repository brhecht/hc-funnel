# Meta Ads Setup for HC Quiz Funnel

**For:** Brian Hecht (HC CEO)  
**Purpose:** Enable Nico to run Meta ads for quiz.humbleconviction.com  
**Timeline:** Complete by March 21 (launch week of March 23)

---

## Quick Overview

You own the Meta Business Suite account. Nico will manage the ad campaigns day-to-day. This doc shows you exactly what to do—each step takes 2–5 minutes unless flagged otherwise.

---

## CHECKLIST

### Step 1: Set Up Meta Business Suite (if you don't have one)
- [ ] Go to **business.facebook.com**
- [ ] Click **Create Account**
- [ ] Enter your business name (HC / Humble Conviction)
- [ ] Enter your email address
- [ ] Verify your email (check your inbox)
- [ ] Fill in basic info: country (USA), business category, business size

**Time estimate:** 5 minutes

---

### Step 2: Verify You Have a Facebook Page
- [ ] In Meta Business Suite, go to **Settings** → **Pages**
- [ ] If you see a page listed, you're good. Skip to Step 3.
- [ ] If no page: Click **Add Page** → **Create a New Page**
  - Page name: "Humble Conviction" (or similar)
  - Page category: "Coaching / Consulting" or similar
  - Click **Create**

**Time estimate:** 2 minutes (assuming page exists)

---

### Step 3: Create an Ad Account
- [ ] In Meta Business Suite, go to **Settings** → **Ad Accounts**
- [ ] Click the blue **+ Add** button
- [ ] Select **Create a New Ad Account**
- [ ] Fill in:
  - Ad account name: "HC Quiz Funnel" (or similar)
  - **Time zone:** Choose your time zone (EST recommended)
  - **Currency:** USD
- [ ] Click **Next**
- [ ] Review terms and click **Create Ad Account**

**⚠️ Important:** Time zone and currency cannot be changed later. Verify before clicking Create.

**Time estimate:** 3 minutes

---

### Step 4: Add Payment Method
- [ ] Meta will prompt you to add a payment method immediately after creating the ad account
- [ ] Click **Add Payment Method**
- [ ] Choose payment type:
  - Credit/debit card (fastest)
  - PayPal
- [ ] Enter your payment details
- [ ] Click **Save**

**⚠️ Required:** Ads cannot run without a payment method. Budget is a test budget, so set a daily limit once Nico launches campaigns.

**Time estimate:** 2 minutes

---

### Step 5: Add Nico as an Advertiser
- [ ] Go to **Settings** → **Users** → **People**
- [ ] Click **Add**
- [ ] Enter Nico's email address (ask him for the exact email linked to his Facebook profile)
- [ ] Select role: **Admin**
  - This gives him full access to create and manage ads in this account
- [ ] Click **Send Invite**
- [ ] Nico will receive an email invite; he must accept it

**⚠️ Note:** Nico needs a Facebook profile to accept the invite. If he doesn't have one, he'll need to create one first (separate from this task).

**Time estimate:** 2 minutes

---

### Step 6: Create the Meta Pixel
- [ ] In Meta Business Suite, go to **Settings** → **Data Sources** → **Pixels**
- [ ] Click **+ Add**
- [ ] Name it: "HC Quiz Funnel Pixel"
- [ ] Click **Create**
- [ ] On the next screen, copy the **Pixel ID** (long number)
- [ ] Send this ID to Nico—he'll install it on quiz.humbleconviction.com

**Note:** The pixel tracks quiz submissions and user behavior for ad optimization.

**Time estimate:** 2 minutes

---

### Step 7: Verify Your Domain (quiz.humbleconviction.com)
- [ ] In Meta Business Suite, go to **Settings** → **Brand Safety** → **Domains**
- [ ] Click **+ Add Domain**
- [ ] Enter: **quiz.humbleconviction.com**
- [ ] Select verification method: **Meta Tag** (recommended)
- [ ] Copy the meta tag code
- [ ] Send this to your web developer (or Nico) to add it to the `<head>` of your quiz page
  - They'll paste it into: `_fb_noscript.php` or the HTML head tag
- [ ] After they add it, return to Meta Business Suite and click **Verify**

**⚠️ Time estimate:** 10–15 minutes (you'll need to wait for the web team to add the meta tag and refresh)  
**⚠️ Blocker:** Domain verification may take a few minutes to propagate.

**Why:** Without domain verification, Meta can't track quiz submissions accurately, and your pixel won't work properly.

---

### Step 8: Confirm Nico Has Full Access
- [ ] Nico should log into **business.facebook.com** using his own account
- [ ] Verify he can see the HC ad account under **Ad Accounts**
- [ ] Have him test by creating a draft campaign (he doesn't need to launch it yet)

**Time estimate:** 2 minutes

---

## Summary: What Nico Can Now Do

Once you complete all steps:
- ✅ Create, edit, and launch Meta ad campaigns
- ✅ Set daily budgets and targeting
- ✅ View performance data and adjust in real-time
- ✅ Track conversions via the pixel

---

## Timeline

| Task | Owner | Due |
|------|-------|-----|
| Steps 1–6 (setup) | Brian | March 21 |
| Step 7 (domain verification) | Brian + Web Team | March 21 |
| Step 8 (confirm access) | Nico | March 21 |
| Campaign launch | Nico | Week of March 23 |

---

## Questions?

- **Meta Help:** business.facebook.com/help
- **Nico:** Reach out in Slack for clarifications

Good luck with the launch!
