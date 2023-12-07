export type Seo = {
    title?: string
    description?: string
    charset?: string
    canonical?: URL | string
    nofollow?: boolean
    noindex?: boolean
    image?: {
        src: URL | string
        format: string
        width: string
        height: string
        alt: string
    }
    openGraph?: {
        basic: {
            title?: string
            type: string
        }
        optional?: {
            audio?: string
            description?: string
            determiner?: string
            locale?: string
            localeAlternate?: string[]
            siteName?: string
            video?: string
        }
        article?: {
            publishedTime?: string
            modifiedTime?: string
            expirationTime?: string
            authors?: string[]
            section?: string
            tags?: string[]
        }
    }
    twitter?: {
        card?: 'summary' | 'summary_large_image' | 'app' | 'player'
        site?: string
        creator?: string
        title?: string
        description?: string
    }
}
