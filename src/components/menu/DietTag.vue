<script setup>
import { tagLabels } from '../../data/menu'

defineProps({ tag: { type: String, required: true } })
</script>

<template>
  <span class="tag" :class="`tag--${tag}`">{{ tagLabels[tag] }}</span>
</template>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: var(--radius-pill);
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.6;
}

.tag--spicy { background: var(--c-royal-50); color: var(--c-royal); }
.tag--vegetarian { background: color-mix(in srgb, var(--leaf) 12%, var(--surface)); color: var(--leaf); }
.tag--nuts { background: color-mix(in srgb, var(--c-muted) 10%, var(--surface)); color: var(--text-muted); }
.tag--popular { background: var(--highlight); color: var(--text); }
</style>
