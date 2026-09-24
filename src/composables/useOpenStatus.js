import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { site } from '../config/site'
import { DAYS, formatTime, nowIn, toMinutes } from '../utils/hours'

const CLOSING_SOON = 45 // minutes

// { state: 'open' | 'closing-soon' | 'closed', label, today } in Brisbane time, refreshed every 60s
export function useOpenStatus() {
  const now = ref(nowIn(site.timezone))
  let timer

  onMounted(() => {
    timer = setInterval(() => (now.value = nowIn(site.timezone)), 60_000)
  })
  onBeforeUnmount(() => clearInterval(timer))

  const status = computed(() => {
    const { day, minutes } = now.value
    const todayHours = site.hours[day]

    if (todayHours) {
      const [open, close] = todayHours.map(toMinutes)
      if (minutes >= open && minutes < close) {
        return close - minutes <= CLOSING_SOON
          ? { state: 'closing-soon', label: `Closing soon, closes ${formatTime(todayHours[1])}` }
          : { state: 'open', label: `Open now, closes ${formatTime(todayHours[1])}` }
      }
      if (minutes < open) return { state: 'closed', label: `Closed, opens ${formatTime(todayHours[0])}` }
    }

    // Find the next day with hours
    const index = DAYS.findIndex((d) => d.key === day)
    for (let i = 1; i <= 7; i++) {
      const next = DAYS[(index + i) % 7]
      if (!site.hours[next.key]) continue
      const when = i === 1 ? 'tomorrow' : next.label
      return { state: 'closed', label: `Closed, opens ${when} ${formatTime(site.hours[next.key][0])}` }
    }
    return { state: 'closed', label: 'Closed' }
  })

  const today = computed(() => now.value.day)

  return { status, today }
}
