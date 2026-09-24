<script setup>
import BaseButton from '../ui/BaseButton.vue'
import SnapCarousel from '../ui/SnapCarousel.vue'
import PlaceholderImage from '../ui/PlaceholderImage.vue'
import { teaserSlides } from '../../data/story'
import { copy } from '../../data/copy'

const t = copy.home.aboutTeaser
</script>

<template>
  <section class="teaser section" aria-labelledby="teaser-title">
    <div class="container teaser__grid">
      <div class="teaser__text">
        <p class="eyebrow">{{ t.intro }}</p>
        <h2 id="teaser-title" v-reveal>{{ t.title }}</h2>
        <BaseButton :label="copy.cta.story" to="/about" variant="secondary" icon="arrow" />
      </div>

      <SnapCarousel :items="teaserSlides" :label="`${copy.cta.story} photos`" item-width="clamp(15rem, 62vw, 19rem)">
        <template #default="{ item }">
          <RouterLink to="/about" class="slide">
            <PlaceholderImage :src="item.image.src" :alt="item.image.alt" :label="item.image.label" ratio="4 / 5" />
            <span class="slide__caption">{{ item.caption }}</span>
          </RouterLink>
        </template>
      </SnapCarousel>
    </div>
  </section>
</template>

<style scoped>
.teaser {
  background: var(--surface-soft);
}

.teaser__grid {
  display: grid;
  gap: var(--space-8);
}

.teaser__text {
  display: grid;
  justify-items: start;
  align-content: start;
  gap: var(--space-4);
}

.teaser__text h2 {
  max-width: 14ch;
  margin-bottom: var(--space-4);
}

.slide {
  display: grid;
  gap: var(--space-3);
  text-decoration: none;
  border-radius: var(--radius-media);
}

/* Section is already --surface-soft, so placeholders need a deeper tint to read */
.slide :deep(.media__placeholder) {
  background: color-mix(in srgb, var(--c-royal) 9%, var(--surface));
}

.slide :deep(.media__frame > *) {
  transition: transform 700ms var(--ease-out);
}

@media (hover: hover) {
  .slide:hover :deep(.media__frame > *) { transform: scale(1.04); }
}

.slide__caption {
  font-weight: 600;
}

@media (min-width: 1200px) {
  .teaser__grid {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.6fr);
    gap: var(--space-12);
  }
}
</style>
