import { Link } from 'react-router-dom'
import logoWhiteText from '../assets/images/logo/SVG white text.svg'
import heroBackground from '../assets/images/img/Background.png'

const INTEREST_OPTIONS = ['Branding', 'Web Design', 'Marketing Design', 'Presentations', 'Other']

function Contact() {
  return (
    <main className="min-h-screen h-[100svh] bg-brand-paper p-1.5 sm:p-2.5 font-sans overflow-hidden">
      <section
        className="relative h-full w-full overflow-hidden rounded-[16px] border border-white/10 bg-brand-charcoal text-white sm:rounded-[18px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.56), rgba(0,0,0,0.56)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 flex h-full flex-col px-6 py-8 sm:px-12 sm:py-12 lg:px-[80px] xl:px-[120px] lg:pt-[70px] lg:pb-[50px] max-w-[1440px] mx-auto">
          {/* Main Content Area - Grid Layout */}
          <div className="flex-1 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-24 w-full">

            {/* Left Column: Logo + Contact Info */}
            <aside className="relative flex flex-col pt-2 lg:pt-0">
              <header className="mb-[60px] lg:mb-[100px] xl:mb-[120px]">
                <Link to="/" aria-label="Back to home" className="inline-block transition-opacity hover:opacity-80">
                  <img src={logoWhiteText} alt="Anka Design" className="h-auto w-[100px] sm:w-[118px] md:w-[130px] lg:w-[114px]" />
                </Link>
              </header>

              <div className="flex flex-col gap-y-[32px] lg:mt-6">
                <div>
                  <p className="text-xs sm:text-sm xl:text-[13px] font-medium text-brand-accent mb-0.5 tracking-wide uppercase">email</p>
                  <a
                    href="mailto:hello@ankaljusic.com"
                    className="block text-sm sm:text-base xl:text-[15px] font-light text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    hello@ankaljusic.com
                  </a>
                </div>

                <div>
                  <p className="text-xs sm:text-sm xl:text-[13px] font-medium text-brand-accent mb-0.5 tracking-wide uppercase">phone</p>
                  <a
                    href="tel:+381691411117"
                    className="block text-sm sm:text-base xl:text-[15px] font-light text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    +381691411117
                  </a>
                </div>

                <div>
                  <p className="text-xs sm:text-sm xl:text-[13px] font-medium text-brand-accent mb-0.5 tracking-wide uppercase">location</p>
                  <p className="text-sm sm:text-base xl:text-[15px] font-light text-white/80">Belgrade, Serbia</p>
                </div>
              </div>
            </aside>

            {/* Right Column: Title + Steps + Form */}
            <section className="w-full max-w-[720px] lg:pt-[10px]">
              <h1 className="font-display text-[40px] font-thin leading-[0.95] tracking-tight sm:text-[56px] md:text-[72px] lg:text-[78px] xl:text-[86px] xl:tracking-[-0.032em] text-white mb-6 xl:mb-10">
                Got a <em className="hero-accent-word inline-block text-[1em] xl:text-[1.12em]">vision?</em>
                <br />
                Let&apos;s <em className="hero-accent-word inline-block text-[1em] xl:text-[1.12em]">design</em> it
              </h1>

              <p className="text-sm sm:text-base xl:text-[15px] font-light leading-[1.42] text-[#8E8D8D] mb-12 max-w-[420px]">
                Fill out the form and I&apos;ll get back to you as soon as possible.
              </p>

              {/* Stepper */}
              <div className="flex items-center w-full mb-12 lg:mb-16">
                <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-white" />
                <span className="h-[1px] w-[35%] bg-white/20" />
                <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-[#525252]" />
                <span className="h-[1px] flex-1 bg-white/20" />
                <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-[#525252]" />
              </div>

              {/* Form */}
              <div className="space-y-12 lg:space-y-14 xl:space-y-16">
                <div>
                  <p className="text-[15px] sm:text-[16px] font-medium leading-snug text-white/90 mb-5">I&apos;m interested in</p>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {INTEREST_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="border border-[#525252] px-4 py-2 sm:px-6 sm:py-2.5 text-[13px] sm:text-[14px] leading-none text-[#8E8D8D] transition-all duration-300 hover:border-white/50 hover:text-white rounded-[2px]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[15px] sm:text-[16px] font-medium leading-snug text-white/90 mb-5">Do you have a budget in mind?</p>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {['Yes', 'No'].map((answer) => (
                      <button
                        key={answer}
                        type="button"
                        className="border border-[#525252] px-5 py-2 sm:px-[24px] sm:py-2.5 text-[13px] sm:text-[14px] leading-none text-[#8E8D8D] transition-all duration-300 hover:border-white/50 hover:text-white rounded-[2px]"
                      >
                        {answer}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label htmlFor="projectDetails" className="block text-[15px] sm:text-[16px] font-medium leading-snug text-white/90 mb-1.5">
                    Tell me something about your project
                  </label>
                  <p className="text-xs sm:text-sm font-light leading-relaxed text-[#525252] mb-12">
                    Write a few lines about your project; tell me what you&apos;re looking to design.
                  </p>
                  <input
                    id="projectDetails"
                    type="text"
                    className="w-full border-b border-[#525252] bg-transparent pb-3 text-[15px] sm:text-[16px] text-white outline-none placeholder:text-white/20 focus:border-white transition-all duration-300"
                    placeholder=""
                    readOnly
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Footer Area */}
          <div className="mt-8 flex items-end justify-between w-full">
            <div className="text-[13px] font-medium text-[#8E8D8D] flex items-center flex-nowrap gap-x-2.5 pb-2">
              <span>&copy;Anka Ljusic, 2026</span>
              <span className="text-[#525252]">|</span>
              <span>Personal Portfolio</span>
              <Link to="/privacy" className="text-[#525252] hover:text-white transition-colors duration-300 ml-1">
                Privacy Policy
              </Link>
            </div>

            <div className="flex justify-end pr-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-[4px] bg-white pl-6 pr-5 py-2.5 xl:py-3.5 text-[14px] font-medium leading-none text-brand-ink transition-all duration-300 hover:bg-white/90 shadow-sm"
              >
                <span>Next</span>
                <span aria-hidden="true" className="text-[16px] font-light leading-none -mt-0.5">
                  &rsaquo;
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
