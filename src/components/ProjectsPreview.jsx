import Icon from './Icon';
import PreviewSectionHeader from './ui/PreviewSectionHeader';
import ArrowIcon, { ArrowCircle } from './ui/ArrowIcon';
import { useReveal } from '../hooks/useReveal';
import { useFetchedList } from '../hooks/useFetchedList';

import photo1 from '../assets/grid-1.png';
import photo2 from '../assets/grid-2.png';
import photo3 from '../assets/grid-3.png';

const FALLBACK_IMAGES = [photo1.src, photo2.src, photo3.src];

function ProjectCardSkeleton() {
  return (
    <div className="skeleton-shimmer overflow-hidden rounded-3xl border border-gray-100 bg-white">
      <div className="h-[400px] bg-gray-200" />
    </div>
  );
}

function EmptyProjects() {
  return (
    <div className="rounded-3xl border border-dashed border-gray-200 bg-[#F8F9FA] px-8 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-amber-400 shadow-sm">
        <Icon name="mdi:image-filter-hdr-outline" size={30} />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-gray-900">Belum ada project</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">
        Project yang dipublikasikan dari admin akan tampil di sini.
      </p>
    </div>
  );
}

function ProjectCard({ project, imageSrc }) {
  const location = project.location || 'Indonesia';
  const category = project.category || 'Interior Design';

  return (
    <a
      href={`/projects/${project.id}`}
      className="group relative block overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl ring-1 ring-gray-100/80 transition-all duration-500 hover:-translate-y-2 hover:border-amber-200/50 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={imageSrc}
          alt={project.title}
          loading="lazy"
          className="h-[400px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[440px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-gray-800 shadow-sm">
          <Icon name="mdi:map-marker-outline" size={16} className="text-amber-500" />
          {location}
        </div>

        <span className="absolute right-5 top-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowCircle direction="top-right" />
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-7">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-md">
            <Icon name="mdi:star-four-points" size={14} className="text-amber-400" />
            {category}
          </span>
          <h3 className="text-2xl font-bold leading-tight text-white transition sm:text-3xl group-hover:text-amber-300">
            {project.title}
          </h3>
          {project.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm text-white/70">{project.excerpt}</p>
          )}
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-all group-hover:gap-3">
            View Project
            <ArrowIcon direction="right" size={18} tone="light" />
          </p>
        </div>
      </div>
    </a>
  );
}

export default function ProjectsPreview() {
  const { items: projects, loading } = useFetchedList('/api/projects.json');
  const { ref, revealClass } = useReveal(0.08);

  const previewProjects = projects.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#F8F9FA] section-pad">
      <div
        className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-amber-100/35 blur-3xl"
        aria-hidden="true"
      />

      <div ref={ref} className={`container-site relative z-10 ${revealClass}`}>
        <PreviewSectionHeader
          label="Explore Our Work"
          labelIcon="mdi:shape-outline"
          title="Crafted spaces that"
          highlight="inspire"
          description="Residential and commercial interiors designed with warmth, function, and timeless detail."
          ctaHref="/projects"
          ctaLabel="View All Projects"
        />

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <ProjectCardSkeleton key={n} />
            ))}
          </div>
        ) : previewProjects.length === 0 ? (
          <EmptyProjects />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {previewProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  imageSrc={project.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
                />
              ))}
            </div>

            <div className="mt-12 flex justify-center lg:hidden">
              <a href="/projects" className="btn-dark group">
                View All Projects
                <ArrowIcon direction="right" size={18} tone="light" className="transition group-hover:translate-x-0.5" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
