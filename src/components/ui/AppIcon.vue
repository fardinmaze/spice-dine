<script setup>
// 1.6px stroke line icons. Decorative by default (aria-hidden).
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
})

const paths = {
  arrow: ['M5 12h14', 'M13 6l6 6-6 6'],
  external: ['M7 17 17 7', 'M8 7h9v9'],
  phone: ['M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3 4.5 1.8V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4Z'],
  pin: ['M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5l3.5 2'],
  mail: ['M4 5.5h16A1.5 1.5 0 0 1 21.5 7v10a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 17V7A1.5 1.5 0 0 1 4 5.5Z', 'm3 7 9 6 9-6'],
  'chevron-left': ['M15 5l-7 7 7 7'],
  'chevron-right': ['M9 5l7 7-7 7'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  plus: ['M12 5v14', 'M5 12h14'],
  users: ['M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M2.5 20a6.5 6.5 0 0 1 13 0', 'M16 4.3a3.5 3.5 0 0 1 0 6.4', 'M18 14.2a6.5 6.5 0 0 1 3.5 5.8'],
  chilli: ['M5 19.5c6.5.5 12.5-4 13-11.5', 'M18 8c-1.5-1-4-.5-4.5 1.5', 'M17.5 7.5c.3-2 1.6-3.3 3.5-3.5'],
  leaf: ['M5 19C5 10.5 11 5 20 4c0 9-5.5 15-15 15Z', 'M5 19l8.5-8.5'],
  bowl: ['M3 11.5h18a9 9 0 0 1-18 0Z', 'M9 8c0-1.6 1.5-1.6 1.5-3.2', 'M13.5 8c0-1.6 1.5-1.6 1.5-3.2'],
  plate: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z'],
  shield: ['M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z', 'm8.8 12 2.2 2.2 4.2-4.4'],
  flame: ['M12 21c3.9 0 6.5-2.6 6.5-6.3 0-4.2-3.5-6.2-4.3-10.2-2.2 1.4-3.6 3.6-3.6 6-1-.6-1.7-1.6-1.9-2.8C7 9.2 5.5 11.6 5.5 14.7 5.5 18.4 8.1 21 12 21Z'],
  play: ['M8 5.5v13l10.5-6.5L8 5.5Z'],
  pause: ['M9 5.5v13', 'M15 5.5v13'],
  book: ['M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z', 'M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5v-13Z'],
}
</script>

<template>
  <svg
    class="icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="d in paths[name]" :key="d" :d="d" />
  </svg>
</template>

<style scoped>
.icon {
  flex: none;
}
</style>
