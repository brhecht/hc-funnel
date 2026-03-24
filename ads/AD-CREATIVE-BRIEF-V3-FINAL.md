# Ad Creative Brief — V3 FINAL
*March 23, 2026 — Updated March 24 with overlay/CTA refinements from Brian's review of Nico's Canva builds*

> **THIS IS THE CANONICAL BRIEF.** All previous versions are superseded. Do not reference `CREATIVE-BRIEF.md` or `REVISED-CREATIVE-BRIEF-2026-03-18.md` — they contain stale copy and specs. If anything conflicts with this document, this document wins.

---

## What Changed From V2 (and Why)

The March 18 revised brief was the execution doc, but a compliance review on March 19 made several material changes that were never patched back into it. This created a gap between what we decided and what the brief instructed. This V3 consolidates everything — the original brief, the compliance review fixes, the overlay text updates, and the CTA alignment — into one clean document.

**Key changes from V2:**

| Element | V2 Brief Said | V3 Says | Why |
|---------|--------------|---------|-----|
| C2 overlay (line 2) | "The investors already decided." | "The investor tuned out five minutes ago." | Updated for sharper contrast and specificity |
| In-image CTA (all) | "Take the Assessment" | "See What Investors See" | "Assessment" is jargon — not mentioned in overlay or primary text. CTA must echo the benefit, not a feature word. Matches the landing page CTA. |
| Headline placement | Not addressed (AdCreative.ai baked it into image) | **Headline stays OUT of the image.** Goes in Meta Ads Manager headline field only. | Baking the headline into the image creates 3 competing text layers (overlay + headline + CTA). The image should carry exactly 2 layers: overlay text + CTA button. |
| C1 headline | "What Investors See When You Pitch — But Won't Tell You" (54 chars) | "What Investors See (But Won't Say)" (34 chars) | Old version truncates on Instagram mobile (40-char limit) |
| C2 headline | "Most Founders Misread Investor Signals. Do You?" (47 chars) | "Do You Misread Investor Signals?" (32 chars) | Same — truncation fix |
| C4 headline | "See What Investors See. 4 Scores. 3 Minutes." | "See What Investors Really See" (28 chars) | Same — truncation fix |
| C4 overlay | "2,500 founder pitches reviewed." | "2,500+ founder pitches analyzed." | Added "+", changed "reviewed" → "analyzed" for consistency |
| C1 primary text | "Probably more than once." in first 125 chars | Moved below the fold | Was 126 chars — 1 over Instagram's truncation gate |
| Credibility language | Mixed: "reviewed" / "coached" / "analyzed" | "analyzed" everywhere | Universal consistency across ads + landing page |
| Build tool | AdCreative.ai | **Canva** | AdCreative.ai's template engine controls font, weight, sizing, and positioning — producing weak typography and cramped layouts. Final creatives must be built manually in Canva for full control. |

---

## Design Spec — EXACT (For All Concepts)

### Typography

| Element | Font | Weight | Size | Color |
|---------|------|--------|------|-------|
| Overlay line 1 (setup) | Inter | Semi-Bold (600) | 38–42px | #FFFFFF |
| Overlay line 2 (payoff) | Inter | Bold (700) | 46–54px | #FFFFFF |
| CTA button text | Inter | Semi-Bold (600) | 28px | #FFFFFF |

**All text gets a subtle drop shadow:** 2px offset, black at 30-35% opacity. This ensures readability against varied image backgrounds.

### Colors

| Element | Hex | Usage |
|---------|-----|-------|
| Navy | #1A2332 | Gradient wash base, any background fill |
| Coral | #E8845A | CTA button fill |
| White | #FFFFFF | All text, CTA button text |
| Cool White | #F8F9FC | Landing page bg (for reference — not used in ads) |

### Layout

