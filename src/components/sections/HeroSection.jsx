import { useEffect, useState } from 'react'
import Navbar from '../layout/Navbar'
import AccentDot from '../ui/AccentDot'
import CircleArrowButton from '../ui/CircleArrowButton'
import discoverArrow from '../../assets/images/arrows/Discover more (hero section).svg'
import heroBackground from '../../assets/images/img/Background.png'
import ankaPortrait from '../../assets/images/img/anka_4x.png'
import useHeroContent from '../../hooks/useHeroContent'
import useTranslation from '../../hooks/useTranslation'
import { useLang } from '../../context/LangContext'

function HeroSection() {
  const [belgradeTime, setBelgradeTime] = useState('')
  const { data: heroContent } = useHeroContent()
  const { t } = useTranslation()
  const { lang } = useLang()

  const sr = (en, srVal) => lang === 'sr' ? (srVal || en) : en

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(lang === 'sr' ? 'sr-RS' : 'en-US', {
      timeZone: 'Europe/Belgrade',
      hour: 'numeric',
      minute: '2-digit',
      hour12: lang !== 'sr',
    })

    const updateTime = () => {
      setBelgradeTime(formatter.format(new Date()))
    }

    updateTime()
    const intervalId = setInterval(updateTime, 60000)

    return () => clearInterval(intervalId)
  }, [lang])

  return (
    <section
      id="hero"
      className="relative flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden rounded-[16px] border-[8px] border-brand-paper bg-brand-charcoal text-white sm:rounded-[20px] sm:border-[10px] lg:rounded-[27px] lg:border-[13px]"
      aria-label={t('hero.sectionAria')}
    >
      <img
        src={heroBackground}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-left"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/35" />

      <Navbar />

      {/* Desktop portrait — lg+ only */}
      <img
        src={ankaPortrait}
        alt="Anka portrait"
        className="pointer-events-none absolute bottom-0 left-1/2 z-30 hidden w-[620px] -translate-x-1/2 object-contain lg:block lg:w-[520px] xl:w-[680px] 2xl:w-[780px] min-[1920px]:w-[920px]"
      />

      {/* Mobile portrait — direct child of section so width is unconstrained by wrapper padding */}
      <img
        src={ankaPortrait}
        alt="Anka portrait"
        className="pointer-events-none absolute bottom-0 left-1/2 md:z-30 z-10 w-[500px] -translate-x-1/2 object-contain md:w-[540px] lg:hidden"
      />

      {/* Content wrapper — flex column on mobile, positioned layer on xl */}
      <div className="relative z-20 flex flex-1 flex-col px-6 sm:px-8 md:px-[62px] lg:px-[59px] xl:p-0">

        {/* Heading block — centered on mobile, absolute on xl */}
        <div className="pt-32 text-center xl:absolute xl:left-1/2 xl:top-[116px] xl:mt-0 xl:w-[1100px] xl:-translate-x-1/2 xl:pt-0 2xl:w-[1228px]">
          <p className="inline-flex items-center gap-2 font-thin text-white/90 xl:gap-[10px]">
            <AccentDot className="animate-pulse" />
            <span className="text-[14px] font-medium tracking-wide xl:text-[16px]">{t('hero.available')}</span>
          </p>

          <h1 className="mt-2 font-display text-[44px] font-medium leading-[1.05] tracking-tight sm:mt-8 sm:text-[56px] md:text-[72px] lg:text-[88px] xl:mt-[18px] xl:text-[112px] xl:leading-[0.94] xl:tracking-[-0.02em] 2xl:text-[120px]">
            <span className="block mb-1">{sr(heroContent.titleLineOne, heroContent.titleLineOne_sr)}</span>
            <span className="block">
              <em className="font-serif font-normal italic text-[1.1em] xl:text-[130px] mr-2">{sr(heroContent.titleAccent, heroContent.titleAccent_sr)}</em>
              <span className="xl:text-[130px]">{sr(heroContent.titleLineTwo, heroContent.titleLineTwo_sr)}</span>
            </span>
          </h1>
        </div>

        {/* Mobile/tablet: description + CTA directly below heading */}
        <div className="mt-2 flex flex-col items-center text-center lg:hidden">
          <p className="max-w-[420px] text-[18px] leading-[1.5] text-white/80">{sr(heroContent.description, heroContent.description_sr)}</p>
          <a
            href="#projects"
            className="group mt-10 inline-flex items-center gap-4 text-sm font-normal text-white transition-colors duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <span className="text-[17px] font-medium tracking-tight">{t('hero.discoverMore')}</span>
            <CircleArrowButton
              iconSrc={discoverArrow}
              iconHoverSrc={discoverArrow}
              centerFillOnHover={false}
              fillColorClass="bg-brand-accent"
              motionPreset="vertical-down"
              className="!h-[20px] !w-[20px] !md:h-[52px] !md:w-[52px]"
              iconClassName="!h-[10px] !w-[10px] !md:h-4 !md:w-4"
            />
          </a>
        </div>

        {/* Bottom bar — flex row on all breakpoints, absolute on xl */}
        <div className="relative z-20 mt-auto pb-8 xl:absolute xl:bottom-[28px] xl:left-[59px] xl:right-[59px] xl:pb-0">
          <div className="flex items-end justify-between">

            {/* Desktop description + CTA — lg+ only */}
            <div className="hidden max-w-[260px] lg:block xl:max-w-[340px]">
              <p className="text-sm leading-relaxed text-white/90 xl:text-[16px] xl:leading-[1.42]">{sr(heroContent.description, heroContent.description_sr)}</p>
              <a
                href="#projects"
                className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent xl:mt-8 xl:gap-2"
              >
                <span className="text-[14px] font-medium tracking-wide xl:tracking-normal">{t('hero.discoverMore')}</span>
                <CircleArrowButton
                  iconSrc={discoverArrow}
                  iconHoverSrc={discoverArrow}
                  centerFillOnHover
                  fillColorClass="bg-white"
                  motionPreset="vertical-down"
                  className="!h-5 !w-5"
                />
              </a>
            </div>

            {/* Based in Serbia */}
            <p className="ml-auto text-right leading-[1.26] text-white/90 lg:ml-0">
              <span className="text-[14px] font-medium tracking-[-0.03em]">{t('hero.basedIn')}</span>
              {' '}
              <span className="text-brand-success ml-1 text-[12px] font-normal tracking-[-0.03em]">{belgradeTime}</span>
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default HeroSection
