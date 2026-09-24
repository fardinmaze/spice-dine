// Single source of truth for restaurant details.
// Every "Order Online" CTA reads ORDER_URL, so the ordering link changes in one place only.

// TODO: replace with the real Yumbo Jumbo ordering page URL from the client
export const ORDER_URL = 'https://example.com/spice-dine-order'

export const restaurant = {
  name: 'Spice Dine',
  tagline: 'Authentic Bangladeshi Flavours, Made to Be Shared.',
  intro: 'Discover the rich flavours of Bangladeshi cuisine at Spice Dine, Woolloongabba.',
  address: '80 Ipswich Road, Woolloongabba, QLD 4102',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=80+Ipswich+Road+Woolloongabba+QLD+4102',
  phone: '', // TODO
  email: '', // TODO
  hours: [], // TODO: [{ days: 'Mon–Thu', time: '5pm – 9pm' }, ...]
  deliverySuburbs: [], // TODO
  social: {}, // TODO: { instagram: '', facebook: '' }
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]
