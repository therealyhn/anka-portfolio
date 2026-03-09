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
      className="relative h-[100dvh] min-h-[100dvh] overflow-hidden rounded-[27px] border-[13px] border-brand-paper bg-brand-charcoal text-white sm:min-h-[90dvh] lg:h-[759px] lg:min-h-[759px]"
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
        className="pointer-events-none absolute bottom-0 left-1/2 z-30 hidden w-[650px] -translate-x-1/2 object-contain xl:block"
      />

      <div className="relative z-20 min-h-[calc(100dvh-26px)] px-4 pt-24 sm:px-6 md:px-10 xl:px-0 xl:pt-0">
        <div className="mx-auto mt-20 text-center sm:mt-16 md:mt-10 xl:absolute xl:left-1/2 xl:top-[116px] xl:mt-0 xl:w-[1228px] xl:-translate-x-1/2">
          <p className="inline-flex items-center gap-2 font-medium text-white/90 xl:gap-[10px]">
            <AccentDot />
            <span className="text-sm font-thin tracking-wide xl:text-[16px]">Available for work</span>
          </p>

          <h1 className="mt-4 font-display text-[56px] font-semibold leading-[0.95] tracking-tight sm:text-[56px] md:text-[88px] xl:mt-[18px] xl:text-[76px] xl:leading-[0.96] xl:tracking-[-0.03em]">
            <span className="block">{heroContent.titleLineOne}</span>
            <span className="block">
              <em className="hero-accent-word mr-2 inline-block text-[1em] leading-[0.94] xl:mr-3 xl:text-[86px]">{heroContent.titleAccent}</em>
              <span>{heroContent.titleLineTwo}</span>
            </span>
          </h1>
        </div>
      </div>

      <div className="relative z-40 mt-16 px-4 pb-10 sm:px-6 md:px-10 xl:absolute xl:bottom-[28px] xl:left-[59px] xl:right-[59px] xl:mt-0 xl:px-0 xl:pb-0">
        <div className="flex flex-col justify-between gap-6 sm:gap-8 md:flex-row md:items-end xl:items-end">
          <div className="max-w-[360px] xl:max-w-[260px]">
            <p className="text-base leading-relaxed text-white/90 xl:text-[14px] xl:leading-[1.42]">{heroContent.description}</p>
            <a
              href="#projects"
              className="group mt-5 inline-flex items-center gap-3 text-base font-medium text-white transition-colors duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent xl:mt-8 xl:gap-2"
            >
              <span className="text-[16px] tracking-wide xl:text-[14px] xl:tracking-normal">Discover more</span>
              <CircleArrowButton
                iconSrc={discoverArrow}
                iconHoverSrc={discoverArrow}
                centerFillOnHover
                fillColorClass="bg-white"
                motionPreset="vertical-down"
                className="!h-6 !w-6 xl:!h-5 xl:!w-5"
              />
            </a>
          </div>

          <p className="text-left text-[14px] font-semibold text-white/90 md:text-right xl:text-[12px] xl:leading-[1.22]">
            Based in Serbia <span className="text-brand-success">{belgradeTime}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
