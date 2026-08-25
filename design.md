# Rehaboth Steam — Design System

A warm, tactile, editorial garment-care app. Cream paper surfaces, soft floating cards, a serif display voice, and a single iridescent "aura" orb as the only bold visual gesture. Everything else is quiet.

---

## 1. Design principles

1. **Paper, not glass.** Backgrounds read as warm pressed paper (radial peach → cream), never white or grey.
2. **One accent per screen.** The aura orb (conic gradient) is the hero element. Nothing else competes.
3. **Editorial hierarchy.** Serif display for names and numbers; sans for labels, prices and actions.
4. **Soft geometry.** Large radii (24px cards, full-round controls), 1px hairline borders, diffuse low-opacity shadows.
5. **Subtraction.** No dual CTAs where one is enough, no "trusted by" filler, no decorative icon grids, no dark-mode toggle.
6. **Mobile-first frame.** All screens are composed inside a 430px column, centered on larger viewports.

---

## 2. Color

Defined as `oklch` tokens in `src/styles.css` (`:root`), mapped to Tailwind utilities via `@theme inline`.

| Token | oklch | Approx hex | Role |
| --- | --- | --- | --- |
| `--background` | `oklch(0.973 0.014 84.5)` | `#f8f3ea` | App canvas (cream) |
| `--foreground` | `oklch(0.26 0.023 45)` | `#3a3128` | Primary text (warm espresso) |
| `--card` | `oklch(0.995 0.005 90)` | `#fffdf9` | Card / sheet surface |
| `--primary` | `oklch(0.66 0.11 42)` | `#c1774f` | Prices, primary CTA, notification dot |
| `--primary-foreground` | `oklch(0.99 0.008 85)` | `#fffaf4` | Text on primary |
| `--secondary` / `--accent` | `oklch(0.945 0.024 78)` / `oklch(0.9 0.045 62)` | `#f2e7d8` / `#eeddc6` | Icon chips, session CTA bar, active tab |
| `--muted-foreground` | `oklch(0.56 0.028 55)` | `#8b8175` | Labels, captions, meta |
| `--border` / `--input` | `oklch(0.905 0.018 80)` | `#ece3d6` | Hairlines |
| `--ring` | `oklch(0.66 0.11 42)` | `#c1774f` | Focus ring |

### Composite tokens

```css
--gradient-warm: radial-gradient(120% 90% at 50% 22%,
  oklch(0.93 0.055 66) 0%, oklch(0.973 0.014 84.5) 62%);

--gradient-aura: conic-gradient(from 210deg,
  oklch(0.72 0.14 40), oklch(0.78 0.11 300),
  oklch(0.85 0.09 250), oklch(0.9 0.07 70), oklch(0.72 0.14 40));

--shadow-soft: 0 18px 40px -24px oklch(0.45 0.06 50 / 0.35);
--shadow-lift: 0 24px 60px -28px oklch(0.4 0.07 45 / 0.45);
```

**Rules:** never hardcode `text-white`, `bg-black`, or hex values in components — use semantic tokens. The warm gradient is `background-attachment: fixed` so scrolling feels like sliding paper under a fixed light source.

---

## 3. Typography

Loaded via `<link>` in `src/routes/__root.tsx` (never `@import` in CSS).

| Family | Token | Weights | Use |
| --- | --- | --- | --- |
| **Fraunces** (variable serif) | `--font-display` | 300 / 400 / 500 | `h1`–`h3`, big numerals, price figures |
| **Manrope** | `--font-body` | 400 / 500 / 600 / 700 | Body, labels, buttons, nav |

### Scale as used

| Element | Size | Weight / family | Tracking |
| --- | --- | --- | --- |
| Greeting `h1` (home) | 32px / 1.15 | Fraunces 400 | `-0.02em` |
| Product `h1` (bag) | 30px | Fraunces 400 | `-0.02em` |
| Card title `h2` | 24px | Fraunces 400 | `-0.02em` |
| Section title `h2` | 20px | Fraunces 400 | `-0.02em` |
| Activity counters | 48px / 1 | Fraunces 400 | tight |
| Price figure (bag) | 36px | Fraunces 400 | tight |
| Tile / list title | 14px | Manrope 600 | tight |
| Body & CTA label | 14px | Manrope 600 | tight |
| Meta / caption | 12px | Manrope 400 | normal, 1.5 line-height |
| Eyebrow (`RS-48721`, `SERVICE STANDARDS`) | 11px | Manrope 500 uppercase | `0.28–0.30em` |
| Points unit (`pts`), `view all` | 10–11px | Manrope 500 uppercase | `0.16–0.18em` |

**Rules:** headings are never bold — weight comes from size and the serif itself. Uppercase is reserved for eyebrows and micro-labels, always widely tracked. Number pairs use one live value and one faded (`opacity ~0.5`) value for context.

---

## 4. Layout & spacing

- **Frame:** `max-width: 430px`, `padding: 32px 24px 128px` (bottom padding clears the floating tab bar).
- **Vertical rhythm:** 4/8px base. Section gaps: `32px` between blocks, `40px` before a new titled section, `16px` from section head to content.
- **Grid:** service tiles are a strict 2-column grid with `16px` gutters. Two rows, four tiles — never three or six.
- **Radii:** `--radius: 1.5rem` (24px) for cards; `16px` for icon chips; `999px` for pills, icon buttons, CTAs and the tab bar.
- **Borders:** universal 1px hairline `oklch(0.88 0.02 78 / 0.7)` — utility `.hairline`.
- **Elevation:** two levels only — `--shadow-soft` for resting cards, `--shadow-lift` for the floating tab bar.

