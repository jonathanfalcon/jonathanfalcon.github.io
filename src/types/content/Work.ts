import { z } from 'zod'
import { WorkSchema } from '@/content.config.ts'
import { ImageMetadata } from 'astro'

export type Work = z.infer<typeof WorkSchema> & {
    image?: ImageMetadata
}
