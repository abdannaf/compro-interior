import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import ArrowIcon from './ui/ArrowIcon';
import { useReveal } from '../hooks/useReveal';
import achieveImg from '../assets/grid-4.webp';

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, target, duration]);

  return count;
}

function StatItem({ icon, number, label, animate }) {
  const count = useCountUp(number, 1800, animate);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/90 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/30 hover:shadow-2xl hover:shadow-amber-100">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" aria-hidden="true" />
      <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-white">
        <Icon name={icon} size={28} />
      </div>
      <h3 className="relative text-4xl font-bold tabular-nums tracking-tight text-gray-900">
        {animate ? count : 0}
        <span className="text-amber-400">+</span>
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-gray-500">{label}</p>
    </div>
  );
}

export default function Achievements() {
  const [openVideo, setOpenVideo] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const sectionRef = useRef(null);
  const { ref: leftRef, revealClass: leftReveal } = useReveal(0.12);
  const { ref: rightRef, revealClass: rightReveal } = useReveal(0.12);

  const stats = [
    { icon: 'mdi:file-document-outline', number: 320, label: 'Projects Successfully Completed' },
    { icon: 'mdi:account-group-outline', number: 180, label: 'Happy Clients Around The World' },
    { icon: 'mdi:trophy-outline', number: 30, label: 'Industry Awards & Recognition' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateStats(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = openVideo ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openVideo]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpenVideo(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative overflow-hidden bg-[#F8F9FA] section-pad">
        <div className="container-site relative flex flex-col items-center gap-16 lg:flex-row">
          <div ref={leftRef} className={`w-full lg:w-1/2 ${leftReveal}`}>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" aria-hidden="true" />
              Our Achievements
            </div>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              Spaces designed to <span className="text-amber-400">inspire people</span>
            </h2>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-gray-500 md:text-base">
              At BuildPRO, every project is built with purpose. We create interiors that feel timeless, functional, and deeply connected to the people who live in them.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {stats.map((stat, idx) => (
                <StatItem key={idx} {...stat} animate={animateStats} />
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <a href="/projects" className="btn-dark group">
                Explore Projects
                <ArrowIcon direction="right" size={18} tone="light" className="transition group-hover:translate-x-0.5 group-hover:text-black" />
              </a>
              <a href="/#contact" className="btn-secondary">
                Get Consultation
              </a>
            </div>
          </div>

          <div ref={rightRef} className={`relative w-full lg:w-1/2 ${rightReveal}`}>
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-200/60">
              <img
                src={achieveImg.src}
                alt="BuildPRO Interior Design"
                loading="lazy"
                className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[600px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute left-6 top-6 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Experience</p>
                <h3 className="mt-1 text-4xl font-bold tabular-nums text-gray-900">
                  25<span className="text-amber-400">+</span>
                </h3>
                <p className="text-sm text-gray-500">Years in industry</p>
              </div>

              <button
                type="button"
                onClick={() => setOpenVideo(true)}
                className="absolute inset-0 flex items-center justify-center group/btn"
                aria-label="Play showreel video"
              >
                <span className="absolute h-24 w-24 rounded-full bg-white/20 motion-safe:animate-ping" aria-hidden="true" />
                <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/95 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:bg-amber-400">
                  <Icon name="mdi:play" size={38} className="ml-1 text-amber-400 transition group-hover/btn:text-white" />
                </span>
              </button>

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-white/10 p-5 text-white backdrop-blur-xl">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">Featured Project</p>
                    <h3 className="mt-2 text-xl font-semibold">Modern Luxury Interior</h3>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-3xl font-bold tabular-nums text-amber-400">320+</p>
                    <p className="text-xs text-white/60">Projects Done</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 hidden rounded-2xl border border-gray-100 bg-white px-8 py-6 shadow-2xl md:block">
              <p className="text-sm text-gray-500">Trusted by homeowners & businesses</p>
              <div className="mt-2 flex items-center gap-0.5 text-amber-400" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="mdi:star" size={18} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {openVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="BuildPRO showreel"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenVideo(false);
          }}
        >
          <div className="relative w-full max-w-6xl">
            <button
              type="button"
              onClick={() => setOpenVideo(false)}
              className="absolute -top-14 right-0 flex items-center gap-2 rounded-xl px-2 py-1 text-sm text-white transition hover:text-amber-400"
            >
              <Icon name="mdi:close" size={26} />
              Close
            </button>
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1"
                title="BuildPRO Showreel"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
