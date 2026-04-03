# Claude Code Context — Ad Creative Tasks (March 19, 2026)

*This file consolidates the final state across all source documents so Claude Code has a single reference.*

## Source of Truth Hierarchy
1. `HANDOFF.md` — latest state, all decisions finalized
2. `research/ad-copy-final-review-march-2026.md` — final copy coherence + Meta compliance check
3. `ads/REVISED-CREATIVE-BRIEF-2026-03-18.md` — base execution doc (some entries stale, see below)

**WARNING:** The revised brief was written BEFORE the final evening session. Some entries in the brief are outdated. When in conflict, HANDOFF.md and ad-copy-final-review win.

---

## Final Locked Copy — All 3 Concepts

### Global Changes (already applied to funnel.js and Results.jsx)
- "2-minute" → "3-minute" ✅ done in code
- "coached"/"reviewed" → **"analyzed"** ✅ done in code (funnel.js line 68, Results.jsx line 376)
- Domain: **quiz.humbleconviction.com** ✅ live (CNAME in GoDaddy → Vercel)
- CTA: "Get My Results" → **"See What Investors See"** ✅ done in code
- Social proof: was null → **"Based on 2,500+ pitches analyzed by a 4x exited founder and venture investor"** ✅ done in code

### Concept 1: "The Polite Pass" — Pain Angle
- **Image:** KEEP (guy in hoodie, coffee shop). File: `phase1-references/Polite Pass.png`
- **Text overlay:** `"We're going to pass." — every investor`
- **Primary text (first 125 chars — UPDATED per final review):**
  `"We're going to pass for now, but please keep us updated." You've gotten this email from an investor.` (99 chars)
  Then after "...more": `Probably more than once.` ← moved here from the first line (was 126 chars, 1 over limit)
- **Full primary text:**
  "We're going to pass for now, but please keep us updated."

  You've gotten this email from an investor.

  Probably more than once. Here's what they don't tell you: it's rarely the idea. It's the 2-3 things in how you pitch that make investors hesitate — patterns they see in the first 5 minutes but will never point out.

  This free 3-minute assessment shows you what investors actually see when you pitch. 4 scores across the dimensions that matter. Built from 2,500+ pitches analyzed.
- **Headline (SHORTENED per final review):** `What Investors See (But Won't Say)` (34 chars)
- **CTA button:** Take the Assessment
- **Formats needed:** Story (9:16) done. Feed (4:5) needed.

### Concept 2: "The Room You Can't Read" — Dunning-Kruger Angle
- **Image:** NEW — founder facing VC in Patagonia vest, arms crossed. Nico has the file.
- **Text overlay (UPDATED per HANDOFF line 77):** `He thinks the pitch is going well. The investor tuned out five minutes ago.`
  - ⚠️ The revised brief still says "The investors already decided." — IGNORE the brief. HANDOFF is final.
- **Primary text (first 125 chars):**
  `You're in a pitch meeting. The investor says "This is really interesting." You're thinking: great sign. You're wrong.` (117 chars)
- **Full primary text:**
  You're in a pitch meeting. The investor says "This is really interesting."

  You're thinking: great sign. You're wrong.

  "Interesting" means they're figuring out if they need to act now — or can wait and watch from the sideline. It's not a yes. It's not a no. It's a test most founders don't know they're taking.

  The signals investors send are almost never what they seem. This free 3-minute assessment scores you on the 4 dimensions investors actually evaluate — including the ones they'll never mention.
- **Headline (SHORTENED per final review):** `Do You Misread Investor Signals?` (32 chars)
- **CTA button:** Take the Assessment
- **Formats needed:** Story (9:16) + Feed (4:5) — both with new image.

### Concept 4: "Built From the Other Side" — Authority Angle
- **Image:** KEEP (mentor portrait). File: `phase1-references/Built From the Other Side.png`
- **Text overlay (UPDATED per HANDOFF line 78 + final review line 86, 123):** `2,500+ founder pitches analyzed. See what investors see.`
  - ⚠️ The revised brief says "2,500 founder pitches reviewed" (no +, says "reviewed"). IGNORE the brief. HANDOFF + final review are final.
