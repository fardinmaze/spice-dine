# Build: Spice Dine website — first draft (3 pages)

You are building the first draft of a restaurant website in this repository. Read this entire prompt first, then read `DESIGN.md` in the repo root. **Where this prompt and DESIGN.md disagree, this prompt wins** (see "Overrides" below). Work in the phases at the end, run the build after each phase, and don't stop until the Definition of Done passes.

---

## 1. Context

- **Client:** Spice Dine — authentic Bangladeshi restaurant, halal. Shop 3/80 Ipswich Rd, Woolloongabba QLD 4102. Phone (07) 3272 1754.
- **Agency:** Catch Australia. This is a full custom redesign of their marketing site.
- **Ordering:** stays on the existing Yumbo Jumbo system at `https://spicedine.yumbojumbo.com.au`. Every "Order online" button links out there in a new tab. **No cart, no checkout, no prices-to-cart logic on this site.**
- **Goal of the site, in priority order:** 1) Order online, 2) Call, 3) Get directions.
- **This is a first draft for client review.** All menu items, photos, reviews and opening hours are placeholders and must be clearly marked as such in the data files.

## 2. Tech stack & constraints

- Vue 3 with `<script setup>`, Vite, **vue-router 4** (history mode) for the 3 pages.
- Plain CSS with custom-property tokens. Global CSS in `src/styles/`, component CSS in `<style scoped>`.
- **Do not add** Tailwind, UI kits, GSAP, Lenis, Swiper or any animation/carousel library. Everything below is achievable with CSS, IntersectionObserver and requestAnimationFrame.
- JavaScript only (no TypeScript).
- If the folder `spice-dine-starter/` (or its contents) exists in the repo, **build on it**: reuse `BaseButton`, `MarqueeBand`, `SnapCarousel`, `FaqAccordion`, `SiteHeader`, `v-reveal`, `useScrollSpy`, `useHeaderState`, `useCountUp`. Refactor them to the new tokens instead of rewriting from scratch. Delete `StatsBand.vue` unless a section below asks for it.
- If there is no starter, scaffold with `npm create vite@latest . -- --template vue` and build the same pieces.

## 3. Overrides to DESIGN.md

| Topic | DESIGN.md said | Use this instead |
|---|---|---|
| Brand colour | Bottle green + turmeric | **Royal Red** is the brand colour (palette in §4) |
| Overall tone | Quiet "signboard" | **Joyful, warm, rounded** — Foodly's tone (see §5) |
| Layout & menu | Own structure | **Plate's layout and menu structure** (see §6–7) |
| Buttons | Signboard variants | **Foodly-style pill buttons** with text-roll hover (see §8) |
| Pages | Single page | **3 pages:** Home, About, Contact |

Keep from DESIGN.md: typography (Shrikhand display, Hanken Grotesk body, Tiro Bangla for Bangla names), accessibility and performance rules, content/voice rules, the open-now chip, the mobile action bar, reduced-motion behaviour, and the "Avoid" list (especially: **every hover label must equal its resting label**, and no invented numbers).

## 4. Colour tokens (replace `src/styles/tokens.css` palette)

```css
:root {
  /* Brand */
  --c-royal: #9B1C31;        /* Royal Red – brand, primary buttons, active tab pill, headings accents */
  --c-royal-700: #7C1426;    /* hover / pressed */
  --c-royal-50: #FBEEEE;     /* soft tinted sections, chip backgrounds */
  --c-turmeric: #F4B000;     /* joyful highlight: squiggles, badges, marquee band, star icons */
  --c-leaf: #2F6B3A;         /* "Vegetarian" tag and "Open now" dot only */

  /* Neutrals */
  --c-bg: #FFFBF8;           /* page background (near-white, warm) */
  --c-white: #FFFFFF;        /* cards */
  --c-ink: #221416;          /* body text */
  --c-muted: #5E4B4E;        /* secondary text */

  /* Semantic – components use ONLY these */
  --bg: var(--c-bg);
  --surface: var(--c-white);
  --surface-soft: var(--c-royal-50);
  --surface-brand: var(--c-royal);
  --text: var(--c-ink);
  --text-muted: var(--c-muted);
  --text-on-brand: var(--c-white);
  --action: var(--c-royal);
  --action-hover: var(--c-royal-700);
  --highlight: var(--c-turmeric);
  --line: color-mix(in srgb, var(--c-ink) 12%, transparent);
  --focus-ring: var(--c-royal);
}
```

