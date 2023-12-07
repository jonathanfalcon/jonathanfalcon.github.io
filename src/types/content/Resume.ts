import { HTMLAttributes } from 'astro/types'

export type Icon = {
    name: string
    color?: HTMLAttributes<'svg'>['class']
}

type Month =
    | 'Jan'
    | 'Feb'
    | 'Mar'
    | 'Apr'
    | 'May'
    | 'Jun'
    | 'Jul'
    | 'Aug'
    | 'Sep'
    | 'Oct'
    | 'Nov'
    | 'Dec'

export type Date = {
    month: Month
    year: number
}

export type Dates = {
    from: Date
    to: Date
}

export type Profile = {
    name: string
    title: string
    about: string
}

export type EducationList = {
    degree: string
    university: string
    college?: string
    icon: Icon
    graduationDate: Date
}[]

export type ExperienceList = {
    position: string
    company: string
    about: string
    icon: Icon
    tenure: Dates
}[]

export type CertificationList = {
    certification: string
    issuer: string
    url: string
    icon: Icon
    completionDate: Date
}[]

export type SkillList = {
    category: string
    skills: {
        skill: string
        proficiency: number
        icon: Icon[]
    }[]
}[]
