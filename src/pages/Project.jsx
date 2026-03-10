import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProjectBySlug, projectsData } from '../lib/projectsData'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

const DEFAULT_OVERVIEW =
  'Designed the advertiser analytics dashboard for the House of Summary platform, focusing on clear data hierarchy and scannable performance insights. Structured key metrics such as clicks, views, CPC, audience demographics, and geographic data into modular components, enabling advertisers to quickly understand campaign performance and identify trends.'

function Project() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const relatedProjects = projectsData.filter((item) => item.slug !== slug).slice(0, 2)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  if (!project) {
    return <Navigate to="/" replace />
  }

  const overview = project.overview || DEFAULT_OVERVIEW
  const year = project.year || '2026'
  const location = project.location || 'Remote'
  const duration = project.duration || '3 weeks'
  const stack = project.stack || 'Figma'
  const services = Array.isArray(project.services) && project.services.length > 0
    ? project.services
    : ['UI Design', 'Dashboard Design', 'Data Visualization']

  const galleryImages = Array.isArray(project.galleryImages) && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.image, project.image, project.image]

  return (
    <main className="min-h-screen overflow-x-clip bg-brand-charcoal text-white">
      <section className="w-full overflow-x-clip px-4 pt-6 sm:px-8 min-[1920px]:px-0">
        <div className="mx-auto w-full min-[1920px]:max-w-[1920px]">
          <Navbar hideLanguageSwitch />

          <div className="mt-28 min-[1920px]:relative min-[1920px]:mt-0 min-[1920px]:h-[1512px]">
            <div className="min-[1920px]:absolute min-[1920px]:left-[96px] min-[1920px]:top-[254px] min-[1920px]:h-[232px] min-[1920px]:w-[1572px]">
              <h1 className="max-w-full font-display text-[64px] font-medium leading-[1.03] tracking-[-0.03em] sm:text-[94px] min-[1920px]:text-[200px] min-[1920px]:leading-[1.16] min-[1920px]:tracking-[-16px]">
                {project.client}
              </h1>
            </div>

            <div className="mt-10 space-y-8 min-[1920px]:absolute min-[1920px]:left-0 min-[1920px]:top-[512px] min-[1920px]:mt-0 min-[1920px]:h-[1000px] min-[1920px]:w-[633px] min-[1920px]:space-y-0">
              <div className="min-[1920px]:absolute min-[1920px]:left-[96px] min-[1920px]:top-[67px] min-[1920px]:h-[308px] min-[1920px]:w-[441px]">
                <p className="text-sm font-light leading-[1.22] text-brand-accent min-[1920px]:text-[19px]">overview</p>
                <p className="mt-3 text-base leading-[1.4] text-white min-[1920px]:mt-[19px] min-[1920px]:w-[441px] min-[1920px]:text-[21px] min-[1920px]:leading-[1.4]">
                  {overview}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-7 gap-y-7 min-[1920px]:absolute min-[1920px]:left-[96px] min-[1920px]:top-[581px] min-[1920px]:gap-x-9 min-[1920px]:gap-y-[87px]">
                <div className="w-[152px] min-[1920px]:w-[203px]">
                  <p className="text-sm font-light leading-[1.22] text-brand-accent min-[1920px]:text-[19px]">client</p>
                  <p className="text-base leading-[1.22] text-white min-[1920px]:text-[21px]">{project.client}</p>
                </div>
                <div className="w-[152px] min-[1920px]:w-[203px]">
                  <p className="text-sm font-light leading-[1.22] text-brand-accent min-[1920px]:text-[19px]">year</p>
                  <p className="text-base leading-[1.22] text-white min-[1920px]:text-[21px]">{year}</p>
                </div>
                <div className="w-[152px] min-[1920px]:w-[203px]">
                  <p className="text-sm font-light leading-[1.22] text-brand-accent min-[1920px]:text-[19px]">location</p>
                  <p className="text-base leading-[1.22] text-white min-[1920px]:text-[21px]">{location}</p>
                </div>
                <div className="w-[152px] min-[1920px]:w-[203px]">
                  <p className="text-sm font-light leading-[1.22] text-brand-accent min-[1920px]:text-[19px]">duration</p>
                  <p className="text-base leading-[1.22] text-white min-[1920px]:text-[21px]">{duration}</p>
                </div>
                <div className="w-[152px] min-[1920px]:w-[203px]">
                  <p className="text-sm font-light leading-[1.22] text-brand-accent min-[1920px]:text-[19px]">stack</p>
                  <p className="text-base leading-[1.25] text-white min-[1920px]:text-[21px]">{stack}</p>
                </div>
                <div className="w-[152px] min-[1920px]:w-[203px]">
                  <p className="text-sm font-light leading-[1.22] text-brand-accent min-[1920px]:text-[19px]">services</p>
                  <p className="text-base leading-[1.25] text-white min-[1920px]:text-[21px]">
                    {services.map((service, index) => (
                      <span key={`${project.slug}-service-${index}`}>
                        {service}
                        {index < services.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div className="no-scrollbar mt-8 space-y-[13px] min-[1920px]:absolute min-[1920px]:left-[633px] min-[1920px]:right-[24px] min-[1920px]:top-[512px] min-[1920px]:mt-0 min-[1920px]:h-[1000px] min-[1920px]:overflow-y-auto">
              {galleryImages.map((image, index) => (
                <div
                  key={`${project.slug}-gallery-${index}`}
                  className="overflow-hidden rounded-[15px] bg-black min-[1920px]:w-full min-[1920px]:rounded-[20px]"
                >
                  <img
                    src={image}
                    alt={`${project.title} screen ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className={`w-full object-cover ${index === 0 ? 'h-[380px] sm:h-[520px] min-[1920px]:h-[733px]' : 'h-[420px] sm:h-[560px] min-[1920px]:h-[800px]'}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 pt-16 sm:px-8 min-[1920px]:px-0 min-[1920px]:pb-[86px] min-[1920px]:pt-[106px]">
        <div className="mx-auto max-w-[1295px] min-[1920px]:max-w-[1727px]">
          <h2 className="text-5xl font-medium tracking-tight min-[1920px]:text-[68px] min-[1920px]:leading-[1.1] min-[1920px]:tracking-[-0.04em]">More projects like this</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 min-[1920px]:mt-[52px] min-[1920px]:grid-cols-[repeat(2,550px)] min-[1920px]:justify-start min-[1920px]:gap-x-[22px]">
            {relatedProjects.map((item) => (
              <Link
                key={item.id}
                to={`/projects/${item.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                <div className="overflow-hidden rounded-[10px] min-[1920px]:w-[550px]">
                  <img
                    src={item.image}
                    alt={`${item.title} preview`}
                    loading="lazy"
                    decoding="async"
                    className="h-[220px] w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.03] sm:h-[300px] min-[1920px]:h-[407px]"
                  />
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl min-[1920px]:mt-[12px] min-[1920px]:text-[39px] min-[1920px]:leading-[1.12]">
                  {item.title} <span className="font-medium text-white/55">| {item.client}</span>
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Project