Contrast (verified): white on Royal Red 8.06:1 · Royal Red on bg 7.84:1 · ink on turmeric 9.37:1 · muted on bg 7.87:1 · white on royal-700 10.58:1. **Turmeric text on Royal Red is only 4.25:1 → allowed for text ≥ 24px only.** Chilli-red "Spicy" tags should use `--c-royal` on `--c-royal-50`.

Colour rules:
- Royal Red = brand + action. Turmeric = joy/highlight, never a button background.
- At most one full-bleed Royal Red section per viewport (the menu CTA band and the Visit block are the two red sections on Home).
- Soft sections use `--surface-soft`; cards sit on `--surface` with a large radius, no heavy shadows (one soft shadow token max: `0 12px 32px -16px rgb(34 20 22 / .18)`).

Keep all other tokens (type scale, spacing, easing, durations, z-index) from DESIGN.md §13. Change radii to the Foodly feel:

```css
--radius-pill: 999px;
--radius-card: 28px;   /* cards, panels */
--radius-media: 24px;  /* photos */
--radius-sm: 12px;     /* inputs, chips */
```

## 5. Foodly's joyful tone — what to bring over

Use these, sparingly and consistently:
1. **Announcement ticker** at the very top (above header), turmeric background: "Order online for pickup or delivery ✦ Halal kitchen ✦ Open 7 days" (placeholder copy, in `config/site.js`).
2. **Hand-drawn squiggle SVG** (write your own simple inline SVG, turmeric stroke) under the hero's small intro line and under one word-free spot on the About hero. It draws in once (`stroke-dashoffset` animation, 900ms) when the hero loads.
3. **Stacked round avatars + badge** in the hero: 3 overlapping circular placeholder photos with a small card "Loved by Brisbane locals" — **no invented numbers**.
4. **Big text marquee band** between hero and menu: dish names alternating English and Bangla, separated by small inline SVG food icons (chilli, leaf, bowl — draw simple ones yourself), on turmeric.
5. **Rounded, generous cards** (28px radius) for reviews, contact cards and the About values.
6. **Testimonial card** style: large opening quote mark in Royal Red, short quote, avatar + name + "Regular customer" (placeholder).
7. **Soft blob shape** (inline SVG, `--surface-soft`) behind the footer's top edge.

Do NOT bring over: Foodly's count-up stats, vertical scrolling gallery columns, or reservation form.

## 6. Pages & routes

```
/          Home (landing)
/about     About (Our story)
/contact   Contact (visit + form)
*          404
```

- Router: `createWebHistory`, `scrollBehavior` returns `{ el: to.hash, top: 96, behavior: 'smooth' }` for hashes, otherwise `{ top: 0 }`.
- Header nav: **Home · Menu (`/#menu`) · About · Contact** + primary button **Order online ↗**.
- Page `<title>` and meta description per route (set in `router.afterEach`).
- Page transition: 250ms opacity fade between routes (`<RouterView v-slot>` + `<Transition mode="out-in">`), disabled under reduced motion.

## 7. Page specs

### 7.1 Home — Plate's layout, section by section

1. **Announcement ticker** (Foodly) → **Header** (fixed; transparent at top → solid `--bg` with hairline after 24px → hides on scroll down, reappears on scroll up).
2. **Hero** (Plate structure + Foodly joy)
   - Small intro line with squiggle underneath: "Authentic Bangladeshi · Halal" (placeholder)
   - H1 (Shrikhand): "Dhaka's favourites, on Ipswich Road."
   - Lead: one sentence.
   - Buttons: **Order online ↗** (primary) + **See the menu** (secondary, anchors to `#menu`).
   - Open-now chip + stacked avatars badge.
   - **Wide dish image** below the text (Plate style, 16:9 desktop / 4:5 mobile), placeholder.
