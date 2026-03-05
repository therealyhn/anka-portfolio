import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CircleArrowButton from '../ui/CircleArrowButton'
import logoBlackText from '../../assets/images/logo/SVG black text.svg'
import englishIcon from '../../assets/images/icons/english icon.svg'
import serbianIcon from '../../assets/images/icons/serbian icon.svg'
import navArrow from '../../assets/images/arrows/Nav bar.svg'
import navArrowHover from '../../assets/images/arrows/Nav bar HOVER.svg'

const NAV_ITEMS = [
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Services', sectionId: 'services' },
  { label: 'About me', sectionId: 'about' },
]

function Navbar() {
  const { pathname } = useLocation()
  const [language, setLanguage] = useState('en')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isEnglish = language === 'en'
  const isHomePage = pathname === '/'

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'en' ? 'sr' : 'en'))
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const getSectionHref = (sectionId) => {
    return isHomePage ? `#${sectionId}` : `/#${sectionId}`
  }

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    closeMenu()
  }, [pathname])

  return (
    <header className="relative inset-x-0">
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-center">
        <nav className="fixed top-10 z-50 flex w-[calc(100%-60px)] items-center justify-between rounded-xl bg-brand-surface px-3 py-3 shadow-edge sm:w-[calc(100%-40px)] sm:px-4 md:top-12 md:w-[calc(100%-56px)] md:px-5 md:py-4 lg:w-full lg:max-w-[760px]">
          <a
            href={isHomePage ? '#hero' : '/'}
            aria-label="Back to top"
            onClick={closeMenu}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
          >
            <img src={logoBlackText} alt="Anka Design" className="h-auto w-[118px] sm:w-[130px] md:w-[140px]" />
          </a>

          <ul className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={getSectionHref(item.sectionId)}
                  className="group relative inline-flex h-6 items-center overflow-hidden text-base font-semibold text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
                >
                  <span className="transition-transform duration-500 ease-premium group-hover:-translate-y-full">{item.label}</span>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-full text-brand-accent transition-transform duration-500 ease-premium group-hover:-translate-y-full"
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={getSectionHref('contact')}
            className="group hidden items-center gap-2 text-sm font-semibold text-brand-ink transition-colors duration-500 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface sm:text-base lg:inline-flex"
          >
            <span className="hidden sm:inline">Let&apos;s talk</span>
            <CircleArrowButton
              iconSrc={navArrow}
              iconHoverSrc={navArrowHover}
              centerFillOnHover
              className="!w-7 !h-7"
            />
          </a>
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-ink/5 text-brand-ink transition-colors duration-300 ease-premium hover:bg-brand-ink/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent sm:h-10 sm:w-10 lg:hidden"
          >
            <span className="relative h-3.5 w-4">
              <span className={`absolute left-0 top-0 block h-0.5 w-4 bg-current transition-all duration-300 ease-premium ${isMenuOpen ? 'top-[6px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[6px] block h-0.5 w-4 bg-current transition-all duration-300 ease-premium ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 top-3 block h-0.5 w-4 bg-current transition-all duration-300 ease-premium ${isMenuOpen ? 'top-[6px] -rotate-45' : ''}`} />
            </span>
          </button>
        </nav>

        <button
          type="button"
          aria-label="Close navigation menu backdrop"
          onClick={closeMenu}
          className={`fixed inset-0 z-40 bg-black/35 transition-opacity duration-300 ease-premium lg:hidden ${isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        />

        <div
          className={`fixed left-1/2 top-[110px] z-[55] w-[calc(100%-60px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-brand-line/40 bg-brand-surface p-3 shadow-edge transition-all duration-300 ease-premium sm:top-[106px] sm:w-[calc(100%-40px)] md:top-[130px] md:w-[calc(100%-56px)] lg:hidden ${isMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={`${item.label}-mobile`}>
                <a
                  href={getSectionHref(item.sectionId)}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-ink transition-colors duration-300 ease-premium hover:bg-brand-ink/5 hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={getSectionHref('contact')}
                onClick={closeMenu}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-ink px-3 py-2 text-sm font-semibold text-white transition-colors duration-300 ease-premium hover:bg-brand-accent hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                <span>Let&apos;s talk</span>
                <CircleArrowButton iconSrc={navArrow} iconHoverSrc={navArrowHover} centerFillOnHover className="!h-7 !w-7" />
              </a>
            </li>
            <li className="pt-2">
              <button
                type="button"
                aria-label={isEnglish ? 'Switch to Serbian' : 'Switch to English'}
                aria-pressed={!isEnglish}
                onClick={toggleLanguage}
                className="mx-auto inline-flex h-10 w-[76px] items-center rounded-full bg-brand-ink/10 px-1 transition-colors duration-300 ease-premium hover:bg-brand-ink/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                <span
                  aria-hidden="true"
                  className={`relative z-10 inline-flex h-8 w-8 items-center justify-right rounded-full transition-transform duration-500 ease-premium ${isEnglish ? 'translate-x-0' : 'translate-x-9'}`}
                >
                  <img src={isEnglish ? englishIcon : serbianIcon} alt={isEnglish ? 'English' : 'Serbian'} className="h-8 w-8" />
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <button
        type="button"
        aria-label={isEnglish ? 'Switch to Serbian' : 'Switch to English'}
        aria-pressed={!isEnglish}
        onClick={toggleLanguage}
        className="absolute right-[72px] top-12 z-[60] hidden h-10 w-[90px] cursor-pointer items-center rounded-full bg-white/15 transition-colors duration-500 ease-premium hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent lg:inline-flex"
      >
        <span
          aria-hidden="true"
          className={`relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-500 ease-premium ${isEnglish ? 'translate-x-[-2px]' : 'translate-x-11'}`}
        >
          <img src={isEnglish ? englishIcon : serbianIcon} alt={isEnglish ? 'English' : 'Serbian'} className="h-10 w-10" />
        </span>
      </button>
    </header>
  )
}

export default Navbar
