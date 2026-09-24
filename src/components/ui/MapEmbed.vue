<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { site } from '../../config/site'
import { useInView } from '../../composables/useInView'

// The Google Maps iframe only loads once the block is near the viewport.
defineProps({ ratio: { type: String, default: '4 / 3' } })

const root = ref(null)
const near = useInView(root, { rootMargin: '400px', once: true })
</script>

<template>
  <div ref="root" class="map" :style="{ '--ratio': ratio }">
    <iframe
      v-if="near"
      :src="site.mapEmbed"
      :title="`Map showing ${site.name} at ${site.address}`"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
    <div v-else class="map__placeholder" aria-hidden="true">
      <AppIcon name="pin" :size="32" />
    </div>
  </div>
</template>

<style scoped>
.map {
  position: relative;
  aspect-ratio: var(--ratio);
  overflow: hidden;
  border-radius: var(--radius-media);
  background: var(--surface-soft);
}

.map iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.map__placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--c-royal);
}
</style>
