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
            <p className="mt-6 max-w-[240px] text-lg leading-[1.4] text-brand-ink/90 sm:text-xl 2xl:max-w-[260px] 2xl:text-[28px]">
              {data.yearsLabel}
            </p>
          </article>

          <article className="flex h-full flex-col justify-between rounded-[8px] bg-[#F5F5F5] p-5 sm:rounded-[10px] sm:p-6 xl:col-start-3 xl:row-start-2 xl:rounded-[12px] xl:px-[30px] xl:py-[30px]">
            <p className="text-5xl leading-none text-brand-ink sm:text-6xl min-[1920px]:text-[72px]">{data.assetsValue}</p>
            <p className="mt-6 max-w-[300px] text-lg leading-[1.4] text-brand-ink/90 sm:text-xl 2xl:text-[28px]">
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

        <div className="relative mt-10 px-2 pb-2 pt-10 text-center sm:mt-14 sm:px-4 sm:pt-12 xl:mt-[60px] 2xl:mt-[88px] 2xl:px-0 2xl:pt-[90px]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 text-brand-ink/[0.04] sm:top-6 xl:top-8 min-[1920px]:top-[20px]"
          >
            <svg
              className="h-[100px] w-auto sm:h-[140px] xl:h-[200px] 2xl:h-[230px] min-[1920px]:h-[260px]"
              viewBox="0 0 190 150"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M60 0h50L50 150H0zM140 0h50l-60 150H80z" />
            </svg>
          </span>

          <blockquote className="relative z-10 mx-auto max-w-[980px] text-base font-light italic leading-[1.6] text-brand-ink sm:text-lg md:text-xl xl:max-w-[1040px] xl:text-[24px] 2xl:max-w-[1160px] 2xl:text-[26px] 2xl:leading-[1.6] min-[1920px]:max-w-[1240px] min-[1920px]:text-[32px]">
            <p>"{data.quoteLineOne}</p>
            <p className="mt-4 sm:mt-5 2xl:mt-[24px]">{data.quoteLineTwo}"</p>
          </blockquote>

          <div className="mx-auto mt-6 h-px w-[80%] bg-black/[0.15] sm:mt-8 xl:mt-[40px] xl:w-[70%] 2xl:mt-[50px] 2xl:w-[760px] min-[1920px]:w-[800px]" />

          <div className="mt-5 inline-flex items-center gap-3 sm:mt-6 sm:gap-4 xl:mt-[32px] 2xl:mt-[42px] min-[1920px]:gap-[16px]">
            <span className="inline-flex h-10 w-10 overflow-hidden rounded-full bg-[#D7D7D7] sm:h-12 sm:w-12 xl:h-[60px] xl:w-[60px] 2xl:h-[68px] 2xl:w-[68px] min-[1920px]:h-[80px] min-[1920px]:w-[80px]">
              <img src={data.testimonialAvatar} alt="" aria-hidden="true" className="h-full w-full object-cover object-top" />
            </span>
            <span className="text-left">
              <span className="block text-sm font-medium text-brand-ink sm:text-base xl:text-[18px] 2xl:text-[20px] min-[1920px]:text-[24px]">{data.testimonialName}</span>
              <span className="mt-0.5 block text-xs font-light text-brand-muted/80 sm:text-sm xl:text-[13px] 2xl:text-[14px] min-[1920px]:mt-[2px] min-[1920px]:text-[16px]">{data.testimonialRole}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
