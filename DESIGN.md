# Spice Dine — Website Design System (DESIGN.md)

Version 1.0 · Prepared by Catch Australia · Stack: Vue 3 + Vite, vanilla CSS, no UI framework

---

## 1. Project overview

| | |
|---|---|
| **Client** | Spice Dine — authentic Bangladeshi restaurant, halal |
| **Location** | Shop 3/80 Ipswich Rd, Woolloongabba QLD 4102 · (07) 3272 1754 |
| **Scope** | Full custom redesign of the marketing website |
| **Keep** | Existing Yumbo Jumbo ordering system (`spicedine.yumbojumbo.com.au`). Every order button links out to it. No cart, no checkout on this site. |
| **Timeline** | 2 weeks |
| **Surface mode** | *Persuade* — the visitor decides and acts. Design exists to get people ordering, calling or walking in. |

### What the food actually is
Bangladeshi home and street food, alongside the halal takeaway staples that bring in the lunch and late-night crowd:

- **Rice:** goat tehari, beef tehari, polau with chicken roast, biryani
- **Curries & bhuna:** beef curry, goat curry, chicken curry, beef kala bhuna
- **Street food & snacks:** chotpoti, fuchka, haleem, mughlai paratha
- **Kebabs & takeaway:** chicken jali kebab, kebab wraps, halal snack pack (HSP), meat-loaded burgers
- **Drinks:** borhani, lassi

### Who visits, and what they need in the first 5 seconds

| Visitor | Arrives from | Needs |
|---|---|---|
| Bangladeshi diaspora & students | Word of mouth, Facebook | "Is this the real thing?" → dish names they recognise, Bangla names, tehari/haleem on the menu |
| Halal-seeking diners | Google "halal Woolloongabba" | A clear halal statement, not buried |
| Locals, office workers, Gabba game-day crowd | Google Maps, delivery apps | Open now? Where? Order button. |
| First-timers to Bangladeshi food | Search, reviews | What to order → "Most ordered" dishes with one-line descriptions |

### Success = these three actions, in this priority
1. **Order online** (outbound to Yumbo Jumbo)
2. **Call** (tap-to-call on mobile)
3. **Get directions** (Google Maps)

---

## 2. Design direction

### The idea: *a Dhaka shop sign on Ipswich Road*
Dhaka's streets are lined with hand-painted signboards and rickshaw lettering — bold, confident, a little joyful. The site borrows **that one thing**: headlines set in heavy hand-lettered display type on deep bottle green, framed like a painted sign. Everything around it stays quiet, practical and fast — a clean menu, clear hours, big order buttons.

### The one bold element
**Signboard headlines.** H1 and H2 in *Shrikhand* (a display face drawn from subcontinental shop-sign lettering), on bottle-green panels with a thin turmeric double-line frame. Used for the hero and the Visit block — the two bookends of the page. Nowhere else gets decoration.

### The quiet signature
**Bilingual dish names.** Every dish shows its Bangla name beneath the English (খাসির তেহারি under *Goat Tehari*). Small, muted, never decorative — it simply tells diaspora visitors *this is the real thing* and teaches everyone else the name.

### Design review — what changed from the first pass (and why)
| First pass (starter kit) | Revised | Why |
|---|---|---|
| Young Serif headlines on a pale background with a warm accent | Shrikhand signboard headlines on bottle green | Serif-on-pale-with-warm-accent is the default "nice restaurant" look and could belong to any café. Signboard lettering is specific to Bangladeshi street culture. |
| Stats band (years, dishes, rating) with count-up | **"Most ordered" dishes** strip | Stat rows are template filler, and we'd be inventing numbers. The most-ordered dishes are real data and answer the first-timer's question: *what should I get?* |
| Generic sample menu (fuchka, rezala, mishti doi) | Real categories: tehari, kala bhuna, chotpoti, HSP, jali kebab | Ground every screen in the actual menu. |
| Book-a-table CTA borrowed from references | Order online · Call · Directions | Spice Dine is takeaway/delivery-led; no booking system exists. |
| No mobile action bar | Sticky bottom bar: *Order online* / *Call* | Most visits are on phones, often hungry and in a hurry. |

---

## 3. Reference takeaways (Plate + Foodly)

**Adopt from Plate**
- Menu-first structure: text list, not cards (name · price / description / tags)
- Sticky category bar with scroll-spy and a sliding active pill
- Calm FAQ accordion, visit block with hours + embedded map
- Restraint: very little ambient motion

