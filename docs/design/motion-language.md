# Motion Language

## Purpose

Motion should make the I Craft Ads site feel precise, premium and responsive. It must not carry the meaning of the page. Content should be visible and understandable without animation.

Do not implement large animations yet.

## Motion Principles

- Subtle over spectacular.
- Editorial rather than playful.
- Clear cause and effect.
- No scroll hijacking.
- No delayed content that harms reading.
- Reduced-motion users get static or near-instant states.

## Timing

| Use              | Duration | Ease                          |
| ---------------- | -------- | ----------------------------- |
| Button hover     | 140ms    | ease-out                      |
| Navigation state | 180ms    | ease-out                      |
| Card hover       | 220ms    | ease-out                      |
| Section reveal   | 640ms    | cubic-bezier(0.16, 1, 0.3, 1) |
| Media reveal     | 760ms    | cubic-bezier(0.16, 1, 0.3, 1) |
| Accordion        | 220ms    | ease-in-out                   |

## Page Load

Allowed:

- Immediate render of semantic content.
- Slight opacity/translate reveal for non-critical enhancement.
- Hero media can fade in after text is visible.

Avoid:

- Intro loaders.
- Logo animations that block content.
- Long staggered text reveals.
- Animated counters without verified numbers.

## Scroll Motion

Allowed:

- Section reveal from 16px to 24px vertical offset.
- Media masks or clip reveals.
- Fine-line grid reveal.
- Subtle parallax on decorative media only.

Avoid:

- Scroll hijacking.
- Pinned sections that trap users.
- Horizontal scroll experiences for core content.
- Content that appears only after precise scroll positions.

## Hover And Focus

Buttons:

- Accent background darkens or border brightens.
- Arrow moves 2px to 4px.

Cards:

- Border shifts from soft line to accent line.
- Media scale max 1.02.
- Text color shifts from muted to warm white where useful.

Focus:

- Focus ring appears instantly.
- Do not rely only on hover states.

## Reduced Motion

When `prefers-reduced-motion: reduce`:

- Disable scroll-triggered animation.
- Disable continuous WebGL/canvas movement.
- Disable parallax.
- Keep accordion state changes instant or very short.
- Keep hover transitions under 80ms or remove.

## WebGL Direction

Status:

- Later enhancement only.

Potential use:

- Abstract campaign signal field.
- Subtle 3D geometry tied to strategy/media/data themes.

Rules:

- Dynamic import only.
- Static fallback required.
- No large download blocking first content.
- No motion for reduced-motion users.
- Must be tested on mobile and low-power devices.

## Case Study Motion

Allowed:

- Image reveal on entry.
- Metric panel fade only after verified metrics exist.
- Timeline line draw.

Avoid:

- Animated fake dashboards.
- Counting numbers that are not verified.
- Data visuals without context.

## Form Motion

Allowed:

- Focus border transition.
- Error message fade.
- Success message fade.

Avoid:

- Shaking fields.
- Hiding errors behind animation.
- Auto-scrolling unexpectedly.

## Motion QA Checklist

- Page remains usable with JavaScript disabled.
- Page remains understandable with animation disabled.
- Keyboard users can access all controls.
- Motion does not create layout shift.
- No scroll hijacking.
- No motion-triggered content overlap on mobile.
- No heavy WebGL in initial route bundle.
