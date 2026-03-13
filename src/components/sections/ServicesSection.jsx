import AccentDot from '../ui/AccentDot'

const SERVICES_ITEMS = [
  {
    label: 'Brand & Visual Design',
    hoverLabel: 'Logos, colors, and visuals that actually get along.',
  },
  {
    label: 'Web & Product Design',
    hoverLabel: 'Websites and products that feel clear from the first click.',
  },
  {
    label: 'Marketing Design',
    hoverLabel: 'Campaign visuals that stay on-brand and easy to scale.',
  },
  {
    label: 'Presentations & Decks',
    hoverLabel: 'Decks that tell complex stories in a simple flow.',
  },
]

function ServicesSection() {
  return (
    <section id="services" className="rounded-frame bg-brand-paper px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 min-[1920px]:px-[72px] min-[1920px]:pt-[86px] min-[1920px]:pb-[118px]" aria-label="Services section">
      <div className="mx-auto max-w-[1295px] min-[1920px]:max-w-[1776px]">
        <div className="flex flex-col gap-8 min-[1200px]:flex-row min-[1200px]:items-start min-[1200px]:justify-between">
          <div className="min-[1200px]:w-[55%] min-[1920px]:w-[1040px]">
            <p className="inline-flex items-center gap-3 text-[15px] font-normal uppercase tracking-[0.01em] text-brand-accent min-[1920px]:text-[24px]">
              <AccentDot className="h-4 w-4 min-[1920px]:h-2.5 min-[1920px]:w-2.5" />
              Services
            </p>
            <h2 className="mt-4 max-w-[620px] text-4xl leading-tight text-brand-ink sm:text-5xl lg:text-6xl min-[1920px]:mt-[18px] min-[1920px]:max-w-[600px] min-[1920px]:text-[68px] min-[1920px]:leading-[1.1] min-[1920px]:tracking-[-0.04em]">
              What I can <em className="font-serif text-[1.3em] font-normal italic">design</em> for your team
            </h2>
          </div>

          <p className="max-w-[1000px] text-base leading-relaxed font-thin text-black min-[1200px]:w-[42%] min-[1920px]:w-[640px] min-[1920px]:pt-[56px] min-[1920px]:text-[24px] min-[1920px]:leading-[1.5]">
            Delivering thoughtful and engaging design across brands, websites, and marketing assets - all created to be clear, consistent, and just a bit fun along the way.
          </p>
        </div>

        <ul className="mt-10 border-t border-black/35 min-[1920px]:mt-[62px]">
          {SERVICES_ITEMS.map((item) => (
            <li key={item.label} className="border-b border-black/35">
              <button
                type="button"
                className="group flex w-full items-center justify-between px-4 py-5 text-left sm:px-5 min-[1920px]:px-[60px] min-[1920px]:py-[33px]"
                aria-label={item.label}
              >
                <span className="relative block h-[1.34em] flex-1 overflow-hidden pr-6 text-lg leading-[1.1] text-brand-ink sm:pr-8 sm:text-xl min-[1920px]:pr-[72px] min-[1920px]:text-[36px] min-[1920px]:leading-[1.1]">
                  <span className="absolute left-0 top-0 block -translate-y-[1px] whitespace-nowrap transition-transform duration-500 ease-premium group-hover:-translate-y-[108%]">
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[108%] block -translate-y-[1px] whitespace-nowrap text-brand-ink transition-transform duration-500 ease-premium group-hover:-translate-y-[120%]"
                  >
                    {item.hoverLabel}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-ink/10 text-black transition-colors duration-300
                 ease-premium min-[1920px]:h-10 min-[1920px]:w-10"
                >
                  <span className="relative block h-3 w-3 min-[1920px]:h-[16px] min-[1920px]:w-[16px]">
                    <span className="absolute left-1/2 top-1/2 h-[1.6px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-full w-[1.6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ServicesSection
