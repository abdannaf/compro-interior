import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import ArrowIcon from './ui/ArrowIcon';
import AboutUs from '../assets/hero.png';
import { useReveal } from '../hooks/useReveal';

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, target, duration]);

  return count;
}

function StatCard({
  number,
  label,
  suffix = '+',
  animate,
}) {
  const count = useCountUp(number, 1800, animate);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/40">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 via-amber-50/0 to-amber-100/20 opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <p className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 tabular-nums">
          {animate ? count : 0}
          {suffix}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const [animateStats, setAnimateStats] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  const {
    ref: contentRef,
    revealClass,
  } = useReveal(0.12);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateStats(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Gambar dari cache browser sering tidak memicu onLoad lagi
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, []);

  const stats = [
    {
      number: 320,
      label: 'Projects Completed',
      suffix: '+',
    },
    {
      number: 25,
      label: 'Years Experience',
      suffix: '+',
    },
    {
      number: 98,
      label: 'Client Satisfaction',
      suffix: '%',
    },
  ];

  const features = [
    {
      icon: 'mdi:palette-swatch-outline',
      title: 'Creative & Timeless Design',
      desc: 'We design spaces that feel modern today and still feel relevant years from now.',
    },
    {
      icon: 'mdi:account-heart-outline',
      title: 'People First Approach',
      desc: 'Every detail is built around how you live, work, and experience the space.',
    },
    {
      icon: 'mdi:hammer-screwdriver',
      title: 'End-to-End Execution',
      desc: 'From planning and material selection to final handover — we handle everything.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#fafafa] py-24 sm:py-28"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-amber-100 blur-3xl opacity-40" />
        <div className="absolute bottom-0 -left-32 h-[320px] w-[320px] rounded-full bg-gray-200 blur-3xl opacity-40" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div
        ref={contentRef}
        className={`relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-6 md:px-12 lg:grid-cols-2 lg:px-20 ${revealClass}`}
      >
        {/* IMAGE SIDE */}
        <div className="relative">
          {/* Floating cards */}
          <div className="absolute -top-6 left-6 z-20 hidden rounded-2xl border border-white/20 bg-white/80 px-5 py-4 shadow-2xl backdrop-blur-xl md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100">
                <Icon
                  name="mdi:shield-check-outline"
                  size={22}
                  className="text-amber-500"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Premium Quality
                </p>

                <p className="text-xs text-gray-500">
                  Trusted Interior Studio
                </p>
              </div>
            </div>
          </div>

          {/* Main image */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-gray-200 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
            {!imgLoaded && !imgError && (
              <div
                className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300"
                aria-hidden="true"
              />
            )}
            <img
              ref={imgRef}
              src={AboutUs.src}
              alt="BuildPRO interior design team at work"
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`relative z-[1] h-[420px] w-full object-cover transition-all duration-700 sm:h-[520px] lg:h-[640px] ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              } ${imgError ? 'hidden' : 'group-hover:scale-[1.04]'}`}
            />
            {imgError && (
              <div className="flex h-[420px] w-full items-center justify-center bg-gray-100 text-sm text-gray-500 sm:h-[520px] lg:h-[640px]">
                Image unavailable
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Quote card */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
                <div className="flex items-start gap-3">
                  <Icon
                    name="mdi:format-quote-open"
                    size={28}
                    className="text-amber-400 shrink-0"
                  />

                  <div>
                    <p className="text-sm leading-relaxed text-white">
                      We believe good interiors should
                      feel effortless, functional, and
                      deeply personal.
                    </p>

                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/50">
                      BuildPRO Studio
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience badge */}
          <div className="absolute -bottom-6 right-6 z-20 rounded-[1.8rem] bg-amber-400 px-7 py-5 shadow-[0_20px_50px_rgba(251,191,36,0.35)]">
            <p className="text-5xl font-bold leading-none text-gray-900">
              25
            </p>

            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-800/70">
              Years Experience
            </p>
          </div>
        </div>

        {/* CONTENT SIDE */}
        <div className="flex flex-col">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-amber-400" />

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
              About Us
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.5rem]">
            Designing spaces
            <br />

            <span className="text-amber-400">
              people genuinely
            </span>

            <br />
            love living in.
          </h2>

          {/* Paragraph */}
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-gray-500 sm:text-base">
            Since 2008, BuildPRO has helped
            homeowners and businesses create
            interiors that feel warm, functional,
            and visually timeless.
          </p>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500 sm:text-base">
            From compact apartments to premium
            hospitality spaces, we combine design,
            craftsmanship, and thoughtful details
            to create spaces people enjoy every day.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat, idx) => (
              <StatCard
                key={idx}
                {...stat}
                animate={animateStats}
              />
            ))}
          </div>

          {/* Features */}
          <div className="mt-12 flex flex-col gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group flex items-start gap-4 rounded-3xl border border-transparent bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-100 hover:shadow-xl hover:shadow-amber-100/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 transition-all duration-300 group-hover:bg-amber-400">
                  <Icon
                    name={feature.icon}
                    size={22}
                    className="text-amber-500 transition-all duration-300 group-hover:text-black"
                  />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/services"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400 hover:text-black hover:shadow-xl hover:shadow-amber-200/40"
            >
              Explore Services

              <ArrowIcon
                direction="right"
                size={18}
                tone="light"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black"
              />
            </a>

            <a
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-7 py-4 text-sm font-medium text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-500"
            >
              Contact Us

              <Icon
                name="mdi:email-outline"
                size={18}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}