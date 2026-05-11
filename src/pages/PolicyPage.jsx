import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import { useLang } from '../context/LangContext'
import SEO from '../components/shared/SEO'

const POLICY_CONTENT = {
  en: {
    title: 'Privacy Policy',
    updatedAt: 'Last updated 20 February 2026',
    tocHeading: 'Table of contents',
    tocAriaLabel: 'Privacy table of contents',
    sections: [
      {
        id: 'introduction',
        label: 'Introduction',
        blocks: [
          { type: 'p', text: 'This website is a personal portfolio website operated by:' },
          {
            type: 'lines',
            lines: ['Anka Ljusic', 'Email: ljusicanka1@gmail.com', 'Location: Belgrade, Serbia'],
          },
          {
            type: 'p',
            text: 'This Privacy Policy explains how personal data is collected, used, and protected when you use the contact form on this website.',
          },
        ],
      },
      {
        id: 'personal-data',
        label: 'Personal Data We Collect',
        heading: 'Personal Data We Collect',
        blocks: [
          { type: 'p', text: 'We only collect personal data that you voluntarily provide through the contact form:' },
          {
            type: 'list',
            items: ['Name', 'Company name (optional)', 'Email address', 'Phone number (optional)', 'Message content'],
          },
          { type: 'p', text: 'This data is sent directly to our email inbox and is not stored in a database on the website.' },
        ],
      },
      {
        id: 'purpose',
        label: 'Purpose of Processing',
        heading: 'Purpose of Processing',
        blocks: [
          { type: 'p', text: 'The collected data is used solely for:' },
          { type: 'list', items: ['Responding to your inquiry', 'Communicating about potential collaboration or services'] },
          { type: 'p', text: 'We do not use your data for marketing, newsletters, or automated decision-making.' },
        ],
      },
      {
        id: 'legal-basis',
        label: 'Legal Basis (GDPR)',
        heading: 'Legal Basis (GDPR)',
        blocks: [
          { type: 'p', text: 'If you are located in the European Economic Area (EEA), the legal basis for processing your data is:' },
          {
            type: 'list',
            items: [
              'Pre-contractual steps - when you contact us regarding potential work or services',
              'Legitimate interest - to respond to your message',
            ],
          },
        ],
      },
      {
        id: 'data-sharing',
        label: 'Data Sharing',
        heading: 'Data Sharing',
        blocks: [
          { type: 'p', text: 'Your personal data is not sold, rented, or shared with third parties.' },
          { type: 'p', text: 'Data may be processed by:' },
          {
            type: 'list',
            items: [
              'The email service provider used to receive messages',
              'The website hosting provider (for technical delivery of the form)',
            ],
          },
          { type: 'p', text: 'Only to the extent necessary for communication and website operation.' },
        ],
      },
      {
        id: 'retention',
        label: 'Data Retention',
        heading: 'Data Retention',
        blocks: [
          {
            type: 'p',
            text: 'Contact form messages are kept only as long as necessary to respond to your inquiry and for potential future collaboration.',
          },
          { type: 'p', text: 'You may request deletion of your personal data at any time.' },
        ],
      },
      {
        id: 'rights',
        label: 'Your Rights',
        heading: 'Your Rights',
        blocks: [
          { type: 'p', text: 'If you are located in the EU/EEA, you have the right to:' },
          {
            type: 'list',
            items: [
              'Request access to your personal data',
              'Request correction or deletion',
              'Object to processing',
              'Request restriction of processing',
            ],
          },
          { type: 'p', text: 'To exercise these rights, contact: ljusicanka1@gmail.com' },
        ],
      },
      {
        id: 'security',
        label: 'Data Security',
        heading: 'Data Security',
        blocks: [
          { type: 'p', text: 'Reasonable technical and organizational measures are taken to protect your personal data.' },
          { type: 'p', text: 'However, transmission of data over the Internet cannot be guaranteed to be completely secure.' },
        ],
      },
      {
        id: 'third-party',
        label: 'Third-Party Links',
        heading: 'Third-Party Links',
        blocks: [
          { type: 'p', text: 'This website may contain links to third-party platforms (such as GitHub or LinkedIn).' },
          { type: 'p', text: 'We are not responsible for their privacy practices.' },
        ],
      },
      {
        id: 'changes',
        label: 'Changes to This Privacy Policy',
        heading: 'Changes to This Privacy Policy',
        blocks: [
          { type: 'p', text: 'This Privacy Policy may be updated occasionally.' },
          { type: 'p', text: 'The latest version will always be available on this page.' },
        ],
      },
    ],
  },
  sr: {
    title: 'Politika privatnosti',
    updatedAt: 'Poslednje azuriranje 20. februar 2026.',
    tocHeading: 'Sadrzaj',
    tocAriaLabel: 'Sadrzaj politike privatnosti',
    sections: [
      {
        id: 'introduction',
        label: 'Uvod',
        blocks: [
          { type: 'p', text: 'Ovaj sajt je licni portfolio sajt kojim upravlja:' },
          {
            type: 'lines',
            lines: ['Anka Ljusic', 'Email: ljusicanka1@gmail.com', 'Lokacija: Beograd, Srbija'],
          },
          {
            type: 'p',
            text: 'Ova Politika privatnosti objasnjava kako se licni podaci prikupljaju, koriste i stite kada koristite kontakt formu na ovom sajtu.',
          },
        ],
      },
      {
        id: 'personal-data',
        label: 'Koje licne podatke prikupljamo',
        heading: 'Koje licne podatke prikupljamo',
        blocks: [
          { type: 'p', text: 'Prikupljamo samo licne podatke koje dobrovoljno unesete kroz kontakt formu:' },
          {
            type: 'list',
            items: ['Ime i prezime', 'Naziv kompanije (opciono)', 'Email adresa', 'Broj telefona (opciono)', 'Sadrzaj poruke'],
          },
          { type: 'p', text: 'Ovi podaci se salju direktno na nas email i ne cuvaju se u bazi podataka na sajtu.' },
        ],
      },
      {
        id: 'purpose',
        label: 'Svrha obrade',
        heading: 'Svrha obrade',
        blocks: [
          { type: 'p', text: 'Prikupljeni podaci koriste se iskljucivo za:' },
          { type: 'list', items: ['Odgovor na vas upit', 'Komunikaciju o potencijalnoj saradnji ili uslugama'] },
          { type: 'p', text: 'Vase podatke ne koristimo za marketing, newsletter kampanje ili automatizovano odlucivanje.' },
        ],
      },
      {
        id: 'legal-basis',
        label: 'Pravna osnova (GDPR)',
        heading: 'Pravna osnova (GDPR)',
        blocks: [
          { type: 'p', text: 'Ako se nalazite u Evropskom ekonomskom prostoru (EEA), pravna osnova za obradu vasih podataka je:' },
          {
            type: 'list',
            items: [
              'Preduzimanje radnji pre zakljucenja ugovora - kada nas kontaktirate povodom potencijalnog posla ili usluge',
              'Legitiman interes - da odgovorimo na vasu poruku',
            ],
          },
        ],
      },
      {
        id: 'data-sharing',
        label: 'Deljenje podataka',
        heading: 'Deljenje podataka',
        blocks: [
          { type: 'p', text: 'Vasi licni podaci se ne prodaju, ne iznajmljuju i ne dele sa trecim stranama.' },
          { type: 'p', text: 'Podaci mogu biti obradjeni od strane:' },
          {
            type: 'list',
            items: [
              'Provajdera email usluge koji se koristi za prijem poruka',
              'Hosting provajdera sajta (radi tehnicke isporuke forme)',
            ],
          },
          { type: 'p', text: 'Iskljucivo u meri neophodnoj za komunikaciju i rad sajta.' },
        ],
      },
      {
        id: 'retention',
        label: 'Cuvanje podataka',
        heading: 'Cuvanje podataka',
        blocks: [
          {
            type: 'p',
            text: 'Poruke poslate preko kontakt forme cuvaju se samo onoliko dugo koliko je potrebno da odgovorimo na vas upit i zbog eventualne buduce saradnje.',
          },
          { type: 'p', text: 'U svakom trenutku mozete zatraziti brisanje svojih licnih podataka.' },
        ],
      },
      {
        id: 'rights',
        label: 'Vasa prava',
        heading: 'Vasa prava',
        blocks: [
          { type: 'p', text: 'Ako se nalazite u EU/EEA, imate pravo da:' },
          {
            type: 'list',
            items: [
              'Zatrazite pristup svojim licnim podacima',
              'Zatrazite ispravku ili brisanje',
              'Ulozite prigovor na obradu',
              'Zatrazite ogranicenje obrade',
            ],
          },
          { type: 'p', text: 'Za ostvarivanje ovih prava kontaktirajte: ljusicanka1@gmail.com' },
        ],
      },
      {
        id: 'security',
        label: 'Bezbednost podataka',
        heading: 'Bezbednost podataka',
        blocks: [
          { type: 'p', text: 'Preduzimamo razumne tehnicke i organizacione mere za zastitu vasih licnih podataka.' },
          { type: 'p', text: 'Ipak, prenos podataka putem interneta ne moze biti u potpunosti garantovano bezbedan.' },
        ],
      },
      {
        id: 'third-party',
        label: 'Linkovi ka trecim stranama',
        heading: 'Linkovi ka trecim stranama',
        blocks: [
          { type: 'p', text: 'Ovaj sajt moze sadrzati linkove ka platformama trecih strana (npr. GitHub ili LinkedIn).' },
          { type: 'p', text: 'Nismo odgovorni za njihove politike privatnosti.' },
        ],
      },
      {
        id: 'changes',
        label: 'Izmene ove politike privatnosti',
        heading: 'Izmene ove politike privatnosti',
        blocks: [
          { type: 'p', text: 'Ova Politika privatnosti moze povremeno biti azurirana.' },
          { type: 'p', text: 'Najnovija verzija ce uvek biti dostupna na ovoj stranici.' },
        ],
      },
    ],
  },
}

