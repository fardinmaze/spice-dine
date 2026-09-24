<script setup>
// Tabs B: sticky vertical category index, desktop (≥1200px) only.
defineProps({
  categories: { type: Array, required: true },
  active: { type: String, required: true },
  label: { type: String, required: true },
})
const emit = defineEmits(['select'])
</script>

<template>
  <nav class="index" :aria-label="`${label} (index)`">
    <ol class="index__list" role="list">
      <li v-for="c in categories" :key="c.id">
        <a
          :href="`#menu-${c.id}`"
          class="index__link"
          :aria-current="active === `menu-${c.id}` ? 'true' : undefined"
          @click.prevent="emit('select', `menu-${c.id}`)"
        >
          <span class="index__dot" aria-hidden="true" />
          {{ c.title }}
        </a>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.index {
  display: none;
}

@media (min-width: 1200px) {
  .index {
    display: block;
    position: sticky;
    top: calc(var(--sticky-top) + var(--tabs-h) + var(--space-8));
    align-self: start;
    padding-top: var(--space-8);
    transition: top var(--dur-base) var(--ease-in-out);
  }
}

.index__list {
  margin: 0;
  display: grid;
  gap: var(--space-1);
  border-left: 1px solid var(--line);
}

.index__link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 40px;
  margin-left: -4.5px;
  color: var(--text-muted);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--dur-base) var(--ease-out);
}

.index__dot {
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--bg);
  border: 1px solid var(--line);
  transition: background-color var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
}

@media (hover: hover) {
  .index__link:hover { color: var(--text); }
}

.index__link[aria-current='true'] {
  color: var(--text);
  font-weight: 700;
}

.index__link[aria-current='true'] .index__dot {
  background: var(--action);
  border-color: var(--action);
  transform: scale(1.25);
}
</style>
