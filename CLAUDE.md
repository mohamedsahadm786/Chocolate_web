# CLOUD.md

## PROJECT STATUS

* Project: **NOIR & NOSTALGIE (Luxury Chocolate Website)**
* Stack: React + Vite + TailwindCSS + GSAP + Framer Motion + Lenis + React Router
* Status: **Fully built (v1 complete)**
* Purpose of this session: **Modify / enhance existing codebase (NOT create from scratch)**

---

## WORKING MODE

* This is an **update session**
* Codebase already exists in current directory
* DO NOT recreate structure
* DO NOT rewrite entire files unless explicitly asked
* Apply **targeted, minimal, surgical changes**
* Preserve design system, motion system, and architecture

---

## DESIGN IDENTITY

* Theme: **Luxury / Dark / Cinematic / Nostalgic**
* Mood: **Emotional, slow, memory-driven, premium**
* Keywords: *shadow, gold, silence, memory, craft*

### Colors

* noir: #0a0604
* cocoa: #1a0e0a
* cocoa-soft: #2a1a12
* cocoa-warm: #3d2418
* gold: #c9a961
* gold-bright: #e8c878
* gold-deep: #8a6f3d
* cream: #f5ead4
* cream-mute: #a89880

### Typography

* Display: Fraunces (serif, emotional)
* Sans: Clash Display (branding)
* Body: Inter

---

## CORE FEATURES

* Custom cursor (Framer Motion)
* Smooth scroll (Lenis)
* Scroll animations (GSAP + ScrollTrigger)
* Page transitions (Framer Motion)
* Loader animation (session-based)
* Magnetic buttons
* Grain overlay texture
* Video hero background

---

## ROUTES

* `/` → Home
* `/collections`
* `/craft`
* `/story`
* `/experience`
* `/journal`
* `/contact`

---

## STRUCTURE

src/

* components/

  * layout/
  * ui/
* routes/
* data/
* hooks/
* styles/

public/

* images/
* videos/

---

## CODING RULES

* Keep animations **smooth, subtle, premium**
* Avoid flashy / fast / cheap motion
* Prefer **opacity, translate, scale** over complex transforms
* Maintain **dark + gold contrast**
* Use Tailwind (no inline chaos)
* Reuse components (do not duplicate logic)

---

## VIDEO HANDLING

* Prefer: `/public/videos/*.mp4`
* Avoid external CDN unless specified
* Always ensure fallback behavior

---

## IMPORTANT CONSTRAINTS

* Do NOT break existing layout
* Do NOT remove working features
* Do NOT change routing structure
* Only modify what is requested in prompt that the user will give accordingly.

---

## TASK FLOW

* User will provide **incremental prompts**
* You must:

  * Read current codebase
  * Apply precise updates
  * Return only required changes/code

---

## OUTPUT STYLE

* Minimal explanation
* Focus on code
* No unnecessary rewrites
* Keep responses efficient (token-aware)

---

## GOAL

Evolve current site into a **high-end, immersive, award-level experience**
without breaking existing foundation.
