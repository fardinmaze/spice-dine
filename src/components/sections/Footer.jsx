import OrderButton from '../OrderButton'
import { restaurant } from '../../data/site'

export default function Footer() {
  return (
    <footer className="bg-ink px-4 py-12 text-spice-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl">{restaurant.name}</p>
          <p className="text-sm opacity-80">{restaurant.address}</p>
        </div>
        <OrderButton />
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs opacity-60">
        © {new Date().getFullYear()} {restaurant.name}. All rights reserved.
      </p>
    </footer>
  )
}
