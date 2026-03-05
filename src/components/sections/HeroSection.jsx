import { useEffect, useState } from 'react'
import Navbar from '../layout/Navbar'
import AccentDot from '../ui/AccentDot'
import CircleArrowButton from '../ui/CircleArrowButton'
import discoverArrow from '../../assets/images/arrows/Discover more (hero section).svg'
import heroBackground from '../../assets/images/img/Background.png'
import ankaPortrait from '../../assets/images/img/Anka.png'
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
    <section id="hero" className="relative h-[95dvh] overflow-hidden rounded-frame bg-brand-charcoal text-white" aria-label="Hero section">
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
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-[340px] -translate-x-1/2 object-contain md:w-[520px] lg:bottom-[-30px] lg:w-[900px]"
      />

      <div className="relative z-10 flex min-h-full flex-col px-6 pb-4 pt-24 md:px-14 md:pb-6 md:pt-28">
        <div className="mx-auto mt-14 max-w-[880px] text-center md:mt-8">
          <p className="inline-flex items-center gap-2 font-medium text-white/90">
            <AccentDot />
            <span className="text-lg">Available for work</span>
          </p>

          <h1 className="mt-5 text-[56px] font-semibold leading-[0.95] tracking-tight md:text-[112px]">
            <span className="block">{heroContent.titleLineOne}</span>
            <span className="block">
              <em className="font-serif text-[1.2em] font-medium italic">{heroContent.titleAccent} </em>
              <span>{heroContent.titleLineTwo}</span>
            </span>
          </h1>
        </div>

        <div className="mt-auto flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-[360px]">
            <p className="leading-relaxed text-white/90 md:text-xl">{heroContent.description}</p>
            <a
              href="#projects"
              className="group mt-6 inline-flex items-center gap-3 text-xl font-medium text-white transition-colors duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent md:text-[27px]"
            >
              <span className="text-sm tracking-wide">Discover more</span>
              <CircleArrowButton
                iconSrc={discoverArrow}
                iconHoverSrc={discoverArrow}
                centerFillOnHover
                fillColorClass="bg-white"
                motionPreset="vertical-down"
              />
            </a>
          </div>

          <p className="pb-6 pr-6 text-right text-base font-semibold text-white/90 md:text-lg">
            Based in Serbia <span className="text-brand-success">{belgradeTime}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
