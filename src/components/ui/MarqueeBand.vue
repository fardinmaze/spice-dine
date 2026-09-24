<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

// Infinite ticker. Two identical groups slide by -50%; the second is aria-hidden.
// Under reduced motion it becomes one static, wrapped row.
const props = defineProps({
  items: { type: Array, required: true }, // [{ text, lang? }]
  label: { type: String, required: true },
  variant: { type: String, default: 'band', validator: (v) => ['band', 'ticker'].includes(v) },
  duration: { type: Number, default: 36 }, // seconds per loop
  repeat: { type: Number, default: 2 }, // copies per group so it overflows wide screens
})

const icons = ['chilli', 'leaf', 'bowl']
const loop = computed(() =>
  Array.from({ length: props.repeat }, (_, r) => props.items.map((item, i) => ({ ...item, key: `${r}-${i}`, repeat: r > 0 }))).flat(),
)
</script>

<template>
  <div class="marquee" :class="`marquee--${variant}`" role="marquee" :aria-label="label" :style="{ '--duration': `${duration}s` }">
    <div class="marquee__track">
      <ul v-for="copy in 2" :key="copy" class="marquee__group" role="list" :aria-hidden="copy === 2 ? 'true' : undefined">
        <li v-for="(item, i) in loop" :key="item.key" class="marquee__item" :class="{ 'is-repeat': item.repeat }">
          <span :lang="item.lang">{{ item.text }}</span>
          <span class="marquee__sep" aria-hidden="true">
            <AppIcon v-if="variant === 'band'" :name="icons[i % icons.length]" :size="30" />
            <template v-else>✦</template>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  background: var(--highlight);
  color: var(--text);
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee var(--duration) linear infinite;
}

.marquee:hover .marquee__track {
  animation-play-state: paused;
}

.marquee__group {
  display: flex;
  flex: none;
  margin: 0;
  padding: 0;
  list-style: none;
}

.marquee__item {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.marquee--band {
  padding-block: clamp(1rem, 0.6rem + 1.4vw, 1.75rem);
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 1.2rem + 2.4vw, 3.25rem);
  line-height: 1.2;
}

.marquee--band [lang='bn'] {
  font-family: var(--font-bangla);
  font-weight: 700;
}

.marquee--band .marquee__sep {
  display: grid;
  place-items: center;
  margin-inline: clamp(1.25rem, 0.8rem + 1.5vw, 2.25rem);
  color: var(--c-royal);
}

.marquee--ticker {
  font-size: var(--fs-small);
  font-weight: 600;
  padding-block: 0.5rem;
}

.marquee--ticker .marquee__sep {
  margin-inline: 1.25rem;
  color: var(--c-royal);
}

@keyframes marquee {
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    width: auto;
    animation: none;
    justify-content: center;
  }

  .marquee__group {
    flex: auto;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: var(--space-2);
    padding-inline: var(--gutter);
  }

  .marquee__group[aria-hidden],
  .marquee__item.is-repeat {
    display: none;
  }

  .marquee__item:last-child .marquee__sep {
    display: none;
  }
}
</style>
