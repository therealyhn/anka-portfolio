function buildLoopTools(items, minimumItems = 8) {
  if (!Array.isArray(items) || items.length === 0) return []

  let filled = [...items]
  while (filled.length < minimumItems) {
    filled = filled.concat(items)
  }

  return filled.concat(filled)
}

function AboutToolsRow({ tools }) {
  const loopTools = buildLoopTools(tools, 8)

  return (
    <div className="about-tools-row mt-5 2xl:mt-[24px]">
      <div className="about-tools-track">
        {loopTools.map((item, index) => (
          <article
            key={`${item.id}-${index}`}
            className="about-tools-card border border-black/5 flex min-h-[140px] w-[276px] flex-col justify-center rounded-[8px] bg-white px-4 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:rounded-[10px] sm:px-5 sm:py-5 xl:w-[340px] xl:rounded-[12px] xl:px-[24px] xl:py-[24px] 2xl:min-h-[10px] 2xl:w-[400px]"
          >
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <h3 className="text-base font-semibold text-brand-ink sm:text-lg min-[1920px]:text-[22px]">{item.title}</h3>
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] p-1 sm:h-8 sm:w-8 sm:rounded-[8px] sm:p-1.5 min-[1920px]:h-[50px] min-[1920px]:w-[50px]">
                <img src={item.icon} alt="" aria-hidden="true" className="h-full w-full object-contain" />
              </span>
            </div>
            <p className="mt-3 text-xs font-light leading-[1.4] text-brand-ink/80 sm:text-sm min-[1920px]:mt-[8px] min-[1920px]:text-[14px]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default AboutToolsRow
