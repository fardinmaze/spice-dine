<script setup>
import HomeHero from '../components/sections/HomeHero.vue'
import MarqueeBand from '../components/ui/MarqueeBand.vue'
import MenuSection from '../components/menu/MenuSection.vue'
import CtaBand from '../components/sections/CtaBand.vue'
import CateringSection from '../components/sections/CateringSection.vue'
import AboutTeaser from '../components/sections/AboutTeaser.vue'
import ReviewsSection from '../components/sections/ReviewsSection.vue'
import FaqSection from '../components/sections/FaqSection.vue'
import VisitSection from '../components/sections/VisitSection.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { marqueeDishes } from '../data/menu'
import { faqs } from '../data/faqs'
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
    <CateringSection />
    <AboutTeaser />
    <ReviewsSection />
    <FaqSection :items="faqs" :title="copy.home.faq.title" :lead="copy.home.faq.lead" />
    <VisitSection />
  </div>
</template>
