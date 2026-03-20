import { Link } from 'react-router-dom'
import logoWhiteText from '../assets/images/logo/SVG white text.svg'
import heroBackground from '../assets/images/img/Background.png'
import { useContactForm, INTEREST_OPTIONS, BUDGET_RANGES } from '../hooks/useContactForm'
import useFooterContent from '../hooks/useFooterContent'
import linkedinIcon from '../assets/images/icons/Linekdin icon (footer).svg'
import upworkIcon from '../assets/images/icons/Upwork icon (footer).svg'
import fiverrIcon from '../assets/images/icons/Fiver icon (footer).svg'
import dribbbleIcon from '../assets/images/icons/Dribbble icon (footer).svg'
import instagramIcon from '../assets/images/icons/Instagram icon (footer).svg'

const SOCIAL_ICON_MAP = {
  linkedin: linkedinIcon,
  upwork: upworkIcon,
  fiverr: fiverrIcon,
  dribbble: dribbbleIcon,
  instagram: instagramIcon,
}

function normalizePlatform(platform) {
  return String(platform || '').toLowerCase().trim()
}

const STEP_SUBTITLES = {
  '1_initial': "Fill out the form and I'll get back to you as soon as possible.",
  '1_progress': "You're almost done. Hint — contact info is next.",
  2: 'Final details so I can get back to you.',
  3: "All set. I'll review your message and get back to you shortly.",
}

const BTN_BASE = 'transition-all duration-300 rounded-[2px] text-[13px] sm:text-[14px] leading-none border'
const BTN_ACTIVE = 'border-white bg-white text-brand-ink'
const BTN_INACTIVE = 'border-[#525252] text-[#8E8D8D] hover:border-white/50 hover:text-white'

function Stepper({ step }) {
  const dotCls = (n) =>
    `h-[9px] w-[9px] shrink-0 rounded-full transition-colors duration-300 ${n <= step ? 'bg-white' : 'bg-[#525252]'}`
  const lineCls = (afterStep) =>
    `h-[1px] transition-colors duration-300 ${afterStep < step ? 'bg-white/60' : 'bg-white/20'}`

  return (
    <div className="flex items-center w-full mb-8 sm:mb-10 lg:mb-14 xl:mb-16 shrink-0">
      <span className={dotCls(1)} />
      <span className={`${lineCls(1)} w-[35%]`} />
      <span className={dotCls(2)} />
      <span className={`${lineCls(2)} flex-1`} />
      <span className={dotCls(3)} />
    </div>
  )
}

