# Design System

## Purpose

This document defines the visual system for I Craft Ads before full page implementation. It is a high-fidelity direction, not a page build.

The system should feel premium, direct and commercially focused: matte black, warm white typography, fine editorial grids and restrained use of a warm metallic accent.

## Typography

### Font Families

Required owner-supplied files:

- `SuisseIntlCond.woff2` for display headings.
- `SuisseIntl.woff2` for paragraphs, labels and UI.

Local font path:

- `/public/fonts/SuisseIntlCond.woff2`
- `/public/fonts/SuisseIntl.woff2`

Font loading:

```css
@font-face {
  font-family: "SuisseIntlCond";
  src: url("/fonts/SuisseIntlCond.woff2") format("woff2");
  font-display: swap;
  font-weight: 400 900;
}

@font-face {
  font-family: "SuisseIntl";
  src: url("/fonts/SuisseIntl.woff2") format("woff2");
  font-display: swap;
  font-weight: 400 800;
}
```

### Fallbacks

Use metric-compatible fallbacks to reduce layout shift:

- Display: `"Arial Narrow", "Roboto Condensed", "Helvetica Neue Condensed", Impact, sans-serif`.
- Body/UI: Inter, Arial, Helvetica, system UI, sans-serif.

Recommended token:

```css
--font-display:
  "SuisseIntlCond", "Arial Narrow", "Roboto Condensed", "Helvetica Neue Condensed", Impact,
  sans-serif;
--font-body: "SuisseIntl", Inter, Arial, Helvetica, system-ui, sans-serif;
```

### Type Rules

- Headings use uppercase or near-uppercase sparingly; avoid shouting every heading.
- Letter spacing is `0`, never negative.
- Do not scale type directly with viewport width.
- Use responsive clamps with sensible min/max sizes.
- Body copy should remain calm and readable.

## Design Tokens

### Colours

| Token                 | Value                       | Use                                |
| --------------------- | --------------------------- | ---------------------------------- |
| `--color-black`       | `#050505`                   | Main page canvas                   |
| `--color-black-2`     | `#0A0A0B`                   | Raised panels and section contrast |
| `--color-black-3`     | `#111112`                   | Inputs and embedded UI             |
| `--color-white`       | `#F4EFE7`                   | Primary warm white text            |
| `--color-muted`       | `#AAA39A`                   | Secondary text                     |
| `--color-muted-2`     | `#756F67`                   | Tertiary text                      |
| `--color-line`        | `#25221F`                   | Fine grid lines and borders        |
| `--color-line-soft`   | `rgba(244, 239, 231, 0.10)` | Low-contrast divisions             |
| `--color-accent`      | `#D6A34A`                   | Restrained brand accent            |
| `--color-accent-soft` | `rgba(214, 163, 74, 0.16)`  | Accent surface                     |
| `--color-success`     | `#74B58B`                   | Form success                       |
| `--color-error`       | `#E16E5F`                   | Form error                         |
| `--color-focus`       | `#F4C56B`                   | Keyboard focus                     |

Accent note:

`#D6A34A` is an initial warm metallic accent based on the current brand direction. Final value should be extracted from approved logo files.

[OWNER MUST PROVIDE LOGO AND BRAND COLORS]

### Type Scale

| Token               | Desktop                    | Tablet | Mobile | Use                  |
| ------------------- | -------------------------- | ------ | ------ | -------------------- |
| `--type-hero`       | `clamp(88px, 11vw, 180px)` | `72px` | `54px` | Homepage hero        |
| `--type-page-title` | `clamp(72px, 8vw, 128px)`  | `64px` | `44px` | Service/page H1      |
| `--type-section`    | `clamp(48px, 6vw, 96px)`   | `44px` | `34px` | Section H2           |
| `--type-card-title` | `32px`                     | `28px` | `24px` | Card headings        |
| `--type-kicker`     | `12px`                     | `12px` | `11px` | Eyebrows/labels      |
| `--type-body-lg`    | `22px`                     | `20px` | `18px` | Hero supporting copy |
| `--type-body`       | `17px`                     | `16px` | `16px` | Paragraphs           |
| `--type-small`      | `14px`                     | `14px` | `13px` | Metadata/labels      |
| `--type-micro`      | `12px`                     | `12px` | `12px` | Legal/captions       |

### Line Heights

| Token               | Value  |
| ------------------- | ------ |
| `--leading-display` | `0.88` |
| `--leading-title`   | `0.94` |
| `--leading-tight`   | `1.12` |
| `--leading-body`    | `1.62` |
| `--leading-caption` | `1.42` |

### Spacing

Use a 4px base with editorial section spacing.

| Token        | Value   |
| ------------ | ------- |
| `--space-1`  | `4px`   |
| `--space-2`  | `8px`   |
| `--space-3`  | `12px`  |
| `--space-4`  | `16px`  |
| `--space-5`  | `24px`  |
| `--space-6`  | `32px`  |
| `--space-7`  | `48px`  |
| `--space-8`  | `64px`  |
| `--space-9`  | `96px`  |
| `--space-10` | `128px` |
| `--space-11` | `160px` |

