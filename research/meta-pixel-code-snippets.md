# Meta Pixel Code Snippets - Copy & Paste Ready
## HC Quiz Funnel | React 19 + Vite 6

---

## SNIPPET 1: Environment File
### File: `.env.local`

Copy and paste, replace `YOUR_PIXEL_ID` with actual Pixel ID from Meta Events Manager:

```env
VITE_FB_PIXEL_ID=YOUR_PIXEL_ID_HERE
```

**Where to get Pixel ID:**
- Meta Business Suite → Events Manager → Data Sources → Your Pixel → Settings
- Copy the 15-16 digit number

---

## SNIPPET 2: Vite Config (Optional but Recommended)
### File: `vite.config.js`

If using Vite, ensure environment variable is exposed to client:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_FB_PIXEL_ID': JSON.stringify(process.env.VITE_FB_PIXEL_ID)
  }
})
```

---

## SNIPPET 3: Meta Pixel Hook
### File: `src/hooks/useMetaPixel.js`

Create new file. Copy entire content:

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

---

## SNIPPET 4: App.jsx Setup
### File: `src/App.jsx`

Add imports at top and the useEffect inside your App component (only once):

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
    // Your existing app JSX here
  );
}
```

---

## SNIPPET 5: Landing.jsx
### File: `src/pages/Landing.jsx`

Add this import at top:

```javascript
import { useMetaPixel } from '../hooks/useMetaPixel';
```

Paste into your Landing component (inside the component function):

```javascript
  const { trackEvent } = useMetaPixel();

  useEffect(() => {
    // Landing page is already tracked by App.jsx PageView
    // Optional: confirm with explicit ViewContent if desired
    // trackEvent('ViewContent', { content_name: 'Landing Page' });
  }, [trackEvent]);
```

