import Icon from './Icon';
import PreviewSectionHeader from './ui/PreviewSectionHeader';
import ArrowIcon, { ArrowCircle } from './ui/ArrowIcon';
import { useReveal } from '../hooks/useReveal';
import { useFetchedList } from '../hooks/useFetchedList';
import { formatPostDate } from '../lib/formatDate';

import photo1 from '../assets/grid-1.png';
import photo2 from '../assets/grid-2.png';
import photo3 from '../assets/grid-3.png';
import photo4 from '../assets/grid-4.png';

const FALLBACK_IMAGES = [photo1.src, photo2.src, photo3.src, photo4.src];

function BlogCardSkeleton() {
  return (
    <div className="skeleton-shimmer overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="h-64 bg-gray-200" />
      <div className="space-y-3 p-7">
        <div className="h-4 w-24 rounded-lg bg-gray-200" />
        <div className="h-7 rounded-lg bg-gray-200" />
        <div className="h-4 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

function EmptyBlogs() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-8 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-400">
        <Icon name="mdi:newspaper-variant-outline" size={30} />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-gray-900">Belum ada artikel</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">
        Artikel yang dipublikasikan dari admin akan tampil di sini.
      </p>
    </div>
  );
}

function BlogCard({ blog, imageSrc }) {
  const author = blog.author || 'BuildPRO Team';
  const category = blog.tags?.[0] || 'Interior Design';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-amber-200/60 hover:shadow-2xl">
      <a href={`/blog/${blog.id}`} className="relative block overflow-hidden">
        <img
          src={imageSrc}
          alt={blog.title}
          loading="lazy"
          className="h-64 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-72"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
          {category}
        </span>
        <span className="absolute right-5 top-5 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
          5 min read
        </span>
        <span className="absolute bottom-5 right-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowCircle direction="top-right" />
        </span>
      </a>

      <div className="flex flex-1 flex-col p-7">
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
          <Icon name="mdi:clock-outline" size={16} className="text-amber-400" />
          <time dateTime={blog.date || undefined}>{formatPostDate(blog.date)}</time>
        </div>

        <h3 className="text-xl font-bold leading-snug text-gray-900 transition group-hover:text-amber-500 sm:text-2xl">
          <a href={`/blog/${blog.id}`}>{blog.title}</a>
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-500">
          {blog.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
              <Icon name="mdi:account-outline" size={20} className="text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Written by</p>
              <p className="text-sm font-medium text-gray-900">{author}</p>
            </div>
          </div>

          <a
            href={`/blog/${blog.id}`}
            className="group/link inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-amber-500"
          >
            Read
            <ArrowIcon
              direction="right"
              size={18}
              tone="amber"
              className="transition group-hover/link:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function BlogsPreview() {
  const { items: blogs, loading } = useFetchedList('/api/blogs.json');
  const { ref, revealClass } = useReveal(0.08);

  const previewBlogs = blogs.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#F8F9FA] section-pad">
      <div ref={ref} className={`container-site relative z-10 ${revealClass}`}>
        <PreviewSectionHeader
          label="Our Blog"
          labelIcon="mdi:notebook-outline"
          title="Read interior design"
          highlight="insights"
          description="Trends, inspiration, and practical tips from our interior specialists for homeowners and businesses."
          ctaHref="/blog"
          ctaLabel="View All Posts"
        />

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <BlogCardSkeleton key={n} />
            ))}
          </div>
        ) : previewBlogs.length === 0 ? (
          <EmptyBlogs />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {previewBlogs.map((blog, index) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  imageSrc={blog.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
                />
              ))}
            </div>

            <div className="mt-12 flex justify-center lg:hidden">
              <a href="/blog" className="btn-dark group">
                View All Posts
                <ArrowIcon direction="right" size={18} tone="light" className="transition group-hover:translate-x-0.5" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
