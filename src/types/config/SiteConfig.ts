export type SiteConfig = {
    title: string
    description: string
    origin: string
    links: SiteLink[]
    socials: SocialLink[]
}

type SocialLink = {
    platform: string
    url: string
    icon: string
}

type SiteLink = {
    label: string
    path: string
}
