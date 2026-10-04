// Form submissions. Each POSTs JSON to its endpoint when set;
// otherwise simulates success so the draft can be reviewed without a backend.
export const sendContactMessage = (payload) => post(import.meta.env.VITE_CONTACT_ENDPOINT, payload, 'contact')

// Catering falls back to the contact endpoint if it has no endpoint of its own
export const sendCateringEnquiry = (payload) =>
  post(import.meta.env.VITE_CATERING_ENDPOINT || import.meta.env.VITE_CONTACT_ENDPOINT, { ...payload, type: 'catering' }, 'catering')

async function post(endpoint, payload, name) {
  if (!endpoint) {
    console.warn(`[${name}] no endpoint is set – simulating a send.`)
    await new Promise((resolve) => setTimeout(resolve, 900))
    // Draft review aid: /contact?form=error shows the failure state
    if (new URLSearchParams(window.location.search).get('form') === 'error') throw new Error('Simulated failure')
    return { ok: true, simulated: true }
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Contact endpoint responded ${res.status}`)
  return { ok: true }
}
