<script setup>
import { computed, nextTick, ref } from 'vue'
import DietTag from './DietTag.vue'
import QtyStepper from '../cart/QtyStepper.vue'
import AppIcon from '../ui/AppIcon.vue'
import { formatPrice } from '../../data/menu'
import { useCart } from '../../composables/useCart'
import { copy } from '../../data/copy'

const props = defineProps({ dish: { type: Object, required: true } })

const { qtyOf, setQty, add } = useCart()
const qty = computed(() => qtyOf(props.dish.id))

// The add button and the stepper swap places, so carry keyboard focus across
const root = ref(null)
async function addFirst() {
  add(props.dish.id)
  await nextTick()
  root.value.querySelector('.stepper button:last-child')?.focus()
}
async function update(value) {
  setQty(props.dish.id, value)
  if (value > 0) return
  await nextTick()
  root.value.querySelector('.dish__add')?.focus()
}
</script>

<template>
  <article ref="root" class="dish">
    <div class="dish__line">
      <h4 class="dish__name">{{ dish.name }}</h4>
      <span class="dish__leader" aria-hidden="true" />
      <p class="dish__price">
        <span v-if="!dish.price" class="visually-hidden">Price to be confirmed</span>
        <span :aria-hidden="!dish.price || undefined">{{ formatPrice(dish.price) }}</span>
      </p>
    </div>
    <p v-if="dish.desc" class="dish__desc">{{ dish.desc }}</p>
    <div class="dish__foot">
      <ul v-if="dish.tags.length" class="dish__tags" role="list">
        <li v-for="tag in dish.tags" :key="tag"><DietTag :tag="tag" /></li>
      </ul>
      <QtyStepper v-if="qty" class="dish__cart" :qty="qty" :name="dish.name" @update="update" />
      <button v-else type="button" class="dish__cart dish__add" @click="addFirst">
        <AppIcon name="plus" :size="16" />
        {{ copy.cart.add }}<span class="visually-hidden">: {{ dish.name }}</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
.dish {
  display: grid;
  gap: 0.125rem;
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--line);
}

.dish__line {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.dish__name,
.dish__price {
  margin: 0;
  font-size: var(--fs-dish);
  font-weight: 600;
  line-height: 1.35;
}

.dish__leader {
  flex: 1;
  min-width: 1.5rem;
  border-bottom: 2px dotted color-mix(in srgb, var(--c-ink) 28%, transparent);
  transform: translateY(-4px);
}

.dish__price {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.dish__desc {
  color: var(--text-muted);
  font-size: calc(var(--fs-body) * 0.94);
}

.dish__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-3);
}

.dish__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
}

.dish__cart {
  margin-left: auto;
}

.dish__add {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 40px;
  padding: 0 1rem 0 0.75rem;
  border: 1.5px solid var(--action);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--action);
  font-size: 0.9375rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}

@media (hover: hover) {
  .dish__add:hover { background: var(--action); color: var(--text-on-brand); }
}

.dish__add:active { transform: scale(0.97); }
</style>
