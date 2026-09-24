<script setup>
import DietTag from './DietTag.vue'
import { formatPrice } from '../../data/menu'

defineProps({ dish: { type: Object, required: true } })
</script>

<template>
  <article class="dish">
    <div class="dish__line">
      <h4 class="dish__name">{{ dish.name }}</h4>
      <span class="dish__leader" aria-hidden="true" />
      <p class="dish__price">
        <span v-if="!dish.price" class="visually-hidden">Price to be confirmed</span>
        <span :aria-hidden="!dish.price || undefined">{{ formatPrice(dish.price) }}</span>
      </p>
    </div>
    <p class="dish__bn" lang="bn">{{ dish.nameBn }}</p>
    <p class="dish__desc">{{ dish.desc }}</p>
    <ul v-if="dish.tags.length" class="dish__tags" role="list">
      <li v-for="tag in dish.tags" :key="tag"><DietTag :tag="tag" /></li>
    </ul>
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

.dish__bn {
  font-size: var(--fs-bangla);
  line-height: 1.5;
  color: var(--text-muted);
}

.dish__desc {
  color: var(--text-muted);
  font-size: calc(var(--fs-body) * 0.94);
}

.dish__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
</style>