3. **Marquee band** (Foodly, §5.4).
4. **Menu** `#menu` — **the heart of the page, follow Plate exactly**:
   - Section heading "Our menu" + one-line lead ("Everything is halal. Tell us about allergies when you order.").
   - **Dual navigation tabs**, both driven by ONE scroll-spy state (`useScrollSpy`):
     - **Tabs A — horizontal pill bar**: sticky under the header (moves to `top: 0` when the header hides), full category list, Royal Red pill **slides** to the active tab (transform + width transition, 380ms ease-in-out). On mobile it scrolls horizontally and auto-centres the active tab.
     - **Tabs B — vertical category index**: on desktop (≥ 1200px) a sticky left column listing the same categories with the active one marked (Royal Red dot + bold). Hidden below 1200px, where Tabs A does the job alone.
     - Clicking either set scrolls to the category (`scroll-margin-top` accounts for header + bar), updates the URL hash with `history.replaceState`, and moves both indicators immediately.
   - **Different sectors for different dishes** — one `<section id="menu-{slug}">` per category, in this order (placeholder content):
     1. Rice & Tehari
     2. Curries & Bhuna
     3. Street Food & Snacks
     4. Kebabs & Grill
     5. Wraps, Burgers & Snack Packs
     6. Breads & Sides
     7. Drinks & Desserts
   - Each category layout (Plate): category title (H3) → dish list (text, not cards) → **two portrait images with captions** (4:5, placeholder) beside the list on desktop, below the title on mobile.
   - Each dish row: **name** + dotted leader + **price** on one line → **Bangla name** (`lang="bn"`, Tiro Bangla, muted) → one-line description → tags (chips). Tags: *Spicy* (royal on royal-50), *Vegetarian* (leaf), *Contains nuts* (muted), *Popular* (ink on turmeric).
   - After the last category: a Royal Red CTA band — "Hungry already?" + **Order for pickup or delivery ↗** (on-brand button variant).
5. **About teaser** (Plate "Crafting with love"): small line, H2 "Home cooking from Dhaka, since [year]" (placeholder year), **Our story** button → `/about`, and an **image slider** of 4 cards (portrait photo + caption) with prev/next arrows (`SnapCarousel`).
6. **Reviews** (Foodly testimonial style): H2 "What our guests say", 3 testimonial cards, placeholder quotes marked `placeholder: true`.
7. **FAQ** (Plate): two columns — left: H2 "Questions" + lead + **Contact us** button → `/contact`; right: accordion with 6 placeholder Q&As (halal, spice levels, parking, catering, dine-in, delivery area).
8. **Visit** (Plate "Come grab a Plate", on Royal Red): H2 "Come and eat with us", hours table (today highlighted), address, **Order online ↗**, **Call**, **Get directions ↗**, map embed (Google Maps `iframe`, lazy-loaded, `title` set) on the right / below on mobile.
9. **Footer** (Plate): big Shrikhand brand statement, address, phone, hours summary, columns *Navigation* / *Order* / *Social* (placeholder links), © line, blob shape on top edge.
10. **Mobile action bar** (< 810px): **Order online ↗** + **Call**, slides up after the hero leaves the viewport, hides while the Visit section or footer is in view.

### 7.2 About

1. Page hero: small line + H1 "Our story" + lead paragraph + one wide image (placeholder). Squiggle under the small line.
2. **Story blocks**: 2–3 alternating image/text rows (image left/right swaps on desktop, stacks on mobile). Placeholder copy about the family, the kitchen, the spices.
3. **What we care about**: 3 rounded cards (Foodly style) — "Halal, always", "Cooked fresh daily", "Recipes from home" — with a small inline SVG icon each. Placeholder text.
4. **Kitchen gallery**: `SnapCarousel` with 5 portrait placeholders + captions.
5. CTA band (Royal Red): "Taste it for yourself" + **Order online ↗** + **See the menu** (→ `/#menu`).

