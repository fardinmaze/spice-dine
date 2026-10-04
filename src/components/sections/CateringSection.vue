<script setup>
import BaseButton from '../ui/BaseButton.vue'
import PlaceholderImage from '../ui/PlaceholderImage.vue'
import AppIcon from '../ui/AppIcon.vue'
import { openOverlay } from '../../composables/useOverlays'
import { site } from '../../config/site'
import { copy } from '../../data/copy'

const c = copy.home.catering
</script>

<template>
  <section id="catering" class="catering section" aria-labelledby="catering-title">
    <div class="container catering__card">
      <div class="catering__text">
        <p class="catering__badge"><AppIcon name="users" :size="18" /> {{ c.intro }}</p>
        <h2 id="catering-title" v-reveal>{{ c.title }}</h2>
        <p class="lead">{{ c.lead }}</p>
        <ul class="catering__points" role="list">
          <li v-for="point in c.points" :key="point">{{ point }}</li>
        </ul>
        <div class="catering__actions">
          <BaseButton :label="copy.cta.catering" icon="arrow" size="lg" @click="openOverlay('catering')" />
          <p class="catering__phone">
            {{ c.phoneLabel }} <a :href="site.phoneHref">{{ site.phone }}</a>
          </p>
        </div>
      </div>
      <PlaceholderImage
        v-reveal
        class="catering__image"
        :src="c.image.src"
        :alt="c.image.alt"
        :label="c.image.label"
        ratio="4 / 5"
        ratio-mobile="4 / 3"
      />
    </div>
  </section>
</template>

<style scoped>
.catering__card {
  display: grid;
  gap: var(--space-8);
  align-items: center;
}

.catering__text {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
}

.catering__text h2 {
  max-width: 14ch;
}

.catering__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.375rem 0.875rem;
  border-radius: var(--radius-pill);
  background: var(--highlight);
  color: var(--c-ink);
  font-size: var(--fs-small);
  font-weight: 700;
}

.catering__points {
  display: grid;
  gap: var(--space-2);
  margin: 0;
}

.catering__points li {
  display: flex;
  gap: var(--space-3);
  font-weight: 600;
}

.catering__points li::before {
  content: '';
  flex: none;
  width: 8px;
  height: 8px;
  margin-top: 0.6em;
  border-radius: 50%;
  background: var(--action);
}

.catering__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-6);
  margin-top: var(--space-4);
}

.catering__phone {
  color: var(--text-muted);
}

.catering__phone a {
  color: var(--action);
  font-weight: 700;
  white-space: nowrap;
}

@media (min-width: 1024px) {
  .catering__card {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    gap: var(--space-16);
  }
}
</style>
