function AboutBentoGrid({ data }) {
  return (
    <div className="mt-6 grid gap-3 sm:mt-8 md:grid-cols-2 xl:mt-[32px] xl:grid-cols-[1.04fr_0.72fr_0.72fr] xl:grid-rows-[280px_280px] xl:gap-[14px] min-[1920px]:grid-rows-[320px_320px]">
      <article className="hidden h-full flex-col justify-evenly rounded-[8px] bg-[#F5F5F5] p-5 sm:rounded-[10px] sm:p-6 md:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-start-1 xl:flex xl:rounded-[12px] xl:px-[30px] xl:py-[30px]">
        <h3 className="text-xl font-normal text-brand-ink sm:text-2xl 2xl:text-[32px]">{data.experienceTitle}</h3>
        <p className="mt-6 max-w-[640px] text-sm leading-[1.45] text-brand-ink/90 sm:text-base 2xl:text-[20px] 2xl:leading-[1.5]">
          {data.experienceText}
        </p>
      </article>

      <article
        className="relative order-first overflow-hidden rounded-[8px] sm:rounded-[10px] md:col-span-2 xl:order-none xl:col-span-2 xl:col-start-2 xl:row-start-1 xl:rounded-[12px]"
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
            <span className="inline-block h-2 w-2 rounded-full bg-brand-success shadow-sm shadow-brand-success/50 2xl:h-2.5 2xl:w-2.5" />
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
          className="relative h-full w-full object-cover object-center scale-125 md:scale-100 xl:object-contain"
        />
        <div className="absolute inset-x-0 top-0 p-5 sm:p-6 xl:hidden">
          <h3 className="text-xl font-normal text-white sm:text-2xl">{data.experienceTitle}</h3>
          <p className="mt-3 text-sm leading-[1.45] text-white sm:text-base">
            {data.experienceText}
          </p>
        </div>
      </article>

      <div className="grid grid-cols-2 gap-3 xl:contents xl:gap-0">
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
    </div>
  )
}

export default AboutBentoGrid
