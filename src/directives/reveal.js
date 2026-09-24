// v-reveal – fade + rise once when the element enters the viewport.
// Value (optional): { delay: ms, distance: px }
const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
      )
    : null

export const reveal = {
  mounted(el, { value = {} }) {
    if (!observer) return
    if (value.delay) el.style.setProperty('--reveal-delay', `${value.delay}ms`)
    if (value.distance) el.style.setProperty('--reveal-distance', `${value.distance}px`)
    el.classList.add('reveal')
    observer.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
