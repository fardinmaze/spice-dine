import OrderButton from '../OrderButton'
import { navLinks, restaurant } from '../../data/site'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-spice-100 bg-spice-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#home" className="font-display text-xl font-bold">{restaurant.name}</a>
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-spice-600">{link.label}</a>
          ))}
        </nav>
        <OrderButton className="px-4 py-2 text-sm" />
      </div>
    </header>
  )
}
