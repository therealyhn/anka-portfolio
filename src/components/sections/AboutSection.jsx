import useAboutContent from '../../hooks/useAboutContent'
import useTranslation from '../../hooks/useTranslation'
import { useLang } from '../../context/LangContext'
import AboutHeader from './about/AboutHeader'
import AboutBentoGrid from './about/AboutBentoGrid'
import AboutToolsRow from './about/AboutToolsRow'
import AboutTestimonialsSlider from './about/AboutTestimonialsSlider'

function AboutSection() {
  const { data } = useAboutContent()
  const { t } = useTranslation()
  const { lang } = useLang()

  const sr = (en, srVal) => lang === 'sr' ? (srVal || en) : en

  const resolvedData = {
    ...data,
    eyebrowLabel: sr(data.eyebrowLabel, data.eyebrowLabel_sr),
    titleLineOne: sr(data.titleLineOne, data.titleLineOne_sr),
    titleAccent: sr(data.titleAccent, data.titleAccent_sr),
    titleLineTwo: sr(data.titleLineTwo, data.titleLineTwo_sr),
    description: sr(data.description, data.description_sr),
    experienceTitle: sr(data.experienceTitle, data.experienceTitle_sr),
    experienceText: sr(data.experienceText, data.experienceText_sr),
    locationTitle: sr(data.locationTitle, data.locationTitle_sr),
    locationStatus: sr(data.locationStatus, data.locationStatus_sr || t('about.locationStatus')),
    yearsLabel: sr(data.yearsLabel, data.yearsLabel_sr),
    assetsLabel: sr(data.assetsLabel, data.assetsLabel_sr),
    testimonials: data.testimonials.map((item) => ({
      ...item,
      quoteLineOne: sr(item.quoteLineOne, item.quoteLineOne_sr),
      quoteLineTwo: sr(item.quoteLineTwo, item.quoteLineTwo_sr),
      role: sr(item.role, item.role_sr),
    })),
    tools: data.tools.map((tool) => ({
      ...tool,
      description: sr(tool.description, tool.description_sr),
    })),
  }

  return (
    <section
      id="about"
      className="rounded-frame bg-brand-paper px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-12 lg:py-16 xl:py-20 xl:px-12 2xl:pt-[84px] 2xl:pb-[102px]"
      aria-label={t('about.sectionAria')}
    >
      <div className="mx-auto max-w-[600px] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1440px] min-[1920px]:max-w-[1776px]">
        <AboutHeader data={resolvedData} />
        <AboutBentoGrid data={resolvedData} />
        <AboutToolsRow tools={resolvedData.tools} />
        <AboutTestimonialsSlider testimonials={resolvedData.testimonials} />
      </div>
    </section>
  )
}

export default AboutSection
