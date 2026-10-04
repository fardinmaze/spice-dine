# Progress log: Spice Dine website

Client: Spice Dine, Woolloongabba QLD · Agency: Catch Australia
Spec: `CLAUDE_CODE_PROMPT.md` (wins over `DESIGN.md` where they differ)

## Status

**First draft built and ready for client review.** Home, About, Contact and 404 are complete. Menu, reviews, hours and most photos are placeholders. The build and lint pass, and production JS is 55 KB gzipped (budget 90 KB).

---

## 2026-10-04 (later): On Demand as its own menu tab
- Kacchi Biryani, Shorshe Ilish and Haleem moved out of their categories into a new **On Demand** category, the 8th and last tab in both tab bars. Being in this category is what makes a dish On Demand (`isOnDemand` in `data/menu.js`), so the "On Demand" tag chip is gone.
- The category shows a note under its title: "Slow-cooked to order. Order today, pick up or dine in tomorrow."
- The On Demand notice at the top of the menu links to the new tab ("See On Demand dishes").
- The Shorshe Ilish photo moved to On Demand with its dish. New placeholders for the client: a **kacchi biryani** photo (On Demand) and a **beef kala bhuna** photo (Curries & Bhuna).
- Tabs are slightly tighter from 1200px so all 8 fit from 1280px. The edge fade now also shows on wide screens if the bar overflows.

## 2026-10-04 (later): Real menu and prices from Yumbo Jumbo
- The placeholder menu is replaced with the restaurant's real menu from https://spicedine.yumbojumbo.com.au/menu: **87 dishes**, names, descriptions and prices **exactly as on Yumbo Jumbo** (checked by script against the downloaded page: 0 mismatches). Placeholder dishes the restaurant doesn't sell (kacchi biryani, shorshe ilish, seekh kebab, raita, firni…) are gone.
- 11 tabs: Biryani & Tehari · Curries & Bhuna · Combo Deals · Street Food & Snacks · Vorta & Shutki · Kebabs & Wraps · Burgers, Chips & Seafood · Bongo Fusion · Rice & Breads · Drinks & Desserts · On Demand.
- Decisions to confirm with the client:
  - Yumbo Jumbo lists some items twice at different prices. The site uses Fish N Chips **$15.61** (also listed as "Fish in Chips (I)" $16.76), Hot Chips Small **$5.01** (also $5.50) and Naan Regular **$5.10** (also $5.01).
  - The 16 soft drinks are grouped into 3 rows by size (can $3.36, 600ml $5.61, 1.25L $6.71), with the flavours in the description.
  - Tags: only **Popular** (their "Top Sellers") and **Spicy** (where their description says spicy). No vegetarian or nut tags are guessed.
  - **On Demand** now holds Goat Haleem and Duck Curry (a guess; neither is marked on Yumbo Jumbo).
  - Obvious typos in their descriptions are fixed (e.g. "driks", "clamari", "traditionary").
- Photos: every real photo matches a real dish. The raita and firni photos are no longer used (not on the menu). New placeholders: murag polau, 2 combo deals, 2 vorta/shutki, wontons, polau rice, sweets, goat haleem, duck curry.
- `DishRow` hides the description line when a dish has none.

## 2026-10-04 (later): Client logo
- The client's round badge logo replaces the text wordmark in the header (58px, 62px from 1024px) and the footer (96–128px). The path is set once in `site.logo` (`src/config/site.js`).
- Web copies in `public/images/brand/` (`logo-192.webp` 11 KB, `logo-400.webp` 24 KB). The 1500px original (624 KB) moved to `source-images/LOGO.png`.
- Favicon is now the logo (`favicon-32.png`), plus `apple-touch-icon.png` for phone home screens. The old `favicon.svg` is removed.
- Hero headline changed to "Big flavour, cooked fresh in Brisbane." (was "…in the Gabba.").
- Footer slogan changed to "Fresh, halal and full of flavour, right here in Brisbane." (was "…in the Gabba.").

## 2026-10-04: Client feedback round 1
Client feedback overrides `CLAUDE_CODE_PROMPT.md` where they differ (Bangla names, no-cart rule).
- Removed the "Dhaka's favourites" headline; new hero: "Big flavour, cooked fresh in the Gabba."
- Removed all Bangla text (dish/category names, marquee) and the Tiro Bangla font. English only.
- No separate pre-order option existed; pre-orders and large orders are now covered by Catering.
- Catering: Home section `#catering` ("Catering available", phone, Catering enquiry button), enquiry form in a dialog (name, phone, email, date, guests, pickup/delivery, details), also reachable from the nav, mobile menu, footer and a 4th Contact card. Posts to `VITE_CATERING_ENDPOINT` (falls back to the contact endpoint).
- On Demand: `'on-demand'` tag on Kacchi Biryani, Shorshe Ilish, Haleem (PLACEHOLDER choice), notice at the top of the menu, FAQ entry, "Ready tomorrow" in the cart.
- Cart: Add to cart on every dish, quantity stepper, header cart button with count, drawer to review items, saved in localStorage. "Proceed to order" currently offers Yumbo Jumbo or a phone call, because checkout on this site isn't live yet.
- Nav: Menu · Catering · Hours & location · About · Contact (desktop nav from 1024px). Mobile action bar becomes "View cart (n)" once the cart has items.
- `ContactForm.vue` replaced by the shared `EnquiryForm.vue`; form wording lives in `src/data/forms.js`.
- Checked in headless Chrome at 1440px and 360px, plus the cart drawer and catering dialog.

