import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'

function AboutTestimonialsSlider({ testimonials }) {
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : []
  const isTestimonialLoopEnabled = safeTestimonials.length > 1

  return (
    <div className="relative mt-10 px-2 pb-2 pt-10 text-center sm:mt-14 sm:px-4 sm:pt-12 xl:mt-[60px] 2xl:mt-[88px] 2xl:px-0 2xl:pt-[90px]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 text-brand-ink/[0.04] sm:top-6 xl:top-8 min-[1920px]:top-[20px]"
      >
        <svg
          className="h-[100px] w-auto sm:h-[140px] xl:h-[200px] 2xl:h-[230px] min-[1920px]:h-[260px]"
          viewBox="0 0 190 150"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M60 0h50L50 150H0zM140 0h50l-60 150H80z" />
        </svg>
      </span>

      <div className="relative z-10">
        {isTestimonialLoopEnabled ? (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-0 sm:px-2 xl:px-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              className="about-testimonial-prev pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-black/45 transition-colors duration-300 ease-premium hover:text-black/70 xl:h-9 xl:w-9"
            >
              <svg className="h-5 w-5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10.5 3.5L6 8l4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
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
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }
              : false
          }
        >
          {safeTestimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <blockquote className="mx-auto max-w-[980px] px-10 text-base font-light italic leading-[1.6] text-brand-ink sm:px-0 sm:text-lg md:text-xl xl:max-w-[1040px] xl:text-[24px] 2xl:max-w-[1160px] 2xl:text-[26px] 2xl:leading-[1.6] min-[1920px]:max-w-[1240px] min-[1920px]:text-[32px]">
                <p>"{testimonial.quoteLineOne}</p>
                {testimonial.quoteLineTwo ? <p className="mt-4 sm:mt-5 2xl:mt-[24px]">{testimonial.quoteLineTwo}"</p> : null}
              </blockquote>

              <div className="mx-auto mt-6 h-px w-[80%] bg-black/[0.15] sm:mt-8 xl:mt-[40px] xl:w-[70%] 2xl:mt-[50px] 2xl:w-[760px] min-[1920px]:w-[800px]" />

              <div className="mt-5 inline-flex items-center gap-3 sm:mt-6 sm:gap-4 xl:mt-[32px] 2xl:mt-[42px] min-[1920px]:gap-[16px]">
                <span className="inline-flex h-10 w-10 overflow-hidden rounded-full bg-[#D7D7D7] sm:h-12 sm:w-12 xl:h-[60px] xl:w-[60px] 2xl:h-[68px] 2xl:w-[68px] min-[1920px]:h-[80px] min-[1920px]:w-[80px]">
                  <img src={testimonial.avatar} alt="" aria-hidden="true" className="h-full w-full object-cover object-top" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-medium text-brand-ink sm:text-base xl:text-[18px] 2xl:text-[20px] min-[1920px]:text-[24px]">{testimonial.name}</span>
                  <span className="mt-0.5 block text-xs font-light text-brand-muted/80 sm:text-sm xl:text-[13px] 2xl:text-[14px] min-[1920px]:mt-[2px] min-[1920px]:text-[16px]">{testimonial.role}</span>
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
