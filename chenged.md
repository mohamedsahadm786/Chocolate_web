# Session Changes — Noir & Nostalgie

## Loader (`src/components/layout/Loader.jsx`)
- Background: gold → dark noir (`#0a0604`)
- Text color: dark → gold (`#c9a961`)
- Font size doubled: `clamp(1.1rem, 3.6vw, 3.2rem)`, bold (700)
- Single-line forced: `flexWrap: nowrap`, `whiteSpace: nowrap`
- Letter stagger: `0.15 + i × 0.085s` delay, 0.55s duration
- Timing: letters in at 150ms, exit at 3500ms, done at 4650ms
- Chocolate particles: added then removed (user preferred clean)
- Pull reveal — two-panel cinematic wipe:
  - Panel A (dark loader): slides right `x: 0 → 100%` in 0.92s
  - Panel B (cocoa `#1a0e0a`): sweeps in from left `x: -100% → 0` in 1.0s
  - Text leads the pull: moves extra `x: +15%` in 0.68s before container

## Hero (`src/routes/Home.jsx`)
- Layout: centered → editorial split (left / center / right)
- Left: "Taste" (outlined gold stroke) + "the dark." (filled cream)
- Right: "Play" (filled cream) + "the light." (outlined gold stroke)
- Center: `CircularText` SVG — "CRAFTED IN SHADOW · MADE FOR MEMORY ·" rotating on circular path (28s loop)
- Mobile: separate centered stacked layout (`md:hidden`)
- Brand label: subtle `9px` gold/50 text top-left below nav
- EST. 2024: top-center label
- Button unchanged: "Begin the Journey →"

## Navigation (`src/components/layout/Navigation.jsx`)
- Logo: `text-lg` → `text-[13px] tracking-[0.28em]`
- Links: `gap-8 text-xs` → `gap-5 text-[10px]`
- Container padding: `lg:px-24` → `lg:pl-16 lg:pr-10`



 
 