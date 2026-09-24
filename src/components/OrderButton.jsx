import { ORDER_URL } from '../data/site'

export default function OrderButton({ children = 'Order Online', className = '' }) {
  return (
    <a
      href={ORDER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-spice-600 px-6 py-3 font-semibold text-white transition hover:bg-spice-700 ${className}`}
    >
      {children}
    </a>
  )
}