function Contact() {
  const { data: footerData } = useFooterContent()

  const {
    step,
    interests,
    hasBudget,
    budgetRange,
    projectDetails,
    name,
    email,
    company,
    phone,
    isSubmitting,
    submitError,
    isStep1Valid,
    isStep2Valid,
    toggleInterest,
    selectBudget,
    setBudgetRange,
    setProjectDetails,
    setName,
    setEmail,
    setCompany,
    setPhone,
    handleNext,
    handlePrev,
    handleSubmit,
    reset,
  } = useContactForm()

  const subtitle =
    step === 3
      ? STEP_SUBTITLES[3]
      : step === 2
        ? STEP_SUBTITLES[2]
        : hasBudget !== null
          ? STEP_SUBTITLES['1_progress']
          : STEP_SUBTITLES['1_initial']

  const contactFields = [
    { id: 'name', label: 'What is your name?', required: true, type: 'text', value: name, onChange: setName, placeholder: 'John Doe' },
    { id: 'email', label: 'What is your email?', required: true, type: 'email', value: email, onChange: setEmail, placeholder: 'johhn@doecompany.com' },
    { id: 'company', label: 'Where do you work?', required: false, type: 'text', value: company, onChange: setCompany, placeholder: 'Doecompany' },
    { id: 'phone', label: 'What is your phone number?', required: false, type: 'tel', value: phone, onChange: setPhone, placeholder: '+38169...' },
  ]

  return (
    <main className="min-h-screen lg:h-[100svh] bg-brand-paper p-1.5 sm:p-2.5 font-sans lg:overflow-hidden">
      <section
        className="relative lg:h-full w-full overflow-hidden rounded-[16px] border border-white/10 bg-brand-charcoal text-white sm:rounded-[18px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.56), rgba(0,0,0,0.56)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/*
          Outer container: flex column so footer always sticks to bottom.
          Padding scales per breakpoint. max-w-[1440px] handles FHD/2K centering.
        */}
        <div className="relative z-10 flex lg:h-full flex-col px-5 py-6 sm:px-10 sm:py-10 md:px-14 lg:px-[80px] lg:pt-[70px] lg:pb-[50px] xl:px-[120px] max-w-[1440px] mx-auto">

          {/*
            Main content area.
            Mobile/tablet: flex column — aside (logo) → form section.
            lg+: 2-column grid — left sidebar | form.
            min-h-0 is required for flex children to scroll correctly.
          */}
          <div className="lg:flex-1 lg:min-h-0 flex flex-col lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-24 w-full">

            {/* Left column: Logo + Contact Info */}
            <aside className="shrink-0 flex flex-col pt-1 lg:pt-0 mb-6 lg:mb-0">
              {/* Logo margin collapses on mobile to save vertical space */}
              <header className="mb-4 sm:mb-6 lg:mb-[100px] xl:mb-[120px]">
                <Link to="/" aria-label="Back to home" className="inline-block transition-opacity hover:opacity-80">
                  <img
                    src={logoWhiteText}
                    alt="Anka Design"
                    className="h-auto w-[96px] sm:w-[110px] lg:w-[114px]"
                  />
                </Link>
              </header>

              {/* Contact info: hidden below lg — no vertical space wasted on mobile */}
              <div className="flex flex-col gap-y-4 mt-2 lg:gap-y-8 xl:gap-y-[32px]">
                <div>
                  <p className="text-[11px] xl:text-[13px] font-medium text-brand-accent mb-0.5 tracking-wide uppercase">email</p>
                  <a
                    href="mailto:hello@ankaljusic.com"
                    className="block text-sm xl:text-[15px] font-light text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    hello@ankaljusic.com
                  </a>
                </div>
                <div>
                  <p className="text-[11px] xl:text-[13px] font-medium text-brand-accent mb-0.5 tracking-wide uppercase">phone</p>
                  <a
                    href="tel:+381691411117"
                    className="block text-sm xl:text-[15px] font-light text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    +381691411117
                  </a>
                </div>
                <div>
                  <p className="text-[11px] xl:text-[13px] font-medium text-brand-accent mb-0.5 tracking-wide uppercase">location</p>
                  <p className="text-sm xl:text-[15px] font-light text-white/80">Belgrade, Serbia</p>
                </div>
              </div>
            </aside>

            {/* Right column: Title + Stepper + Form content */}
            <section className="lg:flex-1 lg:min-h-0 w-full max-w-[720px] lg:pt-[10px] flex flex-col">

              {/* Title — font scales across all breakpoints */}
              <h1 className="font-display text-[38px] font-thin leading-[0.95] tracking-tight sm:text-[52px] md:text-[66px] lg:text-[72px] xl:text-[86px] xl:tracking-[-0.032em] text-white mb-4 sm:mb-5 lg:mb-6 xl:mb-10 shrink-0">
                Got a <em className="hero-accent-word inline-block text-[1em] xl:text-[1.12em]">vision?</em>
                <br />
                Let&apos;s <em className="hero-accent-word inline-block text-[1em] xl:text-[1.12em]">design</em> it
              </h1>

              <p className="text-sm sm:text-[15px] font-light leading-[1.42] text-[#8E8D8D] mb-6 sm:mb-8 lg:mb-10 max-w-[420px] shrink-0">
                {subtitle}
              </p>

              <Stepper step={step} />

              {/* ── Step 1: Project Info ── */}
              {step === 1 && (
                <div className="lg:flex-1 lg:overflow-y-auto no-scrollbar space-y-8 sm:space-y-10 lg:space-y-12 xl:space-y-16 pr-1 pb-4">

                  <div>
                    <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-snug text-white/90 mb-4 sm:mb-5">
                      I&apos;m interested in
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5 lg:gap-3">
                      {INTEREST_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleInterest(option)}
                          className={`${BTN_BASE} px-3.5 py-2 sm:px-5 sm:py-2 lg:px-6 lg:py-2.5 ${interests.includes(option) ? BTN_ACTIVE : BTN_INACTIVE}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-snug text-white/90 mb-4 sm:mb-5">
                      Do you have a budget in mind?
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5 lg:gap-3">
                      {([['Yes', true], ['No', false]]).map(([label, value]) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => selectBudget(value)}
                          className={`${BTN_BASE} px-5 py-2 sm:px-6 sm:py-2 lg:px-[24px] lg:py-2.5 ${hasBudget === value ? BTN_ACTIVE : BTN_INACTIVE}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasBudget === true && (
                    <div>
                      <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-snug text-white/90 mb-4 sm:mb-5">
                        What is the dedicated budget for the project?
                      </p>
                      <div className="flex flex-wrap gap-2 sm:gap-2.5 lg:gap-3">
                        {BUDGET_RANGES.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => setBudgetRange(range)}
                            className={`${BTN_BASE} px-3.5 py-2 sm:px-5 sm:py-2 lg:px-6 lg:py-2.5 ${budgetRange === range ? BTN_ACTIVE : BTN_INACTIVE}`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="projectDetails"
                      className="block text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-snug text-white/90 mb-1.5"
                    >
                      Tell me something about your project
                    </label>
                    <p className="text-xs sm:text-sm font-light leading-relaxed text-[#525252] mb-8 sm:mb-10 lg:mb-12">
                      Write a few lines about your project; tell me what you&apos;re looking to design.
                    </p>
                    <input
                      id="projectDetails"
                      type="text"
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      className="w-full border-b border-[#525252] bg-transparent pb-3 text-[14px] sm:text-[15px] lg:text-[16px] text-white outline-none placeholder:text-white/20 focus:border-white transition-colors duration-300"
                      placeholder="Describe your project..."
                    />
                  </div>

                </div>
              )}

              {/* ── Step 2: Contact Info ── */}
              {step === 2 && (
                <div className="lg:flex-1 lg:overflow-y-auto no-scrollbar">
                  <div className="divide-y divide-[#2a2a2a]">
                    {contactFields.map((field) => (
                      /*
                        Mobile/tablet: label stacked above input (full-width).
                        lg+: label left (44% width) | input right — matches Figma.
                      */
                      <div key={field.id} className="py-4 sm:py-5 first:pt-0">
                        <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:gap-y-0 lg:gap-x-8">
                          <label
                            htmlFor={field.id}
                            className="text-[14px] sm:text-[15px] font-medium text-white/90 lg:w-[44%] lg:shrink-0"
                          >
                            {field.label}
                            {field.required && <span className="text-brand-accent ml-0.5">*</span>}
                          </label>
                          <input
                            id={field.id}
                            type={field.type}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder={field.placeholder}
                            className="flex-1 bg-transparent border-b border-[#525252] pb-1.5 text-[14px] sm:text-[15px] text-white outline-none placeholder:text-white/25 focus:border-white/60 transition-colors duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {submitError && (
                    <p className="mt-6 text-sm text-red-400">{submitError}</p>
                  )}
                </div>
              )}

              {/* ── Step 3: Success ── */}
              {step === 3 && (
                <div className="flex-1">
                  <h2 className="font-display text-[42px] sm:text-[56px] lg:text-[64px] xl:text-[72px] font-thin leading-[0.95] tracking-tight text-white mb-5 lg:mb-6">
                    Message <em className="hero-accent-word">sent</em>!
                  </h2>
                  <p className="text-sm sm:text-[15px] font-light text-[#8E8D8D] mb-8 max-w-[380px] leading-relaxed">
                    You can expect a reply within 1–2 business days.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-[14px] font-light text-[#8E8D8D] hover:text-white transition-colors duration-300"
                  >
                    + Make new request.
                  </button>
                </div>
              )}

            </section>
          </div>

          {/* Footer bar */}
          <div className="mt-4 sm:mt-6 lg:mt-8 shrink-0 border-t border-white/10">

            {/* Row: copyright (desktop only) + action buttons */}
            <div className="pt-4 sm:pt-5 flex items-end justify-between w-full">
              <div className="hidden lg:flex text-[12px] sm:text-[13px] font-medium text-[#8E8D8D] items-center gap-x-2 sm:gap-x-2.5 pb-1 sm:pb-2">
                <span>&copy;Anka Ljusic, 2026</span>
                <span className="text-[#525252]">|</span>
                <span>Personal Portfolio</span>
                <Link to="/privacy" className="text-[#525252] hover:text-white transition-colors duration-300 ml-1">
                  Privacy Policy
                </Link>
              </div>

              <div className="ml-auto lg:ml-0">
                {step === 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStep1Valid}
                    className="inline-flex items-center gap-1.5 rounded-[4px] bg-white pl-5 pr-4 py-2.5 sm:pl-6 sm:pr-5 xl:py-3.5 text-[13px] sm:text-[14px] font-medium leading-none text-brand-ink shadow-sm transition-all duration-300 hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
                  >
                    <span>Next</span>
                    <span aria-hidden="true" className="text-[16px] font-light leading-none -mt-0.5">&rsaquo;</span>
                  </button>
                )}

                {step === 2 && (
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="text-[13px] sm:text-[14px] font-medium text-[#8E8D8D] hover:text-white transition-colors duration-300"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!isStep2Valid || isSubmitting}
                      className="inline-flex items-center gap-1.5 rounded-[4px] bg-white pl-5 pr-4 py-2.5 sm:pl-6 sm:pr-5 xl:py-3.5 text-[13px] sm:text-[14px] font-medium leading-none text-brand-ink shadow-sm transition-all duration-300 hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
                    >
                      {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile only: Privacy Policy + copyright + social icons */}
            <div className="lg:hidden mt-3 mb-1 flex flex-col items-center gap-2">
              <Link
                to="/privacy"
                className="text-[11px] text-[#525252] hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <p className="text-[11px] font-medium text-[#8E8D8D]">
                &copy;Anka Ljusic, 2026 &nbsp;|&nbsp; Personal Portfolio
              </p>
              <div className="flex items-center gap-3 mt-0.5">
                {footerData.socials.map((social) => {
                  const platform = normalizePlatform(social.platform)
                  const icon = SOCIAL_ICON_MAP[platform]
                  if (!icon) return null
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={platform}
                      className="inline-flex h-6 w-6 items-center justify-center text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      <img src={icon} alt="" aria-hidden="true" className="h-full w-full object-contain" />
                    </a>
                  )
                })}
              </div>
            </div>

          </div>

        </div>
      </section>
    </main>
  )
}

export default Contact
