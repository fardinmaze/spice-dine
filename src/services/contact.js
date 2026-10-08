import { site } from '../config/site'

// Form submissions go to the restaurant's WhatsApp. Submitting opens WhatsApp
// (app on phones, WhatsApp Web / desktop on computers) with the enquiry written out
// and addressed to site.whatsapp; the customer taps Send there.
// A static site can't send the message itself – that would need the WhatsApp Business API and a server.
export const sendContactMessage = (payload, form) => openWhatsApp('New message from the website', payload, form)

export const sendCateringEnquiry = (payload, form) => openWhatsApp('New catering enquiry from the website', payload, form)

export function whatsappLink(text) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
}

// Called synchronously from the submit click so browsers don't block the new tab
function openWhatsApp(heading, payload, form) {
  const href = whatsappLink(buildMessage(heading, payload, form))
  const win = window.open(href, '_blank')
  if (win) win.opener = null
  // The form shows href as a fallback button in case the tab was blocked
  return { href }
}

// "*Label:* value" lines in field order, skipping empty optional fields. *text* is bold in WhatsApp.
function buildMessage(heading, payload, form) {
  const lines = form.fields
    .map((field) => {
      const value = String(payload[field.id] ?? '').trim()
      if (!value) return null
      const label = field.waLabel ?? field.label.replace(/\s*\(optional\)$/i, '')
      const shown = field.type === 'date' ? formatDate(value) : value
      return field.type === 'textarea' ? `*${label}:*\n${shown}` : `*${label}:* ${shown}`
    })
    .filter(Boolean)
  return [`*${heading}*`, '', ...lines].join('\n')
}

// 2026-10-12 → Mon 12 Oct 2026
function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-AU', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  })
}
