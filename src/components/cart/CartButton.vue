<script setup>
import { ref, watch } from 'vue'
import AppIcon from '../ui/AppIcon.vue'
import { useCart } from '../../composables/useCart'
import { openOverlay } from '../../composables/useOverlays'
import { copy } from '../../data/copy'

const { count, announcement } = useCart()

// Small bump on the badge whenever the count changes
const bump = ref(false)
watch(count, () => {
  bump.value = false
  requestAnimationFrame(() => (bump.value = true))
})
</script>

<template>
  <button type="button" class="cart-btn" @click="openOverlay('cart')">
    <AppIcon name="bag" :size="22" />
    <span class="visually-hidden">{{ copy.cart.open }}, {{ count }} {{ count === 1 ? 'item' : 'items' }}</span>
    <span v-if="count" class="cart-btn__badge" :class="{ 'is-bumping': bump }" aria-hidden="true" @animationend="bump = false">{{ count }}</span>
  </button>
  <span class="visually-hidden" aria-live="polite">{{ announcement }}</span>
</template>

<style scoped>
.cart-btn {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: var(--surface-soft);
  color: var(--action);
  cursor: pointer;
  transition: background-color var(--dur-fast) var(--ease-out);
}

@media (hover: hover) {
  .cart-btn:hover { background: color-mix(in srgb, var(--c-royal) 14%, var(--surface)); }
}

.cart-btn__badge {
  position: absolute;
  top: -2px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  padding-inline: 5px;
  border-radius: var(--radius-pill);
  background: var(--action);
  color: var(--text-on-brand);
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 20px;
  text-align: center;
  box-shadow: 0 0 0 2px var(--bg);
}

.cart-btn__badge.is-bumping {
  animation: bump 380ms var(--ease-out);
}

@keyframes bump {
  40% { transform: scale(1.3); }
}
</style>
