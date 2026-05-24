import { useState, useEffect } from 'react';
import Icon from './Icon';

export default function ProjectsPreview() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackImages = [
    '/src/assets/grid-1.png',
    '/src/assets/grid-2.png',
    '/src/assets/grid-3.png',
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects.json');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="py-16 text-center">Loading...</div>;

  return (
    <section className="py-16 px-6 md:px-20 ">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-widest">
            <Icon name="guidance:left-arrow" size={20} />Explore
          </p>
          <h2 className="font-semibold text-3xl md:text-4xl uppercase pt-2">Our Projects</h2>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
        {projects.slice(0, 3).map((project, i) => (
          <a key={project.id} href={`/projects/${project.id}`} className="flex flex-col group cursor-pointer">
            <div className="overflow-hidden rounded-sm">
              <img
                src={fallbackImages[i % fallbackImages.length]}
                alt={project.title}
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="bg-[#F8F9FA] px-6 py-5">
              <p className="text-gray-400 text-sm">{project.location}</p>
              <h3 className="font-semibold text-xl pt-1 group-hover:text-amber-400 transition duration-300">
                {project.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
