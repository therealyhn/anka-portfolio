import { useEffect, useState } from 'react'
import Navbar from '../layout/Navbar'
import AccentDot from '../ui/AccentDot'
import CircleArrowButton from '../ui/CircleArrowButton'
import discoverArrow from '../../assets/images/arrows/Discover more (hero section).svg'
import heroBackground from '../../assets/images/img/Background.png'
import ankaPortrait from '../../assets/images/img/anka_4x.png'
import useHeroContent from '../../hooks/useHeroContent'

function HeroSection() {
  const [belgradeTime, setBelgradeTime] = useState('')
  const { data: heroContent } = useHeroContent()

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Belgrade',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })

    const updateTime = () => {
      setBelgradeTime(formatter.format(new Date()))
    }

    updateTime()
    const intervalId = setInterval(updateTime, 60000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-[100dvh] min-h-[100dvh] overflow-hidden rounded-[16px] border-[8px] border-brand-paper bg-brand-charcoal text-white sm:rounded-[20px] sm:border-[10px] lg:rounded-[27px] lg:border-[13px]"
      aria-label="Hero section"
    >

      <img
        src={heroBackground}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/35" />

      <Navbar />

      <img
        src={ankaPortrait}
        alt="Anka portrait"
        className="pointer-events-none absolute bottom-0 left-1/2 z-30 hidden w-[620px] -translate-x-1/2 object-contain lg:block lg:w-[520px] xl:w-[680px] 2xl:w-[780px] min-[1920px]:w-[920px]"
      />

      <div className="relative z-20 min-h-[calc(100dvh-16px)] px-4 pt-24 sm:min-h-[calc(100dvh-20px)] sm:px-6 md:px-10 lg:min-h-[calc(100dvh-26px)] xl:px-0 xl:pt-0">
        <div className="mx-auto mt-16 text-center sm:mt-16 md:mt-10 xl:absolute xl:left-1/2 xl:top-[116px] xl:mt-0 xl:w-[1100px] xl:-translate-x-1/2 2xl:w-[1228px]">
          <p className="inline-flex items-center gap-2 font-medium text-white/90 xl:gap-[10px]">
            <AccentDot />
            <span className="text-xs font-thin tracking-wide sm:text-sm xl:text-[16px]">Available for work</span>
          </p>

          <h1 className="mt-3 font-display text-[40px] font-semibold leading-[0.95] tracking-tight sm:mt-4 sm:text-[56px] md:text-[72px] lg:text-[88px] xl:mt-[18px] xl:text-[100px] xl:leading-[0.95] xl:tracking-[-0.032em] 2xl:text-[120px]">
            <span className="block">{heroContent.titleLineOne}</span>
            <span className="block">
              <em className="hero-accent-word mr-1 inline-block text-[1em] leading-[0.94] sm:mr-2 xl:mr-3 xl:text-[1.25em]">{heroContent.titleAccent}</em>
              <span>{heroContent.titleLineTwo}</span>
            </span>
          </h1>
        </div>
      </div>

      <div className="relative z-40 mt-16 px-4 pb-6 sm:px-6 sm:pb-8 md:px-10 md:pb-10 xl:absolute xl:bottom-[28px] xl:left-[59px] xl:right-[59px] xl:mt-0 xl:px-0 xl:pb-0">
        <div className="flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end xl:items-end">
          <div className="max-w-[320px] sm:max-w-[360px] xl:max-w-[260px]">
            <p className="text-sm leading-relaxed text-white/90 sm:text-base xl:text-[16px] xl:leading-[1.42]">{heroContent.description}</p>
            <a
              href="#projects"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent sm:mt-5 sm:gap-3 sm:text-base xl:mt-8 xl:gap-2"
            >
              <span className="text-[14px] tracking-wide sm:text-[16px] xl:text-[14px] xl:tracking-normal">Discover more</span>
              <CircleArrowButton
                iconSrc={discoverArrow}
                iconHoverSrc={discoverArrow}
                centerFillOnHover
                fillColorClass="bg-white"
                motionPreset="vertical-down"
                className="!h-5 !w-5 sm:!h-6 sm:!w-6 xl:!h-5 xl:!w-5"
              />
            </a>
          </div>

          <p className="text-left text-[12px] font-semibold text-white/90 sm:text-[14px] md:text-right xl:text-[12px] xl:leading-[1.22]">
            Based in Serbia <span className="text-brand-success">{belgradeTime}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