**Adopt from Foodly**
- Marquee band as a section divider
- Social proof near the hero (only with real, permitted reviews)
- Horizontal slider with prev/next arrows for secondary content

**Avoid**
- Foodly's leftover template copy (vet headings, "View Services" hover labels, "Book Appointment"). **Every hover label must equal its resting label** — enforced by `BaseButton`.
- Animating every section on scroll. It reads as templated and slows perceived loading.
- Invented numbers ("28K+ happy customers").
- Framer's per-breakpoint duplicated DOM. We ship one DOM, fluid type, one layout breakpoint.

---

## 4. Colour

### Palette
| Token | Hex | Name / origin | Use |
|---|---|---|---|
| `--c-green-900` | `#0B4A3A` | **Bottle green** — the flag, painted signboards | Signboard panels, active tab pill, headings on light |
| `--c-green-700` | `#16634E` | Lighter green | Hover on green, links, focus ring |
| `--c-turmeric` | `#F2A900` | **Turmeric** | Primary buttons, signboard frame, key highlights |
| `--c-turmeric-600` | `#D69400` | Turmeric, pressed | Primary button hover |
| `--c-chilli` | `#B72E1C` | **Chilli** | *Spicy* tag and closed/error states only |
| `--c-rice` | `#EEF1EA` | **Rice paper** (cool, green-tinted — not cream) | Page background |
| `--c-white` | `#FFFFFF` | — | Cards, inputs |
| `--c-ink` | `#14201A` | Green-black | Body text |
| `--c-muted` | `#4B5A52` | — | Descriptions, secondary text, input borders |
| `--c-steel` | `#8C9691` | Steel thali | Hairlines and dotted menu leaders only (non-text, decorative) |