- **Primary text (first 125 chars):**
  `After 2,500+ founder pitches analyzed, the pattern is always the same: The best founders don't have better ideas.` (113 chars)
- **Full primary text:**
  After 2,500+ founder pitches analyzed, the pattern is always the same:

  The best founders don't have better ideas. They understand how investors think.

  They know that "interesting" doesn't mean interested. They know when to stop talking. They know the difference between pushing information at an investor and creating pull.

  This assessment was built by someone who's raised capital and invested it — to show founders the gaps nobody in their world will point out.
- **Headline (SHORTENED per final review):** `See What Investors Really See` (28 chars)
- **CTA button:** Take the Assessment
- **Targeting:** Retargeting audience (saw Concepts 1 or 2 but didn't click)
- **Formats:** Story (9:16) + Feed (4:5) done.

---

## Stale Entries in the Revised Brief (Do Not Trust)

| Brief says | Actual final (per HANDOFF + final review) |
|------------|------------------------------------------|
| Concept 2 overlay: "The investors already decided." | "The investor tuned out five minutes ago." |
| Concept 4 overlay: "2,500 founder pitches reviewed" | "2,500+ founder pitches analyzed" |
| Copy updates: "real pitch reviews" → "pitches coached" | Final word is "analyzed" not "coached" |
| LP social proof: "pitches coached" | "pitches analyzed" (already deployed) |
| C1 headline: "What Investors See When You Pitch — But Won't Tell You" | "What Investors See (But Won't Say)" (34 chars) |
| C2 headline: "Most Founders Misread Investor Signals. Do You?" | "Do You Misread Investor Signals?" (32 chars) |
| C4 headline: "See What Investors See. 4 Scores. 3 Minutes." | "See What Investors Really See" (28 chars) |
| Domain: "hc-funnel.vercel.app (migrating)" | quiz.humbleconviction.com (LIVE) |
| Task N4: Wire domain | DONE — quiz.humbleconviction.com already live |

---

## Remaining Technical Tasks for Claude Code

### Already done (DO NOT redo):
- ✅ funnel.js updated (3-minute, CTA, socialProof, subheadline)
- ✅ quiz.humbleconviction.com live
- ✅ Ad copy: 2-min→3-min, reviews→coached (in brief files)
- ✅ AppSwitcher deleted

### Still needs to be done:

1. **Update ad copy to "analyzed"** — The brief files (CREATIVE-BRIEF.md, REVISED-CREATIVE-BRIEF) still say "coached" in some places. The HANDOFF confirms "analyzed" is final everywhere. Search and update:
   - `ads/CREATIVE-BRIEF.md` line 189: "pitches coached" → "pitches analyzed"
   - `ads/CREATIVE-BRIEF.md` line 192: "pitches coached" → "pitches analyzed"
   - Any remaining "coached" references in ad files → "analyzed"

2. **Update URLs in ad copy** — Change `hc-funnel.vercel.app` to `quiz.humbleconviction.com` in:
   - `ads/CREATIVE-BRIEF.md` line 230
   - `ads/REVISED-CREATIVE-BRIEF-2026-03-18.md` (references section, etc.)
   - Any other occurrences

3. **LP social proof consistency check** — `funnel.js` line 68 already says "analyzed" ✅. Verify no remaining "coached" in any .jsx or .js file.

4. **Clean up local file** — Remove `ads/REVISED-CREATIVE-BRIEF-2026-03-18-LOCAL.md` (stale local copy created during git pull conflict)

---

## HC Design System (for ad templates)
| Element | Hex |
|---------|-----|
| Navy (primary text) | #1A2332 |
| Coral (accent/CTA) | #E8845A |
| Cool white (bg) | #F8F9FC |
| Slate (muted text) | #5A6578 |
| White (card bg) | #FFFFFF |
| Light gray (border) | rgba(26, 35, 50, 0.08) |

## Testing Strategy
- 3 concepts run simultaneously, identical targeting/budget
- Hook rate target: 30-40%. Hold rate target: 25%+
- Below 25% hook rate after 1,000 impressions → replace image
- Concept 4 is retargeting only (saw C1 or C2, didn't click)
- Expect creative fatigue at ~2-3 weeks per concept
