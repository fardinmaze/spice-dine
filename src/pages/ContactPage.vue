<script setup>
import PageHero from '../components/sections/PageHero.vue'
import ContactForm from '../components/sections/ContactForm.vue'
import FaqSection from '../components/sections/FaqSection.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import OpenStatusChip from '../components/ui/OpenStatusChip.vue'
import HoursTable from '../components/ui/HoursTable.vue'
import MapEmbed from '../components/ui/MapEmbed.vue'
import { faqs, contactFaqIds } from '../data/faqs'
import { site } from '../config/site'
import { copy } from '../data/copy'

const c = copy.contact
const contactFaqs = faqs.filter((q) => contactFaqIds.includes(q.id))

const cards = [
  { icon: 'pin', title: c.cards.address, value: site.address, action: { label: copy.cta.directions, href: site.mapsUrl, external: true } },
  { icon: 'phone', title: c.cards.phone, value: site.phone, action: { label: copy.cta.call, href: site.phoneHref, icon: 'phone' } },
  { icon: 'mail', title: c.cards.email, value: site.email, action: { label: copy.cta.email, href: `mailto:${site.email}`, icon: 'arrow' } }, // email is PLACEHOLDER
]
</script>

<template>
  <div>
    <PageHero :title="c.hero.title" :lead="c.hero.lead" />

    <section class="container cards" aria-label="Contact details">
      <ul class="cards__grid" role="list">
        <li v-for="card in cards" :key="card.title" class="card">
          <span class="card__icon"><AppIcon :name="card.icon" :size="24" /></span>
          <h2 class="card__title">{{ card.title }}</h2>
          <p class="card__value">{{ card.value }}</p>
          <BaseButton
            :label="card.action.label"
            :href="card.action.href"
            :external="card.action.external"
            :icon="card.action.icon"
            variant="secondary"
            size="sm"
          />
        </li>
      </ul>
    </section>

    <section class="section" aria-labelledby="hours-title">
      <div class="container visit-grid">
        <div class="hours-block">
          <h2 id="hours-title" v-reveal>{{ c.hours.title }}</h2>
          <OpenStatusChip />
          <HoursTable />
        </div>
        <MapEmbed ratio="4 / 3" />
      </div>
    </section>

    <section class="section form-section" aria-labelledby="form-title">
      <div class="container form-grid">
        <div class="form-intro">
          <h2 id="form-title" v-reveal>{{ c.form.title }}</h2>
          <p class="lead">{{ c.form.lead }}</p>
          <BaseButton :label="copy.cta.order" :href="site.orderUrl" external variant="ghost-link" />
        </div>
        <ContactForm />
      </div>
    </section>

    <FaqSection :items="contactFaqs" :title="c.faq.title" :show-contact="false" />
  </div>
</template>

<style scoped>
.cards__grid {
  display: grid;
  gap: var(--space-4);
  margin: 0;
}

.card {
  display: grid;
  justify-items: start;
  align-content: start;
  gap: var(--space-2);
  padding: clamp(1.5rem, 1rem + 2vw, 2rem);
  border-radius: var(--radius-card);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
}

.card__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: var(--space-2);
  border-radius: 50%;
  background: var(--surface-soft);
  color: var(--action);
}

/* Card titles are h2 for outline order but sized like labels */
.card__title {
  font-family: var(--font-body);
  font-size: var(--fs-small);
  font-weight: 700;
  color: var(--text-muted);
}

.card__value {
  font-size: var(--fs-h3);
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: var(--space-3);
  overflow-wrap: anywhere;
}

@media (min-width: 810px) {
  .cards__grid { grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
}

.visit-grid,
.form-grid {
  display: grid;
  gap: var(--space-8);
}

.hours-block {
  display: grid;
  justify-items: start;
  align-content: start;
  gap: var(--space-6);
}

.hours-block :deep(table) {
  max-width: 30rem;
}

.form-section {
  background: var(--surface-soft);
}

.form-section :deep(input),
.form-section :deep(textarea) {
  background: var(--surface);
}

.form-intro {
  display: grid;
  justify-items: start;
  align-content: start;
  gap: var(--space-4);
}

@media (min-width: 1200px) {
  .visit-grid,
  .form-grid {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: var(--space-16);
  }
}
</style>
