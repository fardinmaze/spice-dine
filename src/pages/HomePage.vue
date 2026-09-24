<script setup>
import HomeHero from '../components/sections/HomeHero.vue'
import MarqueeBand from '../components/ui/MarqueeBand.vue'
import MenuSection from '../components/menu/MenuSection.vue'
import CtaBand from '../components/sections/CtaBand.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { marqueeDishes } from '../data/menu'
import { site } from '../config/site'
import { copy } from '../data/copy'
</script>

<template>
  <div>
    <HomeHero />
    <MarqueeBand :items="marqueeDishes" label="Dishes we cook" />
    <MenuSection />
    <CtaBand :title="copy.home.menuCta.title">
      <BaseButton :label="copy.cta.orderLong" :href="site.orderUrl" external variant="on-brand" size="lg" />
    </CtaBand>
  </div>
</template>
