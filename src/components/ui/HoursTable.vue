<script setup>
import { site } from '../../config/site'
import { DAYS, formatRange } from '../../utils/hours'
import { useOpenStatus } from '../../composables/useOpenStatus'

defineProps({ tone: { type: String, default: 'light' } }) // 'light' | 'on-brand'
const { today } = useOpenStatus()
</script>

<template>
  <!-- PLACEHOLDER hours, see config/site.js -->
  <table class="hours" :class="`hours--${tone}`">
    <caption class="visually-hidden">Opening hours</caption>
    <tbody>
      <tr v-for="day in DAYS" :key="day.key" :class="{ 'is-today': today === day.key }" :aria-current="today === day.key ? 'date' : undefined">
        <th scope="row">
          {{ day.label }}
          <span v-if="today === day.key" class="hours__today">Today</span>
        </th>
        <td>{{ site.hours[day.key] ? formatRange(site.hours[day.key]) : 'Closed' }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.hours {
  width: 100%;
  border-collapse: collapse;
}

.hours th,
.hours td {
  padding: 0.625rem 0.875rem;
  text-align: left;
  font-weight: 500;
  border-bottom: 1px solid var(--line);
}

.hours td {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.hours--on-brand th,
.hours--on-brand td {
  border-bottom-color: rgb(255 255 255 / 0.18);
}

.is-today th,
.is-today td {
  font-weight: 700;
  background: var(--surface-soft);
}

.hours--on-brand .is-today th,
.hours--on-brand .is-today td {
  background: rgb(255 255 255 / 0.12);
}

.is-today th { border-radius: var(--radius-sm) 0 0 var(--radius-sm); }
.is-today td { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }

.hours__today {
  display: inline-block;
  margin-left: var(--space-2);
  padding: 0 0.5rem;
  border-radius: var(--radius-pill);
  background: var(--highlight);
  color: var(--c-ink);
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.6;
  vertical-align: 1px;
}
</style>