**Image layers (exactly 2 text layers — no more):**
1. **Overlay text** — positioned in the lower 30–35% of the image, left-aligned, 60px margin from left and right edges
2. **CTA button** — centered horizontally, coral fill (#E8845A), rounded corners (6px radius), positioned below overlay text with 30–40px gap

**Gradient wash:** Dark navy (#1A2332) gradient from transparent → ~80% opacity, starting at 40–45% from the bottom of the image, easing in (not linear). The gradient must be strong enough that white text is fully readable against ANY image background.

**What is NOT on the image:**
- No headline (goes in Meta Ads Manager only)
- No HC badge / logo
- No decorative template elements (no geometric swooshes, no borders, no framing chrome)
- No AdCreative.ai template — build from scratch in Canva

### Format Specs

| Format | Dimensions | Use |
|--------|-----------|-----|
| Feed | 1080 × 1350 (4:5) | Primary — more screen real estate on mobile feed |
| Story | 1080 × 1920 (9:16) | Story/Reel placements |

### Visual Reference Comps

Reference comps are in `ads/reference-comps/`. These show the exact positioning, typography, and hierarchy Nico should match:

| File | Concept | Format |
|------|---------|--------|
| `C1-Polite-Pass-Feed.png` | C1: The Polite Pass | Feed (4:5) |
| `C1-Polite-Pass-Story.png` | C1: The Polite Pass | Story (9:16) |
| `C2-Room-You-Cant-Read-Feed.png` | C2: The Room You Can't Read | Feed (4:5) |
| `C2-Room-You-Cant-Read-Story.png` | C2: The Room You Can't Read | Story (9:16) |
| `C4-Built-From-Other-Side-Feed.png` | C4: Built From the Other Side | Feed (4:5) |
| `C4-Built-From-Other-Side-Story.png` | C4: Built From the Other Side | Story (9:16) |

> **Note:** C2 comps use the old reference image (conference room, 3 people) for positioning reference only. Nico should use the **new image Brian sent** (founder facing VC in Patagonia vest) as the actual background. The text positioning, sizing, and gradient spec from the comp still applies.

---

## Concept 1: "The Polite Pass" — Pain Angle

**Image:** Guy in hoodie, hand on forehead, laptop in coffee shop (`phase1-references/Polite Pass.png`)

**Text Overlay (on image):**
```
"We're going to pass."
Sound familiar?
```
- Line 1: Inter Semi-Bold 48px, white — this is the hero line
- Line 2: Inter Regular 32px, slightly muted white (#DCDCDC) — this is the attribution/hook, intentionally understated. Do NOT make it bold or large. It should read as a quiet follow-up to the quote, not a competing headline.

**CTA Button (on image):** `See What Investors See` — coral fill, white text

**Meta Ads Manager Fields:**
- **Headline:** What Investors See (But Won't Say)
- **CTA Button (platform):** Learn More (Meta's fixed set — closest match)

**Primary Text:**
```
"We're going to pass for now, but please keep us updated."

You've gotten this email from an investor.

Probably more than once. Here's what they don't tell you: it's rarely the idea. It's the 2-3 things in how you pitch that make investors hesitate — patterns they see in the first 5 minutes but will never point out.

This free 3-minute assessment shows you what investors actually see when you pitch. 4 scores across the dimensions that matter. Built from 2,500+ pitches analyzed.
```
*Note: First visible line (before "...more") is 99 characters — within Instagram's 125-char gate.*

---

## Concept 2: "The Room You Can't Read" — Dunning-Kruger Angle

**Image:** Founder facing VC in Patagonia vest (the NEW image Brian sent to Nico — NOT the old conference room image in `phase1-references/`)

**Text Overlay (on image):**
```
He thinks the pitch is going well.
The investor is already out.
```
- Line 1: Inter Semi-Bold 38px, white
- Line 2: Inter Bold 48px, white — "already out" echoes Shark Tank's "I'm out" which is culturally loaded for this audience. 28 characters — fits cleanly on one line with proper tracking/letter-spacing.
- **BOTH LINES ARE REQUIRED.** The two-line contrast IS the concept. Line 1 = founder's reality. Line 2 = investor's reality. Without both, the Dunning-Kruger dissonance doesn't land.
- **KERNING NOTE:** Previous version ("The investor tuned out five minutes ago." — 42 chars) was too long for one line at bold weight, causing letters to compress. "The investor is already out." (28 chars) solves this. Ensure letter-spacing is normal/default in Canva — do NOT compress tracking to fit text.

**CTA Button (on image):** `See What Investors See` — coral fill, white text

**Meta Ads Manager Fields:**
- **Headline:** Do You Misread Investor Signals?
- **CTA Button (platform):** Learn More

**Primary Text:**
```
You're in a pitch meeting. The investor says "This is really interesting."

You're thinking: great sign. You're wrong.

"Interesting" means they're figuring out if they need to act now — or can wait and watch from the sideline. It's not a yes. It's not a no. It's a test most founders don't know they're taking.

The signals investors send are almost never what they seem. This free 3-minute assessment scores you on the 4 dimensions investors actually evaluate — including the ones they'll never mention.
```
*First visible line: 117 characters — within gate.*

---

## Concept 4: "Built From the Other Side" — Authority Angle

**Image:** Mentor portrait, bookshelves (`phase1-references/Built From the Other Side.png`)

**Text Overlay (on image):**
```
2,500+ founder pitches analyzed.
See what investors see.
```
- Line 1: Inter Semi-Bold 36px, white
- Line 2: Inter Bold 52px, white

**CTA Button (on image):** `How Do You Score?` — coral fill, white text. NOTE: C4's CTA is intentionally different from C1/C2. The overlay says "See what investors see" so repeating it in the CTA would be redundant. "How Do You Score?" creates curiosity and a personal challenge that drives action.

**Meta Ads Manager Fields:**
- **Headline:** See What Investors Really See
- **CTA Button (platform):** Learn More

**Primary Text:**
```
After 2,500+ founder pitches analyzed, the pattern is always the same:

The best founders don't have better ideas. They understand how investors think.

They know that "interesting" doesn't mean interested. They know when to stop talking. They know the difference between pushing information at an investor and creating pull.

This assessment was built by someone who's raised capital and invested it — to show founders the gaps nobody in their world will point out.
```
*First visible line: 113 characters — within gate.*

**Targeting:** Retargeting audience (people who saw Concepts 1 or 2 but didn't click).

---

## Landing Page Reference (For Continuity Check)

All ads point to: **https://quiz.humbleconviction.com**

| Element | Current LP Copy |
|---------|----------------|
| Headline | Find Out What Investors See — Before They Tell You |
| Subheadline | This 3-minute assessment reveals the patterns investors notice — but will never tell you. |
| Social proof | Based on 2,500+ pitches analyzed by a 4x exited founder and venture investor |
| CTA | See What Investors See |
| Design | Navy text, coral accent, cool-white bg, Inter font |

> **LP social proof update needed:** Currently says "pitches coached" — change to "pitches analyzed" to match all ad copy. (Brian or Nico — code change in `src/pages/Landing.jsx`)

---

## What's Locked (Do Not Change)

- **3 concepts.** Concept 3 (The Shift) is killed for launch.
- **Copy angles** for all 3 concepts — strategic framing, awareness levels, emotional hooks are validated.
- **Text overlay wording** — as specified above for all 3 concepts. Both lines for C2.
- **In-image CTA** — "See What Investors See" (C1, C2) and "How Do You Score?" (C4)
- **Primary text** — as specified above, with truncation compliance confirmed
- **Meta headlines** — shortened versions as specified above (all under 40 chars)
- **Build tool** — Canva. Not AdCreative.ai.
- **Testing strategy** — all 3 concepts run simultaneously, identical targeting/budget. Pre-commit to image replacement for any concept below 25% hook rate after 1,000 impressions.
- **Concept 4 is for retargeting.**

---

## Nico's Task List

### Build in Canva (not AdCreative.ai):

| # | Task | Notes |
|---|------|-------|
| 1 | Create C1 Feed (4:5) and Story (9:16) | Match reference comp layout. Source image: `Polite Pass.png` |
| 2 | Create C2 Feed (4:5) and Story (9:16) | Match reference comp layout. Source image: the new image Brian sent (founder + VC in Patagonia vest). **Both overlay lines required.** |
| 3 | Create C4 Feed (4:5) and Story (9:16) | Match reference comp layout. Source image: `Built From the Other Side.png` |
| 4 | Export all 6 at full resolution (1080×1350 and 1080×1920) | PNG, maximum quality |

### Meta Ads Manager Setup:

| # | Task | Notes |
|---|------|-------|
| 5 | Upload 6 creatives to Meta Ads Manager | 3 concepts × 2 formats each |
| 6 | Set headlines in Meta headline field | C1: "What Investors See (But Won't Say)" / C2: "Do You Misread Investor Signals?" / C4: "See What Investors Really See" |
| 7 | Set primary text per concept | Copy specified above |
| 8 | Set platform CTA button | "Learn More" for all (closest to "See What Investors See" in Meta's fixed set) |
| 9 | Set destination URL | https://quiz.humbleconviction.com (with UTMs per concept) |

### Also:

| # | Task | Notes |
|---|------|-------|
| 10 | Update LP social proof | "pitches coached" → "pitches analyzed" in `src/pages/Landing.jsx` |

---

## Reference Documents (Historical — Do Not Use for Execution)

- ~~`ads/CREATIVE-BRIEF.md`~~ — Original March 16 brief. **SUPERSEDED.**
- ~~`ads/REVISED-CREATIVE-BRIEF-2026-03-18.md`~~ — March 18 revision. **SUPERSEDED.**
- `research/ad-system-audit-march-2026.md` — Expert audit (strategic analysis, still valid for context)
- `research/ad-copy-final-review-march-2026.md` — Compliance review (findings incorporated into this brief)
- `ads/reference-comps/` — Visual reference comps (use these)
