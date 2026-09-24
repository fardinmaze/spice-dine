// Sends the contact form. POSTs JSON to VITE_CONTACT_ENDPOINT when set;
// otherwise simulates success so the draft can be reviewed without a backend.
export async function sendContactMessage(payload) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

  if (!endpoint) {
    console.warn('[contact] VITE_CONTACT_ENDPOINT is not set – simulating a send.')
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