## 2026-09-24

### Stack change
- Replaced the initial React + Tailwind scaffold with **Vue 3 + Vite 8 + vue-router 4**, plain CSS tokens and JavaScript only, as the build prompt requires.

### Phase 1: Foundation (`afc6376`)
- Royal Red / turmeric tokens, type scale (Shrikhand, Hanken Grotesk, Tiro Bangla), base and motion CSS.
- Router with 3 pages + 404, per-route title and meta, hash scrolling and a route fade.
- Announcement ticker, header (goes solid after 24px, hides on scroll down), footer with blob edge.
- `BaseButton`: primary / secondary / on-brand / ghost-link, text-roll hover (hover label always equals the resting label), pressed, focus, disabled and loading states.

### Phase 2: Home, hero and menu (`1b237b3`)
- Hero: squiggle draw-in, word-by-word headline, open-now chip, avatar badge, wide dish image.
- Marquee band with English/Bangla dish names and inline food icons.
- Menu: 7 categories, dish rows with Bangla names, prices, tags and two captioned images each.
- Two sets of menu tabs driven by one scroll-spy state: a sticky pill bar with a sliding active pill (centres itself on mobile) and a vertical index on desktop (≥1200px).

### Phase 3: Home, remaining sections (`97cb02a`)
- About teaser with snap slider, testimonial cards, two-column FAQ accordion.
- Visit section: hours table (today highlighted), Order / Call / Directions, lazy-loaded map.
- Mobile action bar (<810px): appears after the hero and hides near Visit and the footer.
- Open-now status computed in Brisbane time (open / closing soon / closed).

### Phase 4: About, Contact, 404 (`481ee56`)
- About: page hero, alternating story rows, 3 value cards, kitchen gallery, CTA band.
- Contact: 3 contact cards, hours, map, and a validated form with loading, success and error states through `src/services/contact.js`. Append `?form=error` to the Contact page URL to preview the error state.
- 404 page.

### Phase 5: QA
- Build has no Vue warnings, oxlint is clean, and there's no lorem ipsum, template leftovers or invented numbers.
- Reviewed the code against the Definition of Done. **Visual QA is not done yet:** Playwright isn't installed and browser automation couldn't reach the local dev server, so no screenshots were taken.

### Client photos + ordering link (`68294bc`)
- Order online now opens `https://spicedine.yumbojumbo.com.au/menu` in a new tab (set once in `src/config/site.js`).
- Added WebP copies of the client's 8 dish photos to `public/images/dishes/` (40–100 KB each, hero 174 KB), used in the hero and 6 of the 7 menu categories. Captions and alt text describe what's in each photo.
- Added matching placeholder dishes: Shorshe Ilish, Chicken Fry & Fried Rice, Fish & Chips, Milk Tea.

---

## Next steps
- [ ] Visual check at 360 / 390 / 810 / 1200 / 1440px, especially the hero crop and the menu tabs while scrolling.
- [ ] Keyboard-only and reduced-motion walkthrough in a real browser.
- [x] Moved the original client photos to `source-images/Items Image/` (git-ignored) so they're no longer copied into every build.
- [x] `web-hero.mp4` restored (2026-10-04). It is in the repo root, not used by the site yet.
- [ ] Contact form endpoint (`VITE_CONTACT_ENDPOINT`).
- [ ] Set `VITE_SHOW_DRAFT_BADGE=false` for launch.

## Waiting on the client
1. ~~Real menu and prices~~ taken from Yumbo Jumbo (2026-10-04). Still to confirm: duplicate prices, On Demand dishes, and the in-store vs online price question.
2. Remaining photos: the About slider, story, kitchen gallery and review avatars. (All 14 menu photos are now in, 2026-10-04.)
3. Confirmed opening hours (public listings disagree).
4. Email address and Facebook / Instagram links.
5. "Since [year]" for the About teaser.
6. Reviews they have permission to quote, with names.
7. FAQ answers, About story copy, announcement ticker wording.
8. ~~Logo~~ received and placed (2026-10-04).
