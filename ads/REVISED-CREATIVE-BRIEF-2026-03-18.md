# Revised Ad Creative Brief — March 18, 2026
*Supersedes: `CREATIVE-BRIEF.md` (March 16, 2026)*
*Status: In progress — images pending for Concept 2, copy updates pending for all*

## What Changed and Why

A full expert audit of the ad → landing page system (see `research/ad-system-audit-march-2026.md`) evaluated all 4 original concepts against current research. Key findings:

1. **Ad copy is strong across all concepts.** Strategic thinking, awareness-level mapping, identity signaling, and 125-char truncation compliance all check out. Minor copy updates needed (see below).
2. **Images are the weak link.** All 4 are AI-generated. Concepts 1 and 4 are usable. Concepts 2 and 3 have visible AI artifacts that risk undermining credibility with a tech-savvy founder audience. Research: authentic imagery outperforms stock/AI by 28% on engagement (Marketing LTB 2025).
3. **Concept 3 ("The Shift") is killed for launch.** The "power flip" concept is nearly impossible to convey in a still image. The text overlay does all the work. 3 strong concepts > 3 strong + 1 weak. Can revisit for creative rotation in 2-3 weeks.
4. **Landing page was updated in this session.** AppSwitcher removed, social proof added, CTA changed to "See What Investors See," subheadline shortened, mobile layout tightened. Ads need to match the updated LP.
5. **Visual continuity gap between ads and landing page.** Ads use AdCreative.ai's blue template. LP uses navy (#1A2332) / coral (#E8845A) / cool-white (#F8F9FC). Needs alignment.

---

## Active Concepts (3 of 4)

### Concept 1: "The Polite Pass" — Pain Angle
**Status: SHIP with copy updates**
- **Image:** KEEP. Guy in hoodie, hand on forehead, laptop in coffee shop. Minimal AI artifacts. Emotional moment reads clearly.
- **Text overlay:** KEEP. `"We're going to pass." — every investor`
- **Copy:** UPDATE (see Copy Updates section below)
- **Formats:** Story (9:16) done. Need Feed (4:5) version.

### Concept 2: "The Room You Can't Read" — Dunning-Kruger Angle
**Status: NEW IMAGE NEEDED. Copy ships as-is after updates.**
- **Image:** REPLACE. Conference room scene has visible face smoothing and uncanny postures. This is the strongest concept (predicted best for cold traffic) — the image is holding it back.
- **Text overlay:** KEEP. `He thinks the pitch is going well. The investors already decided.`
- **Copy:** UPDATE (see Copy Updates section below)
- **Formats:** Story (9:16) + Feed (4:5) — both need regeneration with new image.
- **New image guidance:** See "Image Prompts for Concept 2" section below.

### Concept 3: "The Shift" — Aspiration Angle
**Status: KILLED for launch. Revisit for rotation in 2-3 weeks.**
- Reason: The "power flip" is an abstract concept that doesn't land in a still image. The café image looks like two friends having coffee. Text overlay does all the work. With only 3 concepts, each gets more impressions and we reach statistical significance faster.

