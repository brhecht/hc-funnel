# Meta Pixel Installation Guide for HC Quiz Funnel
## React 19 + Vite 6 + Vercel + Firebase Firestore

**Date:** March 2026  
**Status:** Ready for Implementation  
**Ad Launch:** Week of March 23, 2026  
**Target Stack:** React 19, Vite 6, Tailwind, Firebase Firestore, Vercel hosting  
**Pixel ID Location:** quiz.humbleconviction.com

---

## Executive Summary

This guide provides step-by-step instructions for installing and configuring Meta Pixel on HC's quiz funnel with a two-phase optimization strategy:
- **Phase 1 (Weeks 1-3):** Focus on quiz completion tracking and data collection
- **Phase 2 (Week 4+):** Shift optimization to Lead event (email capture) once sufficient conversion data exists

The implementation uses custom events (ViewContent/QuizComplete) paired with standard Lead events to match your funnel stages and eventual campaign optimization goals.

---

## Part 1: Meta Pixel Setup (Meta Business Account)

### Step 1: Create/Access Meta Pixel in Events Manager

1. Log into Meta Business Suite at business.facebook.com
2. Navigate to **Data Sources** (Events Manager)
3. Click **"Add Data Source"** → Select **Web** → **Meta Pixel**
4. Name it: `HC Quiz Funnel`
5. Enter your domain: `quiz.humbleconviction.com`
6. **Copy your Pixel ID** (15-16 digit number) and save it securely
   - This is your `VITE_FB_PIXEL_ID`

### Step 2: Verify Pixel Installation Permission

Ensure your Meta ad account has permissions to track events on quiz.humbleconviction.com. No special token is required yet—the Pixel code itself handles tracking.

---

## Part 2: React 19 + Vite 6 Implementation

### Step 1: Add Environment Variables

Create/update `.env.local` in your project root:

```env
VITE_FB_PIXEL_ID=YOUR_PIXEL_ID_HERE
```

Update `vite.config.js` to expose the variable to the client:

```javascript
export default defineConfig({
  define: {
    'import.meta.env.VITE_FB_PIXEL_ID': JSON.stringify(process.env.VITE_FB_PIXEL_ID)
  }
})
```

### Step 2: Create Meta Pixel Hook

Create a new file `src/hooks/useMetaPixel.js`:

```javascript
import { useEffect } from 'react';

export const useMetaPixel = () => {
  useEffect(() => {
    if (!window.fbq) {
      // Initialize Meta Pixel script
      (function() {
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://connect.facebook.net/en_US/fbevents.js';
        document.head.appendChild(s);
      })();

      window.fbq = window.fbq || function() {
        (window.fbq.q = window.fbq.q || []).push(arguments);
      };
      window.fbq('init', import.meta.env.VITE_FB_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  }, []);

  return {
    trackEvent: (eventName, eventData = {}) => {
      if (window.fbq) {
        window.fbq('track', eventName, eventData);
      }
    }
  };
};
```

### Step 3: Initialize Pixel in App.jsx

Add to your main `src/App.jsx`:

```javascript
import { useMetaPixel } from './hooks/useMetaPixel';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // if using React Router

export default function App() {
  const { trackEvent } = useMetaPixel();
  const location = useLocation(); // for SPA route tracking

  // Track PageView on route changes (for SPA navigation)
  useEffect(() => {
    // Skip initial load—Pixel auto-tracks first PageView
    if (window.fbq && location.pathname !== '/') {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname]);

  return (
    // Your app structure
  );
}
```

---

## Part 3: Funnel-Specific Event Tracking

### Overview: What to Track

| Page/Event | Meta Event | Purpose | Phase |
|-----------|-----------|---------|-------|
| Landing page load | `PageView` (auto) | Baseline awareness | Both |
| Quiz start | `ViewContent` (custom) | Intent signal | Phase 1 |
| Quiz completion | `ViewContent` + custom event | Engagement metric | Phase 1 |
| Email capture (results) | `Lead` (standard) | Conversion signal | Phase 2 |
| Action plan sent | Custom event | Downstream action | Phase 2+ |

### 3.1: Landing Page (src/pages/Landing.jsx)

**Event:** `PageView` (automatically tracked by pixel init)

No additional code needed—Pixel fires PageView on initial load.

```javascript
// In Landing.jsx useEffect (optional: confirm landing event fires)
import { useMetaPixel } from '../hooks/useMetaPixel';

export default function Landing() {
  const { trackEvent } = useMetaPixel();

  useEffect(() => {
    // Optional: confirm landing view
    // trackEvent('ViewContent', { content_name: 'Landing Page' });
  }, []);

  return (
    // Landing JSX
  );
}
```

### 3.2: Quiz Page (src/pages/Quiz.jsx)

**Event:** `ViewContent` on quiz start + custom `QuizStart` event

