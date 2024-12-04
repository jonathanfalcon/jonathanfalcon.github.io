import { HTMLAttributes } from 'astro/types'

export type DateObject = {
    shortDate: string
    isoDate: string
}

export type Icon = {
    name: string
    color?: HTMLAttributes<'svg'>['class']
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
    graduationDate: DateObject
}[]

export type ExperienceList = {
    position: string
    company: string
    about: string
    icon: Icon
    tenure: {
        from: DateObject
        to: DateObject
    }
}[]

export type CertificationList = {
    certification: string
    issuer: string
    url: string
    icon: Icon
    completionDate: DateObject
}[]

export type SkillList = {
    category: string
    skills: {
        skill: string
        proficiency: number
        icon: Icon[]
    }[]
}[]
