function AccentDot({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex h-2.5 w-2.5 items-center justify-center ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-brand-accent/60 blur-[2.4px]" />
      <span className="relative h-[52%] w-[52%] rounded-full bg-brand-accent shadow-[0_0_8px_rgba(255,106,46,0.72)]" />
    </span>
  )
}

export default AccentDot
