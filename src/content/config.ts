import { z, defineCollection } from 'astro:content'

export const WorkSchema = z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),

    date: z.date(),
    draft: z.boolean().optional(),

    category: z.string().optional(),
    subcategory: z.string().optional(),
    codingLanguages: z.array(z.string()).optional(),

    containsCode: z.boolean().optional(),
    containsCharts: z.boolean().optional(),
    containsMath: z.boolean().optional(),
})

const work = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        WorkSchema.extend({
            image: image().optional(),
        }),
})

export const collections = {
    work,
}
