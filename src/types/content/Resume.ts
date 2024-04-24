import { HTMLAttributes } from 'astro/types'
import { DateShortMonth } from '@/types/misc/date.ts'

export type Icon = {
    name: string
    color?: HTMLAttributes<'svg'>['class']
}

export type Dates = {
    from: DateShortMonth
    to: DateShortMonth
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
    graduationDate: DateShortMonth
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
    completionDate: DateShortMonth
}[]

export type SkillList = {
    category: string
    skills: {
        skill: string
        proficiency: number
        icon: Icon[]
    }[]
}[]
