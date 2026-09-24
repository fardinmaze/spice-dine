import { readonly, ref } from 'vue'

// Shared header state: `scrolled` after 24px, `hidden` while scrolling down, back on scroll up.
// Mirrors `hidden` onto <html data-header> so sticky elements can follow via --sticky-top.
const scrolled = ref(false)
const hidden = ref(false)
const pinned = ref(false) // e.g. while the mobile menu is open

let lastY = 0
let ticking = false
let listening = false

function update() {
  const y = window.scrollY
  scrolled.value = y > 24
  const delta = y - lastY
  if (pinned.value || y < 160) hidden.value = false
  else if (delta > 4) hidden.value = true
  else if (delta < -4) hidden.value = false
  lastY = y
  document.documentElement.dataset.header = hidden.value ? 'hidden' : 'shown'
  ticking = false
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(update)
}

export function useHeaderState() {
  if (!listening && typeof window !== 'undefined') {
    listening = true
    lastY = window.scrollY
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
  }

  const setPinned = (value) => {
    pinned.value = value
    update()
  }

  return { scrolled: readonly(scrolled), hidden: readonly(hidden), setPinned }
}