```javascript
import { useMetaPixel } from '../hooks/useMetaPixel';
import { useEffect, useState } from 'react';

export default function Quiz() {
  const { trackEvent } = useMetaPixel();
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted && !window.fbq) return;
    
    // Fire on first quiz interaction
    trackEvent('ViewContent', {
      content_name: 'Quiz Page',
      content_type: 'quiz',
      value: 0,
      currency: 'USD'
    });

    // Optional: Custom event for more detailed tracking
    trackEvent('QuizStart', {
      quiz_name: '8-Question Assessment',
      timestamp: new Date().toISOString()
    });
  }, [quizStarted, trackEvent]);

  return (
    <div>
      {/* 8-question quiz structure */}
    </div>
  );
}
```

### 3.3: Results/Email Capture Page (src/pages/Results.jsx)

**Event:** `ViewContent` on results view + `Lead` on email submission

```javascript
import { useMetaPixel } from '../hooks/useMetaPixel';
import { useEffect, useState } from 'react';

export default function Results() {
  const { trackEvent } = useMetaPixel();
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Track results page view
  useEffect(() => {
    trackEvent('ViewContent', {
      content_name: 'Quiz Results',
      content_type: 'results_page',
      value: 0,
      currency: 'USD'
    });

    // Optional custom event: Quiz completion milestone
    trackEvent('QuizComplete', {
      quiz_name: '8-Question Assessment',
      score: 'completed',
      timestamp: new Date().toISOString()
    });
  }, [trackEvent]);

  const handleEmailSubmit = async (email) => {
    // Your email capture logic (Firebase Firestore, etc.)
    
    try {
      // Save to Firestore
      await saveLeadToFirestore(email);

      // Fire Lead event on successful email capture
      trackEvent('Lead', {
        content_name: 'Quiz Lead Capture',
        content_type: 'lead',
        lead_type: 'assessment_quiz',
        email: email, // Optional: pass email for server-side matching
        value: 0,
        currency: 'USD'
      });

      setEmailSubmitted(true);

      // Fire custom event for downstream tracking
      trackEvent('LeadCaptured', {
        email_masked: email.split('@')[0] + '@***',
        quiz_completion: true
      });
    } catch (error) {
      console.error('Email submission failed:', error);
    }
  };

  return (
    <div>
      {/* Results display + email form */}
      <form onSubmit={(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        handleEmailSubmit(email);
      }}>
        <input type="email" name="email" required />
        <button type="submit">Get My Action Plan</button>
      </form>
    </div>
  );
}
```

---

## Part 4: Two-Phase Optimization Strategy

### Phase 1: Data Collection (Weeks 1-3 of Campaign)

**Optimization Event:** `ViewContent` / `QuizComplete`  
**Goal:** Gather 50+ conversion events per week on quiz completion  
**Campaign Setting:** "Conversions" objective optimized for "ViewContent"  

**Why Phase 1:**
- Quiz completion is an early-funnel signal
- You need baseline data to identify high-intent audiences
- Test ad creatives (3 concepts) against completion rates
- Gather ~150 conversions over 3 weeks to exit learning phase

