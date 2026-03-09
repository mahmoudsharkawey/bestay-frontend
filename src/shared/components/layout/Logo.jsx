import { Link } from 'react-router-dom'

/**
 * Bestay Logo component.
 * @param {object} props
 * @param {'sm'|'md'|'lg'} props.size - sm (h-8), md (h-10), lg (h-14)
 * @param {boolean} props.showText - show "Bestay" text next to logo (default true)
 * @param {boolean} props.link - wrap in Link to "/" (default true)
 * @param {string} props.className - extra classes
 */
export default function Logo({ size = 'md', showText = true, link = true, className = '' }) {
  const heights = { sm: 'h-7', md: 'h-9', lg: 'h-14' }
  const textSizes = { sm: 'text-base', md: 'text-lg', lg: 'text-2xl' }

  const content = (
    <span className={`flex items-center gap-2 ${className}`}>
      <img
        src="/logo.png"
        alt="Bestay"
        className={`${heights[size]} w-auto object-contain`}
      />
      {showText && (
        <span className={`font-bold text-navy ${textSizes[size]}`}>Bestay</span>
      )}
    </span>
  )

  if (link) {
    return (
      <Link to="/" className="shrink-0">
        {content}
      </Link>
    )
  }

  return content
}
