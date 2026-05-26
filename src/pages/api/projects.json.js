import { getCollection } from 'astro:content';
import { getSupabaseAdmin, hasSupabaseConfig } from '../../lib/server/supabaseAdmin';

export async function GET() {
  if (hasSupabaseConfig()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('projects')
      .select('id,title,slug,location,excerpt,image_url')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (!error) {
      return new Response(JSON.stringify(data.map((project) => ({
        id: project.slug,
        title: project.title,
        location: project.location || '',
        description: project.excerpt || '',
        image: project.image_url || ''
      }))), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

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
