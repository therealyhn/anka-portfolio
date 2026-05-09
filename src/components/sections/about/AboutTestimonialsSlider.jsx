import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import useTranslation from '../../../hooks/useTranslation'
import apostropheImg from '../../../assets/images/img/apos.png'

function AboutTestimonialsSlider({ testimonials }) {
  const { t } = useTranslation()
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : []
  const isTestimonialLoopEnabled = safeTestimonials.length > 1

  return (
    <div className="relative mt-10 mx-[-16px] px-[16px] pb-8 pt-10 text-center bg-brand-surface sm:mt-14 sm:mx-[-24px] sm:px-[24px] sm:pb-10 sm:pt-12 md:mx-[-72px] md:px-[72px] xl:mt-[40px] xl:pb-[100px] xl:pt-[100px] 2xl:mt-[88px] 2xl:pt-[90px]">
      <img
        aria-hidden="true"
        src={apostropheImg}
        alt=""
        className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 select-none w-auto h-[280px] sm:h-[380px] xl:h-[200px] min-[1920px]:h-[200px]"
      />

      <div className="relative z-10">
        {isTestimonialLoopEnabled ? (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-0 sm:px-2 xl:px-3">
            <button
              type="button"
              aria-label={t('about.testimonials.previous')}
              className="about-testimonial-prev pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-black/45 transition-colors duration-300 ease-premium hover:text-black/70 xl:h-9 xl:w-9"
            >
              <svg className="h-5 w-5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10.5 3.5L6 8l4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={t('about.testimonials.next')}
              className="about-testimonial-next pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-black/45 transition-colors duration-300 ease-premium hover:text-black/70 xl:h-9 xl:w-9"
            >
              <svg className="h-5 w-5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M5.5 3.5L10 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : null}

        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={1}
          loop={isTestimonialLoopEnabled}
          speed={900}
          allowTouchMove={false}
          navigation={
            isTestimonialLoopEnabled
              ? {
                prevEl: '.about-testimonial-prev',
                nextEl: '.about-testimonial-next',
              }
              : false
          }
          autoplay={
            isTestimonialLoopEnabled
              ? {
                delay: 10000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }
              : false
          }
        >
          {safeTestimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <blockquote className="mx-auto max-w-[980px] px-10 text-base font-inter font-normal italic leading-[1.6] text-brand-ink sm:px-0 sm:text-lg md:text-xl xl:max-w-[1040px] xl:text-[30px] xl:leading-[1.54] xl:tracking-normal 2xl:max-w-[1160px] min-[1920px]:max-w-[1240px] min-[1920px]:text-[32px]">
                <p>"{testimonial.quoteLineOne}</p>
                {testimonial.quoteLineTwo ? <p className="mt-4 sm:mt-5 2xl:mt-[24px]">{testimonial.quoteLineTwo}"</p> : null}
              </blockquote>

              <div className="mx-auto mt-6 h-px w-[80%] bg-[#ACACAC] sm:mt-8 xl:mt-[40px] xl:w-[70%] 2xl:mt-[50px] 2xl:w-[760px] min-[1920px]:w-[800px]" />

              <div className="mt-5 inline-flex items-center gap-3 sm:mt-6 sm:gap-4 xl:mt-[32px] 2xl:mt-[42px] min-[1920px]:gap-[16px]">
                <span className="inline-flex h-10 w-10 overflow-hidden rounded-full bg-[#D7D7D7] sm:h-12 sm:w-12 xl:h-[60px] xl:w-[60px] 2xl:h-[68px] 2xl:w-[68px] min-[1920px]:h-[80px] min-[1920px]:w-[80px]">
                  <img src={testimonial.avatar} alt="" aria-hidden="true" className="h-full w-full object-cover object-top" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-inter font-medium text-brand-ink sm:text-base xl:text-[24px] xl:leading-[1.54] xl:tracking-[0.02em] min-[1920px]:text-[24px]">{testimonial.name}</span>
                  <span className="mt-0.5 block text-xs font-inter font-normal text-brand-muted/80 sm:text-sm xl:text-[14px] xl:leading-[1.54] xl:tracking-normal 2xl:text-[14px] min-[1920px]:mt-[2px] min-[1920px]:text-[16px]">{testimonial.role}</span>
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default AboutTestimonialsSlider
