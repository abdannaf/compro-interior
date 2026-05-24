import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        date: z.string(),
        author: z.string().default('BuildPRO Team'),
        image: z.string(),
        tags: z.array(z.string()).default([]),
    }),
});

const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        location: z.string(),
        category: z.string(),
        client: z.string(),
        year: z.string(),
        image: z.string(),
        excerpt: z.string(),
    }),
});

export const collections = { blog, projects };
