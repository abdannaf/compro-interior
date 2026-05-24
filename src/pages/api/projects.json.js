import { getCollection } from 'astro:content';

export async function GET() {
  const projects = await getCollection('projects');
  
  const formattedProjects = projects.map(project => ({
    id: project.id,
    title: project.data.title,
    location: project.data.location || '',
    description: project.data.description || ''
  }));

  return new Response(JSON.stringify(formattedProjects), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
