# Component Inventory

## Purpose

This inventory defines the component system needed to build the I Craft Ads site after design approval. It does not implement components.

## Global Components

### Header

- Brand mark.
- Primary navigation.
- Services menu.
- Primary CTA.
- Mobile menu trigger.

States:

- Default.
- Scrolled.
- Mobile open.
- Keyboard focus.

Notes:

- Keep header quiet and compact.
- Use confirmed contact CTA only.
- Do not show UAE phone until owner confirms.

### Footer

- Short brand description.
- Service links.
- Company links.
- Legal links.
- Confirmed contact details.
- Social links.

Missing proof labels:

- [OWNER MUST PROVIDE BUSINESS ADDRESS]
- [OWNER MUST PROVIDE UAE PHONE NUMBER]
- [OWNER MUST PROVIDE SOCIAL LINKS]

### Skip Link

- Appears on keyboard focus.
- Jumps to main content.

## Content Components

### Hero

Variants:

- Homepage hero.
- Service hero.
- Case-study hero.
- Article hero.
- Contact hero.

Elements:

- Kicker.
- H1.
- Lead paragraph.
- Primary CTA.
- Secondary CTA, optional.
- Media or proof panel, optional.

### Section Header

- Kicker.
- H2.
- Supporting copy.
- Optional CTA.

Use:

- Services.
- Process.
- Proof.
- Insights.

### Service Card

Elements:

- Index.
- Service title.
- Short description.
- Link.
- Optional capability list.

States:

- Default.
- Hover.
- Focus.

Design:

- Sharp card.
- Fine border.
- Accent only on index or active state.

### Service Detail Block

Elements:

- Problem statement.
- What we do list.
- Proof required slot.
- Related services.
- CTA.

### Outcome Strip

Purpose:

- Show business outcomes without fake stats.

Items:

- Better visibility.
- Better acquisition.
- Better conversion.
- Better follow-up.

### Process Step

Elements:

- Number.
- Step title.
- Description.
- Optional deliverables.

Recommended steps:

- Diagnose.
- Plan.
- Build.
- Improve.

### Proof Placeholder

Purpose:

- Make missing proof explicit during review.

Example:

`[OWNER MUST PROVIDE VERIFIED RESULT]`

Design:

- Dashed border.
- Muted text.
- Small label.
- Never styled like real evidence.

### Client Logo Strip

Status:

- Conditional.

Use only when permission exists.

Elements:

- Approved logos.
- Accessible text labels.

### Testimonial Card

Status:

- Conditional.

Elements:

- Quote.
- Name.
- Role.
- Company.
- Permission status.

Do not include until owner approval exists.

### Case Study Card

Elements:

- Project title.
- Service tag.
- Industry tag.
- Short problem statement.
- Verified result, only if approved.
- Image.
- CTA.

Missing proof state:

- Show as internal draft only, not public content.

### Insight Card

Elements:

- Category.
- Title.
- Excerpt.
- Date or reviewed date.
- Link.

## Page-Specific Components

### Case Study Snapshot

Elements:

- Client.
- Industry.
- Service.
- Market.
- Timeline.
- Status.

All fields require owner approval.

### Results Panel

Status:

- Use only with verified numbers.

Elements:

- Metric.
- Label.
- Context.
- Timeframe.

Fallback:

- Process-focused summary with no numbers.

### Article Table Of Contents

- Sticky on desktop.
- Inline on mobile.
- Links to H2 sections.

### FAQ Accordion

Requirements:

- Native button controls.
- Keyboard accessible.
- Works without animation.
- FAQPage schema only where FAQs are visible on page.

### Contact Form

Fields:

- Name.
- Email.
- Phone.
- Company.
- Website URL.
- Service interest.
- Company size.
- Message.
- Consent.

States:

- Empty.
- Focus.
- Error.
- Submitting.
- Success.

Proof required:

- [OWNER MUST PROVIDE FORM DESTINATION]
- [LEGAL REVIEW REQUIRED]

## UI Components

### Button

Variants:

- Primary.
- Secondary.
- Text.
- Icon.

Rules:

- Minimum height 44px.
- Radius 4px.
- Visible focus.
- No pill styling by default.

### Link

Variants:

- Inline text.
- Navigation.
- Arrow link.
- Card link.

### Tag

Use:

- Service labels.
- Article categories.
- Case-study categories.

Design:

- Fine border.
- Small text.
- No heavy filled pills.

### Form Field

Variants:

- Text.
- Email.
- Phone.
- Select.
- Textarea.
- Checkbox.

### Modal

Avoid unless necessary.

Potential use:

- Mobile menu.
- Media preview.

## Media Components

### Media Frame

Use:

- Campaign screenshots.
- Website screenshots.
- Shopify examples.

Design:

- 8px radius max.
- Fine border.
- No glassmorphism.

### Static WebGL Fallback

Use:

- Hero abstract signal if WebGL is used later.

Rules:

- Must render without JavaScript.
- Must respect reduced motion.
- Must not replace semantic content.

## Component Priority

### Phase 6 Build Priority

1. Header.
2. Footer.
3. Hero.
4. Section Header.
5. Service Card.
6. CTA blocks.
7. Contact Form.
8. FAQ Accordion.
9. Insight Card.
10. Case Study Card.

### Later Priority

- Animated media panels.
- WebGL visual.
- Advanced case-study data visuals.
- Interactive service comparison.
