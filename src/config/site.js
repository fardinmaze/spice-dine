// Restaurant facts live here and only here. Components never hand-type these.
export const site = {
  name: 'Spice Dine',
  orderUrl: 'https://spicedine.yumbojumbo.com.au/menu',
  phone: '(07) 3272 1754',
  phoneHref: 'tel:+61732721754',
  email: 'hello@example.com', // PLACEHOLDER
  address: 'Shop 3/80 Ipswich Rd, Woolloongabba QLD 4102',
  mapsUrl: 'https://maps.google.com/?q=Shop+3/80+Ipswich+Rd+Woolloongabba+QLD+4102',
  mapEmbed: 'https://maps.google.com/maps?q=80%20Ipswich%20Rd%20Woolloongabba&z=16&output=embed',
  timezone: 'Australia/Brisbane',
  // PLACEHOLDER – public listings disagree; confirm with client before launch
  hours: {
    mon: ['11:30', '21:00'], tue: ['11:30', '21:00'], wed: ['11:30', '21:00'],
    thu: ['11:30', '21:00'], fri: ['11:30', '23:00'], sat: ['11:30', '23:00'], sun: ['11:30', '21:00'],
  },
  announcement: ['Order online for pickup or delivery', 'Halal kitchen', 'Open 7 days'], // PLACEHOLDER copy
  socials: [{ label: 'Facebook', href: '#' }, { label: 'Instagram', href: '#' }], // PLACEHOLDER
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: { path: '/', hash: '#menu' } },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