### Grid

Desktop:

- 12 columns.
- 24px gutters.
- Max content width: 1440px.
- Page side padding: 48px to 64px.

Tablet:

- 8 columns.
- 20px gutters.
- Page side padding: 32px.

Mobile:

- 4 columns.
- 16px gutters.
- Page side padding: 20px.

### Container Widths

| Token              | Value    | Use                     |
| ------------------ | -------- | ----------------------- |
| `--container-xs`   | `720px`  | Articles and legal copy |
| `--container-sm`   | `960px`  | Narrow content blocks   |
| `--container-md`   | `1180px` | Standard content        |
| `--container-lg`   | `1440px` | Main page shell         |
| `--container-full` | `100%`   | Full-width bands        |

### Border Radius

Keep surfaces sharp and editorial.

| Token           | Value  | Use              |
| --------------- | ------ | ---------------- |
| `--radius-none` | `0`    | Page sections    |
| `--radius-xs`   | `2px`  | Focus/underlines |
| `--radius-sm`   | `4px`  | Inputs/buttons   |
| `--radius-md`   | `8px`  | Cards and media  |
| `--radius-lg`   | `12px` | Rare modals only |

No pill-shaped buttons unless there is a specific brand reason.

### Borders

| Token             | Value                                |
| ----------------- | ------------------------------------ |
| `--border-fine`   | `1px solid var(--color-line)`        |
| `--border-soft`   | `1px solid var(--color-line-soft)`   |
| `--border-accent` | `1px solid rgba(214, 163, 74, 0.45)` |
| `--border-focus`  | `2px solid var(--color-focus)`       |

### Shadows

Use shadows sparingly because the canvas is matte black.

| Token             | Value                                 |
| ----------------- | ------------------------------------- |
| `--shadow-none`   | `none`                                |
| `--shadow-subtle` | `0 16px 48px rgba(0, 0, 0, 0.28)`     |
| `--shadow-media`  | `0 24px 80px rgba(0, 0, 0, 0.42)`     |
| `--shadow-focus`  | `0 0 0 4px rgba(244, 197, 107, 0.18)` |

### Motion

| Token               | Value                            | Use                   |
| ------------------- | -------------------------------- | --------------------- |
| `--duration-fast`   | `140ms`                          | Hover/focus           |
| `--duration-base`   | `220ms`                          | UI state              |
| `--duration-slow`   | `640ms`                          | Section reveal        |
| `--ease-out`        | `cubic-bezier(0.16, 1, 0.3, 1)`  | Reveals               |
| `--ease-in-out`     | `cubic-bezier(0.65, 0, 0.35, 1)` | Toggles               |
| `--distance-reveal` | `24px`                           | Content reveal offset |

Respect `prefers-reduced-motion`. Animation must never hide semantic content.

### Breakpoints

| Token      | Value    |
| ---------- | -------- |
| `--bp-sm`  | `480px`  |
| `--bp-md`  | `768px`  |
| `--bp-lg`  | `1024px` |
| `--bp-xl`  | `1280px` |
| `--bp-2xl` | `1536px` |

### Z-Index

| Token         | Value | Use             |
| ------------- | ----- | --------------- |
| `--z-base`    | `0`   | Page content    |
| `--z-raise`   | `10`  | Sticky local UI |
| `--z-header`  | `50`  | Header          |
| `--z-overlay` | `100` | Overlays        |
| `--z-modal`   | `200` | Modals          |
| `--z-toast`   | `300` | Notifications   |
| `--z-skip`    | `400` | Skip links      |

### Focus States

All interactive elements:

- Visible outline: `2px solid var(--color-focus)`.
- Offset: `4px`.
- Optional focus shadow: `var(--shadow-focus)`.
- Never remove outline without replacing it.

## Surfaces

### Matte Canvas

Base page background:

- `#050505`.
- Optional section variation: `#0A0A0B`.

### Noise Texture

Create subtle noise without a heavy image:

- Use CSS pseudo-element with layered radial gradients and low opacity.
- Or use a tiny inline SVG data URI under 1KB.
- Keep opacity between `0.025` and `0.05`.
- Noise must not reduce text contrast.

Recommended direction:

```css
.noise::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.035;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.16) 0 1px, transparent 1px),
    radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.1) 0 1px, transparent 1px);
  background-size:
    37px 37px,
    53px 53px;
}
```

## Media Direction

Use high-quality campaign and case-study media only when approved:

- Real website screenshots.
- Shopify store screenshots.
- Campaign dashboards with sensitive data removed.
- Approved social media creative.
- Approved client logos.
- Approved team photography.

Do not use:

- Fake office photos.
- Fake dashboard numbers.
- Generic stock teams.
- Abstract "marketing" imagery that does not show the actual work.

## Accessibility Rules

- Minimum contrast should meet WCAG AA.
- Buttons and form fields require stable hit areas of at least 44px.
- Keyboard focus must be visible.
- No scroll hijacking.
- No content hidden behind animation.
- Reduced-motion users receive static states.
- Mobile layouts must be composed, not simply stacked.
