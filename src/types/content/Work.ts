import { z } from 'zod'
import { WorkSchema } from '@/content/config'

export type Work = z.infer<typeof WorkSchema> & {
    image?: {
        src: string
        width: number
        height: number
    }
}
