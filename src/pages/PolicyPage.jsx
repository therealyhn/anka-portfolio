import { useEffect, useRef, useState } from 'react'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

const TOC_ITEMS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'personal-data', label: 'Personal Data We Collect' },
  { id: 'purpose', label: 'Purpose of Processing' },
  { id: 'legal-basis', label: 'Legal Basis (GDPR)' },
  { id: 'data-sharing', label: 'Data Sharing' },
  { id: 'retention', label: 'Data Retention' },
  { id: 'rights', label: 'Your Rights' },
  { id: 'security', label: 'Data Security' },
  { id: 'third-party', label: 'Third-Party Links' },
  { id: 'changes', label: 'Changes to This Privacy Policy' },
]

function PolicyPage() {
  const articleRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [activeSectionId, setActiveSectionId] = useState(TOC_ITEMS[0].id)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

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
      let nextActiveSection = TOC_ITEMS[0].id

      TOC_ITEMS.forEach((item) => {
        const sectionNode = document.getElementById(item.id)
        if (sectionNode && sectionNode.getBoundingClientRect().top <= activationLine) {
          nextActiveSection = item.id
        }
      })

      setActiveSectionId((currentSection) => (currentSection === nextActiveSection ? currentSection : nextActiveSection))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <section className="px-4 pb-14 pt-6 sm:px-8 sm:pb-16 lg:pb-20">
        <div className="mx-auto w-full max-w-[1680px]">
          <Navbar hideLanguageSwitch />

          <div className="pt-28 sm:pt-32 lg:pt-36">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-x-12 xl:grid-cols-[minmax(0,1fr)_280px]">
              <article ref={articleRef} className="max-w-[860px]">
                <h1 className="font-serif text-5xl italic leading-[1.05] text-brand-ink sm:text-6xl">Privacy Policy</h1>
                <p className="mt-6 text-sm font-light text-brand-muted">Latest updated 20 February 2026</p>

                <section id="introduction" className="mt-10 space-y-6 text-[15px] leading-relaxed text-brand-ink/90">
                  <p className="font-medium">This website is a personal portfolio website operated by:</p>
                  <p>
                    Anka Ljusic
                    <br />
                    Email: ljusicanka1@gmail.com
                    <br />
                    Location: Belgrade, Serbia
                  </p>
                  <p>
                    This Privacy Policy explains how personal data is collected, used, and protected when you use the
                    contact form on this website.
                  </p>
                </section>

                <section id="personal-data" className="mt-12">
                  <h2 className="text-2xl font-semibold leading-snug">Personal Data We Collect</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    We only collect personal data that you voluntarily provide through the contact form:
                  </p>
                  <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-brand-ink/90">
                    <li>- Name</li>
                    <li>- Company name (optional)</li>
                    <li>- Email address</li>
                    <li>- Phone number (optional)</li>
                    <li>- Message content</li>
                  </ul>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    This data is sent directly to our email inbox and is not stored in a database on the website.
                  </p>
                </section>

                <section id="purpose" className="mt-12">
                  <h2 className="text-2xl font-semibold leading-snug">Purpose of Processing</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">The collected data is used solely for:</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    responding to your inquiry
                    <br />
                    communicating about potential collaboration or services
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    We do not use your data for marketing, newsletters, or automated decision-making.
                  </p>
                </section>

                <section id="legal-basis" className="mt-12">
                  <h2 className="text-2xl font-semibold leading-snug">Legal Basis (GDPR)</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    If you are located in the European Economic Area (EEA), the legal basis for processing your data is:
                  </p>
                  <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-brand-ink/90">
                    <li>- Pre-contractual steps - when you contact us regarding potential work or services</li>
                    <li>- Legitimate interest - to respond to your message</li>
                  </ul>
                </section>

                <section id="data-sharing" className="mt-12">
                  <h2 className="text-2xl font-semibold leading-snug">Data Sharing</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    Your personal data is not sold, rented, or shared with third parties.
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">Data may be processed by:</p>
                  <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-brand-ink/90">
                    <li>- the email service provider used to receive messages</li>
                    <li>- the website hosting provider (for technical delivery of the form)</li>
                  </ul>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    Only to the extent necessary for communication and website operation.
                  </p>
                </section>

                <section id="retention" className="mt-12">
                  <h2 className="text-2xl font-semibold leading-snug">Data Retention</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    Contact form messages are kept only as long as necessary to respond to your inquiry and for potential
                    future collaboration.
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    You may request deletion of your personal data at any time.
                  </p>
                </section>

                <section id="rights" className="mt-12">
                  <h2 className="text-2xl font-semibold leading-snug">Your Rights</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    If you are located in the EU/EEA, you have the right to:
                  </p>
                  <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-brand-ink/90">
                    <li>- request access to your personal data</li>
                    <li>- request correction or deletion</li>
                    <li>- object to processing</li>
                    <li>- request restriction of processing</li>
                  </ul>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    To exercise these rights, contact: ljusicanka1@gmail.com
                  </p>
                </section>

                <section id="security" className="mt-12">
                  <h2 className="text-2xl font-semibold leading-snug">Data Security</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    Reasonable technical and organizational measures are taken to protect your personal data.
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    However, transmission of data over the Internet cannot be guaranteed to be completely secure.
                  </p>
                </section>

                <section id="third-party" className="mt-12">
                  <h2 className="text-2xl font-semibold leading-snug">Third-Party Links</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    This website may contain links to third-party platforms (such as GitHub or LinkedIn).
                    <br />
                    We are not responsible for their privacy practices.
                  </p>
                </section>

                <section id="changes" className="mt-12 pb-8">
                  <h2 className="text-2xl font-semibold leading-snug">Changes to This Privacy Policy</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/90">
                    This Privacy Policy may be updated occasionally.
                    <br />
                    The latest version will always be available on this page.
                  </p>
                </section>
              </article>
              <aside className="mt-12 hidden lg:block">
                <div className="sticky top-28">
                  <p className="mb-2 text-right text-[10px] font-medium text-brand-muted">{progress}%</p>
                  <div className="rounded-xl bg-white p-5 text-brand-ink shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-brand-ink/5">
                    <h3 className="text-[13px] font-bold">Table of contents</h3>
                    <nav aria-label="Privacy table of contents" className="mt-4">
                      <ul className="space-y-3.5">
                        {TOC_ITEMS.map((item) => {
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
  )
}

export default PolicyPage

