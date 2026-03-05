import Navbar from '../layout/Navbar'
import AccentDot from '../ui/AccentDot'
import CircleArrowButton from '../ui/CircleArrowButton'
import discoverArrow from '../../assets/images/arrows/Discover more (hero section).svg'

function HeroSection() {
  return (
    <section id="hero" className="relative h-[95dvh] overflow-hidden rounded-frame bg-brand-charcoal text-white" aria-label="Hero section">
      <Navbar />

      <div aria-hidden="true" className="hero-light-layer pointer-events-none absolute inset-0 opacity-75" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[410px] w-[320px] -translate-x-1/2 rounded-t-[170px] bg-gradient-to-t from-white/25 via-white/15 to-white/5 blur-[1px] md:h-[470px] md:w-[360px]"
      />

      <div className="relative z-10 flex min-h-full flex-col px-6 pb-4 pt-24 md:px-14 md:pb-6 md:pt-28">
        <div className="mx-auto mt-14 max-w-[880px] text-center md:mt-8">
          <p className="inline-flex items-center gap-2 font-medium text-white/90">
            <AccentDot />
            <span className="text-lg">Available for work</span>
          </p>

          <h1 className="mt-5 text-[56px] font-semibold leading-[0.95] tracking-tight md:text-[112px]">
            <span className="block">Hello I&apos;m Anka</span>
            <span className="block">
              <em className="font-serif text-[1.02em] font-normal italic">Digital </em>
              <span>Designer</span>
            </span>
          </h1>
        </div>

        <div className="mt-auto flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-[360px]">
            <p className="leading-relaxed text-white/90 md:text-xl">
              I design products, platforms, and everything in between, made to make sense the first time you use them.
            </p>
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
            Based in Serbia <span className="text-brand-success">7:15 PM</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
