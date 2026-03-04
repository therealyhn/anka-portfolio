function CircleArrowButton({
  label = 'Open link',
  iconSrc,
  iconHoverSrc,
  ringOffsetClass = 'ring-offset-brand-charcoal',
  buttonClassName = '',
  iconClassName = '',
  centerFillOnHover = false,
  fillColorClass = 'bg-brand-ink',
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-brand-accent text-brand-ink transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 ${ringOffsetClass} ${buttonClassName}`}
    >
      {centerFillOnHover ? (
        <span
          aria-hidden="true"
          className={`absolute inset-0 scale-0 rounded-full transition-transform duration-300 ease-premium group-hover:scale-100 ${fillColorClass}`}
        />
      ) : null}
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        className={`relative z-10 h-2.5 w-2.5 transition-all duration-300 ease-premium ${iconHoverSrc ? 'translate-x-0 opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-0' : ''} ${iconClassName}`}
      />
      {iconHoverSrc ? (
        <img
          src={iconHoverSrc}
          alt=""
          aria-hidden="true"
          className={`absolute z-10 h-2.5 w-2.5 translate-x-[-4px] translate-y-1 opacity-0 transition-all duration-300 ease-premium group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 ${iconClassName}`}
        />
      ) : null}
    </button>
  )
}

export default CircleArrowButton
