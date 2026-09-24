<script setup>
import { onMounted, ref } from 'vue'
import Squiggle from '../ui/Squiggle.vue'

// Shared hero for inner pages: optional small line with squiggle, H1, lead, optional wide image slot.
defineProps({
  intro: { type: String, default: '' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
})

const loaded = ref(false)
onMounted(() => requestAnimationFrame(() => (loaded.value = true)))
</script>

<template>
  <section class="page-hero" :class="{ 'is-loaded': loaded }" data-actionbar-show-after>
    <div class="container page-hero__text">
      <div v-if="intro" class="page-hero__intro">
        <p class="eyebrow">{{ intro }}</p>
        <Squiggle :play="loaded" :width="150" />
      </div>
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="lead" class="lead page-hero__lead">{{ lead }}</p>
      <slot name="actions" />
    </div>
    <div v-if="$slots.default" class="container page-hero__media">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  padding-block: clamp(2.5rem, 1rem + 5vw, 5rem) var(--space-12);
}

.page-hero__text {
  display: grid;
  justify-items: start;
  gap: var(--space-6);
}

.page-hero__intro {
  display: grid;
  gap: var(--space-1);
}

.page-hero__title {
  max-width: 15ch;
}

.page-hero__title,
.page-hero__lead,
.page-hero__media {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity var(--dur-slow) var(--ease-out),
    transform var(--dur-slow) var(--ease-out);
}

.page-hero__title { transition-delay: 250ms; }
.page-hero__lead { transition-delay: 400ms; }
.page-hero__media { transition-delay: 550ms; margin-top: clamp(2.5rem, 1.5rem + 3vw, 4rem); }

.is-loaded .page-hero__title,
.is-loaded .page-hero__lead,
.is-loaded .page-hero__media {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .page-hero__title,
  .page-hero__lead,
  .page-hero__media {
    opacity: 1;
    transform: none;
  }
}
</style>
