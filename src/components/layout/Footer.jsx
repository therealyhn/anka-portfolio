import { Link } from 'react-router-dom'
import CircleArrowButton from '../ui/CircleArrowButton'
import navArrow from '../../assets/images/arrows/Nav bar.svg'
import navArrowHover from '../../assets/images/arrows/Nav bar HOVER.svg'
import footerBackground from '../../assets/images/img/Background.png'

function Footer() {
  return (
    <section id="contact" className="px-4 pb-5 sm:px-8 min-[1920px]:px-3 min-[1920px]:pb-6">
      <div
        className="relative overflow-hidden rounded-[14px] border border-white/10 bg-brand-charcoal px-4 py-16 text-white sm:px-8 lg:px-12 min-[1920px]:min-h-[975px] min-[1920px]:rounded-[20px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.48), rgba(0,0,0,0.48)), url(${footerBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-[1280px] text-center min-[1920px]:max-w-[1700px]">
          <p className="text-sm font-medium tracking-[0.08em] text-brand-accent min-[1920px]:mt-[120px] min-[1920px]:text-[21px]">
            Available for work
          </p>
          <h2 className="mt-3 text-5xl font-semibold sm:text-6xl lg:text-7xl min-[1920px]:mt-4 min-[1920px]:text-[105px] min-[1920px]:leading-[1.03]">
            Let&apos;s <em className="font-serif text-[1.08em] font-normal italic">Connect</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-2xl leading-relaxed text-white/80 min-[1920px]:mt-[30px] min-[1920px]:max-w-[610px] min-[1920px]:text-[30px] min-[1920px]:leading-[1.36]">
            Always open to new projects and collaborations. Let&apos;s talk about what you&apos;re building.
          </p>
          <Link
            to="/#contact"
            className="group mt-8 inline-flex items-center gap-3 text-2xl font-semibold text-white transition-colors duration-300 ease-premium hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent min-[1920px]:mt-[44px] min-[1920px]:text-[28px]"
          >
            <span>Start a conversation</span>
            <CircleArrowButton
              iconSrc={navArrow}
              iconHoverSrc={navArrowHover}
              centerFillOnHover
              fillColorClass="bg-brand-ink"
              className="min-[1920px]:!h-10 min-[1920px]:!w-10"
            />
          </Link>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-8 text-lg text-white/70 min-[1920px]:absolute min-[1920px]:bottom-[58px] min-[1920px]:left-[59px] min-[1920px]:right-[59px] min-[1920px]:mt-0 min-[1920px]:text-[21px]">
            <p>&copy; Anka Ljusic, 2026 | Personal Portfolio</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
