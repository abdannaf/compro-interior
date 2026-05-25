import { useState } from 'react';
import Icon from './Icon';
import ArrowIcon, { ArrowCircle, ArrowSquare } from './ui/ArrowIcon';
import PreviewSectionHeader from './ui/PreviewSectionHeader';
import { useReveal } from '../hooks/useReveal';

import room1 from '../assets/grid-1.png';
import room2 from '../assets/grid-2.png';
import room3 from '../assets/grid-3.png';

const SERVICES = [
  {
    icon: 'mdi:floor-plan',
    title: 'Interior Design',
    desc: 'Beautiful, functional spaces tailored to your lifestyle — from concept and 3D visualization to styling and finishing.',
    slug: 'interior-design',
    image: room1.src,
    stats: '120+ Projects',
    tags: ['Concept', '3D Viz', 'Styling'],
  },
  {
    icon: 'mdi:hammer-wrench',
    title: 'Renovation & Remodeling',
    desc: 'Transform outdated interiors into modern, efficient spaces with expert renovation, construction, and finishing.',
    slug: 'renovation',
    image: room2.src,
    stats: '80+ Renovations',
    tags: ['Structural', 'Finishing', 'Fast-track'],
  },
  {
    icon: 'mdi:sofa-single',
    title: 'Furniture & Custom Fitout',
    desc: 'Custom furniture, millwork, and built-ins crafted for comfort, function, and visual harmony.',
    slug: 'furniture-consultation',
    image: room3.src,
    stats: '50+ Custom Builds',
    tags: ['Millwork', 'Built-ins', 'Bespoke'],
  },
];

function ServiceCard({ service, isActive, onActivate }) {
  return (
    <article
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-500 ${
        isActive
          ? '-translate-y-2 border-amber-400 shadow-2xl shadow-amber-400/10'
          : 'border-gray-100 hover:-translate-y-1 hover:border-amber-200/60 hover:shadow-xl'
      }`}
    >
      <a href={`/services#${service.slug}`} className="relative block h-72 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
          <Icon name={service.icon} size={16} className="text-amber-400" />
          {service.stats}
        </span>

        <span className="absolute bottom-5 left-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 shadow-lg transition duration-300 group-hover:scale-110">
          <Icon name={service.icon} size={28} className="text-gray-900" />
        </span>

        <span className="absolute bottom-5 right-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowCircle direction="top-right" />
        </span>
      </a>

      <div className="flex flex-1 flex-col gap-4 p-7">
        <div>
          <h3 className="text-xl font-bold text-gray-900 transition group-hover:text-amber-500 sm:text-2xl">
            <a href={`/services#${service.slug}`}>{service.title}</a>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">{service.desc}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={`/services#${service.slug}`}
          className="group/link mt-auto inline-flex items-center justify-between rounded-2xl border border-gray-200 px-5 py-4 transition-all duration-300 hover:border-amber-400 hover:bg-amber-50/80"
        >
          <div>
            <p className="text-sm font-semibold text-gray-900">Learn More</p>
            <p className="mt-0.5 text-xs text-gray-500">View full service details</p>
          </div>
          <ArrowSquare className="transition-all duration-300 group-hover/link:bg-amber-400" />
        </a>
      </div>
    </article>
  );
}

export default function Services() {
  const [activeCard, setActiveCard] = useState(0);
  const { ref, revealClass } = useReveal(0.1);

  return (
    <section className="relative overflow-hidden bg-[#F8F9FA] section-pad">
      <div
        className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-black/5 blur-3xl"
        aria-hidden="true"
      />

      <div ref={ref} className={`container-site relative z-10 ${revealClass}`}>
        <PreviewSectionHeader
          label="What We Do"
          useEyebrow
          title="Premium services for"
          highlight="modern living"
          description="Creativity, function, and craftsmanship — tailored interiors for homes, offices, and commercial spaces."
          ctaHref="/services"
          ctaLabel="Explore All Services"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              isActive={activeCard === index}
              onActivate={() => setActiveCard(index)}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center lg:hidden">
          <a href="/services" className="btn-dark group">
            View All Services
            <ArrowIcon
              direction="right"
              size={18}
              tone="light"
              className="transition group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
