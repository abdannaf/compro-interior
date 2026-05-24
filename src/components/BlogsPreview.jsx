import { useState, useEffect } from 'react';
import Icon from './Icon';

export default function BlogsPreview() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackImages = [
    '/src/assets/grid-1.png',
    '/src/assets/grid-2.png',
    '/src/assets/grid-3.png',
    '/src/assets/grid-4.png',
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs.json');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to load blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="py-16 text-center">Loading...</div>;

  return (
    <section className="py-16 px-6 md:px-20">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">
            Our Blog
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Read Interior Design Insights
          </h2>
        </div>
        <a href="/blog" className="hidden md:inline-block bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-700 transition duration-300">
          View All Posts
        </a>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.slice(0, 3).map((blog, i) => (
          <a key={blog.id} href={`/blog/${blog.id}`} className="flex flex-col bg-gray-50 border border-gray-100 rounded-sm overflow-hidden group">
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={fallbackImages[i % fallbackImages.length]}
                alt={blog.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 p-5">
              <h3 className="font-semibold text-lg group-hover:text-amber-400 transition duration-300">
                {blog.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {blog.excerpt}
              </p>
              <div className="flex items-center gap-1 text-sm font-medium text-amber-400 group-hover:gap-2 transition-all duration-200">
                Read Article
                <Icon name="mdi:arrow-right" size={18} />
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="flex justify-center md:hidden pt-8">
        <a href="/blog" className="inline-block bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-700 transition duration-300">
          View All Posts
        </a>
      </div>
    </section>
  );
}