**Minimal version (if Landing doesn't need explicit tracking):**

No code needed—PageView is auto-tracked by useMetaPixel in App.jsx.

---

## SNIPPET 6: Quiz.jsx
### File: `src/pages/Quiz.jsx`

Add imports at top:

```javascript
import { useMetaPixel } from '../hooks/useMetaPixel';
import { useEffect, useState } from 'react';
```

Paste into your Quiz component (inside the component function):

```javascript
  const { trackEvent } = useMetaPixel();
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (!quizStarted) return;
    
    // Fire ViewContent on first quiz interaction
    trackEvent('ViewContent', {
      content_name: 'Quiz Page',
      content_type: 'quiz',
      value: 0,
      currency: 'USD'
    });

    // Custom event for detailed tracking
    trackEvent('QuizStart', {
      quiz_name: '8-Question Assessment',
      timestamp: new Date().toISOString()
    });
  }, [quizStarted, trackEvent]);

  // When user clicks "Start Quiz" button, call:
  const handleQuizStart = () => {
    setQuizStarted(true);
    // ... rest of your quiz start logic
  };
```

**Replace your quiz start button onClick with:**

```javascript
onClick={handleQuizStart}
```

---

## SNIPPET 7: Results.jsx - Results Page View
### File: `src/pages/Results.jsx`

Add imports at top:

```javascript
import { useMetaPixel } from '../hooks/useMetaPixel';
import { useEffect, useState } from 'react';
```

Paste into your Results component (inside the component function):

```javascript
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

    // Custom event: Quiz completion milestone
    trackEvent('QuizComplete', {
      quiz_name: '8-Question Assessment',
      score: 'completed',
      timestamp: new Date().toISOString()
    });
  }, [trackEvent]);
```

---

## SNIPPET 8: Results.jsx - Email Capture (Lead Event)
### File: `src/pages/Results.jsx`

Replace your existing email form submission handler with this (or add to it):

```javascript
  const handleEmailSubmit = async (email) => {
    // Your existing email validation
    if (!email || !email.includes('@')) {
      console.error('Invalid email');
      return;
    }

    try {
      // Save to Firestore (adjust to your actual Firebase code)
      await saveLeadToFirestore(email);

      // Fire Lead event on successful email capture
      trackEvent('Lead', {
        content_name: 'Quiz Lead Capture',
        content_type: 'lead',
        lead_type: 'assessment_quiz',
        value: 0,
        currency: 'USD'
      });

      // Fire custom event for downstream tracking
      trackEvent('LeadCaptured', {
        email_masked: email.split('@')[0] + '@***',
        quiz_completion: true
      });

      setEmailSubmitted(true);
      
      // Your existing success logic (show confirmation, etc.)
      console.log('Lead captured and email event fired');
    } catch (error) {
      console.error('Email submission failed:', error);
      // Your existing error handling
    }
  };
```

**In your form element, call like this:**

```javascript
<form onSubmit={(e) => {
  e.preventDefault();
  const email = e.target.email.value;
  handleEmailSubmit(email);
}}>
  <input type="email" name="email" placeholder="your@email.com" required />
  <button type="submit">Get My Action Plan</button>
</form>
```

---

## SNIPPET 9: index.html - Base Code (Fallback/Recommended)
### File: `public/index.html`

Paste this into the `<head>` section of your index.html (before closing `</head>`):

```html
<!-- Meta Pixel Base Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  
  fbq('init', import.meta.env.VITE_FB_PIXEL_ID || 'YOUR_PIXEL_ID_HERE');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID_HERE&ev=PageView&noscript=1"
/></noscript>
```

Replace `YOUR_PIXEL_ID_HERE` with your actual Pixel ID (two places).

---

## SNIPPET 10: Vercel Environment Setup
### Steps (in Vercel Dashboard)

1. Go to your Vercel project
2. Click **Settings** (gear icon)
3. Click **Environment Variables** (left sidebar)
4. Click **Add New**
5. Fill in:
   - **Name:** `VITE_FB_PIXEL_ID`
   - **Value:** Your Pixel ID (15-16 digits)
   - **Environments:** Check "Production" and "Preview"
6. Click **Add**
7. **Redeploy** your project (go to Deployments → click latest → Redeploy)

---

## SNIPPET 11: Testing Script (DevTools Console)
### For Local Testing

Paste into browser console (DevTools → Console) when on localhost:5173:

```javascript
// Check Pixel is loaded
console.log('Pixel ID:', fbq.getState().pixelId);
console.log('Pixel loaded:', typeof window.fbq !== 'undefined');

// Test ViewContent event
fbq('track', 'ViewContent', { content_name: 'Test ViewContent' });
console.log('ViewContent test fired');

// Test Lead event
fbq('track', 'Lead', { content_name: 'Test Lead' });
console.log('Lead test fired');

// Check all events
fbq('getState');
```

Expected output should show your Pixel ID and confirm events are queued.

---

## SNIPPET 12: Quick Reference - Event Codes
### Paste into constants file (optional)

Create `src/constants/pixelEvents.js`:

```javascript
export const PIXEL_EVENTS = {
  PAGE_VIEW: 'PageView',
  VIEW_CONTENT: 'ViewContent',
  QUIZ_START: 'QuizStart',
  QUIZ_COMPLETE: 'QuizComplete',
  LEAD: 'Lead',
  LEAD_CAPTURED: 'LeadCaptured'
};

export const PIXEL_EVENT_DATA = {
  LANDING: {
    content_name: 'Landing Page',
    content_type: 'page'
  },
  QUIZ_PAGE: {
    content_name: 'Quiz Page',
    content_type: 'quiz',
    value: 0,
    currency: 'USD'
  },
  RESULTS_PAGE: {
    content_name: 'Quiz Results',
    content_type: 'results_page',
    value: 0,
    currency: 'USD'
  },
  EMAIL_LEAD: {
    content_name: 'Quiz Lead Capture',
    content_type: 'lead',
    lead_type: 'assessment_quiz',
    value: 0,
    currency: 'USD'
  }
};
```

Then use in components like:

```javascript
import { PIXEL_EVENTS, PIXEL_EVENT_DATA } from '../constants/pixelEvents';

trackEvent(PIXEL_EVENTS.VIEW_CONTENT, PIXEL_EVENT_DATA.QUIZ_PAGE);
```

---

## Implementation Checklist

- [ ] Copy Pixel ID from Meta Events Manager
- [ ] Paste Pixel ID into `.env.local`
- [ ] Create `src/hooks/useMetaPixel.js` (Snippet 3)
- [ ] Update `src/App.jsx` with Snippet 4
- [ ] Add code to `src/pages/Landing.jsx` (Snippet 5)
- [ ] Add code to `src/pages/Quiz.jsx` (Snippet 6)
- [ ] Add code to `src/pages/Results.jsx` (Snippet 7 + 8)
- [ ] Add Meta Pixel base code to `public/index.html` (Snippet 9)
- [ ] Test locally: run `npm run dev`, navigate funnel, check console
- [ ] Use Meta Pixel Helper extension to verify events
- [ ] Add `VITE_FB_PIXEL_ID` to Vercel project settings (Snippet 10)
- [ ] Redeploy on Vercel
- [ ] Test on production: quiz.humbleconviction.com
- [ ] Verify events in Meta Events Manager (5-10 min lag)
- [ ] Notify Brian when ready for Phase 1 campaign launch

---

## Common Copy-Paste Errors to Avoid

1. **Don't forget the import:** Always add `import { useMetaPixel } from '../hooks/useMetaPixel';` at the top of files
2. **Pixel ID:** Replace `YOUR_PIXEL_ID` in all three places (index.html has it twice)
3. **Environment variable name:** Must be exactly `VITE_FB_PIXEL_ID` (case-sensitive)
4. **Vercel redeploy:** After adding env var, always redeploy or it won't take effect
5. **Semicolons:** Keep all JavaScript semicolons as shown—critical for parsing
6. **Hook dependency arrays:** Include `[trackEvent]` in useEffect dependencies to avoid warnings

---

**Ready to use:** March 19, 2026  
**Test deadline:** March 22, 2026 (before ad launch March 23)