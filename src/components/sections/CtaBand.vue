<script setup>
defineProps({
  title: { type: String, required: true },
  lead: { type: String, default: '' },
})
</script>

<template>
  <section class="cta on-brand">
    <div class="container cta__inner">
      <div>
        <h2 v-reveal>{{ title }}</h2>
        <p v-if="lead" class="lead">{{ lead }}</p>
      </div>
      <div class="cta__actions">
        <slot />
      </div>
    </div>
    <svg class="cta__deco" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="92" />
      <circle cx="100" cy="100" r="58" />
    </svg>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  overflow: hidden;
  padding-block: clamp(3.5rem, 2rem + 5vw, 6rem);
}

.cta__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

/* A plate, drawn in outline, peeking in from the right */
.cta__deco {
  position: absolute;
  right: -60px;
  top: 50%;
  width: clamp(200px, 30vw, 380px);
  transform: translateY(-50%);
  fill: none;
  stroke: rgb(255 255 255 / 0.14);
  stroke-width: 1.5;
}
</style>
