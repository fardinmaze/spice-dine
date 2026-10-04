<script setup>
import MenuTabsBar from './MenuTabsBar.vue'
import MenuTabsIndex from './MenuTabsIndex.vue'
import MenuCategory from './MenuCategory.vue'
import AppIcon from '../ui/AppIcon.vue'
import { menu, ON_DEMAND_ID } from '../../data/menu'
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
      <p class="on-demand">
        <span class="on-demand__icon"><AppIcon name="clock" :size="22" /></span>
        <span>
          <strong>{{ copy.home.menu.onDemand.title }}.</strong> {{ copy.home.menu.onDemand.body }}
          <a :href="`#menu-${ON_DEMAND_ID}`" class="on-demand__link" @click.prevent="scrollTo(`menu-${ON_DEMAND_ID}`)">{{ copy.home.menu.onDemand.link }}</a>
        </span>
      </p>
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

.on-demand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  max-width: 40rem;
  margin-top: var(--space-2);
  padding: var(--space-3) var(--space-6) var(--space-3) var(--space-3);
  border-radius: var(--radius-card);
  background: color-mix(in srgb, var(--highlight) 22%, var(--surface));
}

.on-demand__link {
  margin-left: var(--space-1);
  color: var(--action);
  font-weight: 700;
  white-space: nowrap;
  text-underline-offset: 3px;
}

.on-demand__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--highlight);
  color: var(--c-ink);
}

@media (min-width: 1200px) {
  .menu__layout {
    display: grid;
    grid-template-columns: 13.5rem minmax(0, 1fr);
    gap: var(--space-12);
  }
}
</style>
