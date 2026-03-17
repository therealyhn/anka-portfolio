import useAboutContent from '../../hooks/useAboutContent'
import AboutHeader from './about/AboutHeader'
import AboutBentoGrid from './about/AboutBentoGrid'
import AboutToolsRow from './about/AboutToolsRow'
import AboutTestimonialsSlider from './about/AboutTestimonialsSlider'

function AboutSection() {
  const { data } = useAboutContent()

  return (
    <section
      id="about"
      className="rounded-frame bg-brand-paper px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-12 lg:py-16 xl:py-20 xl:px-12 2xl:pt-[84px] 2xl:pb-[102px]"
      aria-label="About section"
    >
      <div className="mx-auto max-w-[600px] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1440px] min-[1920px]:max-w-[1776px]">
        <AboutHeader data={data} />
        <AboutBentoGrid data={data} />
        <AboutToolsRow tools={data.tools} />
        <AboutTestimonialsSlider testimonials={data.testimonials} />
      </div>
    </section>
  )
}

export default AboutSection