### Concept 4: "Built From the Other Side" — Authority Angle
**Status: SHIP with copy updates**
- **Image:** KEEP. Mentor portrait. Simple composition, minimal AI artifacts, authority reads immediately.
- **Text overlay:** KEEP. `2,500 founder pitches reviewed. See what investors see.`
- **Copy:** UPDATE (see Copy Updates section below)
- **Formats:** Story (9:16) + Feed (4:5) done.
- **Targeting:** Retargeting audience (people who saw Concept 1 or 2 but didn't click).

---

## Copy Updates (All Concepts)

These changes apply to ALL active concepts. The copy structure and angles are locked — only these specific strings change:

| Find | Replace | Reason |
|------|---------|--------|
| `2-minute assessment` | `3-minute assessment` | Landing page updated to "3-minute" based on research (actual quiz time is 3-4 min post-trim; "2-minute" creates a violation effect) |
| `2,500+ real pitch reviews` | `2,500+ pitches coached` | Consistency with landing page social proof line |
| `Built from 2,500+ real pitch reviews` | `Built from 2,500+ pitches coached` | Same |
| `https://hc-funnel.vercel.app` | `https://humbleconviction.com` | Domain migration (Nico — see Technical Tasks) |

**Concept 4 headline also needs update:**
- Current: `See What Investors See. 4 Scores. 2 Minutes.`
- Updated: `See What Investors See. 4 Scores. 3 Minutes.`

---

## Image Prompts for Concept 2

Brian will generate these in Nano Banana (or another image generator) and select the best option. Goal: convey "founder thinks it's going well, investors have already decided" while minimizing AI face artifacts.

### Prompt 2A: Over-the-shoulder (RECOMMENDED — try first)
> Photorealistic, editorial style. Over-the-shoulder shot from behind a young male founder in a navy crewneck, sitting at a conference table. We see the back of his head and one gesturing hand. Across the table, two investors — a woman in a blazer looking at her phone, and a man leaning back with arms crossed, looking away. Soft natural office lighting, shallow depth of field on the investors. The founder's energy is animated; the investors' body language screams disengagement. Shot on 35mm, slight grain.

Why: Avoids the biggest AI tell (founder's face not visible). Puts the viewer in the founder's seat. More cinematic. Works better on mobile.

### Prompt 2B: Investor focus (founder blurred in foreground)
> Photorealistic, editorial photography. Conference room. Sharp focus on two investors sitting at a round table — one checking phone, one with chin in hand, bored expression. In the blurred foreground, the back/side of a young man's head and shoulder, clearly mid-presentation. Natural window light from the left. The composition tells the story: the person talking doesn't see what we see. Shot on 85mm portrait lens, shallow depth of field.

Why: Investors are the focal point. Founder is out of focus (eliminates face quality issues). The composition itself tells the Dunning-Kruger story.

### Prompt 2C: Objects only (fallback — no faces)
> Photorealistic, editorial style. Close-up of a conference table surface. An open laptop showing a pitch deck slide (blurred/unreadable). Next to it, a coffee cup and a printed agenda. Across the table, two phones face-down and a closed notebook — the investors have mentally checked out. No people visible, just the objects that tell the story. Warm overhead lighting, shallow depth of field. The stillness conveys the disconnect.

Why: Zero face risk. Depends entirely on text overlay to convey the concept. Use only if face-based prompts produce unacceptable results.

**Selection criteria:** Pick the image where (a) no face looks AI-generated on close inspection, (b) the body language/composition sells the disconnect between founder energy and investor disengagement, and (c) the image works at phone-screen size (details must read at thumbnail scale).

---

## Visual Continuity Spec (For Nico)

The current ads use AdCreative.ai's blue template system. The landing page uses the HC design system. These need to match.

### HC Design System Colors (use these for ad templates)
| Element | Color | Hex |
|---------|-------|-----|
| Primary text | Navy | `#1A2332` |
| Accent / CTA | Coral | `#E8845A` |
| Background | Cool white | `#F8F9FC` |
| Muted text | Slate | `#5A6578` |
| Card background | White | `#FFFFFF` |
| Border | Light gray | `rgba(26, 35, 50, 0.08)` |

### What to change on the ad images
- Replace blue geometric background elements with navy (`#1A2332`) or remove them
- HC badge in top-left: keep, but ensure it uses the coral (`#E8845A`) background with white "HC" (matching the app)
- Text overlay: white text on dark gradient wash is fine — just make sure any colored accents use coral, not blue
- CTA button embedded in image (if kept): coral background (`#E8845A`) with white text

### What NOT to change
- The photograph/image itself (except Concept 2 which gets a new image)
- The text overlay wording
- The overall 9:16 and 4:5 formats

If AdCreative.ai doesn't allow color customization of the template elements, Nico should rebuild the template framing in Figma or Canva using the HC palette above. The photo, overlay text, and CTA badge are the content; the template chrome around them is what needs to match.

---

## Landing Page State (Current — Updated March 18, 2026)

For reference when checking ad-to-LP continuity:

- **URL:** hc-funnel.vercel.app (migrating to humbleconviction.com — Nico's task)
- **Headline:** "Find Out What Investors See — Before They Tell You"
- **Subheadline:** "This 3-minute assessment reveals the patterns investors notice — but will never tell you."
- **Social proof:** "Based on 2,500+ pitches coached by a 4x exited founder and venture investor"
- **CTA:** "See What Investors See →"
- **Design:** Navy text, coral accent, cool-white bg, Inter font. No AppSwitcher. Feature cards below the fold.

---

## Task List

### Brian's Tasks (Creative)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Generate new images for Concept 2 using prompts above | TODO | Try Prompt 2A first. Run 3-5 variations. Select best. |
| 2 | Review selected Concept 2 image with Claude | TODO | Upload to Cowork session for evaluation |
| 3 | Approve final Concept 2 image | TODO | Must pass: no AI face artifacts, body language sells disconnect, reads at phone size |
| 4 | Decide: does Concept 1 image need regeneration too? | TODO | Current image is usable but not perfect. Low priority — only if time permits |
| 5 | Final approve all 3 concepts before Nico builds in Meta | TODO | Review copy updates + new image + color-aligned templates as a package |

### Nico's Tasks (Technical / Production)

**Can do NOW (doesn't depend on Brian's creative decisions):**

| # | Task | Status | Notes |
|---|------|--------|-------|
| N1 | Update ad copy: "2-minute" → "3-minute" in all 3 concepts | TODO | Find-replace in all primary text |
| N2 | Update ad copy: "real pitch reviews" → "pitches coached" | TODO | Concepts 1 and 4 |
| N3 | Update Concept 4 headline: "2 Minutes" → "3 Minutes" | TODO | |
| N4 | Wire humbleconviction.com domain to hc-funnel Vercel project | TODO | Options: subdomain (quiz.humbleconviction.com → CNAME) or path-based. Brian to decide preference. |
| N5 | Update URL in all ad copy from hc-funnel.vercel.app → new domain | TODO | After N4 is done |
| N6 | Create Feed (4:5) version of Concept 1 | TODO | Story (9:16) exists; Feed version needed |
| N7 | Spec HC color palette into ad templates (see Visual Continuity Spec above) | TODO | Replace AdCreative.ai blue with HC navy/coral. Rebuild in Figma/Canva if AdCreative.ai doesn't allow color customization. |

**WAIT for Brian's creative decisions:**

| # | Task | Status | Blocked on |
|---|------|--------|------------|
| N8 | Apply text overlay to new Concept 2 image | BLOCKED | Brian selecting new image (Task 3) |
| N9 | Generate Story (9:16) + Feed (4:5) versions of Concept 2 with new image | BLOCKED | N8 |
| N10 | Final assembly of all 3 concepts in Meta Ads Manager | BLOCKED | Brian final approval (Task 5) |

---

## What's Locked (Do Not Change)

- **3 concepts, not 4.** Concept 3 (The Shift) is killed for launch.
- **Copy angles for all 3 concepts.** The strategic framing, awareness levels, and emotional hooks are validated by expert audit.
- **Text overlay wording for Concepts 1 and 4.** These tested well against the research.
- **Text overlay wording for Concept 2.** "He thinks the pitch is going well. The investors already decided." — both lines stay.
- **Primary text structure** — first 125 chars hook, then story, then CTA. Validated.
- **CTA buttons** — "Take the Assessment" (Concepts 1, 4). Concept 2 also "Take the Assessment."
- **Testing strategy** — all 3 concepts run simultaneously, identical targeting/budget. Hook rate target: 30-40%. Hold rate target: 25%+. Pre-commit to image replacement for any concept below 25% hook rate after 1,000 impressions.
- **Concept 4 is for retargeting** — runs against people who saw Concepts 1 or 2 but didn't click.

## What's Open (Decisions Still Needed)

- Brian's selection of new Concept 2 image
- Whether Concept 1's image is "good enough" or worth regenerating (Brian's call, low priority)
- Domain: subdomain (quiz.humbleconviction.com) vs path-based (humbleconviction.com/assessment)
- Whether to request Feed (4:5) versions for Concepts 1 and 2, or run Story-only initially
- Meta campaign structure: single campaign with 3 ad sets? Or separate campaigns for cold (1+2) and retargeting (4)?

---

## Reference Documents

- **Original creative brief:** `hc-funnel/ads/CREATIVE-BRIEF.md`
- **Nano Banana prompts (original):** `hc-funnel/ads/NANO-BANANA-PROMPTS.md`
- **Reference images (original):** `hc-funnel/ads/phase1-references/`
- **Ad system audit (expert research):** `hc-funnel/research/ad-system-audit-march-2026.md`
- **Landing page audit:** `hc-funnel/research/landing-page-audit-march-2026.md`
- **Quiz design audit:** `hc-funnel/research/quiz-design-audit-march-2026.md`
- **Quiz substance audit:** `hc-funnel/research/quiz-substance-audit-march-2026.md`
- **Results page audit:** `hc-funnel/research/results-page-audit-march-2026.md`
- **Autoresponder email audit:** `hc-funnel/research/autoresponder-email-audit-march-2026.md`
