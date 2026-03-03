/**
 * FUNNEL CONFIG
 *
 * Everything content-specific lives here. To create a new funnel for
 * a different product/course, duplicate this file and swap the values.
 * The components read from this config — no hardcoded copy in JSX.
 *
 * SCORING DIMENSIONS (internal — never shown to user):
 *   readiness  — overall investor-readiness signal
 *   packaging  — clarity of communication / pitch articulation
 *   strategy   — strength of idea, market, plan
 *   vcLiteracy — understanding of how fundraising actually works
 *
 * READINESS TIERS (shown to user):
 *   Based on total readiness score across all questions
 *
 * FRICTION AREA (shown to user in plain language):
 *   Whichever dimension scores lowest = primary friction diagnosis
 */

const FUNNEL = {
  // ─── Brand ───────────────────────────────────────────────
  brand: {
    name: "Humble Conviction",
    tagline: "Pitch Better, Get Funded Faster",
    logo: null,
  },

  // ─── Theme (warm light — bhub / Ali Abdaal inspired) ─────
  theme: {
    bg: "#FAF6F1",
    accent: "#E8845A",
    accent2: "#B5A4FF",
    warn: "#F2C84E",
    text: "#2D2A26",
    muted: "#8A8078",
    faint: "#C9C0B6",
    card: "#FFFFFF",
    border: "rgba(45, 42, 38, 0.08)",
    headingFont: "'Playfair Display', serif",
    bodyFont: "'DM Sans', sans-serif",
  },

  // ─── Landing Page ────────────────────────────────────────
  landing: {
    headline: "Is Your Startup Ready to Raise?",
    subheadline:
      "Take the 3-minute Founder Assessment and find out where you stand — before investors do.",
    ctaText: "Start the Assessment",
    ctaLink: "/quiz",
    socialProof: null,
    features: [
      {
        title: "Know Before You Go",
        description:
          "Understand your pitch strengths and blind spots before walking into the room.",
      },
      {
        title: "Personalized Playbook",
        description:
          "Get a custom action plan based on your founder archetype.",
      },
      {
        title: "Built by Operators",
        description:
          "Designed by founders who've raised from top-tier VCs.",
      },
    ],
  },

  // ─── Phase 1: Instant Quiz (8 questions, all multiple choice) ───
  quiz: {
    title: "Founder Assessment",
    subtitle: "Answer honestly — this is for you, not for show.",
    questions: [
      {
        id: "stage",
        text: "What stage are you at?",
        section: "Where You Are Today",
        options: [
          { label: "Idea", value: "idea", points: { readiness: 1, strategy: 1, vcLiteracy: 0, packaging: 0 } },
          { label: "MVP", value: "mvp", points: { readiness: 2, strategy: 2, vcLiteracy: 0, packaging: 0 } },
          { label: "Pre-revenue", value: "pre-rev", points: { readiness: 2, strategy: 2, vcLiteracy: 1, packaging: 0 } },
          { label: "Early revenue", value: "early-rev", points: { readiness: 3, strategy: 3, vcLiteracy: 1, packaging: 0 } },
          { label: "Growing revenue", value: "growing", points: { readiness: 4, strategy: 4, vcLiteracy: 2, packaging: 0 } },
        ],
      },
      {
        id: "traction",
        text: "How much traction do you have today?",
        section: "Where You Are Today",
        options: [
          { label: "None", value: "none", points: { readiness: 1, strategy: 1, vcLiteracy: 0, packaging: 0 } },
          { label: "Some early users", value: "early-users", points: { readiness: 2, strategy: 2, vcLiteracy: 0, packaging: 0 } },
          { label: "Paying customers", value: "paying", points: { readiness: 3, strategy: 3, vcLiteracy: 1, packaging: 0 } },
          { label: "Consistent revenue", value: "consistent", points: { readiness: 4, strategy: 3, vcLiteracy: 1, packaging: 0 } },
          { label: "Significant growth", value: "growth", points: { readiness: 4, strategy: 4, vcLiteracy: 2, packaging: 0 } },
        ],
      },
      {
        id: "team",
        text: "What does your founding team look like?",
        section: "Where You Are Today",
        options: [
          { label: "Solo technical founder", value: "solo-tech", points: { readiness: 2, strategy: 1, vcLiteracy: 0, packaging: 1 } },
          { label: "Solo business founder", value: "solo-biz", points: { readiness: 2, strategy: 2, vcLiteracy: 1, packaging: 1 } },
          { label: "Business founder with a technical cofounder", value: "biz-tech", points: { readiness: 3, strategy: 3, vcLiteracy: 1, packaging: 2 } },
          { label: "Technical founder with a business cofounder", value: "tech-biz", points: { readiness: 3, strategy: 3, vcLiteracy: 1, packaging: 2 } },
          { label: "Non-technical team building a technical product", value: "non-tech", points: { readiness: 1, strategy: 1, vcLiteracy: 0, packaging: 1 } },
        ],
      },
      {
        id: "pitched",
        text: "Have you pitched investors yet?",
        section: "Your Experience With Investors",
        options: [
          { label: "No", value: "no", points: { readiness: 1, strategy: 0, vcLiteracy: 1, packaging: 0 } },
          { label: "Yes — but no one said yes", value: "no-yes", points: { readiness: 2, strategy: 0, vcLiteracy: 2, packaging: 1 } },
          { label: "Yes — mixed reactions", value: "mixed", points: { readiness: 2, strategy: 0, vcLiteracy: 3, packaging: 2 } },
          { label: "Yes — positive but no close", value: "positive", points: { readiness: 3, strategy: 0, vcLiteracy: 3, packaging: 3 } },
          { label: "Yes — received funding", value: "funded", points: { readiness: 4, strategy: 0, vcLiteracy: 4, packaging: 4 } },
        ],
      },
      {
        id: "feedback",
        text: "What feedback do you get most often from investors?",
        section: "Your Experience With Investors",
        multiSelect: 2,
        options: [
          { label: "\"I don't understand what you do\"", value: "unclear", points: { readiness: 0, strategy: 0, vcLiteracy: 0, packaging: -3 } },
          { label: "\"This doesn't feel big enough\"", value: "small", points: { readiness: 0, strategy: -3, vcLiteracy: 0, packaging: 0 } },
          { label: "\"Not enough traction\"", value: "traction", points: { readiness: -1, strategy: -1, vcLiteracy: -1, packaging: 0 } },
          { label: "\"I don't think you're the right team\"", value: "team", points: { readiness: -2, strategy: 0, vcLiteracy: 0, packaging: -1 } },
          { label: "\"I'm not convinced the plan makes sense\"", value: "plan", points: { readiness: 0, strategy: -3, vcLiteracy: 0, packaging: -1 } },
          { label: "\"It's too early for us\"", value: "early", points: { readiness: 0, strategy: 0, vcLiteracy: -2, packaging: 0 } },
          { label: "\"Come back when you have more data\"", value: "data", points: { readiness: -1, strategy: -1, vcLiteracy: -1, packaging: 0 } },
          { label: "Haven't gotten meaningful feedback", value: "none", points: { readiness: 0, strategy: 0, vcLiteracy: -1, packaging: 0 } },
        ],
      },
      {
        id: "clarity",
        text: "How clearly can you explain your startup in 30 seconds?",
        section: "Your Self-Assessment",
        options: [
          { label: "Extremely clear", value: "extreme", points: { readiness: 1, strategy: 0, vcLiteracy: 0, packaging: 4 } },
          { label: "Pretty clear", value: "pretty", points: { readiness: 1, strategy: 0, vcLiteracy: 0, packaging: 3 } },
          { label: "Hit-or-miss", value: "hitmiss", points: { readiness: 0, strategy: 0, vcLiteracy: 0, packaging: 2 } },
          { label: "It's hard", value: "hard", points: { readiness: 0, strategy: 0, vcLiteracy: 0, packaging: 1 } },
          { label: "Nearly impossible", value: "impossible", points: { readiness: 0, strategy: 0, vcLiteracy: 0, packaging: 0 } },
        ],
      },
      {
        id: "vcunderstanding",
        text: "Do you feel you understand how investors make decisions?",
        section: "Your Experience With Investors",
        options: [
          { label: "Yes, very well", value: "very", points: { readiness: 1, strategy: 0, vcLiteracy: 4, packaging: 0 } },
          { label: "Somewhat", value: "somewhat", points: { readiness: 1, strategy: 0, vcLiteracy: 3, packaging: 0 } },
          { label: "Not really", value: "notreally", points: { readiness: 0, strategy: 0, vcLiteracy: 1, packaging: 0 } },
          { label: "Not at all", value: "notatall", points: { readiness: 0, strategy: 0, vcLiteracy: 0, packaging: 0 } },
        ],
      },
      {
        id: "weakest",
        text: "Which area do you feel least confident in?",
        section: "Your Self-Assessment",
        options: [
          { label: "The idea", value: "idea", points: { readiness: 0, strategy: -2, vcLiteracy: 0, packaging: 0 } },
          { label: "The plan", value: "plan", points: { readiness: 0, strategy: -2, vcLiteracy: -1, packaging: 0 } },
          { label: "The pitch", value: "pitch", points: { readiness: 0, strategy: 0, vcLiteracy: 0, packaging: -2 } },
          { label: "The business progress", value: "progress", points: { readiness: -2, strategy: -1, vcLiteracy: 0, packaging: 0 } },
          { label: "My ability to lead it", value: "leadership", points: { readiness: -2, strategy: 0, vcLiteracy: 0, packaging: -1 } },
        ],
      },
    ],
  },

  // ─── Phase 2: Deep Dive (after email capture) ────────────
  deepDive: {
    title: "Want a deeper, personalized diagnostic?",
    subtitle: "Answer a few more questions and we'll send you a custom analysis written by our coaching AI — based on your specific situation.",
    questions: [
      {
        id: "dd_description",
        text: "What does your startup do?",
        type: "text",
        placeholder: "One or two sentences is perfect.",
      },
      {
        id: "dd_customer",
        text: "Who is your customer?",
        type: "text",
        placeholder: "Be as specific as you can.",
      },
      {
        id: "dd_blocker",
        text: "What do YOU think is holding your fundraise back?",
        type: "text",
        placeholder: "Be honest — this is just for you.",
      },
      {
        id: "dd_qualification",
        text: "What one thing in your experience qualifies you to run this company?",
        type: "text",
        placeholder: "Professional or personal — either works.",
      },
      {
        id: "dd_urgency",
        text: "How urgently do you need to raise capital?",
        type: "select",
        options: [
          { label: "Immediately (3 months)", value: "immediate" },
          { label: "Soon (6 months)", value: "soon" },
          { label: "Eventually", value: "eventually" },
          { label: "Not urgent", value: "not-urgent" },
        ],
      },
    ],
  },

  // ─── Readiness Tiers (shown to user) ─────────────────────
  readinessTiers: [
    {
      id: "investor-ready",
      name: "Investor Ready",
      minScore: 22,
      description: "You're in strong shape. The fundamentals are there — now it's about precision, timing, and the right conversations.",
      color: "#36d399",
    },
    {
      id: "almost-there",
      name: "Almost There",
      minScore: 14,
      description: "You've built real momentum, but there are specific gaps that investors will notice. Fixing them is the difference between a 'maybe' and a 'yes.'",
      color: "#7c5cff",
    },
    {
      id: "foundation-building",
      name: "Foundation Building",
      minScore: 7,
      description: "You're earlier than most founders realize when they start fundraising. That's not a problem — but pitching before you're ready can burn bridges you'll need later.",
      color: "#fbbf24",
    },
    {
      id: "early-stage",
      name: "Early Stage",
      minScore: 0,
      description: "You're at the beginning. The good news: founders who build clarity and conviction before they pitch are the ones who close. Start here.",
      color: "#ef4444",
    },
  ],

  // ─── Friction Diagnoses (mapped from lowest-scoring dimension) ─
  frictionDiagnoses: {
    packaging: {
      label: "How You Tell the Story",
      summary: "Investors aren't seeing what you see — the way you're communicating the business isn't landing. The idea might be strong, but the packaging is creating friction.",
      nextSteps: [
        "Rewrite your 30-second pitch from the investor's perspective — what do they need to understand first?",
        "Test your pitch on 3 people outside your industry. If they can't repeat it back, it's not clear enough.",
        "Strip the jargon. Investors fund clarity, not complexity.",
      ],
    },
    strategy: {
      label: "The Business Hypothesis",
      summary: "Investors are questioning the fundamentals — the market, the plan, or whether this is big enough. This isn't about your pitch skills; it's about the underlying business logic.",
      nextSteps: [
        "Pressure-test your market size claim. Can you defend it with bottoms-up math, not just a TAM slide?",
        "Clarify your wedge: what's the specific, narrow entry point that proves the bigger vision?",
        "Talk to 10 more customers this week. The answers to investor objections live in customer conversations.",
      ],
    },
    vcLiteracy: {
      label: "Understanding the Fundraising Game",
      summary: "You may be pitching the wrong investors, at the wrong stage, or misreading what they're actually looking for. The fundraising process has its own logic — and right now there's a gap.",
      nextSteps: [
        "Map your current stage to what investors at that stage actually expect (traction, team, market proof).",
        "Study 5 companies similar to yours that raised successfully. What did they have when they raised?",
        "Stop pitching for a month. Use that time to build the proof points investors are asking for.",
      ],
    },
    readiness: {
      label: "Overall Founder Readiness",
      summary: "The signal investors are picking up is that the overall package isn't ready yet. This could be traction, team, clarity, or a combination — but the honest read is that more building is needed before fundraising becomes productive.",
      nextSteps: [
        "Focus on the one metric that would change an investor's mind. Build toward that for 90 days.",
        "Find one advisor who's raised before and get honest feedback on where you actually stand.",
        "Consider whether now is the right time to raise, or whether 3 more months of building would change the conversation entirely.",
      ],
    },
  },

  // ─── Waitlist CTA (personalized per friction area) ────────
  waitlist: {
    courseName: "Pitch Better, Get Funded Faster",
    freeGift: "a personalized pitch readiness diagnostic",
    buttonText: "Join the Waitlist",
    // Personalized hooks per friction area — shown after quiz results
    hooks: {
      packaging: {
        headline: "This is exactly what we built the course to fix.",
        body: "The first module is all about clarity — how to make investors understand what you do in 30 seconds, and why it matters. No jargon. No fluff. Just the frameworks that work.",
      },
      strategy: {
        headline: "We help founders pressure-test the story before investors do.",
        body: "The course walks you through market sizing, wedge strategy, and building a business case that holds up under scrutiny. So when an investor pushes back, you have the answer.",
      },
      vcLiteracy: {
        headline: "Most founders learn fundraising by failing at it. You don't have to.",
        body: "We break down exactly how investors evaluate deals — what they look for at each stage, how decisions actually get made, and how to position yourself so the process works in your favor.",
      },
      readiness: {
        headline: "The founders who prepare before they pitch are the ones who close.",
        body: "The course is a structured path from where you are now to investor-ready — covering your story, your strategy, your pitch, and the fundraising process itself. Built for founders who want to do it right.",
      },
    },
  },

  // ─── Webhook for Phase 2 AI Diagnostic ───────────────────
  webhook: {
    url: null, // Make.com / Zapier webhook URL — wired later
  },
}

export default FUNNEL
