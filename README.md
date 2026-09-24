# Spice Dine Website

Marketing site for Spice Dine, a halal Bangladeshi restaurant in Woolloongabba, by Catch Australia. Ordering stays on Yumbo Jumbo; every Order online button links out to it.

**Stack:** Vue 3 · Vite 8 · vue-router 4 · plain CSS custom properties (no UI or animation libraries)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

Copy `.env.example` to `.env`. `VITE_CONTACT_ENDPOINT` is where the contact form POSTs (leave it empty to simulate a send), and `VITE_SHOW_DRAFT_BADGE` shows the draft badge.

## Docs
- `CLAUDE_CODE_PROMPT.md`: build spec (takes precedence)
- `DESIGN.md`: design system
- `PROJECT_BRIEF.md`: original scope
- `PROGRESS.md`: progress log, next steps and client to-dos

## Structure
```
src/
  config/site.js       address, phone, hours, order URL (the only place these live)
  data/                menu, reviews, FAQs, story, page copy (placeholders marked)
  services/contact.js  contact form submission
  styles/              tokens, base, motion
  composables/         scroll-spy, header state, open status, in-view
  components/          layout/, ui/, menu/, sections/
  pages/               Home, About, Contact, 404
public/images/dishes/  optimised dish photos (WebP)
```