### Custom utilities (`src/styles.css`)

| Utility | Purpose |
| --- | --- |
| `screen-warm` | Fixed warm radial page background |
| `card-soft` | Card surface + 24px radius + soft shadow |
| `hairline` | 1px warm border |
| `aura-orb` | Conic gradient, blurred, fully round |

---

## 5. Components

### TopBar
Left group: 44px round icon button (grid `⊞` on home, chevron-left on detail) + points pill (`🏆 780 PTS`). Right group: notification button with a 8px primary dot at top-right + 44px avatar chip. All chips share `bg-card/80 + hairline + rounded-full`.

### Summary row
`01` | divider | `04` (faded) | two-line 12px label | calendar icon button pushed right with `margin-left: auto`.

### Session card
Rounded 24px card, `overflow: hidden`. Body holds the serif title, 12px meta line (`Ironing & Finishing • #ST-9482`), and a two-stat row split by a 1px vertical divider. The aura orb sits absolutely at `top: 32px; right: 16px`, 96px, `opacity 0.8`, bleeding behind the title. A full-bleed secondary-tinted CTA bar (`Start Today's Session →`) is welded to the card bottom — no gap, no separate button.

### Service tile
Icon chip (48px, 16px radius, secondary fill) top-left, outline heart top-right. Title 14/600, subtitle 12px muted, then a foot row: primary-colored price left, `⭐ rating` muted right. Tiles that navigate are `<Link>`s; the rest are static cards with identical styling.

### Product hero (bag)
208px square containing the full-bleed aura orb (`opacity 0.7`) with a 128px round card puck centered on top holding the product glyph. Below: tracked eyebrow ID, serif name, `⭐ 4.8 Rating`.

### Price card
Centered card: eyebrow (`SIGNATURE SMART BAG`), serif line (`Lifetime garment care token`), 36px serif price in primary.

### Standards list
Three cards stacked with 12px gaps: 44px emoji chip + title (14/600) + 12px muted description. Followed by a small info note with a 3.5px inline icon.

### Buttons
- **Primary:** full-round, primary fill, `padding: 16px 24px`, 14/600, label + arrow, `flex: 1`. Hover: `opacity 0.9`.
- **Secondary:** full-round, card fill, hairline border, same padding/type.
- **Card CTA bar:** full-width, secondary fill, `justify-between` with a trailing arrow. Hover: accent fill.

### Tab bar
Fixed, 20px from bottom, `min(340px, 100% - 48px)` wide, pill-shaped, `bg-card/90` with `backdrop-blur-xl`, hairline, `--shadow-lift`. Four 44px targets — home, services (globe), sessions (calendar), settings (sliders) — 1.6 stroke Lucide icons. Active tab: secondary fill + foreground color; inactive: muted, foreground on hover.

---

## 6. Iconography & imagery

- **Lucide React** for structural icons at `strokeWidth 1.6` (1.8 for arrows). Sizes: 20px nav/header, 16px inline, 14px micro.
- **Emoji** used deliberately as content glyphs (🏆 🔔 🗓️ 📦 💼 🏛️ 🔐 🔒 📡 🌿) — they carry the reference sheet's playful-premium tone. Always seated inside a secondary-filled chip, never loose on the canvas.
- **No stock photography.** The aura orb is the only illustrative element; product identity comes from the glyph puck.

---

## 7. Motion & interaction

- Transitions are limited to `color` / `background-color` / `opacity` at default duration. No entrance animations, parallax, or per-element fade-ins.
- Hover states: primary CTA dims slightly; card CTA bar warms to accent; nav icons shift from muted to foreground.
- Focus: `--ring` (primary) via default shadcn focus styling — never removed.
- The fixed background gradient supplies the only sense of depth during scroll.

---

## 8. Screens & flow

```text
/  (Home — Today's Summary)
│   TopBar → Greeting → Activity counters → Session card → Services grid
│
└── tap "Signature Smart Bag" tile ──► /bag  (Product / Nav page)
        TopBar (back chevron) → Aura hero → Price card
        → Service standards → Add to Cart / Secure Bag
    back chevron or Home tab ──► /
```

Flow is intentionally two screens deep with no interstitials. The bag tile is the only navigating tile; the tab bar's Services entry mirrors that destination so the detail screen is always one tap away.

---

## 9. Accessibility

- Body text `#3a3128` on `#f8f3ea` ≈ 11:1 contrast; muted `#8b8175` used only at 11–12px labels, never for essential prose.
- Every icon-only control carries `aria-label`; tab bar links expose `aria-current` via router `data-status`.
- Touch targets are 44px minimum.
- Emoji sit alongside text labels, so meaning never depends on glyph rendering.

---

## 10. Implementation map

| Concern | File |
| --- | --- |
| Tokens, utilities, base layer | `src/styles.css` |
| Fonts, global meta | `src/routes/__root.tsx` |
| Shell frame, TopBar, tab bar | `src/components/AppShell.tsx` |
| Home screen | `src/routes/index.tsx` |
| Product screen | `src/routes/bag.tsx` |
| Standalone HTML/CSS reference | `public/design/index.html`, `bag.html`, `styles.css` |

Static export mirrors the app one-to-one with plain hex equivalents of every token, for handoff outside React.
