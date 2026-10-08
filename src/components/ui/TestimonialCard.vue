<script setup>
defineProps({ review: { type: Object, required: true } })
</script>

<template>
  <figure class="testimonial">
    <svg class="testimonial__mark" viewBox="0 0 48 36" aria-hidden="true">
      <path d="M0 36V22C0 9.5 6.2 2.2 18.5 0l2 5.6C13.8 7.4 10.4 11.4 10.2 17.6H20V36H0Zm28 0V22C28 9.5 34.2 2.2 46.5 0l2 5.6c-6.7 1.8-10.1 5.8-10.3 12H48V36H28Z" />
    </svg>
    <blockquote class="testimonial__quote">
      <p>{{ review.quote }}</p>
    </blockquote>
    <figcaption class="testimonial__name">{{ review.name }}</figcaption>
  </figure>
</template>

<style scoped>
.testimonial {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  height: 100%;
  margin: 0;
  padding: clamp(1.5rem, 1rem + 2vw, 2.25rem);
  border-radius: var(--radius-card);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
}

.testimonial__mark {
  width: 44px;
  fill: var(--action);
}

.testimonial__quote {
  flex: 1;
  margin: 0;
  font-size: calc(var(--fs-body) * 1.08);
  line-height: 1.55;
}

.testimonial__name {
  font-weight: 700;
}
</style>