function PolicyPage() {
  const articleRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const { lang } = useLang()

  const content = useMemo(() => POLICY_CONTENT[lang] || POLICY_CONTENT.en, [lang])
  const tocItems = useMemo(
    () => content.sections.map((section) => ({ id: section.id, label: section.label })),
    [content],
  )
  const [activeSectionId, setActiveSectionId] = useState(tocItems[0].id)

  useEffect(() => {
    setActiveSectionId(tocItems[0].id)
  }, [tocItems])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [lang])

  useEffect(() => {
    const onScroll = () => {
      const article = articleRef.current
      if (!article) return

      const rect = article.getBoundingClientRect()
      const totalScrollable = Math.max(1, rect.height - window.innerHeight)
      const consumed = Math.min(totalScrollable, Math.max(0, -rect.top))
      const nextProgress = Math.round((consumed / totalScrollable) * 100)
      setProgress(nextProgress)

      const activationLine = window.innerHeight * 0.34
      let nextActiveSection = tocItems[0].id

      tocItems.forEach((item) => {
        const sectionNode = document.getElementById(item.id)
        if (sectionNode && sectionNode.getBoundingClientRect().top <= activationLine) {
          nextActiveSection = item.id
        }
      })

      setActiveSectionId((currentSection) => (
        currentSection === nextActiveSection ? currentSection : nextActiveSection
      ))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [tocItems])

  const renderBlock = (block, blockIndex, hasHeading) => {
    const mtCls = blockIndex === 0 ? (hasHeading ? 'mt-4' : '') : 'mt-4'
    const baseTextCls = 'text-[15px] leading-relaxed text-brand-ink/90'
    const pCls = `${mtCls} ${baseTextCls} xl:text-[12px] xl:leading-[1.43]`
    const linesCls = `${mtCls} ${baseTextCls} xl:text-[16px] xl:leading-[1.57] xl:font-medium`
    const listCls = `${mtCls} space-y-2 ${baseTextCls} xl:text-[12px] xl:leading-[1.43]`

    if (block.type === 'list') {
      return (
        <ul key={`list-${blockIndex}`} className={listCls}>
          {block.items.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      )
    }

    if (block.type === 'lines') {
      return (
        <p key={`lines-${blockIndex}`} className={linesCls}>
          {block.lines.map((line, index) => (
            <Fragment key={`${line}-${index}`}>
              {line}
              {index < block.lines.length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </p>
      )
    }

    return (
      <p key={`p-${blockIndex}`} className={pCls}>
        {block.text}
      </p>
    )
  }

  return (
    <>
      <SEO
        title={lang === 'sr' ? 'Politika privatnosti' : 'Privacy Policy'}
        description={
          lang === 'sr'
            ? 'Politika privatnosti portfolio sajta Anke Ljusić. Saznajte kako se lični podaci prikupljaju i štite.'
            : 'Privacy Policy for Anka Ljusic\'s portfolio website. Learn how personal data is collected and protected.'
        }
        url="/privacy"
      />
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <section className="px-4 pb-14 pt-6 sm:px-8 sm:pb-16 lg:pb-20 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1680px]">
          <Navbar hideLanguageSwitch />

          <div className="pt-28 sm:pt-32 lg:pt-36">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-x-12 xl:grid-cols-[minmax(0,1fr)_280px]">
              <article ref={articleRef} className="max-w-[860px]">
                <h1 className="font-serif text-5xl italic leading-[1.05] text-brand-ink sm:text-6xl xl:text-[56px] xl:leading-[1.04] xl:font-normal xl:tracking-normal">{content.title}</h1>
                <p className="mt-6 text-sm font-light text-brand-muted xl:text-[16px] xl:font-medium xl:leading-[1.57]">{content.updatedAt}</p>

                {content.sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className={`${index === 0 ? 'mt-10' : 'mt-12'} ${section.id === 'changes' ? 'pb-8' : ''}`}
                  >
                    {section.heading ? <h2 className="text-2xl font-semibold leading-snug xl:text-[32px] xl:font-medium xl:leading-[1.42]">{section.heading}</h2> : null}
                    {section.blocks.map((block, blockIndex) => renderBlock(block, blockIndex, Boolean(section.heading)))}
                  </section>
                ))}
              </article>

              <aside className="mt-12 hidden lg:block">
                <div className="sticky top-28">
                  <p className="mb-2 text-right text-[10px] font-medium text-brand-muted">{progress}%</p>
                  <div className="rounded-xl bg-white p-5 text-brand-ink shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-brand-ink/5">
                    <h3 className="text-[13px] font-bold xl:text-[15px] xl:font-semibold xl:leading-[1.04]">{content.tocHeading}</h3>
                    <nav aria-label={content.tocAriaLabel} className="mt-4">
                      <ul className="space-y-3.5">
                        {tocItems.map((item) => {
                          const isActive = activeSectionId === item.id
                          return (
                            <li key={item.id}>
                              <a
                                href={`#${item.id}`}
                                className="group relative block py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60"
                              >
                                <span
                                  aria-hidden="true"
                                  className={`absolute left-0 top-[43%] text-[15px] leading-none transition-all duration-300 ease-premium ${isActive ? 'translate-x-0 -translate-y-1/2 opacity-100 text-brand-ink' : '-translate-x-1 -translate-y-1/2 opacity-0 text-brand-muted'}`}
                                >
                                  &rarr;
                                </span>
                                <span
                                  className={`block text-[11px] leading-snug transition-all duration-300 ease-premium ${isActive ? 'translate-x-[18px] font-medium text-brand-ink' : 'translate-x-0 text-[#8E8D8D] group-hover:translate-x-1 group-hover:text-brand-ink'}`}
                                >
                                  {item.label}
                                </span>
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </nav>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}

export default PolicyPage
