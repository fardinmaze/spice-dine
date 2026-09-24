<script setup>
import PageHero from '../components/sections/PageHero.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { site } from '../config/site'
import { copy } from '../data/copy'
</script>

<template>
  <div class="not-found">
    <PageHero :title="copy.notFound.title" :lead="copy.notFound.lead">
      <template #actions>
        <div class="not-found__actions">
          <BaseButton :label="copy.cta.home" to="/" variant="secondary" icon="arrow" size="lg" />
          <BaseButton :label="copy.cta.order" :href="site.orderUrl" external size="lg" />
        </div>
      </template>
    </PageHero>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  padding-bottom: var(--section-y);
}

.not-found__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>
