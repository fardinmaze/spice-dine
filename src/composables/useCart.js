import { computed, ref, watch } from 'vue'
import { dishesById, isOnDemand } from '../data/menu'

// Shared cart: [{ id, qty }] lines, saved in localStorage so it survives reloads.
// Unknown ids (e.g. after a menu change) are dropped on load.
const KEY = 'spice-dine-cart'

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(saved) ? saved.filter((line) => dishesById.has(line.id) && line.qty > 0) : []
  } catch {
    return []
  }
}

const lines = ref(load())
const announcement = ref('') // read out by the cart button's live region

watch(
  lines,
  (value) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(value))
    } catch {
      // Storage unavailable (private mode, blocked): the cart still works for this visit
    }
  },
  { deep: true },
)

const items = computed(() => lines.value.map((line) => ({ ...line, dish: dishesById.get(line.id) })))
const count = computed(() => lines.value.reduce((sum, line) => sum + line.qty, 0))
const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.dish.price * item.qty, 0))
const pricesPending = computed(() => items.value.some((item) => !item.dish.price))
const hasOnDemand = computed(() => items.value.some((item) => isOnDemand(item.dish)))

const qtyOf = (id) => lines.value.find((line) => line.id === id)?.qty ?? 0

function setQty(id, qty) {
  const name = dishesById.get(id)?.name
  const index = lines.value.findIndex((line) => line.id === id)
  if (qty <= 0) {
    if (index > -1) lines.value.splice(index, 1)
    announcement.value = `${name} removed from your cart.`
    return
  }
  if (index > -1) lines.value[index].qty = qty
  else lines.value.push({ id, qty })
  announcement.value = `${name}: ${qty} in your cart.`
}

const add = (id) => setQty(id, qtyOf(id) + 1)

function clear() {
  lines.value = []
  announcement.value = 'Cart cleared.'
}

export function useCart() {
  return { items, count, subtotal, pricesPending, hasOnDemand, announcement, qtyOf, setQty, add, clear }
}
