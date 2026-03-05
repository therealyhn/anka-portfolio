import CircleArrowButton from '../ui/CircleArrowButton'
import logoBlackText from '../../assets/images/logo/SVG black text.svg'
import englishIcon from '../../assets/images/icons/english icon.svg'
import navArrow from '../../assets/images/arrows/Nav bar.svg'
import navArrowHover from '../../assets/images/arrows/Nav bar HOVER.svg'

const NAV_ITEMS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About me', href: '#about' },
]

function Navbar() {
  return (
    <header className="absolute top-3 z-20 w-full px-6 md:top-4 md:px-12">
      <div className="relative flex items-center justify-center">
        <nav className="flex w-full max-w-[760px] items-center justify-between rounded-xl bg-brand-surface px-4 py-4 shadow-edge md:px-5">
          <a
            href="#hero"
            aria-label="Back to top"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
          >
            <img src={logoBlackText} alt="Anka Design" className="h-auto w-[140px]" />
          </a>

          <ul className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-base font-semibold text-brand-ink transition-colors duration-300 ease-premium hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-base font-semibold text-brand-ink transition-colors duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
          >
            <span className="hidden sm:inline">Let&apos;s talk</span>
            <CircleArrowButton iconSrc={navArrow} iconHoverSrc={navArrowHover} centerFillOnHover />
          </a>
        </nav>

        <button
          type="button"
          aria-label="Language selector"
          className="absolute right-0 inline-flex h-10 w-[76px] items-center justify-center rounded-full bg-white/15 transition-colors duration-300 ease-premium hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          <img src={englishIcon} alt="English" className="h-8 w-8" />
        </button>
      </div>
    </header>
  )
}

export default Navbar
