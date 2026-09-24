import { onBeforeUnmount, onMounted, ref } from 'vue'

// Tracks whether an element ref is within (rootMargin of) the viewport.
// `once: true` stops observing after the first hit.
export function useInView(target, { rootMargin = '0px', once = false } = {}) {
  const inView = ref(false)
  let observer

  onMounted(() => {
    if (!target.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        inView.value = entry.isIntersecting
        if (once && entry.isIntersecting) observer.disconnect()
      },
      { rootMargin },
    )
    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return inView
}
