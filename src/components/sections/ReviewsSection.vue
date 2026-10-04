<script setup>
import TestimonialCard from '../ui/TestimonialCard.vue'
import { reviews } from '../../data/reviews'
import { copy } from '../../data/copy'
</script>

<template>
  <section class="reviews section" aria-labelledby="reviews-title">
    <div class="container">
      <h2 id="reviews-title" v-reveal class="reviews__title">{{ copy.home.reviews.title }}</h2>
      <ul class="reviews__grid" role="list">
        <li v-for="(review, i) in reviews" :key="i">
          <TestimonialCard :review="review" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Soft band so it reads apart from the plain Catering section above */
.reviews {
  background: var(--surface-soft);
}

.reviews__title {
  margin-bottom: var(--space-8);
  max-width: 14ch;
}

.reviews__grid {
  display: grid;
  gap: var(--space-4);
  margin: 0;
}

@media (min-width: 810px) {
  .reviews__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }

  /* Gentle stagger so three equal cards don't read as a template row */
  .reviews__grid li:nth-child(2) { transform: translateY(var(--space-8)); }
}
</style>
