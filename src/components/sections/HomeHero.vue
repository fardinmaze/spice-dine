<script setup>
import { onMounted, ref } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import OpenStatusChip from '../ui/OpenStatusChip.vue'
import AvatarStack from '../ui/AvatarStack.vue'
import PlaceholderImage from '../ui/PlaceholderImage.vue'
import Squiggle from '../ui/Squiggle.vue'
import { site } from '../../config/site'
import { copy } from '../../data/copy'

const hero = copy.home.hero
const words = hero.title.split(' ')

// The page's one orchestrated moment: squiggle → words rise → lead & buttons → image settles
const loaded = ref(false)
onMounted(() => requestAnimationFrame(() => (loaded.value = true)))
</script>

<template>
  <section class="hero" :class="{ 'is-loaded': loaded }" data-actionbar-show-after>
    <div class="container hero__text">
      <div class="hero__intro">
        <p class="eyebrow">{{ hero.intro }}</p>
        <Squiggle :play="loaded" :width="170" />
      </div>

      <h1 class="hero__title" :aria-label="hero.title">
        <span v-for="(word, i) in words" :key="i" class="hero__word" aria-hidden="true">
          <span class="hero__word-inner" :style="{ '--i': i }">{{ word }}</span>
        </span>
      </h1>

      <p class="lead hero__fade" style="--d: 900ms">{{ hero.lead }}</p>

      <div class="hero__actions hero__fade" style="--d: 1000ms">
        <BaseButton :label="copy.cta.order" :href="site.orderUrl" external size="lg" />
        <BaseButton :label="copy.cta.menu" :to="{ path: '/', hash: '#menu' }" variant="secondary" size="lg" icon="arrow" />
      </div>

      <div class="hero__meta hero__fade" style="--d: 1100ms">
        <OpenStatusChip />
        <AvatarStack :avatars="hero.avatars" :label="hero.badge" />
      </div>
    </div>

    <div class="container">
      <div class="hero__image">
        <PlaceholderImage
          :src="hero.image.src"
          :alt="hero.image.alt"
          :label="hero.image.label"
          :position="hero.image.position"
          ratio="16 / 9"
          ratio-mobile="4 / 5"
          :width="1122"
          :height="1402"
          priority
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(2.5rem, 1rem + 5vw, 5rem) var(--section-y);
}

.hero__text {
  display: grid;
  justify-items: start;
  gap: var(--space-6);
  margin-bottom: clamp(2.5rem, 1.5rem + 3vw, 4rem);
}

.hero__intro {
  display: grid;
  gap: var(--space-1);
}

.hero__title {
  max-width: 16ch;
  color: var(--text);
}

.hero__word {
  display: inline-block;
  overflow: hidden;
  padding-bottom: 0.08em;
  margin-bottom: -0.08em;
  vertical-align: top;
}

.hero__word:not(:last-child) {
  margin-right: 0.24em;
}

.hero__word-inner {
  display: inline-block;
  transform: translateY(105%);
  transition: transform var(--dur-slow) var(--ease-out) calc(300ms + var(--i) * 70ms);
}

.hero__fade {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity var(--dur-slow) var(--ease-out) var(--d),
    transform var(--dur-slow) var(--ease-out) var(--d);
}

.hero__actions,
.hero__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}

.hero__meta {
  gap: var(--space-4);
}

.hero__image {
  overflow: hidden;
  border-radius: var(--radius-media);
}

.hero__image :deep(.media__frame) {
  transform: scale(1.06);
  transition: transform 1400ms var(--ease-out) 200ms;
}

.is-loaded .hero__word-inner,
.is-loaded .hero__fade,
.is-loaded .hero__image :deep(.media__frame) {
  opacity: 1;
  transform: none;
}

@media (max-width: 809px) {
  .hero__actions { width: 100%; }
  .hero__actions > * { flex: 1 1 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .hero__word-inner,
  .hero__fade,
  .hero__image :deep(.media__frame) {
    opacity: 1;
    transform: none;
  }
}
</style>
