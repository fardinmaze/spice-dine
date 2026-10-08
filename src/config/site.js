// Restaurant facts live here and only here. Components never hand-type these.
export const site = {
  name: 'Spice Dine',
  // Client logo (round badge, transparent). Original 1500px PNG is in source-images/LOGO.png
  logo: { src: '/images/brand/logo-192.webp', srcLarge: '/images/brand/logo-400.webp', width: 376, height: 400 },
  orderUrl: 'https://spicedine.yumbojumbo.com.au/menu',
  phone: '(07) 3272 1754',
  phoneHref: 'tel:+61732721754',
  email: 'hello@example.com', // PLACEHOLDER
  // Contact and catering forms open WhatsApp to this number: international format, digits only (61 + number without the leading 0).
  whatsapp: '61478391243', // Client's business WhatsApp, 0478 391 243
  address: 'Shop 3/80 Ipswich Rd, Woolloongabba QLD 4102',
  mapsUrl: 'https://maps.google.com/?q=Shop+3/80+Ipswich+Rd+Woolloongabba+QLD+4102',
  mapEmbed: 'https://maps.google.com/maps?q=80%20Ipswich%20Rd%20Woolloongabba&z=16&output=embed',
  timezone: 'Australia/Brisbane',
  // PLACEHOLDER – public listings disagree; confirm with client before launch
  hours: {
    mon: ['11:30', '21:00'], tue: ['11:30', '21:00'], wed: ['11:30', '21:00'],
    thu: ['11:30', '21:00'], fri: ['11:30', '23:00'], sat: ['11:30', '23:00'], sun: ['11:30', '21:00'],
  },
  announcement: ['Order online for pickup or delivery', 'Catering available', 'Halal kitchen', 'Open 7 days'], // PLACEHOLDER copy
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/share/19USoJpSov/' }, // share link from the client; redirects to the page
    { label: 'Instagram', href: 'https://www.instagram.com/spicedine_gabba/' },
  ],
}

export const nav = [
  { label: 'Menu', to: { path: '/', hash: '#menu' } },
  { label: 'Catering', to: { path: '/', hash: '#catering' } },
  { label: 'Hours & location', to: { path: '/', hash: '#visit' } },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
