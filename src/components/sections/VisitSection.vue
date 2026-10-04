<script setup>
import BaseButton from '../ui/BaseButton.vue'
import OpenStatusChip from '../ui/OpenStatusChip.vue'
import HoursTable from '../ui/HoursTable.vue'
import MapEmbed from '../ui/MapEmbed.vue'
import AppIcon from '../ui/AppIcon.vue'
import { site } from '../../config/site'
import { copy } from '../../data/copy'
</script>

<template>
  <section id="visit" class="visit section on-brand" aria-labelledby="visit-title" data-actionbar-hide>
    <div class="container visit__grid">
      <div class="visit__info">
        <h2 id="visit-title" v-reveal>{{ copy.home.visit.title }}</h2>
        <OpenStatusChip tone="on-brand" />

        <p class="visit__address">
          <AppIcon name="pin" :size="22" />
          <span>{{ site.address }}</span>
        </p>

        <div class="visit__hours">
          <h3>{{ copy.home.visit.hours }}</h3>
          <HoursTable tone="on-brand" />
        </div>

        <div class="visit__actions">
          <BaseButton :label="copy.cta.order" :href="site.orderUrl" external variant="on-brand" />
          <BaseButton :label="copy.cta.call" :href="site.phoneHref" icon="phone" variant="on-brand-outline" />
          <BaseButton :label="copy.cta.directions" :href="site.mapsUrl" external variant="on-brand-outline" />
        </div>
      </div>

      <MapEmbed ratio="4 / 5" class="visit__map" />
    </div>
  </section>
</template>

<style scoped>
.visit__grid {
  display: grid;
  gap: var(--space-8);
}

.visit__info {
  display: grid;
  justify-items: start;
  align-content: start;
  gap: var(--space-6);
}

.visit__hours {
  display: grid;
  gap: var(--space-2);
  width: 100%;
  max-width: 30rem;
}

.visit__address {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-weight: 600;
}

.visit__address .icon {
  margin-top: 3px;
}

.visit__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.visit__map {
  border: 6px solid rgb(255 255 255 / 0.12);
}

@media (min-width: 1200px) {
  .visit__grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--space-16);
    align-items: center;
  }
}
</style>
