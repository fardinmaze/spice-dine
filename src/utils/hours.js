export const DAYS = [
  { key: 'mon', label: 'Monday', short: 'Mon' },
  { key: 'tue', label: 'Tuesday', short: 'Tue' },
  { key: 'wed', label: 'Wednesday', short: 'Wed' },
  { key: 'thu', label: 'Thursday', short: 'Thu' },
  { key: 'fri', label: 'Friday', short: 'Fri' },
  { key: 'sat', label: 'Saturday', short: 'Sat' },
  { key: 'sun', label: 'Sunday', short: 'Sun' },
]

export const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

// '21:00' → '9 pm', '11:30' → '11:30 am'
export function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 && h < 24 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return m ? `${hour}:${String(m).padStart(2, '0')} ${suffix}` : `${hour} ${suffix}`
}

export const formatRange = ([open, close]) => `${formatTime(open)} – ${formatTime(close)}`

// Current day key and minutes past midnight in the restaurant's timezone
export function nowIn(timezone) {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (type) => parts.find((p) => p.type === type)?.value
  const day = get('weekday').slice(0, 3).toLowerCase()
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

// Groups identical consecutive days: [{ days: 'Mon–Thu', range: '11:30 am – 9 pm' }, ...]
export function summariseHours(hours) {
  const groups = []
  for (const day of DAYS) {
    const range = hours[day.key] ? formatRange(hours[day.key]) : 'Closed'
    const last = groups.at(-1)
    if (last && last.range === range) last.end = day.short
    else groups.push({ start: day.short, end: null, range })
  }
  return groups.map((g) => ({ days: g.end ? `${g.start}–${g.end}` : g.start, range: g.range }))
}
