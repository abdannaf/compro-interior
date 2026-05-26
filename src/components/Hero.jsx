import Icon from './Icon';
import ArrowIcon from './ui/ArrowIcon';
import HeroBg from '../assets/hero.png';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-950 text-white">
      <img
        src={HeroBg.src}
        alt="BuildPRO interior design showcase"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/72 to-black/40" />
      <div className="relative z-10 flex min-h-screen items-center container-site pb-24 pt-28">
        <div className="max-w-5xl">
          <div className="section-label-dark hero-enter hero-enter-delay-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" aria-hidden="true" />
            Interior Design & Construction Studio
          </div>

          <h1 className="hero-enter hero-enter-delay-2 mt-7 max-w-5xl text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl">
            Designing spaces that feel timeless, elegant, and alive.
          </h1>

          <p className="hero-enter hero-enter-delay-3 mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
            BuildPRO transforms homes, offices, cafes, and commercial interiors into functional spaces with a clear process from concept to handover.
          </p>

          <div className="hero-enter hero-enter-delay-4 mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="/projects" className="btn-primary group">
              View Projects
              <ArrowIcon direction="right" size={20} tone="dark" className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-4 font-medium text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white hover:text-gray-950 active:translate-y-0"
            >
              Start Consultation
              <Icon name="mdi:email-outline" size={20} />
            </a>
          </div>

          <dl className="hero-enter hero-enter-delay-4 mt-14 grid max-w-3xl grid-cols-3 gap-4 border-t border-white/15 pt-8 sm:gap-6">
            {[
              ['320+', 'Completed projects'],
              ['25+', 'Years experience'],
              ['98%', 'Client satisfaction'],
            ].map(([value, label], i) => (
              <div
                key={label}
                className={i > 0 ? 'border-l border-white/10 pl-4 sm:pl-6' : ''}
              >
                <dt className="text-2xl font-bold tabular-nums text-amber-400 sm:text-3xl">{value}</dt>
                <dd className="mt-1 text-xs leading-5 text-white/60 sm:text-sm">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="/#about"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition hover:text-white md:flex"
        aria-label="Scroll to about section"
      >
        <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="animate-bounce-soft flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
          <Icon name="mdi:chevron-down" size={24} />
        </span>
      </a>
    </section>
  );
}
