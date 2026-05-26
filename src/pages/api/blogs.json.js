import { getCollection } from 'astro:content';
import { getSupabaseAdmin, hasSupabaseConfig } from '../../lib/server/supabaseAdmin';

export async function GET() {
  if (hasSupabaseConfig()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('blogs')
      .select('id,title,slug,excerpt,created_at,author,tags,image_url')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (!error) {
      return new Response(JSON.stringify(data.map((blog) => ({
        id: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt || '',
        date: blog.created_at,
        author: blog.author || 'BuildPRO',
        tags: blog.tags || [],
        image: blog.image_url || ''
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

  const blogs = await getCollection('blog');
  
  const formattedBlogs = blogs
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map(blog => ({
      id: blog.id,
      title: blog.data.title,
      excerpt: blog.data.excerpt || '',
      date: blog.data.date,
      author: blog.data.author || 'BuildPRO',
      tags: blog.data.tags || []
    }));

  return new Response(JSON.stringify(formattedBlogs), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
