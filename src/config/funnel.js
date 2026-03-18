/**
 * FUNNEL CONFIG — Humble Conviction Quiz Funnel
 *
 * Everything content-specific lives here. Components read from this
 * config — no hardcoded copy in JSX.
 *
 * SCORING DIMENSIONS (shown to user as X/5):
 *   clarity           — Can you explain what you do so an investor gets it?
 *   investorFluency   — Do you understand how investors think and operate?
 *   selfAwareness     — Can you accurately assess your own blind spots?
 *   persuasionInstincts — Do you create pull, not push?
 *
 * SCORING MAP:
 *   Clarity: Q1 + Q5
 *   Investor Fluency: Q3 + Q6
 *   Self-Awareness: Q4 + Q7
 *   Persuasion Instincts: Q2 + Q8
 *
 * PER-QUESTION: Best = 2 pts, Next-best = 1 pt, Weak = 0 pts
 * RAW RANGE per dimension: 0–4 (two questions each)
 * DISPLAY MAPPING: Raw 0-1 → 2/5, Raw 2-3 → 3/5, Raw 4 → 4/5. No 5/5.
 * Self-Awareness exception: floors at 3/5 (only Mid and High).
 *
 * TIER ASSIGNMENT: Uses raw total score (0–16), not display scores.
 *   Lost in the Noise: 0–3
 *   The Pieces Are There: 4–9
 *   So Close It Hurts: 10+
 */

