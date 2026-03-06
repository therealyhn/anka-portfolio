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
      className="relative h-[100dvh] min-h-[100dvh] overflow-hidden rounded-[27px] border-[13px] border-brand-paper bg-brand-charcoal text-white sm:min-h-[90dvh] lg:min-h-[860px]"
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
        className="hidden lg:block pointer-events-none absolute bottom-[205px] md:bottom-0 left-1/2 z-20 w-96 -translate-x-1/2 object-contain sm:w-[380px] md:w-[800px] lg:w-[850px]"
      />

      <div className="relative z-10 flex min-h-full flex-col px-4 pb-4 pt-24 sm:px-6 md:px-10 md:pb-6 md:pt-28 lg:px-14">
        <div className="mx-auto mt-20 max-w-[1440px] text-center sm:mt-16 md:mt-10">
          <p className="inline-flex items-center gap-2 font-medium text-white/90">
            <AccentDot />
            <span className="text-sm text-sans font-thin tracking-wide md:text-lg">Available for work</span>
          </p>

          <h1 className="mt-4 font-display text-[56px] font-semibold leading-[0.95] tracking-tight sm:text-[56px] md:text-[88px] lg:mt-5 lg:text-[150px]">
            <span className="block">{heroContent.titleLineOne}</span>
            <span className="block">
              <em className="hero-accent-word mr-2 inline-block text-[1em] leading-[0.94] lg:mr-4 lg:text-[190px]">{heroContent.titleAccent}</em>
              <span>{heroContent.titleLineTwo}</span>
            </span>
          </h1>
        </div>

        <div className="mt-auto flex flex-col justify-between gap-6 pb-10 sm:gap-8 md:flex-row md:items-end">
          <div className="max-w-[360px] lg:ml-[3px]">
            <p className="text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">{heroContent.description}</p>
            <a
              href="#projects"
              className="group mt-5 inline-flex items-center gap-3 text-base font-medium text-white transition-colors duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent sm:text-lg md:mt-6 md:text-[27px]"
            >
              <span className="text-[16px] tracking-wide">Discover more</span>
              <CircleArrowButton
                iconSrc={discoverArrow}
                iconHoverSrc={discoverArrow}
                centerFillOnHover
                fillColorClass="bg-white"
                motionPreset="vertical-down"
                className="!w-6 !h-6"
              />
            </a>
          </div>

          <p className="text-left font-sans text-[14px] font-semibold text-white/90 sm:text-left md:pr-6 md:text-right md:text-md lg:pr-[3px] lg:text-md">
            Based in Serbia <span className="text-brand-success">{belgradeTime}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
