import useTranslation from '../../hooks/useTranslation'

function FooterSection() {
  const { t } = useTranslation()

  return (
    <footer className="rounded-frame bg-brand-charcoal" aria-label={t('footer.sectionAria')}>
      <div className="min-h-[120px] sm:min-h-[140px]" />
    </footer>
  )
}

export default FooterSection
