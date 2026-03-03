/**
 * FUNNEL CONFIG
 *
 * Everything content-specific lives here. To create a new funnel for
 * a different product/course, duplicate this file and swap the values.
 * The components read from this config — no hardcoded copy in JSX.
 */

const FUNNEL = {
  // ─── Brand ───────────────────────────────────────────────
  brand: {
    name: 'Humble Conviction',
    tagline: 'Pitch Better, Get Funded Faster',
    logo: null, // path to logo SVG/PNG when ready
  },

  // ─── Theme (Tailwind classes + CSS vars) ─────────────────
  theme: {
    bg: '#0b0d12',
    accent: '#7c5cff',
    accent2: '#36d399',
    warn: '#fbbf24',
    text: '#e8eaf0',
    muted: '#b3b9c8',
  },

  // ─── Landing Page ────────────────────────────────────────
  landing: {
    headline: 'Is Your Startup Ready to Raise?',
    subheadline: 'Take the 3-minute Founder Assessment and find out where you stand — before investors do.',
    ctaText: 'Start the Assessment',
    ctaLink: '/quiz',
    socialProof: null, // e.g. "Join 500+ founders who've assessed their readiness"
    features: [
      {
        title: 'Know Before You Go',
        description: 'Understand your pitch strengths and blind spots before walking into the room.',
      },
      {
        title: 'Personalized Playbook',
        description: 'Get a custom action plan based on your founder archetype.',
      },
      {
        title: 'Built by Operators',
        description: "Designed by founders who've raised from top-tier VCs.",
      },
    ],
  },

  // ─── Quiz ────────────────────────────────────────────────
  quiz: {
    title: 'Founder Assessment',
    subtitle: 'Answer honestly — this is for you, not for show.',
    questions: [
      // PLACEHOLDER — Brian designs the real questions
      {
        id: 'q1',
        text: 'How would you describe your current fundraising stage?',
        options: [
          { label: "Haven't started yet", value: 'pre', points: { ready: 1, narrative: 1 } },
          { label: 'Exploring / talking to angels', value: 'early', points: { ready: 2, narrative: 2 } },
          { label: 'Actively pitching VCs', value: 'active', points: { ready: 3, narrative: 3 } },
          { label: 'Have a term sheet', value: 'late', points: { ready: 4, narrative: 2 } },
        ],
      },
      {
        id: 'q2',
        text: 'When someone asks "what does your company do?", how confident are you in your answer?',
        options: [
          { label: 'I stumble every time', value: 'low', points: { ready: 1, narrative: 1 } },
          { label: 'Depends on the audience', value: 'mid', points: { ready: 2, narrative: 2 } },
          { label: 'I have a solid pitch', value: 'high', points: { ready: 3, narrative: 3 } },
          { label: 'People repeat it back to me', value: 'elite', points: { ready: 4, narrative: 4 } },
        ],
      },
      // Add more questions here...
    ],
  },

  // ─── Archetypes (mapped from quiz scores) ────────────────
  archetypes: [
    {
      id: 'the-natural',
      name: 'The Natural',
      minScore: 28,
      description: "You're close to investor-ready. A few tweaks to your narrative and you're there.",
      cta: 'Get the advanced playbook',
    },
    {
      id: 'the-builder',
      name: 'The Builder',
      minScore: 18,
      description: "Strong foundations, but your pitch needs sharpening. The story isn't matching the substance yet.",
      cta: 'Learn to tell your story',
    },
    {
      id: 'the-explorer',
      name: 'The Explorer',
      minScore: 0,
      description: "You're early — and that's fine. The founders who prepare before they pitch are the ones who close.",
      cta: 'Start your fundraising prep',
    },
  ],

  // ─── Email / Kit Integration ─────────────────────────────
  email: {
    provider: 'kit', // ConvertKit / Kit
    formId: null,     // Kit form ID — Nico configures this
    tagByArchetype: true, // tag subscribers with their archetype
  },
}

export default FUNNEL
