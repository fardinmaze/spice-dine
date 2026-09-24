<script setup>
import MarqueeBand from '../ui/MarqueeBand.vue'
import { site } from '../../config/site'

const items = site.announcement.map((text) => ({ text }))
</script>

<template>
  <MarqueeBand variant="ticker" label="Announcements" :items="items" :repeat="4" :duration="40" />
</template>