### 7.3 Contact

1. Page hero: H1 "Visit or get in touch" + lead.
2. **Three contact cards** (rounded, Foodly style): Address (+ **Get directions ↗**), Phone (+ **Call**), Email (placeholder address).
3. **Hours table**: all 7 days, today highlighted, open-now chip above it.
4. **Map** embed (full width, rounded).
5. **Contact form**: Name, Email, Phone (optional), Message. Requirements:
   - Labels always visible (no placeholder-as-label).
   - Validation on blur and on submit; inline error text under each field (`aria-describedby`, `aria-invalid`); error summary focused on submit failure.
   - Submit button states: idle → loading (spinner, disabled) → success (form replaced by a confirmation message: "Message sent. We'll reply within one business day.") / error (message above button: "Couldn't send your message. Check your connection and try again, or call us on (07) 3272 1754.").
   - Submission goes through `src/services/contact.js` → `sendContactMessage(payload)`. For the draft, POST to `import.meta.env.VITE_CONTACT_ENDPOINT` if set; if not set, simulate a 900ms success and `console.warn` that no endpoint is configured. Add `.env.example` with `VITE_CONTACT_ENDPOINT=`.
6. FAQ accordion (reuse, 4 items).

### 7.4 404
H1 "This page isn't on the menu", **Back to home** + **Order online ↗**.

## 8. Buttons — Foodly style (`BaseButton.vue`)

Pill shape, bold label, **text-roll hover** (two stacked copies of the SAME label; the first slides up, the second slides in from below — 380ms `--ease-out`), optional trailing **icon circle** (arrow or ↗) that nudges 3px on hover.

| Variant | Rest | Hover (inside `@media (hover:hover)`) |
|---|---|---|
| `primary` | Royal Red bg, white label, white/15% icon circle | royal-700 bg, label rolls, icon nudges |
| `secondary` | Transparent, 1.5px Royal Red border + label | Fills Royal Red, label turns white |
| `on-brand` | White bg, Royal Red label (for red sections) | bg `--c-royal-50` |
| `ghost-link` | Underlined text | Underline retracts right |

All variants: **pressed** `scale(.97)`; **focus-visible** 2px ring, 3px offset (white ring on red sections); **disabled** 55% opacity, no roll; **loading** label hidden + spinner + `aria-busy`. Sizes 40 / 52 / 60px, min tap target 44px. External links: ↗ icon, `target="_blank" rel="noopener"`, visually hidden "(opens in a new tab)".

Other interactive states to implement:
- **Nav links:** underline grows from left on hover; active route shows a small turmeric dot under the link.
- **Menu tabs:** muted → ink on hover → white on Royal Red pill when active.
- **Cards that link** (about slider, contact cards): photo scales to 1.04 over 700ms on hover; whole card focusable with visible ring.
- **Slider arrows:** 48px circles, Royal Red outline → filled on hover, 30% opacity + `disabled` at ends.
- **Accordion:** `+` in a circle rotates to `×` and fills turmeric when open.
- **Form inputs:** 1.5px `--c-muted` border, radius 12px; focus: Royal Red border + 3px `--c-royal-50` ring; error: Royal Red border + error text.

## 9. Motion — subtle, Plate-style

- **Hero load (the one orchestrated moment):** squiggle draws in → H1 words rise from a clip line (70ms stagger) → lead and buttons fade up → hero image eases from `scale(1.06)` to 1.
- **Scroll reveals (`v-reveal`)**: section headings and images only — fade + 24px rise, 800ms `--ease-out`, fired once. Dish rows get a very light 12px rise with 50ms stagger **per category only**. Don't reveal every paragraph.
- **Ambient loops:** announcement ticker and marquee band only. Both pause on hover.
- Header hide/show, tab pill slide, accordion, button roll: 380ms.
- **`prefers-reduced-motion: reduce`:** everything renders in its final state, tickers become static wrapped rows, pills jump, smooth scroll off, route fade off.

## 10. Data & placeholders

Create and use these; components never hard-code content.

