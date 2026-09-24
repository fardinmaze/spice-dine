<script setup>
import { ref, useId } from 'vue'

// Single-open accordion. Panel height animates via grid-template-rows 0fr → 1fr.
defineProps({ items: { type: Array, required: true } }) // [{ id, q, a }]

const uid = useId()
const openId = ref(null)
const toggle = (id) => (openId.value = openId.value === id ? null : id)
</script>

<template>
  <ul class="faq" role="list">
    <li v-for="item in items" :key="item.id" class="faq__item" :class="{ 'is-open': openId === item.id }">
      <h3 class="faq__heading">
        <button
          :id="`${uid}-${item.id}-btn`"
          type="button"
          class="faq__btn"
          :aria-expanded="openId === item.id"
          :aria-controls="`${uid}-${item.id}`"
          @click="toggle(item.id)"
        >
          <span>{{ item.q }}</span>
          <span class="faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <div :id="`${uid}-${item.id}`" class="faq__panel" role="region" :aria-labelledby="`${uid}-${item.id}-btn`" :inert="openId !== item.id || undefined">
        <div class="faq__panel-inner">
          <p>{{ item.a }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.faq {
  margin: 0;
  border-top: 1px solid var(--line);
}

.faq__item {
  border-bottom: 1px solid var(--line);
}

.faq__heading {
  font-size: var(--fs-dish);
}

.faq__btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  width: 100%;
  min-height: 64px;
  padding: var(--space-4) 0;
  border: 0;
  background: none;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

/* + in a circle that rotates to × and fills turmeric when open */
.faq__icon {
  position: relative;
  flex: none;
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--text);
  border-radius: 50%;
  transition:
    transform var(--dur-base) var(--ease-in-out),
    background-color var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out);
}

.faq__icon::before,
.faq__icon::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 14px;
  height: 1.6px;
  border-radius: 1px;
  background: currentColor;
}

.faq__icon::after {
  transform: rotate(90deg);
}

@media (hover: hover) {
  .faq__btn:hover .faq__icon { background: var(--surface-soft); }
}

.is-open .faq__icon,
.is-open .faq__btn:hover .faq__icon {
  transform: rotate(135deg);
  background: var(--highlight);
  border-color: var(--highlight);
}

.faq__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--dur-base) var(--ease-in-out);
}

.is-open .faq__panel {
  grid-template-rows: 1fr;
}

.faq__panel-inner {
  overflow: hidden;
}

.faq__panel-inner p {
  padding: 0 3.5rem var(--space-6) 0;
  color: var(--text-muted);
  max-width: 60ch;
}
</style>
