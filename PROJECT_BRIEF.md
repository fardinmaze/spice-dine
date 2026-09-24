# Spice Dine: Custom Restaurant Website

- **Client:** Spice Dine, 80 Ipswich Road, Woolloongabba QLD 4102, Australia
- **Prepared by:** Catch Australia
- **Type:** Website redesign & development, 2-week timeline
- **Proposal:** `Downloads\Spice_Dine_Website_Proposal.docx`

## Objective
Build a modern, brand-focused, mobile-first single-page restaurant website that showcases Bangladeshi cuisine, builds trust, and sends visitors to the **existing Yumbo Jumbo ordering platform**. No new ordering, payment, menu backend or POS work.

## Goals
1. Distinctive brand identity (custom type, colour, imagery)
2. Showcase Bangladeshi cuisine (featured dishes, photography, storytelling)
3. More online orders: prominent Order Online CTAs throughout
4. Trust: reviews, testimonials, authentic imagery
5. Local discoverability (Woolloongabba / Brisbane local search)
6. Mobile-first responsive experience

## Section order (single page)
| # | Section | Component | Anchor |
|---|---|---|---|
| 1 | Header & Navigation (logo, Home, Our Story, Menu, Gallery, Reviews, Contact, Order Online) | `Header.jsx` | – |
| 2 | Hero: image, headline, intro, Order Online + Explore Our Menu | `Hero.jsx` | `#home` |
| 3 | Featured Menu: photo, name, description, price, links to ordering | `FeaturedMenu.jsx` | `#menu` |
| 4 | Our Story: intro, brand story, Bangladeshi culinary identity, philosophy | `OurStory.jsx` | `#story` |
| 5 | Food & Restaurant Gallery: dishes, prep, dining area, interior | `Gallery.jsx` | `#gallery` |
| 6 | Customer Reviews & Testimonials (names only with permission) | `Reviews.jsx` | `#reviews` |
| 7 | Location, Hours & Delivery: address, map, hours, suburbs, contact | `Location.jsx` | `#location` |
| 8 | Contact & Final CTA: details, socials, Order Online | `Contact.jsx` | `#contact` |
| 9 | Footer: logo, blurb, nav, address, hours, contact, CTA, copyright | `Footer.jsx` | – |

Suggested copy (not from the proposal):
- Headline: *Authentic Bangladeshi Flavours, Made to Be Shared.*
- Supporting: *Discover the rich flavours of Bangladeshi cuisine at Spice Dine, Woolloongabba.*

## Ordering workflow
Visit → Explore → Featured Dishes → **Order Online** → Yumbo Jumbo → Select items → Checkout & payment.
Every Order Online CTA (header, hero, menu, footer) links to `ORDER_URL` in `src/data/site.js`.

## Design direction
Warm, restaurant-appropriate colours · strong food photography · distinctive typography · clear hierarchy · spacious layouts · prominent CTAs · responsive on mobile, tablet and desktop.

## Scope
**Included:** discovery & brand direction, content/photo collection, desktop + mobile homepage design, all sections above, ordering CTA integration, cross-device testing, one revision round, launch & handover.
**Excluded:** ordering system, payment gateway, menu backend, POS, professional photography (unless arranged), hosting/domain, ongoing maintenance.

## Outstanding from client
- [ ] Yumbo Jumbo ordering page URL
- [ ] Logo files
- [ ] Phone, email, social links
- [ ] Opening hours
- [ ] Delivery suburbs
- [ ] Featured dishes, prices and photos
- [ ] Restaurant/interior photography
- [ ] Reviews (with permission to use names)
- [ ] Brand story details
