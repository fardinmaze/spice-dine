# Spice Dine Website

A single-page restaurant website for Spice Dine, Woolloongabba. See `PROJECT_BRIEF.md` for scope.

**Stack:** React 19 · Vite 8 · Tailwind CSS v4 · anime.js v4 · @samasante/liquid-glass

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Structure
```
src/
  data/site.js         restaurant details, nav links, ORDER_URL (edit here)
  data/menu.js         featured dishes
  data/reviews.js      testimonials
  components/OrderButton.jsx       shared CTA linking to the ordering platform
  components/sections/*.jsx        one component per page section
  assets/images/       food and restaurant photography
  index.css            Tailwind + brand tokens (@theme)
```
