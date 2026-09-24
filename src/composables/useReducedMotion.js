import { onBeforeUnmount, ref } from 'vue'

export function useReducedMotion() {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  const reduced = ref(query.matches)
  const onChange = (e) => (reduced.value = e.matches)
  query.addEventListener('change', onChange)
  onBeforeUnmount(() => query.removeEventListener('change', onChange))
  return reduced
}