`src/config/site.js`
```js
export const site = {
  name: 'Spice Dine',
  orderUrl: 'https://spicedine.yumbojumbo.com.au',
  phone: '(07) 3272 1754',
  phoneHref: 'tel:+61732721754',
  email: 'hello@example.com',            // PLACEHOLDER
  address: 'Shop 3/80 Ipswich Rd, Woolloongabba QLD 4102',
  mapsUrl: 'https://maps.google.com/?q=Shop+3/80+Ipswich+Rd+Woolloongabba+QLD+4102',
  mapEmbed: 'https://maps.google.com/maps?q=80%20Ipswich%20Rd%20Woolloongabba&z=16&output=embed',
  timezone: 'Australia/Brisbane',
  // PLACEHOLDER – public listings disagree; confirm with client before launch
  hours: {
    mon: ['11:30', '21:00'], tue: ['11:30', '21:00'], wed: ['11:30', '21:00'],
    thu: ['11:30', '21:00'], fri: ['11:30', '23:00'], sat: ['11:30', '23:00'], sun: ['11:30', '21:00'],
  },
  announcement: ['Order online for pickup or delivery', 'Halal kitchen', 'Open 7 days'],
  socials: [{ label: 'Facebook', href: '#' }, { label: 'Instagram', href: '#' }], // PLACEHOLDER
}
```

`src/data/menu.js` — schema (fill every category from §7.1 with 4–6 placeholder dishes):
```js
{
  id: 'rice-tehari',
  title: 'Rice & Tehari',
  titleBn: 'ভাত ও তেহারি',
  images: [
    { src: null, alt: '', caption: 'Placeholder caption' },
    { src: null, alt: '', caption: 'Placeholder caption' },
  ],
  items: [
    {
      name: 'Goat Tehari', nameBn: 'খাসির তেহারি',
      price: 0, // PLACEHOLDER – render as "$—.—" when 0
      desc: 'Placeholder description, one line.',
      tags: ['popular'], placeholder: true,
    },
  ],
}
```
Use plausible Bangladeshi dish names (tehari, polau & roast, kala bhuna, chotpoti, fuchka, haleem, jali kebab, snack pack, paratha, borhani, lassi, etc.), **price `0` rendered as `$—.—`**, and `placeholder: true` on every item. Add a comment at the top of the file: `// ALL ITEMS ARE PLACEHOLDERS – replace with the client's menu before launch.`

`src/data/reviews.js`, `src/data/faqs.js`, `src/data/story.js` — same pattern, every entry `placeholder: true`.

**Images:** create `src/components/ui/PlaceholderImage.vue` — renders a `--surface-soft` block with the given `aspect-ratio`, a small inline SVG plate/bowl icon and the caption/label text. When a real `src` is present it renders a proper `<img>` with `width`, `height`, `loading="lazy"` (or `fetchpriority="high"` for the hero) and `alt`. Never use external random-image services.

Add a small, dismissible **"Draft — placeholder content"** badge fixed bottom-left, shown only when `import.meta.env.VITE_SHOW_DRAFT_BADGE === 'true'` (set it to `true` in `.env.example`).

## 11. File structure (target)

```
src/
  main.js                 app, router, v-reveal, global CSS
  router.js               routes, scrollBehavior, titles/meta
  App.vue                 AnnouncementBar, SiteHeader, RouterView (fade), SiteFooter, MobileActionBar, DraftBadge
  config/site.js
  data/ menu.js reviews.js faqs.js story.js
  services/contact.js
  styles/ tokens.css base.css motion.css
  directives/reveal.js
  composables/ useScrollSpy.js useHeaderState.js useOpenStatus.js useInView.js
  components/
    layout/ AnnouncementBar.vue SiteHeader.vue SiteFooter.vue MobileActionBar.vue DraftBadge.vue
    ui/ BaseButton.vue MarqueeBand.vue SnapCarousel.vue FaqAccordion.vue PlaceholderImage.vue
        OpenStatusChip.vue HoursTable.vue Squiggle.vue AvatarStack.vue TestimonialCard.vue MapEmbed.vue
    menu/ MenuSection.vue MenuTabsBar.vue MenuTabsIndex.vue MenuCategory.vue DishRow.vue DietTag.vue
    sections/ HomeHero.vue AboutTeaser.vue ReviewsSection.vue FaqSection.vue VisitSection.vue CtaBand.vue
  pages/ HomePage.vue AboutPage.vue ContactPage.vue NotFoundPage.vue
```

