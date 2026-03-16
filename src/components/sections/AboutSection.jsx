import AccentDot from '../ui/AccentDot'
import useAboutContent from '../../hooks/useAboutContent'

function buildLoopTools(items, minimumItems = 8) {
  if (!Array.isArray(items) || items.length === 0) return []

  let filled = [...items]
  while (filled.length < minimumItems) {
    filled = filled.concat(items)
  }

  return filled.concat(filled)
}

function AboutSection() {
  const { data } = useAboutContent()
  const loopTools = buildLoopTools(data.tools, 8)

  return (
    <section
      id="about"
      className="rounded-frame bg-brand-paper px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-12 lg:py-16 xl:py-20 xl:px-12 2xl:pt-[84px] 2xl:pb-[102px]"
      aria-label="About section"
    >
      <div className="mx-auto max-w-[600px] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1295px] min-[1920px]:max-w-[1776px]">
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

        <div className="mt-6 grid gap-3 sm:mt-8 md:grid-cols-2 xl:mt-[32px] xl:grid-cols-[1.04fr_0.72fr_0.72fr] xl:grid-rows-[280px_280px] xl:gap-[14px] min-[1920px]:grid-rows-[320px_320px]">
          <article className="flex h-full flex-col justify-evenly rounded-[8px] bg-[#F5F5F5] p-5 sm:rounded-[10px] sm:p-6 md:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-start-1 xl:rounded-[12px] xl:px-[30px] xl:py-[30px]">
            <h3 className="text-xl font-normal text-brand-ink sm:text-2xl 2xl:text-[32px]">{data.experienceTitle}</h3>
            <p className="mt-6 max-w-[640px] text-sm leading-[1.45] text-brand-ink/90 sm:text-base 2xl:text-[20px] 2xl:leading-[1.5]">
              {data.experienceText}
            </p>
          </article>

          <article
            className="relative overflow-hidden rounded-[8px] sm:rounded-[10px] md:col-span-2 xl:col-span-2 xl:col-start-2 xl:row-start-1 xl:rounded-[12px]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.26), rgba(0,0,0,0.38)), url(${data.earthImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '220px',
            }}
          >
            <div className="absolute inset-0 mb-8 flex flex-col items-center justify-center p-4 text-center text-white sm:p-6">
              <p className="text-base font-medium sm:text-lg 2xl:text-[24px]">{data.locationTitle}</p>
              <div className="mt-2 flex items-center gap-1.5 2xl:mt-3">
                <span className="inline-block h-2 w-2 rounded-full bg-brand-success shadow-sm shadow-brand-success/50 2xl:h-2.5 2xl:w-2.5"></span>
                <p className="text-xs uppercase tracking-[0.08em] text-white/70 sm:text-sm 2xl:text-[13px]">
                  {data.locationStatus}
                </p>
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[8px] bg-[#D8D8D8] sm:rounded-[10px] xl:col-start-1 xl:row-start-2 xl:rounded-[12px]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#8eb0cc_0%,#6e8aa3_45%,#3f5b72_100%)]" />
            <img
              src={data.portraitImage}
              alt="Anka portrait"
              loading="lazy"
              decoding="async"
              className="relative h-full min-h-[240px] w-full object-contain object-bottom sm:min-h-[280px]"
            />
          </article>

          <article className="flex h-full flex-col justify-between rounded-[8px] bg-[#F5F5F5] p-5 sm:rounded-[10px] sm:p-6 xl:col-start-2 xl:row-start-2 xl:rounded-[12px] xl:px-[30px] xl:py-[30px]">
            <p className="text-5xl leading-none text-brand-ink sm:text-6xl min-[1920px]:text-[72px]">{data.yearsValue}</p>
            <p className="mt-6 max-w-[240px] text-lg leading-[1.4] text-brand-ink/90 sm:text-base 2xl:max-w-[260px] 2xl:text-[28px]">
              {data.yearsLabel}
            </p>
          </article>

          <article className="flex h-full flex-col justify-between rounded-[8px] bg-[#F5F5F5] p-5 sm:rounded-[10px] sm:p-6 xl:col-start-3 xl:row-start-2 xl:rounded-[12px] xl:px-[30px] xl:py-[30px]">
            <p className="text-5xl leading-none text-brand-ink sm:text-6xl min-[1920px]:text-[72px]">{data.assetsValue}</p>
            <p className="mt-6 max-w-[300px] text-lg leading-[1.4] text-brand-ink/90 sm:text-base 2xl:text-[28px]">
              {data.assetsLabel}
            </p>
          </article>
        </div>

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

        <div className="relative mt-10 px-2 pb-2 pt-10 text-center sm:mt-14 sm:px-4 sm:pt-12 2xl:mt-[88px] 2xl:px-0 2xl:pt-[78px]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 text-[100px] leading-none text-brand-ink/[0.07] sm:text-[140px] min-[1920px]:text-[170px]"
          >
            "
          </span>

          <blockquote className="mx-auto max-w-[980px] text-base font-light italic leading-[1.5] text-brand-ink sm:text-lg md:text-xl 2xl:max-w-[1160px] 2xl:text-[22px] 2xl:leading-[1.48]">
            <p>{data.quoteLineOne}</p>
            <p className="mt-4 sm:mt-5 2xl:mt-[22px]">{data.quoteLineTwo}</p>
          </blockquote>

          <div className="mx-auto mt-6 h-px w-[70%] bg-black/20 sm:mt-8 2xl:mt-[30px] 2xl:w-[620px]" />

          <div className="mt-5 inline-flex items-center gap-2 sm:mt-6 sm:gap-3 2xl:mt-[22px] 2xl:gap-[12px]">
            <span className="inline-flex h-8 w-8 overflow-hidden rounded-full bg-[#D7D7D7] sm:h-10 sm:w-10 min-[1920px]:h-[48px] min-[1920px]:w-[48px]">
              <img src={data.testimonialAvatar} alt="" aria-hidden="true" className="h-full w-full object-cover object-top" />
            </span>
            <span className="text-left">
              <span className="block text-xs font-medium text-brand-ink sm:text-sm 2xl:text-[22px]">{data.testimonialName}</span>
              <span className="mt-0.5 block text-[10px] text-brand-muted sm:text-xs 2xl:text-[11px]">{data.testimonialRole}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
