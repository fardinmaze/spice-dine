<script setup>
import AppIcon from '../ui/AppIcon.vue'
import { tagLabels } from '../../data/menu'

defineProps({ tag: { type: String, required: true } })
</script>

<template>
  <span class="tag" :class="`tag--${tag}`">
    <AppIcon v-if="tag === 'on-demand'" name="clock" :size="14" />
    {{ tagLabels[tag] }}
  </span>
</template>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
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
.tag--on-demand { background: var(--surface); color: var(--text); box-shadow: inset 0 0 0 1.5px var(--text); }
</style>