const FUNNEL = {
  // ─── Brand ───────────────────────────────────────────────
  brand: {
    name: "Humble Conviction",
    tagline: "Investor-Tested Insights",
    logo: null,
  },

  // ─── Theme (navy + orange, research-backed for trust + conversion) ──
  theme: {
    bg: "#F8F9FC",
    accent: "#E8845A",
    text: "#1A2332",
    muted: "#5A6578",
    faint: "#9CA3AF",
    card: "#FFFFFF",
    border: "rgba(26, 35, 50, 0.08)",
    selectedBg: "#FFF3ED",
    selectedBorder: "#E8845A",
    // Tier colors
    tierLow: "#D97706",    // amber
    tierMid: "#0D9488",    // teal
    tierHigh: "#059669",   // deep green
    // Score dot colors
    dotFilled: "#1A2332",
    dotEmpty: "#E5E7EB",
    // Typography — Inter only, loaded via Google Fonts
    headingFont: "'Inter', sans-serif",
    bodyFont: "'Inter', sans-serif",
  },

  // ─── Landing Page ────────────────────────────────────────
  landing: {
    headline: "Find Out What Investors See\n— Before They Tell You",
    subheadline:
      "This 3-minute assessment reveals the patterns investors notice — but will never tell you.",
    ctaText: "See What Investors See",
    ctaLink: "/quiz",
    socialProof: "Based on 2,500+ pitches coached by a 4x exited founder and venture investor",
    features: [
      {
        title: "Investor-Tested Insights",
        description:
          "See what investors actually notice in the first 30 seconds — the signals they read but never share.",
      },
      {
        title: "4-Dimension Scorecard",
        description:
          "Get scored on Clarity, Investor Fluency, Self-Awareness, and Persuasion Instincts — the four things that matter most.",
      },
      {
        title: "Built From 2,500+ Pitches",
        description:
          "Designed by a founder who's been on both sides of the table — raising capital and investing it.",
      },
    ],
  },

  // ─── Quiz: 8 scenario-based questions ───────────────────
  quiz: {
    title: "Investor-Tested Insights",
    subtitle: "8 real scenarios. See what investors see.",
    questions: [
      // ── Q1: Clarity (Easy entry) ──
      {
        id: "q1_clarity",
        dimension: "clarity",
        text: "You're at a startup event and an investor asks \"So what does your company do?\" You have about 30 seconds.",
        options: [
          {
            id: "a",
            label: "Start with the problem — how painful it is, how nobody's solving it well",
            points: 1,
          },
          {
            id: "b",
            label: "Lead with what it is, who it's for, and why it matters — in that order",
            points: 2,
          },
          {
            id: "c",
            label: "Start with your background and what inspired you to build this",
            points: 0,
          },
          {
            id: "d",
            label: "Lead with your traction — users, revenue, growth — to establish credibility fast",
            points: 0,
          },
        ],
      },
      // ── Q2: Persuasion Instincts (Easy entry) ──
      {
        id: "q2_persuasion",
        dimension: "persuasionInstincts",
        text: "You're sitting down in a conference room with two investors for a first meeting. Your deck is on your laptop. How do you start?",
        options: [
          {
            id: "a",
            label: "Pull up the deck and start walking them through it from slide 1",
            points: 0,
          },
          {
            id: "b",
            label: "Start the conversation without opening the deck — pull it up only if they ask",
            points: 2,
          },
          {
            id: "c",
            label: "Ask if they'd like to see the deck or if they'd prefer to just talk — let them set the format",
            points: 1,
          },
          {
            id: "d",
            label: "Send the deck to their email beforehand so they can follow along on their own screens",
            points: 0,
          },
        ],
      },
      // ── Q3: Investor Fluency (Uncomfortable middle) ──
      {
        id: "q3_fluency",
        dimension: "investorFluency",
        text: "You just finished your pitch. The lead investor says \"This is really interesting\" and then asks about your fundraising timeline. What's your read on where you stand?",
        options: [
          {
            id: "a",
            label: "Strong signal — they're interested enough to talk next steps",
            points: 0,
          },
          {
            id: "b",
            label: "They're passing politely — \"interesting\" is investor code for \"no thanks\"",
            points: 0,
          },
          {
            id: "c",
            label: "They're figuring out whether they need to act now or can wait and watch",
            points: 2,
          },
          {
            id: "d",
            label: "Promising — they didn't say no, and asking about timeline means they're thinking about how this could work",
            points: 1,
          },
        ],
      },
      // ── Q4: Self-Awareness (Uncomfortable) ──
      {
        id: "q4_awareness",
        dimension: "selfAwareness",
        text: "You've taken 8 investor meetings this month. In 6 of them, the investor asked some version of \"Wait — can you back up and explain what you actually do?\" What's your takeaway?",
        options: [
          {
            id: "a",
            label: "Your company is genuinely hard to explain in a short pitch — some ideas need more time to land",
            points: 0,
          },
          {
            id: "b",
            label: "Your pitch has a clarity problem — if 6 out of 8 are confused, it's not them, it's you",
            points: 2,
          },
          {
            id: "c",
            label: "You need to add more detail and context to close the gaps in their understanding",
            points: 0,
          },
          {
            id: "d",
            label: "You need a better deck — the visuals aren't supporting the story well enough, so investors are getting lost",
            points: 1,
          },
        ],
      },
      // ── Q5: Clarity (Uncomfortable) ──
      {
        id: "q5_clarity",
        dimension: "clarity",
        text: "Mid-pitch, an investor interrupts: \"Sorry — but how do you actually make money?\" You're on slide 4 of 10. What's happening?",
        options: [
          {
            id: "a",
            label: "Good sign — they're engaged enough to ask about the business model early",
            points: 0,
          },
          {
            id: "b",
            label: "You buried the business model too deep — they've been waiting and lost patience",
            points: 2,
          },
          {
            id: "c",
            label: "They're testing whether this is a real business or just a cool idea",
            points: 1,
          },
          {
            id: "d",
            label: "Some investors just like to interrupt to assert dominance — don't read into it",
            points: 0,
          },
        ],
      },
      // ── Q6: Investor Fluency (Mirror) ──
      {
        id: "q6_fluency",
        dimension: "investorFluency",
        text: "An investor you pitched two weeks ago emails: \"Thanks for coming in. We're going to pass for now, but please keep us updated on your progress.\" What do you do?",
        options: [
          {
            id: "a",
            label: "Move on — a pass is a pass, don't waste energy on dead leads",
            points: 0,
          },
          {
            id: "b",
            label: "Reply asking what specifically made them pass — you want honest feedback",
            points: 0,
          },
          {
            id: "c",
            label: "Send a gracious two-line reply and add them to your quarterly investor update list",
            points: 2,
          },
          {
            id: "d",
            label: "Reply with new data points or milestones that might address their concerns",
            points: 1,
          },
        ],
      },
      // ── Q7: Self-Awareness (Mirror) ──
      {
        id: "q7_awareness",
        dimension: "selfAwareness",
        text: "A trusted advisor watches your practice pitch and says: \"I think you're trying to say too much. It's getting overwhelming.\" Your honest gut reaction is:",
        options: [
          {
            id: "a",
            label: "They may have a point about pacing, but the substance is solid — it's a delivery issue",
            points: 1,
          },
          {
            id: "b",
            label: "They're probably right — you've been struggling to cut things and this confirms you need to simplify",
            points: 2,
          },
          {
            id: "c",
            label: "You'll trim a bit, but you know which parts are non-negotiable",
            points: 0,
          },
          {
            id: "d",
            label: "You appreciate it, but they're not an investor — they might not know what actually matters in a pitch",
            points: 0,
          },
        ],
      },
      // ── Q8: Persuasion Instincts (Aspirational close) ──
      {
        id: "q8_persuasion",
        dimension: "persuasionInstincts",
        text: "An investor at a coffee meeting says \"Tell me about what you're working on.\" What do you do?",
        options: [
          {
            id: "a",
            label: "Walk them through the full picture — problem, solution, market, traction — so they have complete context",
            points: 0,
          },
          {
            id: "b",
            label: "Give a tight 30-second version and stop — let them decide what to ask about next",
            points: 2,
          },
          {
            id: "c",
            label: "Ask what they typically invest in so you can tailor your answer",
            points: 1,
          },
          {
            id: "d",
            label: "Give the high-level concept but caveat that you're still early",
            points: 0,
          },
        ],
      },
    ],
  },

  // ─── Tier Definitions ───────────────────────────────────
  tiers: [
    {
      id: "so-close",
      name: "So Close It Hurts",
      minRaw: 10,
      themeColor: "tierHigh",
      description:
        "You're doing a lot right, which makes this all the more frustrating: the gaps that remain are costing you disproportionately. At this level, investors aren't confused by you — they're almost there. The difference between \"interesting, keep us posted\" and a term sheet is smaller than you think.",
    },
    {
      id: "pieces-there",
      name: "The Pieces Are There",
      minRaw: 4,
      themeColor: "tierMid",
      description:
        "You have real strengths — but also some important blind spots. You've got confidence and conviction in what you're building. The problem is, nobody in your world is going to tell you where the gaps are. Investors pass politely, friends cheerlead, and mentors hedge. So the gaps persist — not because you can't fix them, but because they're really hard to pinpoint on your own.",
    },
    {
      id: "lost-noise",
      name: "Lost in the Noise",
      minRaw: 0,
      themeColor: "tierLow",
      description:
        "Right now, investors are hearing your pitch — but they're not hearing what you're trying to say. Your message is getting lost in the same sea of pitches that all sound the same. The good news: this isn't about your idea. It's about how you're presenting it. And that's fixable.",
    },
  ],

  // ─── Dimension Display Copy ─────────────────────────────
  dimensions: {
    clarity: {
      label: "Clarity",
      levels: {
        2: {
          explanation:
            "Investors are working too hard to understand what you do. By the time they piece it together, you've lost the room — and they won't tell you why.",
          crackedDoor:
            "Founders who fix this one thing typically see the entire dynamic of their investor meetings shift — often within the next few meetings.",
        },
        3: {
          explanation:
            "You have the building blocks, but your pitch is making investors do assembly work.",
          crackedDoor:
            "The gap between \"they get it eventually\" and \"they get it instantly\" is usually some manageable structural changes, not a complete rewrite.",
        },
        4: {
          explanation:
            "Your core message lands. Investors understand what you do and why it matters — this is a real strength, and the dimension that matters most.",
          crackedDoor:
            "Sharpening this strength can put the finishing touches on how you come across in every investor interaction.",
        },
      },
    },
    investorFluency: {
      label: "Investor Fluency",
      levels: {
        2: {
          explanation:
            "You're reading investor signals based on what they say — but what investors say and what they mean are often two different things.",
          crackedDoor:
            "Once you learn to read these signals accurately, fundraising starts feeling like a completely different process.",
        },
        3: {
          explanation:
            "You understand the basics of how investors operate, but the nuance is missing.",
          crackedDoor:
            "The pattern recognition that separates fluent founders from everyone else is learnable — it's just rarely taught.",
        },
        4: {
          explanation:
            "You read the room well and understand the long game. There's still an edge to sharpen here — but this is a genuine strength.",
          crackedDoor:
            "Founders at this level who master the post-meeting game tend to see their close rates shift meaningfully.",
        },
      },
    },
    selfAwareness: {
      label: "Self-Awareness",
      levels: {
        // No level 2 — Self-Awareness floors at 3/5
        3: {
          explanation:
            "You're open to feedback — but there's a pattern: you hear it, then translate it into something less uncomfortable before acting on it.",
          crackedDoor:
            "Founders who close this gap tend to find that every other part of their fundraise improves — because they finally know what to work on.",
        },
        4: {
          explanation:
            "You can hear hard truths without deflecting. You know the difference between what you want to hear and what you need to hear.",
          crackedDoor:
            "This is the edge that compounds over time. Every investor meeting becomes a data point you can actually use.",
        },
      },
    },
    persuasionInstincts: {
      label: "Persuasion Instincts",
      levels: {
        2: {
          explanation:
            "Your instinct is to explain more, cover more, prove more. But right now, you're pushing information at investors instead of making them want to pull it from you.",
          crackedDoor:
            "The shift from push to pull is one of the most dramatic transformations in pitch coaching — founders who make it often can't believe they ever pitched the old way.",
        },
        3: {
          explanation:
            "You have good instincts — you know the deck isn't the pitch. But in pressure moments, you may revert to over-explaining.",
          crackedDoor:
            "Knowing the right move and making it every time are two different skills. The second one is where the real difference gets made.",
        },
        4: {
          explanation:
            "You have strong instincts for how to engage investors. You control the room without dominating it — and you know when to stop. This is the hardest skill to develop.",
          crackedDoor:
            "Most founders spend years trying to develop this. The next step is making sure the rest of your pitch lives up to it.",
        },
      },
    },
  },

  // ─── Email Gate CTA ─────────────────────────────────────
  emailGate: {
    headline: "Get your personalized action plan",
    subline:
      "We'll send you specific next steps for each dimension — starting with the one holding you back most.",
    buttonText: "Get My Action Plan",
    waitlistBridge:
      "We're building a course to help founders close these gaps.",
    waitlistLabel: "Get early access when it launches",
    disclaimer:
      "By submitting, you agree to receive your personalized action plan and occasional insights from Humble Conviction. Unsubscribe anytime.",
  },

  // ─── Waitlist / Course ──────────────────────────────────
  waitlist: {
    courseName: "Pitch Better, Get Funded Faster",
  },
}

export default FUNNEL
