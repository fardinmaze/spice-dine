import OrderButton from '../OrderButton'
import { restaurant } from '../../data/site'

export default function Hero() {
  return (
    <section id="home" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-4xl md:text-6xl">{restaurant.tagline}</h1>
        <p className="mt-4 max-w-xl text-lg">{restaurant.intro}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <OrderButton />
          <a href="#menu" className="inline-flex items-center rounded-full border border-ink px-6 py-3 font-semibold">
            Explore Our Menu
          </a>
        </div>
      </div>
    </section>
  )
}
