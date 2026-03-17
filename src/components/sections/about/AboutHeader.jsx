import AccentDot from '../../ui/AccentDot'

function AboutHeader({ data }) {
  return (
    <div className="text-center">
      <p className="inline-flex items-center gap-2 text-[13px] font-normal uppercase tracking-[0.01em] text-brand-accent sm:gap-3 sm:text-[15px] min-[1920px]:text-[24px]">
        <AccentDot className="h-4 w-4 min-[1920px]:h-2.5 min-[1920px]:w-2.5" />
        {data.eyebrowLabel}
      </p>
      <h2 className="mt-3 text-[28px] font-normal leading-tight text-brand-ink sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl 2xl:mt-[10px] 2xl:text-[66px] 2xl:leading-[1.08]">
        {data.titleLineOne}{' '}
        <span className="font-serif text-[1.3em] font-normal italic">{data.titleAccent}</span>{' '}
        {data.titleLineTwo}
      </h2>
      <p className="mx-auto mt-2 max-w-[760px] text-xs font-light leading-[1.45] text-brand-muted sm:mt-3 sm:text-sm md:text-base 2xl:mt-[12px] 2xl:max-w-[720px] 2xl:text-[20px] 2xl:leading-[1.35]">
        {data.description}
      </p>
    </div>
  )
}

export default AboutHeader
