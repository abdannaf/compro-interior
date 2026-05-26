import { useMemo, useState, useEffect } from 'react';
import Icon from './Icon';
import { useReveal } from '../hooks/useReveal';

const testimonials = [
  {
    name: 'Nadia Putri',
    role: 'Homeowner',
    location: 'Jakarta Selatan',
    rating: 5,
    initials: 'NP',
    review:
      'BuildPRO helped us turn a compact house into a calm, functional home. The team was clear with timelines, careful with details, and easy to coordinate with.',
  },
  {
    name: 'Arief Wicaksono',
    role: 'Cafe Owner',
    location: 'Bandung',
    rating: 5,
    initials: 'AW',
    review:
      'Our cafe renovation needed to stay warm but practical for daily operations. The final space feels inviting, durable, and exactly aligned with the brand.',
  },
  {
    name: 'Maya Santoso',
    role: 'Apartment Owner',
    location: 'Semarang',
    rating: 5,
    initials: 'MS',
    review:
      'They made every decision feel manageable. Materials, layout, lighting, and storage were all handled with a level of precision we really appreciated.',
  },
  {
    name: 'Dimas Pratama',
    role: 'Office Manager',
    location: 'Surabaya',
    rating: 5,
    initials: 'DP',
    review:
      'The office feels brighter and more efficient without losing its professional tone. BuildPRO delivered a clean result with very little disruption.',
  },
  {
    name: 'Clara Wijaya',
    role: 'Villa Owner',
    location: 'Bali',
    rating: 5,
    initials: 'CW',
    review:
      'We wanted a refined interior that still felt relaxed. The team balanced natural textures, lighting, and custom furniture beautifully.',
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, revealClass } = useReveal(0.1);

  const maxSlides = Math.max(0, testimonials.length - 1);
  const activeTestimonial = testimonials[currentSlide];
  const averageRating = useMemo(
    () => testimonials.reduce((total, item) => total + item.rating, 0) / testimonials.length,
    []
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrentSlide((slide) => (slide >= maxSlides ? 0 : slide + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [paused, maxSlides]);

  const handleNext = () => setCurrentSlide((slide) => (slide >= maxSlides ? 0 : slide + 1));
  const handlePrev = () => setCurrentSlide((slide) => (slide <= 0 ? maxSlides : slide - 1));

  return (
    <section
      className="font-poppins bg-zinc-950 px-4 py-16 text-white sm:px-6 md:px-20 lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div ref={ref} className={`mx-auto max-w-7xl ${revealClass}`}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              <span className="h-0.5 w-8 bg-amber-400" aria-hidden="true" />
              Testimonials
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-bold uppercase leading-tight sm:text-4xl lg:text-5xl">
              What Clients Say After The Space Is Done
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-400">
              Feedback from residential, hospitality, and commercial clients who trusted BuildPRO with their interiors and construction work.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              [averageRating.toFixed(1), 'Average Rating', true],
              ['98%', 'On-Time Delivery', false],
              ['40+', 'Finished Spaces', false],
            ].map(([value, label, accent]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-amber-400/30 hover:bg-white/[0.06]"
              >
                <p className={`text-3xl font-bold tabular-nums ${accent ? 'text-amber-400' : 'text-white'}`}>
                  {value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">
          <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white text-gray-950 shadow-2xl">
            <div className="grid min-h-[420px] gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_240px] lg:p-10">
              <div className="flex flex-col justify-between">
                <div key={currentSlide} className="animate-fade-in">
                  <div className="flex gap-1 text-amber-400" aria-label={`${activeTestimonial.rating} star rating`}>
                    {Array.from({ length: activeTestimonial.rating }).map((_, index) => (
                      <Icon key={index} name="mdi:star" size={18} />
                    ))}
                  </div>
                  <blockquote className="mt-8 max-w-3xl text-2xl font-semibold leading-snug sm:text-3xl">
                    "{activeTestimonial.review}"
                  </blockquote>
                </div>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-sm font-bold text-amber-400">
                      {activeTestimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold">{activeTestimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {activeTestimonial.role} / {activeTestimonial.location}
                      </p>
                    </div>
                  </div>

                  <div className="hidden gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="rounded-xl border border-gray-200 p-3 text-gray-700 transition hover:border-gray-950 hover:bg-gray-950 hover:text-white"
                      aria-label="Previous testimonial"
                    >
                      <Icon name="mdi:chevron-left" size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="rounded-xl border border-gray-200 p-3 text-gray-700 transition hover:border-gray-950 hover:bg-gray-950 hover:text-white"
                      aria-label="Next testimonial"
                    >
                      <Icon name="mdi:chevron-right" size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="hidden border-l border-gray-100 pl-8 lg:flex lg:flex-col lg:justify-between">
                <Icon name="mdi:format-quote-open" size={52} className="text-amber-400" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Featured Review</p>
                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Selected client feedback from completed BuildPRO residential and commercial projects.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <aside className="grid gap-3" aria-label="Select testimonial">
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? 'border-amber-400 bg-amber-400 text-gray-950 shadow-lg shadow-amber-400/20'
                      : 'border-white/10 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                        isActive ? 'bg-gray-950 text-amber-400' : 'bg-white/10 text-white'
                      }`}
                    >
                      {testimonial.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{testimonial.name}</p>
                      <p className={`truncate text-xs ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </aside>
        </div>

        <div className="mt-5 flex gap-2 sm:hidden">
          <button
            type="button"
            onClick={handlePrev}
            className="flex-1 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold transition hover:bg-white hover:text-gray-950"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold transition hover:bg-white hover:text-gray-950"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
