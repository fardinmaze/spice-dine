import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Spice Dine | Bangladeshi restaurant in Woolloongabba',
      description: 'Authentic halal Bangladeshi food on Ipswich Road, Woolloongabba. Tehari, kala bhuna, street food, kebabs and snack packs. Order online for pickup or delivery.',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./pages/AboutPage.vue'),
    meta: {
      title: 'Our story | Spice Dine',
      description: 'The family kitchen behind Spice Dine, cooking Bangladeshi home and street food in Woolloongabba.',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('./pages/ContactPage.vue'),
    meta: {
      title: 'Visit or contact us | Spice Dine',
      description: 'Address, opening hours, phone and map for Spice Dine, Shop 3/80 Ipswich Rd, Woolloongabba QLD.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('./pages/NotFoundPage.vue'),
    meta: { title: 'Page not found | Spice Dine', description: 'This page could not be found.' },
  },
]

// Wait for the out-in route fade to finish before scrolling to a hash on another page
const afterTransition = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const router = createRouter({
  history: createWebHistory(),
  routes,
  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      if (from.name && from.path !== to.path) await afterTransition(reducedMotion() ? 0 : 520)
      else if (!from.name) await afterTransition(150) // direct load: let the page render first
      return { el: to.hash, top: 96, behavior: reducedMotion() ? 'auto' : 'smooth' }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', to.meta.description)
})
