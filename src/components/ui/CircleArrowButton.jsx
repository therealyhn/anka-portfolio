function CircleArrowButton({
  iconSrc,
  iconHoverSrc,
  className = '',
  iconClassName = '',
  centerFillOnHover = false,
  fillColorClass = 'bg-brand-ink',
  fillClassName = '',
  motionPreset = 'diagonal',
}) {
  const baseIconMotionClass =
    motionPreset === 'vertical-down'
      ? 'translate-y-0 opacity-100 group-hover:translate-y-full group-hover:opacity-0 transition-all duration-500 ease-premium'
      : 'translate-x-0 opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-0 transition-all duration-500 ease-premium'

  const hoverIconMotionClass =
    motionPreset === 'vertical-down'
      ? '-translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-premium'
      : 'translate-x-[-4px] translate-y-1 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-premium'

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-brand-accent text-brand-ink transition-all duration-500 ease-premium ${className}`}
    >
      {centerFillOnHover ? (
        <span
          aria-hidden="true"
          className={`absolute inset-0 scale-0 rounded-full transition-transform duration-500 ease-premium group-hover:scale-100 ${fillColorClass} ${fillClassName}`}
        />
      ) : null}

      <img
        src={iconSrc}
        alt=""
        className={`relative z-10 h-2.5 w-2.5 transition-all duration-500 ease-premium ${iconHoverSrc ? baseIconMotionClass : ''} ${iconClassName}`}
      />

      {iconHoverSrc ? (
        <img
          src={iconHoverSrc}
          alt=""
          className={`absolute z-10 h-2.5 w-2.5 transition-all duration-300 ease-premium ${hoverIconMotionClass} ${iconClassName}`}
        />
      ) : null}
    </span>
  )
}

export default CircleArrowButton
