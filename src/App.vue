<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AnnouncementBar from './components/layout/AnnouncementBar.vue'
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import MobileActionBar from './components/layout/MobileActionBar.vue'
import DraftBadge from './components/layout/DraftBadge.vue'

const route = useRoute()
const skip = computed(() =>
  route.name === 'home' ? { href: '#menu', label: 'Skip to menu' } : { href: '#main', label: 'Skip to content' },
)
</script>

<template>
  <a class="skip-link" :href="skip.href">{{ skip.label }}</a>
  <AnnouncementBar />
  <SiteHeader />
  <main id="main" tabindex="-1">
    <RouterView v-slot="{ Component }">
      <Transition name="route-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
  <MobileActionBar />
  <DraftBadge />
</template>

<style>
main:focus {
  outline: none;
}
</style>