**Actions:**
1. Launch campaign with conversion tracking on `ViewContent` events
2. Monitor Meta Events Manager dashboard daily
3. Note which ad creative drives most completions
4. Allow algorithm to optimize for completion (don't pause/stop ads)

**Success Metrics:**
- Minimum 50 ViewContent events per week
- Cost per completion (rough)
- Top-performing ad creative identified

### Phase 2: Lead Optimization (Week 4+)

**Optimization Event:** `Lead` (email capture)  
**Goal:** Shift optimization once you have historical completion data  
**Campaign Setting:** Switch to "Conversions" objective optimized for "Lead"  

**Why Phase 2:**
- After 2-3 weeks, you'll have sufficient completion data
- Email capture is your true business conversion
- Meta's algorithm can now optimize specifically for leads
- This improves ROAS by focusing spend on high-intent email submitters

**Actions:**
1. Create custom conversion for `Lead` event in Meta Events Manager
2. Wait for at least 2 weeks of `ViewContent` data before switching
3. Update campaign conversion event to `Lead`
4. Reset learning phase if needed (will take 7-10 days to re-optimize)
5. Monitor lead quality and cost per lead

**Switching Checklist:**
- [ ] `Lead` event fires correctly in Meta Events Manager
- [ ] Minimum 100 `ViewContent` conversions collected
- [ ] Test team confirms email data flowing to Firestore
- [ ] Custom conversion created in Events Manager for `Lead`
- [ ] Campaign budget stable (don't increase during phase switch)
- [ ] Notify Brian of phase change, monitor first 3 days closely

---

## Part 5: Implementation in index.html (Fallback)

If you want Meta Pixel code in `public/index.html` as a backup (recommended for Vercel):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HC Quiz Funnel</title>
  
  <!-- Meta Pixel Base Code (from Events Manager) -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', import.meta.env.VITE_FB_PIXEL_ID || 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
  /></noscript>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## Part 6: Testing & Verification

### Step 1: Install Meta Pixel Helper

1. Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) Chrome extension
2. Navigate to your site locally: `http://localhost:5173`
3. Open extension icon—should show:
   - Pixel ID recognized
   - PageView event firing
   - Green checkmark next to events

### Step 2: Verify Event Firing

Open browser DevTools → Console and test:

```javascript
// Should return your Pixel ID
fbq('getState');

// Manually test events
fbq('track', 'ViewContent', { content_name: 'Test' });
fbq('track', 'Lead', { content_name: 'Test Lead' });
```

### Step 3: Test in Meta Events Manager

1. Deploy app to Vercel
2. Go to Meta Business Suite → Events Manager
3. Navigate to your pixel dashboard
4. Visit quiz.humbleconviction.com
5. Go through the entire funnel (landing → quiz → email)
6. Check Events Manager in real-time tab—you should see:
   - `PageView` (landing)
   - `ViewContent` (quiz page)
   - `Lead` (email capture)

### Step 4: Vercel Environment Setup

In your Vercel project:

1. Go to **Project Settings** → **Environment Variables**
2. Add:
   - **Name:** `VITE_FB_PIXEL_ID`
   - **Value:** Your 15-16 digit Pixel ID
   - **Environments:** Production (and Preview if testing)
3. **Redeploy** after adding
4. Verify on production: quiz.humbleconviction.com

---

## Part 7: Troubleshooting

| Issue | Solution |
|-------|----------|
| Pixel not firing on PageView | Check Pixel ID in Events Manager matches VITE_FB_PIXEL_ID |
| Events show in console but not Events Manager (5+ min delay) | Meta batches events; wait 5-10 minutes before checking dashboard |
| Script errors in console | Verify `import.meta.env.VITE_FB_PIXEL_ID` is defined; check .env.local |
| Events fire locally but not on Vercel | Verify environment variable is set in Vercel project settings; redeploy required |
| Pixel Helper shows "Not installed correctly" | Clear cache, hard refresh (Cmd+Shift+R), check noscript fallback in index.html |
| Custom events not appearing in Events Manager | Create custom conversion first (Events Manager → Custom Conversions) |
| Lead events not optimizing in campaign | Wait 2 weeks for Phase 1 data; ensure Lead event fires 50+ times before switching campaign |

---

## Part 8: Deployment Checklist

- [ ] Pixel ID created in Meta Events Manager
- [ ] Pixel ID saved to `.env.local`
- [ ] `useMetaPixel` hook created and imported in App.jsx
- [ ] Route tracking added for SPA navigation
- [ ] Landing.jsx: PageView auto-tracked
- [ ] Quiz.jsx: ViewContent + QuizStart custom events fire
- [ ] Results.jsx: ViewContent + Lead + LeadCaptured events fire
- [ ] index.html: Meta Pixel base code added as backup
- [ ] VITE_FB_PIXEL_ID added to Vercel project settings
- [ ] Vercel app redeployed after adding env var
- [ ] Meta Pixel Helper shows green checkmarks on quiz.humbleconviction.com
- [ ] Events appear in Meta Events Manager (5-10 min lag)
- [ ] Phase 1 campaign launches with ViewContent optimization
- [ ] Monitor daily for 2-3 weeks before Phase 2 switch
- [ ] Custom Lead conversion created in Events Manager
- [ ] Phase 2 campaign switch reviewed with Brian

---

## Part 9: References & Resources

Research sources and best practices:

- [Meta Pixel Get Started Documentation](https://developers.facebook.com/docs/meta-pixel/get-started/)
- [Meta Pixel Conversion Tracking Guide](https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking/)
- [Meta Pixel for Single Page Applications (SPAs)](https://developers.facebook.com/docs/meta-pixel/implementation/tag_spa/)
- [Complete Guide to Facebook Pixel in React with TypeScript](https://medium.com/@Krishna_Rati/the-complete-guide-to-facebook-pixel-integration-in-react-with-typescript-b59bc48fffc2)
- [Facebook Pixel with React - DEV Community](https://dev.to/webdev-mohdamir/facebook-pixel-with-react-by-mohd-amir-4cib/)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Tracking Quiz Events with Meta Pixel - Octane AI](https://help.octaneai.com/en/articles/4646180-tracking-quiz-events-with-the-meta-pixel/)
- [Meta Pixel Optimization Strategy](https://adspyder.io/blog/optimizing-facebook-ads-with-meta-pixel-boost-conversions-2025/)
- [Meta Pixel Learning Phase & Event Optimization](https://www.mauroromanella.com/meta-pixel-learning-phase/)

---

## Notes for Nico & Brian

**For Nico (Implementation):**
- Timeline: Implement by March 21 to allow testing before March 23 ad launch
- Test locally first, then staging, then production
- Coordinate with Brian on Phase 1 campaign setup in Meta Business Suite
- Keep Pixel ID secure; don't commit to git

**For Brian (Campaign Setup):**
- Phase 1 runs weeks 1-3 optimizing for quiz completion (ViewContent)
- Phase 2 begins week 4+ optimizing for email capture (Lead)
- Monitor Events Manager daily during Phase 1 for data quality
- 3 ad concepts: ensure variation in creative to test completion rates
- Budget stable during phase transition (allow 7-10 days for learning phase)

---

**Last Updated:** March 19, 2026  
**Ready for:** Ad Launch Week (March 23, 2026)