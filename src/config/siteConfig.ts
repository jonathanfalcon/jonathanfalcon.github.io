import { SiteConfig } from '@/types/config/SiteConfig.ts'

const siteLinks: SiteConfig['links'] = [
    {
        label: 'Home',
        path: '/',
    },
    {
        label: 'Work',
        path: '/work/',
    },
    {
        label: 'Resume',
        path: '/resume/',
    },
]

const socialLinks: SiteConfig['socials'] = [
    {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/jqfalcon/',
        icon: 'simple-icons:linkedin',
    },
    {
        platform: 'GitHub',
        url: 'https://github.com/jonathanfalcon/',
        icon: 'simple-icons:github',
    },
    {
        platform: 'Tableau Public',
        url: 'https://public.tableau.com/app/profile/falcon/',
        icon: 'simple-icons:tableau',
    },
    {
        platform: 'Unsplash',
        url: 'https://unsplash.com/@jonathanfalcon/',
        icon: 'simple-icons:unsplash',
    },
]

export const siteConfig: SiteConfig = {
    title: 'Jonathan Falcon',
    description:
        'As a marketing analyst, I leverage my multidisciplinary background to give you the most holistic understanding of your customers.',
    origin: 'https://jonathanfalcon.com',
    links: siteLinks,
    socials: socialLinks,
    googleAnalyticsId: 'G-576RL0XNE9',
    icon: 'ph:feather-fill',
}
