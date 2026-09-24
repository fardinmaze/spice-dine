import { onBeforeUnmount, onMounted, ref } from 'vue'

// One active-section state for any number of nav UIs.
// `ids`: section element ids in page order. `offset()`: px from viewport top where a section counts as active.
export function useScrollSpy(ids, { offset = () => 0 } = {}) {
  const active = ref(ids[0])
  let locked = false
  let unlockTimer
  let ticking = false

  function update() {
    ticking = false
    if (locked) return
    // Generous line (at least 30% down the viewport) so the header hiding mid-scroll can't leave the previous section active
    const line = Math.max(offset() + 8, window.innerHeight * 0.3)
    let current = ids[0]
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= line) current = id
    }
    active.value = current
  }

  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }

  function unlock() {
    clearTimeout(unlockTimer)
    window.removeEventListener('scrollend', unlock)
    locked = false
    update()
  }

  // Jump both indicators immediately, then scroll; spy resumes once scrolling ends.
  function scrollTo(id) {
    const el = document.getElementById(id)
    if (!el) return
    active.value = id
    locked = true
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(history.state, '', `#${id}`)
    window.addEventListener('scrollend', unlock, { once: true })
    clearTimeout(unlockTimer)
    unlockTimer = setTimeout(unlock, reduced ? 50 : 1200)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('scrollend', unlock)
    clearTimeout(unlockTimer)
  })

  return { active, scrollTo }
}
