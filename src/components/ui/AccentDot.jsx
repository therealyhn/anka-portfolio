function AccentDot({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-2.5 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(255,106,46,0.8),0_0_18px_rgba(255,106,46,0.45)] ${className}`}
    />
  )
}

export default AccentDot
