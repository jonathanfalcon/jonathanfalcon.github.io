import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

export const WorkSchema = z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),

    date: z.string().transform((longDate) => {
        const date = new Date(`${longDate} UTC`)
        return {
            longDate,
            isoDate: date.toISOString().split('T')[0],
            numberDate: date.getTime(),
        }
    }),
    draft: z.boolean().optional(),

    category: z.string().optional(),
    subcategory: z.string().optional(),
    codingLanguages: z.array(z.string()).optional(),

    containsCode: z.boolean().optional(),
    containsCharts: z.boolean().optional(),
    containsMath: z.boolean().optional(),
})

const work = defineCollection({
    loader: glob({ base: './work', pattern: '*/index.{md,mdx}' }),
    schema: ({ image }) =>
        WorkSchema.extend({
            image: image().optional(),
        }),
})

export const collections = {
    work,
}
