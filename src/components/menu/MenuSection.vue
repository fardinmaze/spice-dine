<script setup>
import MenuTabsBar from './MenuTabsBar.vue'
import MenuTabsIndex from './MenuTabsIndex.vue'
import MenuCategory from './MenuCategory.vue'
import { menu } from '../../data/menu'
import { copy } from '../../data/copy'
import { useScrollSpy } from '../../composables/useScrollSpy'

// Both tab sets read and write this one spy state.
const ids = menu.map((c) => `menu-${c.id}`)

const cssPx = (name) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0
const offset = () => {
  const header = document.documentElement.dataset.header === 'hidden' ? 0 : cssPx('--header-h')
  return header + cssPx('--tabs-h') + 24
}

const { active, scrollTo } = useScrollSpy(ids, { offset })
</script>

<template>
  <section id="menu" class="menu" aria-labelledby="menu-title">
    <div class="container menu__intro">
      <h2 id="menu-title" v-reveal>{{ copy.home.menu.title }}</h2>
      <p class="lead">{{ copy.home.menu.lead }}</p>
    </div>

    <MenuTabsBar :categories="menu" :active="active" :label="copy.home.menu.tabsLabel" @select="scrollTo" />

    <div class="container menu__layout">
      <MenuTabsIndex :categories="menu" :active="active" :label="copy.home.menu.tabsLabel" @select="scrollTo" />
      <div class="menu__categories">
        <MenuCategory v-for="c in menu" :key="c.id" :category="c" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu {
  padding-top: var(--section-y);
  scroll-margin-top: var(--space-4);
}

.menu__intro {
  display: grid;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

@media (min-width: 1200px) {
  .menu__layout {
    display: grid;
    grid-template-columns: 13.5rem minmax(0, 1fr);
    gap: var(--space-12);
  }
}
</style>
