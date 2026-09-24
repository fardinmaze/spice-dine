<script setup>
import PlaceholderImage from './PlaceholderImage.vue'

defineProps({
  avatars: { type: Array, required: true }, // [{ src, alt }]
  label: { type: String, required: true },
})
</script>

<template>
  <div class="avatars">
    <ul class="avatars__stack" role="list">
      <li v-for="(a, i) in avatars" :key="i">
        <PlaceholderImage :src="a.src" :alt="a.alt" ratio="1" round :width="96" :height="96" />
      </li>
    </ul>
    <p class="avatars__badge">{{ label }}</p>
  </div>
</template>

<style scoped>
.avatars {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0.375rem 1rem 0.375rem 0.375rem;
  border-radius: var(--radius-pill);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
}

.avatars__stack {
  display: flex;
  margin: 0;
}

.avatars__stack li {
  width: 40px;
  border: 3px solid var(--surface);
  border-radius: 50%;
}

.avatars__stack li + li {
  margin-left: -14px;
}

.avatars__stack li:nth-child(2) :deep(.media__frame) { background: color-mix(in srgb, var(--highlight) 35%, var(--surface)); }
.avatars__stack li:nth-child(3) :deep(.media__frame) { background: color-mix(in srgb, var(--leaf) 18%, var(--surface)); }

.avatars__badge {
  font-size: var(--fs-small);
  font-weight: 700;
}
</style>
