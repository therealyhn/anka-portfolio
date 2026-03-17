import { Link } from 'react-router-dom'
import CircleArrowButton from '../ui/CircleArrowButton'
import navArrow from '../../assets/images/arrows/Nav bar.svg'
import navArrowHover from '../../assets/images/arrows/Nav bar HOVER.svg'
import footerBackground from '../../assets/images/img/Background.png'
import AccentDot from '../ui/AccentDot'
import useFooterContent from '../../hooks/useFooterContent'
import linkedinIcon from '../../assets/images/icons/Linekdin icon (footer).svg'
import upworkIcon from '../../assets/images/icons/Upwork icon (footer).svg'
import fiverrIcon from '../../assets/images/icons/Fiver icon (footer).svg'
import dribbbleIcon from '../../assets/images/icons/Dribbble icon (footer).svg'
import instagramIcon from '../../assets/images/icons/Instagram icon (footer).svg'

const SOCIAL_ICON_MAP = {
  linkedin: linkedinIcon,
  upwork: upworkIcon,
  fiverr: fiverrIcon,
  dribbble: dribbbleIcon,
  instagram: instagramIcon,
}

function normalizePlatform(platform) {
  return String(platform || '')
    .toLowerCase()
    .trim()
}

function isInternalHref(href) {
  return typeof href === 'string' && (href.startsWith('/') || href.startsWith('#'))
}

function FooterLink({ href, className, children }) {
  if (isInternalHref(href)) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  )
}

function Footer() {
  const { data } = useFooterContent()

  return (
    <section id="contact" className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-5 lg:px-8 min-[1920px]:px-3 min-[1920px]:pb-6">
      <div
        className="relative min-h-[84svh] rounded-[10px] border border-white/10 bg-brand-charcoal px-4 text-white sm:rounded-[14px] sm:px-6 md:px-8 lg:px-12 min-[1920px]:rounded-[20px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.48), rgba(0,0,0,0.48)), url(${footerBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto flex min-h-[84svh] max-w-[600px] flex-col text-center sm:max-w-[800px] lg:max-w-[1280px] min-[1920px]:max-w-[1700px]">
          <div className="flex flex-1 flex-col items-center justify-center py-12 sm:py-16">
            <p className="inline-flex items-center gap-2 font-medium text-white/90 xl:gap-[10px]">
              <AccentDot />
              <span className="text-xs font-thin tracking-wide sm:text-sm xl:text-[16px]">{data.availabilityLabel}</span>
            </p>
            <h2 className="mt-2 text-4xl font-semibold sm:mt-3 sm:text-5xl md:text-6xl lg:text-7xl min-[1920px]:mt-4 min-[1920px]:text-[105px] min-[1920px]:leading-[1.03]">
              {data.titleLineOne} <em className="font-serif text-[1.08em] font-normal italic">{data.titleAccent}</em>
            </h2>
            <p className="mx-auto mt-3 max-w-[250px] text-sm leading-relaxed text-white/80 sm:mt-4 sm:max-w-[300px] sm:text-sm md:text-sm lg:text-sm min-[1920px]:mt-[30px] min-[1920px]:max-w-[300px] min-[1920px]:text-[18px] min-[1920px]:leading-[1.36]">
              {data.description}
            </p>
            <FooterLink
              href={data.ctaHref}
              className="group mt-6 inline-flex items-center gap-2 text-lg font-thin text-white transition-colors duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent sm:mt-8 sm:gap-3 sm:text-xl md:text-2xl min-[1920px]:mt-[44px] min-[1920px]:text-[28px]"
            >
              <span>{data.ctaLabel}</span>
              <CircleArrowButton
                iconSrc={navArrow}
                iconHoverSrc={navArrowHover}
                centerFillOnHover
                fillColorClass="bg-brand-ink"
                className="!h-8 !w-8 sm:!h-9 sm:!w-9 min-[1920px]:!h-10 min-[1920px]:!w-10"
              />
            </FooterLink>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/15 py-6 sm:py-8">
            <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row sm:text-base lg:text-lg min-[1920px]:text-[21px]">
              <div className="flex flex-col items-center gap-1 text-white/80 sm:items-start">
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-start">
                  <span>&copy;{data.copyrightText}</span>
                  <span className="text-white/45">|</span>
                  <span>{data.portfolioLabel}</span>
                  <FooterLink
                    href={data.privacyHref}
                    className="text-white/35 transition-colors duration-300 ease-premium hover:text-brand-paper"
                  >
                    {data.privacyLabel}
                  </FooterLink>
                </div>
                <p className="text-xs text-white/55 sm:text-sm">
                  Developed by{' '}
                  <a
                    href="https://jovanljusic.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/70 transition-colors duration-300 ease-premium hover:text-brand-paper"
                  >
                    Jovan Ljusic
                  </a>
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 sm:justify-end">
                {data.socials.map((social) => {
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
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors duration-300 ease-premium hover:text-white"
                    >
                      <img src={icon} alt="" aria-hidden="true" className="h-[18px] w-[18px] object-contain" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
