import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import { useReveal } from '../hooks/useReveal';

import room1 from '../assets/grid-1.png';
import room2 from '../assets/grid-2.png';
import room3 from '../assets/grid-3.png';
import room4 from '../assets/grid-4.png';

const features = [
  {
    id: 0,
    icon: 'mdi:palette-outline',
    title: 'Tailored Design Solutions',
    desc: 'Every space deserves its own personality. We design interiors that feel personal, functional, and timeless — built around your lifestyle, not templates.',
    image: room1,
    stat: '500+',
    statLabel: 'Custom Designs',
  },
  {
    id: 1,
    icon: 'mdi:clipboard-check-outline',
    title: 'Smooth Project Management',
    desc: "From planning to final handover, we keep everything organized and transparent so you always know what's happening at every stage.",
    image: room2,
    stat: '100%',
    statLabel: 'On-Time Delivery',
  },
  {
    id: 2,
    icon: 'mdi:account-group-outline',
    title: 'Client-First Collaboration',
    desc: 'We listen before we create. Your feedback, preferences, and ideas shape the entire design process from start to finish.',
    image: room3,
    stat: '98%',
    statLabel: 'Client Satisfaction',
  },
  {
    id: 3,
    icon: 'mdi:trophy-outline',
    title: 'Premium Quality Standards',
    desc: 'Attention to detail, quality craftsmanship, and refined finishing are what make every BuildPRO project stand out.',
    image: room4,
    stat: '30+',
    statLabel: 'Industry Awards',
  },
];

export default function Wcu() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  const { ref: headerRef, revealClass: headerReveal } = useReveal(0.15);
  const { ref: bodyRef, revealClass: bodyReveal } = useReveal(0.12);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const current = features[active];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F8F9FA] section-pad">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber-400/5 blur-3xl" aria-hidden="true" />

      <div ref={headerRef} className={`container-site mx-auto max-w-3xl text-center ${headerReveal}`}>
        <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
          <span className="h-px w-8 bg-amber-400" aria-hidden="true" />
          Why Choose Us
          <span className="h-px w-8 bg-amber-400" aria-hidden="true" />
        </p>
        <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Designed with passion,
          <br />
          built with <span className="text-amber-400">precision</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
          We combine creativity, craftsmanship, and attention to detail to deliver interiors that not only look beautiful — but truly feel like home.
        </p>
      </div>

      <div
        ref={bodyRef}
        className={`container-site mt-16 grid items-center gap-10 lg:grid-cols-2 ${bodyReveal}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="flex flex-col gap-3" role="tablist" aria-label="Why choose BuildPRO">
          {features.map((feature) => {
            const isActive = active === feature.id;
            return (
              <button
                key={feature.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`wcu-panel-${feature.id}`}
                id={`wcu-tab-${feature.id}`}
                onClick={() => setActive(feature.id)}
                className={`group relative overflow-hidden rounded-3xl border p-6 text-left transition-all duration-500 ${
                  isActive
                    ? 'border-amber-400 bg-white shadow-xl shadow-amber-100'
                    : 'border-gray-200 bg-white/60 hover:border-gray-300 hover:bg-white'
                }`}
              >
                {isActive && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-400/5 to-transparent" aria-hidden="true" />
                )}
                <div className="relative flex gap-5">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-amber-400 text-white shadow-lg shadow-amber-200'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-amber-50'
                    }`}
                  >
                    <Icon name={feature.icon} size={26} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className={`text-lg font-semibold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                        {feature.title}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                          isActive ? 'bg-amber-400 text-white' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {feature.stat}
                      </span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isActive ? 'mt-3 max-h-44 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-sm leading-relaxed text-gray-500">{feature.desc}</p>
                      <p className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                        <span className="h-px w-5 bg-amber-400" aria-hidden="true" />
                        {feature.statLabel}
                      </p>
                    </div>
                  </div>
                </div>
                {isActive && (
                  <div className="mt-5 h-1 overflow-hidden rounded-full bg-gray-100">
                    <div key={active} className="h-full rounded-full bg-amber-400 animate-progress" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div
          className="relative"
          role="tabpanel"
          id={`wcu-panel-${active}`}
          aria-labelledby={`wcu-tab-${active}`}
        >
          <div className="relative h-[360px] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-gray-200/80 md:h-[560px]">
            <img
              key={active}
              src={current.image.src}
              alt={current.title}
              loading="lazy"
              className="h-full w-full object-cover animate-image-fade"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">BuildPRO</p>
              <h3 className="mt-1 text-lg font-semibold">Interior Excellence</h3>
            </div>

            <div className="absolute right-6 top-6 flex gap-2" aria-label="Slide navigation">
              {features.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show slide ${i + 1}`}
                  aria-current={active === i ? 'true' : undefined}
                  className={`rounded-full transition-all duration-300 ${
                    active === i ? 'h-2 w-8 bg-amber-400' : 'h-2 w-2 bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.3em] text-amber-400">
                    {`0${active + 1} / 0${features.length}`}
                  </p>
                  <h3 className="text-2xl font-bold leading-tight md:text-3xl">{current.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{current.desc}</p>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <p className="text-5xl font-bold tabular-nums text-amber-400">{current.stat}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">{current.statLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
