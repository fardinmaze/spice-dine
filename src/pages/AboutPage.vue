<script setup>
import PageHero from '../components/sections/PageHero.vue'
import CtaBand from '../components/sections/CtaBand.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import PlaceholderImage from '../components/ui/PlaceholderImage.vue'
import SnapCarousel from '../components/ui/SnapCarousel.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import { storyBlocks, values, kitchenGallery } from '../data/story'
import { site } from '../config/site'
import { copy } from '../data/copy'

const a = copy.about
</script>

<template>
  <div>
    <PageHero :intro="a.hero.intro" :title="a.hero.title" :lead="a.hero.lead">
      <PlaceholderImage
        :src="a.hero.image.src"
        :alt="a.hero.image.alt"
        :label="a.hero.image.label"
        ratio="21 / 9"
        ratio-mobile="4 / 5"
        :width="1600"
        :height="686"
        priority
      />
    </PageHero>

    <section class="section" aria-label="Our story">
      <div class="container story">
        <article v-for="(block, i) in storyBlocks" :key="block.title" class="story__row" :class="{ 'is-flipped': i % 2 }">
          <PlaceholderImage v-reveal :src="block.image.src" :alt="block.image.alt" :label="block.image.label" ratio="3 / 2" ratio-mobile="4 / 3" />
          <div class="story__text">
            <h2 v-reveal class="story__title">{{ block.title }}</h2>
            <p>{{ block.body }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section values" aria-labelledby="values-title">
      <div class="container">
        <h2 id="values-title" v-reveal class="values__title">{{ a.values.title }}</h2>
        <ul class="values__grid" role="list">
          <li v-for="v in values" :key="v.title" class="value">
            <span class="value__icon"><AppIcon :name="v.icon" :size="26" /></span>
            <h3>{{ v.title }}</h3>
            <p>{{ v.body }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="section" aria-labelledby="gallery-title">
      <div class="container">
        <SnapCarousel :items="kitchenGallery" :label="a.gallery.title">
          <template #header>
            <h2 id="gallery-title" v-reveal>{{ a.gallery.title }}</h2>
          </template>
          <template #default="{ item }">
            <PlaceholderImage :src="item.image.src" :alt="item.image.alt" :label="item.image.label" :caption="item.caption" ratio="4 / 5" />
          </template>
        </SnapCarousel>
      </div>
    </section>

    <CtaBand :title="a.cta.title">
      <BaseButton :label="copy.cta.order" :href="site.orderUrl" external variant="on-brand" size="lg" />
      <BaseButton :label="copy.cta.menu" :to="{ path: '/', hash: '#menu' }" variant="on-brand-outline" icon="arrow" size="lg" />
    </CtaBand>
  </div>
</template>

<style scoped>
.story {
  display: grid;
  gap: clamp(3.5rem, 2rem + 5vw, 7rem);
}

.story__row {
  display: grid;
  gap: var(--space-6);
  align-items: center;
}

.story__text {
  display: grid;
  gap: var(--space-4);
  max-width: 34rem;
}

.story__title {
  font-size: clamp(2rem, 1.4rem + 2.4vw, 3rem);
}

.story__text p {
  font-size: calc(var(--fs-body) * 1.08);
  color: var(--text-muted);
}

@media (min-width: 810px) {
  .story__row {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    gap: clamp(2.5rem, 1rem + 4vw, 5rem);
  }

  .story__row.is-flipped > :first-child {
    order: 2;
  }
}

.values {
  background: var(--surface-soft);
}

.values__title {
  margin-bottom: var(--space-8);
}

.values__grid {
  display: grid;
  gap: var(--space-4);
  margin: 0;
}

.value {
  display: grid;
  gap: var(--space-3);
  align-content: start;
  padding: clamp(1.5rem, 1rem + 2vw, 2.25rem);
  border-radius: var(--radius-card);
  background: var(--surface);
}

.value__icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: var(--space-2);
  border-radius: 50%;
  background: var(--highlight);
  color: var(--c-ink);
}

.value p {
  color: var(--text-muted);
}

@media (min-width: 810px) {
  .values__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }
}
</style>
