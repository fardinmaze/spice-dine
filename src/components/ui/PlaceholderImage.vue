<script setup>
import AppIcon from './AppIcon.vue'

// Renders a real <img> when `src` is set, otherwise a tinted placeholder block of the same shape.
// `ratio` and `ratioMobile` are CSS aspect-ratio values; below 810px `ratioMobile` wins.
defineProps({
  src: { type: String, default: null },
  alt: { type: String, default: '' },
  label: { type: String, default: '' }, // shown inside the placeholder
  caption: { type: String, default: '' }, // rendered as <figcaption>
  ratio: { type: String, default: '4 / 5' },
  ratioMobile: { type: String, default: null },
  position: { type: String, default: null }, // object-position focal point for cropped photos
  width: { type: Number, default: 800 },
  height: { type: Number, default: 1000 },
  priority: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
})
</script>

<template>
  <component :is="caption ? 'figure' : 'div'" class="media">
    <div
      class="media__frame"
      :class="{ 'is-round': round }"
      :style="{ '--ratio': ratio, '--ratio-mobile': ratioMobile || ratio }"
    >
      <img
        v-if="src"
        :src="src"
        :alt="alt"
        :style="position ? { objectPosition: position } : undefined"
        :width="width"
        :height="height"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : undefined"
        decoding="async"
      />
      <div v-else class="media__placeholder" :role="alt ? 'img' : undefined" :aria-label="alt ? `Placeholder: ${alt}` : undefined">
        <AppIcon name="bowl" :size="round ? 18 : 32" />
        <span v-if="label && !round" class="media__label">{{ label }}</span>
      </div>
    </div>
    <figcaption v-if="caption" class="media__caption">{{ caption }}</figcaption>
  </component>
</template>

<style scoped>
.media {
  margin: 0;
}

.media__frame {
  position: relative;
  aspect-ratio: var(--ratio-mobile);
  overflow: hidden;
  border-radius: var(--radius-media);
  background: var(--surface-soft);
}

.media__frame.is-round {
  border-radius: 50%;
}

@media (min-width: 810px) {
  .media__frame { aspect-ratio: var(--ratio); }
}

.media__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media__placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: var(--space-2);
  padding: var(--space-4);
  color: color-mix(in srgb, var(--c-royal) 55%, var(--surface-soft));
  background:
    radial-gradient(circle at 30% 20%, rgb(255 255 255 / 0.7), transparent 55%),
    var(--surface-soft);
  text-align: center;
}

.media__label {
  font-size: var(--fs-small);
  font-weight: 600;
  color: var(--text-muted);
}

.media__caption {
  margin-top: var(--space-3);
  font-size: var(--fs-small);
  color: var(--text-muted);
}
</style>
