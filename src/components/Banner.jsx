import Icon from './Icon';
import ArrowIcon from './ui/ArrowIcon';
import heroBg from '../assets/hero.png';

export default function Banner() {
  return (
    <section className="font-poppins relative overflow-hidden bg-gray-950 text-white section-pad">
      <img
        src={heroBg.src}
        alt="Interior design banner showcase"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-72 rounded-full bg-amber-400/15 blur-3xl" />

      <div className="container-site relative z-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="section-eyebrow before:!bg-amber-400">Ready for a better space?</p>
          <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Make your interior feel intentional, refined, and easy to live in.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/72 md:text-base">
            Share your goals with us and we will help shape the right concept, scope, and execution plan for your project.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
          <a
            href="/projects"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-gray-950"
          >
            View Projects
            <ArrowIcon direction="right" size={18} tone="light" className="transition group-hover:translate-x-0.5 group-hover:text-gray-950" />
          </a>
          <a href="/#contact" className="btn-primary px-6 py-3.5">
            Contact Us
            <Icon name="mdi:email-outline" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
