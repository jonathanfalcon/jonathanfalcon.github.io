import {
    Profile,
    EducationList,
    CertificationList,
    SkillList,
    DateObject,
} from '@/types/content/Resume'

const createDate = (shortDate: string): DateObject => {
    const date = new Date(`${shortDate} UTC`)

    return {
        shortDate,
        isoDate: date.toISOString().split('T')[0],
    }
}

export const profile: Profile = {
    name: 'Jonathan Falcon',
    title: 'Fencer, songwriter, photographer, marketer',
    about: 'Curiosity drives me; consumer behavior excites me. I will help you understand who your customers are and why they do what they do, so you can better tailor your products/services to exceed expectations.',
}

export const educationList: EducationList = [
    {
        degree: 'Master of Science in Marketing',
        university: 'The University of Texas at Austin',
        college: 'McCombs School of Business',
        icon: {
            name: 'colleges/longhorn',
            color: 'text-[#BF5700]',
        },
        graduationDate: createDate('May 2023'),
    },
    {
        degree: 'Bachelor of Business Administration in Economics',
        university: 'Texas State University',
        icon: {
            name: 'colleges/bobcat',
            color: 'text-[#571C1F] dark:text-[#AC9155]',
        },
        graduationDate: createDate('May 2022'),
    },
]

export const certificationList: CertificationList = [
    {
        certification: 'Google Analytics',
        issuer: 'Google Digital Academy (SkillShop)',
        icon: {
            name: 'logos:google-analytics',
        },
        url: 'https://skillshop.credential.net/b3a851ef-f9ec-4a1a-b996-abad6215f36c',
        completionDate: createDate('Mar 2023'),
    },
    {
        certification: 'Digital Marketing',
        issuer: 'Hubspot Academy',
        icon: {
            name: 'mdi:hubspot',
            color: 'text-[rgb(255,122,89)]',
        },
        url: 'https://app.hubspot.com/academy/achievements/j4h7lgvw/en/1/jonathan-falcon/digital-marketing',
        completionDate: createDate('Feb 2023'),
    },
    {
        certification: 'Inbound Marketing',
        issuer: 'Hubspot Academy',
        icon: {
            name: 'mdi:hubspot',
            color: 'text-[rgb(255,122,89)]',
        },
        url: 'https://app.hubspot.com/academy/achievements/ndrfv7dj/en/1/jonathan-falcon/inbound-marketing',
        completionDate: createDate('Feb 2023'),
    },
    {
        certification: 'Introduction to Stata 15',
        issuer: 'LinkedIn',
        icon: {
            name: 'vscode-icons:file-type-stata',
        },
        url: 'https://www.linkedin.com/learning/certificates/436fa84b6cd23f585d94aa70a3145df09c922ddb99bab3e984ecd5b9f5e1d899?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B0CbUnInpQIuMyB6eR%2Fo4CA%3D%3D',
        completionDate: createDate('Mar 2022'),
    },
]

export const skillList: SkillList = [
    {
        category: 'Statistical Languages',
        skills: [
            {
                skill: 'R',
                icon: [{ name: 'logos:r-lang' }],
                proficiency: 80,
            },
            {
                skill: 'Python',
                icon: [{ name: 'logos:python' }],
                proficiency: 80,
            },
        ],
    },
    {
        category: 'Database Languages',
        skills: [
            {
                skill: 'SQL',
                icon: [
                    { name: 'logos:snowflake' },
                    { name: 'logos:mysql' },
                    { name: 'logos:sqlite' },
                ],
                proficiency: 70,
            },
        ],
    },
    {
        category: 'Web Development Languages',
        skills: [
            {
                skill: 'HTML',
                icon: [{ name: 'logos:html-5' }],
                proficiency: 90,
            },
            {
                skill: 'CSS',
                icon: [{ name: 'logos:css-3' }, { name: 'logos:tailwindcss-icon' }],
                proficiency: 80,
            },
            {
                skill: 'JavaScript & TypeScript',
                icon: [{ name: 'logos:javascript' }, { name: 'logos:typescript-icon' }],
                proficiency: 60,
            },
        ],
    },
    {
        category: 'Software',
        skills: [
            { skill: 'Tableau', icon: [{ name: 'logos:tableau' }], proficiency: 60 },
            { skill: 'Qualtrics', icon: [{ name: 'simple-icons:qualtrics' }], proficiency: 70 },
            {
                skill: 'Microsoft Office Suite',
                icon: [
                    { name: 'vscode-icons:file-type-excel' },
                    { name: 'vscode-icons:file-type-word' },
                    { name: 'vscode-icons:file-type-powerpoint' },
                ],
                proficiency: 90,
            },
            {
                skill: 'Adobe Photoshop',
                icon: [{ name: 'vscode-icons:file-type-photoshop' }],
                proficiency: 80,
            },
            {
                skill: 'Affinity Designer and Publisher',
                icon: [
                    { name: 'vscode-icons:file-type-affinitydesigner' },
                    { name: 'vscode-icons:file-type-affinitypublisher' },
                ],
                proficiency: 50,
            },
        ],
    },
]