`useOpenStatus.js`: returns `{ state: 'open' | 'closing-soon' | 'closed', label }` computed in `Australia/Brisbane` using `Intl.DateTimeFormat`, refreshes every 60s. "Closing soon" = within 45 minutes of closing.

## 12. Accessibility & performance (must pass)

- WCAG 2.2 AA. One `h1` per page. Landmarks `header`/`nav`/`main`/`footer`. Skip link "Skip to menu" (Home) / "Skip to content" (others) as first focusable element.
- `lang="en"` on `<html>`, `lang="bn"` on every Bangla string.
- All interactive elements keyboard-operable with visible focus. Menu tabs use `aria-current="true"` for the active item; accordion uses `aria-expanded`/`aria-controls`; marquee uses `role="marquee"` and `aria-hidden` on the cloned half.
- Hover styles only inside `@media (hover: hover)`.
- Fonts via Google Fonts with `display=swap` and preconnect; `Tiro Bangla` loaded with `text=` or `unicode-range` so Latin pages don't pay for it.
- No layout shift: every image/placeholder has an aspect ratio. Map iframe loads only when near the viewport.
- Production JS < 90 KB gzipped.

## 13. How to work

1. **Plan first.** Read DESIGN.md and the starter (if present), then write a short plan and todo list covering the phases below. Note any assumption you make.
2. **Phase 1 — Foundation:** install vue-router, tokens, base/motion CSS, router + 3 pages + 404 shells, AnnouncementBar, SiteHeader, SiteFooter, BaseButton (all variants/states). `npm run build`.
3. **Phase 2 — Home:** HomeHero, marquee, full menu with dual tabs + scroll-spy + categories, CTA band. `npm run build`.
4. **Phase 3 — Home (rest):** AboutTeaser + slider, Reviews, FAQ, Visit, MobileActionBar, OpenStatus. `npm run build`.
5. **Phase 4 — About + Contact + 404**, including the contact form states and `services/contact.js`. `npm run build`.
6. **Phase 5 — QA pass:** run through the Definition of Done below, fix everything, `npm run build` again. If Playwright is available, take desktop (1440px) and mobile (390px) screenshots of each page and review them; otherwise skip screenshots and say so.
7. Make a git commit at the end of each phase with a clear message.
8. Finish with a short summary: what was built, every assumption made, and a list of all placeholders the client needs to supply.

## 14. Definition of Done

- [ ] `npm run build` succeeds with no warnings from Vue.
- [ ] 3 routes + 404 work, including direct loads and `/#menu` from other pages.
- [ ] Every "Order online" opens Yumbo Jumbo in a new tab.
- [ ] Every button's hover label is identical to its resting label.
- [ ] Menu: both tab sets stay in sync while scrolling and when clicked; active tab visible on mobile; sticky bar follows the header's hide/show.
- [ ] All 7 menu categories render with placeholder dishes, Bangla names, tags and two captioned images.
- [ ] Contact form: validation, loading, success and error states all reachable.
- [ ] Open-now chip shows the right state for Brisbane time.
- [ ] Mobile action bar appears after the hero and hides near Visit/footer.
- [ ] Keyboard-only walkthrough works on all pages; focus always visible.
- [ ] Reduced motion: no tickers moving, no reveals, no pill slide, no route fade.
- [ ] Layout holds at 360px, 390px, 810px, 1200px and 1440px with no horizontal page scroll.
- [ ] No hard-coded content in components; every placeholder has `placeholder: true` or a `PLACEHOLDER` comment.
- [ ] No template leftovers, no invented statistics, no lorem ipsum.
