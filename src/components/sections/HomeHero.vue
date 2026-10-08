<script setup>
import { onMounted, ref } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import OpenStatusChip from '../ui/OpenStatusChip.vue'
import AvatarStack from '../ui/AvatarStack.vue'
import AppIcon from '../ui/AppIcon.vue'
import Squiggle from '../ui/Squiggle.vue'
import { site } from '../../config/site'
import { copy } from '../../data/copy'

const hero = copy.home.hero
const words = hero.title.split(' ')

// The page's one orchestrated moment: squiggle → words rise → lead & buttons → video settles
const loaded = ref(false)

// Hero video: muted loop, with a pause button. Reduced-motion visitors get the poster and press play themselves.
const video = ref(null)
const playing = ref(false)

function toggleVideo() {
  const v = video.value
  if (!v) return
  if (v.paused) v.play().catch(() => {})
  else v.pause()
}

onMounted(() => {
  requestAnimationFrame(() => (loaded.value = true))
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.value?.play().catch(() => {})
})
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
      <div class="hero__media">
        <video
          ref="video"
          class="hero__video"
          :src="hero.video.src"
          :poster="hero.video.poster"
          :aria-label="hero.video.label"
          width="1280"
          height="720"
          muted
          loop
          playsinline
          preload="auto"
          disablepictureinpicture
          @play="playing = true"
          @pause="playing = false"
        />
        <button
          type="button"
          class="hero__toggle"
          :aria-label="playing ? hero.video.pause : hero.video.play"
          @click="toggleVideo"
        >
          <AppIcon :name="playing ? 'pause' : 'play'" :size="18" />
        </button>
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

/* 16:9 at every width: the video has text in the picture, so it is never cropped */
.hero__media {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-media);
  background: var(--surface-soft);
}

.hero__video {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transform: scale(1.06);
  transition: transform 1400ms var(--ease-out) 200ms;
}

.hero__toggle {
  position: absolute;
  right: clamp(0.75rem, 0.5rem + 1vw, 1.25rem);
  bottom: clamp(0.75rem, 0.5rem + 1vw, 1.25rem);
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: color-mix(in srgb, var(--c-ink) 62%, transparent);
  color: var(--c-white);
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background var(--dur-fast) var(--ease-out);
}

.hero__toggle:hover {
  background: color-mix(in srgb, var(--c-ink) 80%, transparent);
}

.hero__toggle:focus-visible {
  outline: 3px solid var(--c-turmeric);
  outline-offset: 3px;
}

.is-loaded .hero__word-inner,
.is-loaded .hero__fade,
.is-loaded .hero__video {
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
  .hero__video {
    opacity: 1;
    transform: none;
  }
}
</style>
