# BuildPRO Interior Studio

BuildPRO is a portfolio-ready company profile and lightweight CMS demo for an interior design and construction studio. The project is built with Astro, React islands, Tailwind CSS, and Supabase for admin-managed blog and project content.

## Highlights

- Responsive landing page with hero, services, achievements, portfolio preview, blog preview, testimonials, and contact section.
- Public pages for services, projects, blog listing, and detail pages.
- Admin dashboard for managing blogs and projects.
- Create, edit, delete, publish/draft, and image upload workflow for CMS content.
- Supabase database and storage integration.
- Server-rendered Astro setup with Cloudflare adapter.
- Accessible navigation, empty states, loading states, and mobile-friendly admin screens.

## Tech Stack

- Astro 6
- React 19
- Tailwind CSS 4
- Supabase
- Cloudflare adapter

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:4321` or the URL shown in your terminal.

## Environment Variables

Copy `.env.example` to `.env`, then fill the values from your Supabase project.

```bash
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

Use `supabase-schema.sql` to create the required tables and storage bucket.

## Main Routes

- `/` - Homepage
- `/services` - Services page
- `/projects` - Project listing
- `/projects/[slug]` - Project detail
- `/blog` - Blog listing
- `/blog/[slug]` - Blog detail
- `/admin/login` - Admin login
- `/admin/blogs` - Blog manager
- `/admin/projects` - Project manager

## Production Notes

Before using this for a real client, update the brand copy, real contact links, legal pages, Supabase RLS policies, production secrets, analytics, and deployment domain. This repository is structured as a portfolio demo and starter implementation.
