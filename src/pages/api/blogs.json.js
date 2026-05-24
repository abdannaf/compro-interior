import { getCollection } from 'astro:content';

export async function GET() {
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
