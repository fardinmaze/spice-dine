<script setup>
import DishRow from './DishRow.vue'
import PlaceholderImage from '../ui/PlaceholderImage.vue'

defineProps({ category: { type: Object, required: true } })
</script>

<template>
  <section :id="`menu-${category.id}`" class="category" :aria-labelledby="`menu-${category.id}-title`">
    <header class="category__head">
      <h3 :id="`menu-${category.id}-title`" v-reveal>{{ category.title }}</h3>
    </header>

    <div class="category__body">
      <ul class="category__list" role="list">
        <li v-for="(dish, i) in category.items" :key="dish.name" v-reveal="{ delay: i * 50, distance: 12 }">
          <DishRow :dish="dish" />
        </li>
      </ul>

      <div class="category__media">
        <PlaceholderImage
          v-for="(image, i) in category.images"
          :key="i"
          v-reveal="{ delay: i * 80 }"
          :src="image.src"
          :alt="image.alt"
          :caption="image.caption"
          :label="`${category.title} photo`"
          ratio="4 / 5"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.category {
  scroll-margin-top: calc(var(--tabs-h) + var(--space-6));
  padding-block: var(--space-12);
  border-top: 1px solid var(--line);
}

.category:first-child {
  border-top: 0;
  padding-top: var(--space-8);
}

.category__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-1) var(--space-3);
  margin-bottom: var(--space-4);
}

.category__head h3 {
  font-size: clamp(1.5rem, 1.2rem + 1.2vw, 2rem);
  color: var(--action);
}

.category__body {
  display: grid;
  gap: var(--space-6);
}

/* Mobile: photos sit under the title, above the list */
.category__media {
  order: -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.category__list {
  margin: 0;
}

@media (min-width: 810px) {
  .category__body {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
    gap: clamp(2rem, 1rem + 3vw, 4rem);
    align-items: start;
  }

  .category__media {
    order: 0;
    position: sticky;
    top: calc(var(--sticky-top) + var(--tabs-h) + var(--space-6));
    gap: var(--space-4);
    transition: top var(--dur-base) var(--ease-in-out);
  }

  .category__media > :nth-child(2) {
    margin-top: var(--space-12);
  }
}
</style>
