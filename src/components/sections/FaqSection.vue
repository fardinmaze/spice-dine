<script setup>
import BaseButton from '../ui/BaseButton.vue'
import FaqAccordion from '../ui/FaqAccordion.vue'
import { copy } from '../../data/copy'

defineProps({
  items: { type: Array, required: true },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  showContact: { type: Boolean, default: true },
})
</script>

<template>
  <section class="faq-section section" aria-labelledby="faq-title">
    <div class="container faq-section__grid">
      <div class="faq-section__intro">
        <h2 id="faq-title" v-reveal>{{ title }}</h2>
        <p v-if="lead" class="lead">{{ lead }}</p>
        <BaseButton v-if="showContact" :label="copy.cta.contact" to="/contact" variant="secondary" icon="arrow" />
      </div>
      <FaqAccordion :items="items" />
    </div>
  </section>
</template>

<style scoped>
.faq-section__grid {
  display: grid;
  gap: var(--space-8);
}

.faq-section__intro {
  display: grid;
  justify-items: start;
  align-content: start;
  gap: var(--space-4);
}

@media (min-width: 810px) {
  .faq-section__grid {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: var(--space-12);
  }

  .faq-section__intro {
    position: sticky;
    top: calc(var(--sticky-top) + var(--space-8));
    transition: top var(--dur-base) var(--ease-in-out);
  }
}
</style>
