import { Link } from 'react-router-dom'
import CircleArrowButton from '../ui/CircleArrowButton'
import navArrow from '../../assets/images/arrows/Nav bar.svg'
import navArrowHover from '../../assets/images/arrows/Nav bar HOVER.svg'
import footerBackground from '../../assets/images/img/Background.png'

function Footer() {
  return (
    <section id="contact" className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-5 lg:px-8 min-[1920px]:px-3 min-[1920px]:pb-6">
      <div
        className="relative overflow-hidden rounded-[10px] border border-white/10 bg-brand-charcoal px-4 py-12 text-white sm:rounded-[14px] sm:px-6 sm:py-16 md:px-8 lg:px-12 min-[1920px]:min-h-[975px] min-[1920px]:rounded-[20px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.48), rgba(0,0,0,0.48)), url(${footerBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-[600px] text-center sm:max-w-[800px] lg:max-w-[1280px] min-[1920px]:max-w-[1700px]">
          <p className="text-xs font-medium tracking-[0.08em] text-brand-accent sm:text-sm min-[1920px]:mt-[120px] min-[1920px]:text-[21px]">
            Available for work
          </p>
          <h2 className="mt-2 text-4xl font-semibold sm:mt-3 sm:text-5xl md:text-6xl lg:text-7xl min-[1920px]:mt-4 min-[1920px]:text-[105px] min-[1920px]:leading-[1.03]">
            Let&apos;s <em className="font-serif text-[1.08em] font-normal italic">Connect</em>
          </h2>
          <p className="mx-auto mt-3 max-w-[400px] text-base leading-relaxed text-white/80 sm:mt-4 sm:max-w-[480px] sm:text-lg md:text-xl lg:text-2xl min-[1920px]:mt-[30px] min-[1920px]:max-w-[610px] min-[1920px]:text-[30px] min-[1920px]:leading-[1.36]">
            Always open to new projects and collaborations. Let&apos;s talk about what you&apos;re building.
          </p>
          <Link
            to="/#contact"
            className="group mt-6 inline-flex items-center gap-2 text-lg font-semibold text-white transition-colors duration-300 ease-premium hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent sm:mt-8 sm:gap-3 sm:text-xl md:text-2xl min-[1920px]:mt-[44px] min-[1920px]:text-[28px]"
          >
            <span>Start a conversation</span>
            <CircleArrowButton
              iconSrc={navArrow}
              iconHoverSrc={navArrowHover}
              centerFillOnHover
              fillColorClass="bg-brand-ink"
              className="!h-8 !w-8 sm:!h-9 sm:!w-9 min-[1920px]:!h-10 min-[1920px]:!w-10"
            />
          </Link>

          <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/15 pt-6 text-sm text-white/70 sm:mt-16 sm:flex-row sm:justify-between sm:gap-6 sm:pt-8 sm:text-base lg:text-lg min-[1920px]:absolute min-[1920px]:bottom-[58px] min-[1920px]:left-[59px] min-[1920px]:right-[59px] min-[1920px]:mt-0 min-[1920px]:text-[21px]">
            <p>&copy; Anka Ljusic, 2026 | Personal Portfolio</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