### Rules
- **Turmeric is for action.** If it's turmeric, it's clickable (or it's the signboard frame). Don't use it for decoration.
- **Chilli is for heat and warnings.** Spicy tags, "Closed now", form errors. Never for buttons.
- One green panel per viewport at most — the hero and the Visit block are the only full-bleed green sections. The menu stays on rice paper for readability.
- No gradients, no drop shadows as decoration. Depth comes from colour blocks.

### Contrast (WCAG 2.2)
| Pair | Ratio | Result |
|---|---|---|
| Bottle green on rice / rice on green | 8.96 : 1 | AAA |
| Ink on turmeric (button label) | 8.35 : 1 | AAA |
| Muted on rice | 6.38 : 1 | AA (AAA large) |
| Chilli on rice | 5.38 : 1 | AA |
| Turmeric on bottle green | 5.09 : 1 | AA — OK for headings/frame, avoid for small body text |
| Steel on rice | 2.67 : 1 | ✗ Decorative lines only; never text or input borders |

---

## 5. Typography

### Families
| Role | Family | Why |
|---|---|---|
| Display (H1, H2, marquee) | **Shrikhand** 400 | Heavy, italic-leaning display face drawn from subcontinental shop-sign lettering. The signboard voice. |
| Body, UI, H3, dish names, prices | **Hanken Grotesk** 400 / 500 / 600 | Neutral, legible at small sizes, good tabular numbers for prices. |
| Bangla dish names | **Tiro Bangla** 400 | Traditional Bangla forms that sit comfortably next to the Latin. Loaded with `unicode-range` so it only downloads for Bangla glyphs. |

Three families are justified here because Bangla is a separate script, not a stylistic extra. Don't add a fourth.

```html
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&family=Shrikhand&family=Tiro+Bangla&display=swap" rel="stylesheet">
```

### Scale (fluid between 390px and 1200px)
| Token | Min → Max | Family / weight | Line-height | Use |
|---|---|---|---|---|
| `--fs-hero` | 44 → 96px | Shrikhand | 1.0 | H1, hero only |
| `--fs-h2` | 34 → 60px | Shrikhand | 1.05 | Section titles |
| `--fs-h3` | 20 → 26px | Hanken 600 | 1.2 | Menu category, card titles |
| `--fs-dish` | 17 → 19px | Hanken 600 | 1.35 | Dish name + price |
| `--fs-body` | 16 → 18px | Hanken 400 | 1.6 | Paragraphs |
| `--fs-bangla` | 15 → 16px | Tiro Bangla | 1.5 | Bangla dish names |
| `--fs-small` | 14px | Hanken 500 | 1.45 | Tags, meta, captions |

### Rules
- Shrikhand is **only** for H1, H2 and the marquee band. Never for buttons, nav, menu items or paragraphs.
- Headlines are sentence case. No ALL-CAPS labels, no tracked-out eyebrows above headings.
- Don't highlight a single word in a headline with colour or italics — the typeface already carries the character.
- Body line length ≤ 65ch. `text-wrap: balance` on headings, `pretty` on paragraphs.
- Prices use `font-variant-numeric: tabular-nums` and always show cents ($22.50).

---

## 6. Layout & grid

- **Container:** max 1200px, fluid gutter `clamp(20px, 3vw + 8px, 48px)`
- **Alignment:** left-aligned everywhere. Menus are scanned down a left edge; centred text is used only for the one-line marquee.
- **Section spacing:** `clamp(64px, 6vw + 40px, 128px)` top and bottom
- **Breakpoints (Framer defaults, matching the references):**
  - Phone `< 810px` → single column, sticky bottom action bar
  - Tablet `810–1199px` → two-column menu, header nav visible
  - Desktop `≥ 1200px` → container maxes out
- Type and spacing are fluid via `clamp()`; only **layout** switches at 810px.
- **Radii by hierarchy:** pill (999px) for buttons, chips, tab indicator · 16px for photos · 0 for full-bleed signboard panels (a sign is a rectangle).

### Desktop wireframe
```
┌──────────────────────────────────────────────────────────────┐
│ Spice Dine        Menu  Our story  Visit  FAQ   [Order online↗]│  fixed header
├──────────────────────────────────────────────────────────────┤
│ ███████████████ BOTTLE GREEN SIGNBOARD PANEL ████████████████ │
│ █ ╔════════════════════════════════════════════════════════╗█ │  turmeric double frame
│ █ ║ ● Open now, closes 9 pm                                ║█ │
│ █ ║ Dhaka's favourites,           ┌──────────────────────┐ ║█ │
│ █ ║ on Ipswich Road.              │                      │ ║█ │
│ █ ║                               │   hero photo 4:5     │ ║█ │
│ █ ║ Authentic Bangladeshi…        │   (tehari, top-down) │ ║█ │
│ █ ║ [Order online↗] [See the menu]│                      │ ║█ │
│ █ ║ Halal · 3/80 Ipswich Rd       └──────────────────────┘ ║█ │
│ █ ╚════════════════════════════════════════════════════════╝█ │
├──────────────────────────────────────────────────────────────┤
│ Most ordered                                          ‹  ›   │
│ [photo][photo][photo][photo]  →  scroll-snap slider           │
├──────────────────────────────────────────────────────────────┤
│ ≈ tehari ✦ তেহারি ✦ kala bhuna ✦ কালা ভুনা ✦ chotpoti ≈      │  marquee on turmeric
├──────────────────────────────────────────────────────────────┤
│ The menu                                                      │
│ [Rice][Curries][Street food][Kebabs][Wraps & HSP][Drinks]     │  sticky bar
│ Rice & tehari                          ┌───────────────┐      │
│ Goat Tehari ··················· $22.50 │ sticky photo  │      │
│ খাসির তেহারি                             │   4:5         │      │
│ Fragrant rice cooked with goat…        └───────────────┘      │
├──────────────────────────────────────────────────────────────┤
│ Our story (text + 3-photo slider)                             │
│ What people say (2–3 real reviews)                            │
│ Questions (accordion, 2-col: title left, list right)          │
│ ███ Visit — green signboard panel: hours · map · buttons ███  │
│ Footer                                                        │
└──────────────────────────────────────────────────────────────┘
```

### Mobile wireframe
```
┌───────────────────────┐
│ Spice Dine        ☰   │
├───────────────────────┤
│ ███ green panel ████  │
│ ● Open now, closes 9pm│
│ Dhaka's               │
│ favourites, on        │
│ Ipswich Road.         │
│ [   Order online ↗  ] │  full-width
│ [   See the menu    ] │
│ ┌───────────────────┐ │
│ │ hero photo 4:5    │ │
│ └───────────────────┘ │
├───────────────────────┤
│ Most ordered  (swipe) │
│ …                     │
├───────────────────────┤
│[Order online↗][ Call ]│  sticky bottom bar (after hero)
└───────────────────────┘
```

---

## 7. Page structure (single page + 404)

| # | Section | Content | Key behaviour |
|---|---|---|---|
| 1 | **Header** | Wordmark, Menu · Our story · Visit · FAQ, *Order online* | Transparent over hero → solid rice with hairline after 24px → hides on scroll down, returns on scroll up. Mobile: burger → full-screen panel. |
| 2 | **Hero (signboard)** | Open-now chip · H1 · one-line lead · *Order online* + *See the menu* · "Halal · Shop 3/80 Ipswich Rd" · photo | Page-load sequence (see Motion). Open-now chip computed from hours. |
| 3 | **Most ordered** | 4–6 dishes: photo, English + Bangla name, one line, price | Scroll-snap slider, arrows disable at ends. Each card links to its menu anchor. |
| 4 | **Marquee band** | Dish names alternating English / Bangla, ✦ separators, on turmeric | Infinite ticker, pauses on hover, static under reduced motion. |
| 5 | **Menu** | Categories → dishes (name, Bangla name, price, description, tags: Halal is site-wide, so tag only *Spicy*, *Vegetarian*, *Contains nuts*) | Sticky category bar + scroll-spy + sliding pill; sticky category photo on desktop. Ends with *Order for pickup or delivery ↗*. |
| 6 | **Our story** | 2–3 short paragraphs from the owners + 3 photos (kitchen, family, dining room) | Slider on mobile, 3-up on desktop. |
| 7 | **What people say** | 2–3 real reviews (with the reviewer's permission / public Google quotes, attributed) | Static. No carousel for 3 items. |
| 8 | **Questions** | Halal? Spice levels? Parking? Catering? Dine-in? | Accordion, single-open. |
| 9 | **Visit (signboard)** | Address, hours table (today highlighted), phone, map embed | *Order online* · *Call* · *Get directions*. Map lazy-loads on scroll. |
| 10 | **Footer** | Wordmark, address, phone, hours summary, socials, © | — |
| — | **Mobile action bar** | *Order online ↗* · *Call* | Slides up once the hero leaves the viewport; hides when the Visit section is in view (buttons already there). |

### Copy starters (to confirm with client)
- **H1:** Dhaka's favourites, on Ipswich Road.
- **Lead:** Authentic Bangladeshi curries, tehari and street food, plus halal kebabs and snack packs. Eat in, take away or order online.
- **Menu lead:** Everything is halal. Tell us about allergies when you order.
- **Visit H2:** Come in and eat with us.

---

## 8. Components & states

### Button — `BaseButton.vue`
| Variant | Rest | Hover (pointer devices only) | Pressed | Focus | Disabled | Loading |
|---|---|---|---|---|---|---|
| **Primary** | Turmeric bg, ink label | Bg → turmeric-600, label rolls up, ↗ icon nudges | `scale(.97)` | 2px green-700 ring, 3px offset | 55% opacity, no roll | Label hidden, spinner, `aria-busy` |
| **Secondary** | Transparent, green border + label | Fills green, label → rice | same | same | same | same |
| **On-green** (inside signboard) | Rice bg, green label | Bg → white | same | Ring in turmeric | same | same |
| **Link** | Underlined text | Underline retracts right | — | same | — | — |

- Heights: 40 / 52 / 60px. Minimum tap target 44×44px.
- External links (Yumbo Jumbo, Maps) show a ↗ icon and have visually hidden "(opens in a new tab)".
- Hover label **always equals** resting label.

### Open-now chip
| State | Look | Text |
|---|---|---|
| Open | Green dot (pulsing once on load), rice text | Open now, closes 9 pm |
| Closing soon (< 45 min) | Turmeric dot | Closing soon, last orders 8:45 pm |
| Closed | Chilli dot | Closed, opens 11:30 am |
Computed client-side from `site.hours` in Australia/Brisbane time (no daylight saving).

### Menu category bar
Rest: muted text · Hover: ink · Active: rice text on green pill that **slides** between tabs (380ms, ease-in-out) · Mobile: horizontal scroll, active tab auto-centred · Sticks under the header; moves to top 0 when the header hides.

### Dish row
Name + dotted leader + price on one line → Bangla name → description (muted) → tags. Tag chips: *Spicy* in chilli tint; others in green tint. No hover effect (it isn't clickable).

### Dish card (Most ordered)
Photo 4:5, radius 16px → English name (Hanken 600) → Bangla name → price. Hover: photo scales 1.04 over 700ms. Whole card is a link to the menu anchor; focus ring on the card.

### Accordion
`+` in a circle rotates to `×` and fills turmeric when open; panel height animates via `grid-template-rows: 0fr → 1fr`. Buttons carry `aria-expanded`/`aria-controls`.

### Slider
Native scroll-snap. Arrow buttons: 48px circles, green outline → filled green on hover, 30% opacity + `disabled` at each end. Swipe works without JS.

---

## 9. Motion

**Budget:** one orchestrated moment (hero load), one ambient loop (marquee), everything else responds to the user.

| Moment | Spec |
|---|---|
| Hero load | Frame draws in (turmeric border `clip-path` 0 → 100%, 600ms) → H1 words rise from a clip line, 70ms stagger, 800ms each → lead + buttons fade up → photo eases from `scale(1.06)` to 1 |
| Scroll reveals | Section **titles only** (H2) fade + rise 24px, 800ms. Not paragraphs, not every card. |
| Marquee | 36s per loop, linear, pauses on hover |
| Header hide/show | 380ms ease-in-out |
| Menu pill | 380ms ease-in-out, width and position |
| Button roll | 380ms ease-out |
| Accordion | 380ms ease-in-out |
| Mobile action bar | Slides up 320ms ease-out |

**Easing tokens:** `--ease-out: cubic-bezier(.22,1,.36,1)` · `--ease-in-out: cubic-bezier(.65,0,.35,1)`

**Reduced motion:** all reveals render in their final state, the marquee becomes a static wrapped line, the pill jumps instead of sliding, smooth scrolling is off.

---

## 10. Imagery & icons

- **Real photos only.** Shot at the restaurant: dishes top-down on steel plates or thalis, natural daylight, one steam/texture close-up per category. No stock curry photos.
- **Crops:** hero 4:5 · menu category 4:5 · dish cards 4:5 · story 3:2
- **Delivery:** AVIF/WebP with JPEG fallback, `srcset` at 480/800/1200w, `loading="lazy"` below the fold, hero gets `fetchpriority="high"`.
- **Alt text** names the dish: "Goat tehari with boiled egg and salad" — not "delicious food".
- **Icons:** 1.6px stroke line icons (↗, ‹ ›, phone, pin, clock). No emoji in UI. The ✦ separator in the marquee is the only ornament.

---

## 11. Content & voice

- Plain, warm, specific. Say what the food is; skip adjectives like "tantalising" or "mouth-watering".
- Buttons say exactly what happens: *Order online*, *Call*, *Get directions*, *See the menu*. The same action keeps the same name everywhere.
- Dish descriptions: one line, ingredients first ("Fragrant rice cooked with goat, mustard oil and green chilli").
- Bangla names are checked by a native speaker before launch.
- Hours, address and phone live in **one** config file and are never hand-typed in components.

---

## 12. Accessibility & performance

- WCAG 2.2 AA minimum (contrast table in §4)
- Visible focus on every interactive element; skip-to-menu link as first focusable element
- Landmarks: `header`, `nav`, `main`, `footer`; one `h1`
- `lang="en"` on the page, `lang="bn"` on every Bangla string
- Marquee has `role="marquee"`, cloned content `aria-hidden`
- Map iframe has a `title` and loads only when near the viewport
- Targets: LCP < 2.5s on 4G, CLS < 0.05 (all images have `width`/`height` or `aspect-ratio`), JS < 90 KB gzipped
- `font-display: swap`; preconnect to Google Fonts; Tiro Bangla limited by `unicode-range`

---

## 13. Tokens (drop into `src/styles/tokens.css`)

```css
:root {
  /* Palette */
  --c-green-900: #0B4A3A;
  --c-green-700: #16634E;
  --c-turmeric: #F2A900;
  --c-turmeric-600: #D69400;
  --c-chilli: #B72E1C;
  --c-rice: #EEF1EA;
  --c-white: #FFFFFF;
  --c-ink: #14201A;
  --c-muted: #4B5A52;
  --c-steel: #8C9691;

  /* Semantic */
  --bg: var(--c-rice);
  --surface: var(--c-white);
  --surface-sign: var(--c-green-900);
  --text: var(--c-ink);
  --text-muted: var(--c-muted);
  --text-on-sign: var(--c-rice);
  --action: var(--c-turmeric);
  --action-hover: var(--c-turmeric-600);
  --heat: var(--c-chilli);
  --line: color-mix(in srgb, var(--c-ink) 14%, transparent);
  --focus-ring: var(--c-green-700);

  /* Type */
  --font-display: 'Shrikhand', 'Georgia', serif;
  --font-body: 'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-bangla: 'Tiro Bangla', 'Noto Sans Bengali', serif;
  --fs-hero: clamp(2.75rem, 1.05rem + 6.9vw, 6rem);
  --fs-h2: clamp(2.125rem, 1.35rem + 3.2vw, 3.75rem);
  --fs-h3: clamp(1.25rem, 1.07rem + 0.75vw, 1.625rem);
  --fs-dish: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --fs-body: clamp(1rem, 0.94rem + 0.25vw, 1.125rem);
  --fs-bangla: clamp(0.9375rem, 0.92rem + 0.1vw, 1rem);
  --fs-small: 0.875rem;

  /* Space */
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem; --space-4: 1rem;
  --space-6: 1.5rem;  --space-8: 2rem;   --space-12: 3rem;   --space-16: 4rem;
  --section-y: clamp(4rem, 2.5rem + 6vw, 8rem);
  --gutter: clamp(1.25rem, 0.5rem + 3vw, 3rem);
  --container: 1200px;

  /* Shape */
  --radius-pill: 999px;
  --radius-media: 16px;
  --sign-frame: 3px double var(--c-turmeric);

  /* Motion */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 180ms;
  --dur-base: 380ms;
  --dur-slow: 800ms;

  /* Layers */
  --z-sticky: 40;
  --z-header: 50;
  --z-actionbar: 60;
  --header-h: 72px;
}
```

---

## 14. Implementation map (Vue starter → final)

| Part | Starter file | Change for v1 |
|---|---|---|
| Tokens | `styles/tokens.css` | Replace with §13 |
| Fonts | `index.html` | Swap Young Serif → Shrikhand + Tiro Bangla |
| Site data | `config/site.js` | Real address, phone, confirmed hours, Maps URL |
| Menu data | `data/menu.js` | Real menu; add `bn` (Bangla name) and `popular` fields |
| Hero | `sections/HeroSection.vue` | Signboard panel, frame draw-in, open-now chip, 2-col with photo |
| Most ordered | *new* `sections/PopularDishes.vue` | Uses `SnapCarousel` + items where `popular: true` |
| Stats band | `sections/StatsBand.vue` | **Remove** |
| Menu | `sections/MenuSection.vue` | Bangla line, real categories, Spicy/Veg/Nuts tags only |
| Open-now | *new* `composables/useOpenStatus.js` | Brisbane time, 3 states |
| Mobile bar | *new* `layout/MobileActionBar.vue` | IntersectionObserver on hero + visit |
| Reviews | *new* `sections/Reviews.vue` | Static 3-up |
| Visit | *new* `sections/VisitSection.vue` | Signboard panel, hours table, lazy map |
| Button, Marquee, Accordion, Slider, Header, v-reveal | existing | Token rename only |

### Build order (2 weeks)
- **Days 1–2:** tokens, fonts, header, hero, open-now chip
- **Days 3–5:** menu data entry, menu section, most-ordered slider
- **Days 6–7:** story, reviews, FAQ, visit, footer, mobile bar
- **Days 8–9:** photography drop-in, image pipeline, copy from client
- **Day 10:** accessibility + performance pass, cross-device QA, launch

---

## 15. Open questions for the client

1. **Hours.** Public listings disagree (Menulog, Uber Eats, DoorDash and Google show different opening and closing times). Which is correct, and does it vary by day?
2. **Halal.** Is the whole menu halal? Is there a certifier we can name?
3. **Photos.** Can we shoot on site, or will you supply photos? Which 4–6 dishes are the real best-sellers?
4. **Logo.** Is there an existing logo/wordmark, or do we set the name in Shrikhand?
5. **Reviews.** Which reviews can we quote, and with what attribution?
6. **Dine-in.** How many seats? Do you take bookings by phone?
7. **Extras.** Catering, party orders, game-day specials — should any appear on the site?
8. **Bangla names.** Who checks the spelling?

---

## 16. Pre-launch QA checklist

- [ ] Every order button opens Yumbo Jumbo in a new tab
- [ ] Every button's hover label matches its resting label
- [ ] No placeholder or template copy anywhere (search for "Lorem", "TODO", "sample")
- [ ] Hours, address and phone match Google Business Profile exactly
- [ ] Open-now chip correct at 11:25, 11:35, 20:50 and 23:00 Brisbane time
- [ ] Tap-to-call works on iOS and Android
- [ ] Keyboard: tab through the whole page, focus always visible, accordion and slider operable
- [ ] Reduced motion: no marquee movement, no reveals
- [ ] Bangla renders correctly on iOS Safari, Android Chrome and Windows Chrome
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility 100
- [ ] 404 page with *See the menu* and *Order online*
- [ ] Open Graph image and meta description set
