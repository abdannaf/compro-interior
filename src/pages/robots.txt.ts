export function GET() {
  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /admin',
      'Sitemap: https://buildpro-demo.local/sitemap.xml',
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    }
  );
}
