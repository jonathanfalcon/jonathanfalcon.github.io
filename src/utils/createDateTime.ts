import { Date as CustomDate, Month } from '@/types/misc/date.ts'

type Props = CustomDate

const numericMonth = (month: Month): string => {
    switch (month) {
        case 'January':
        case 'Jan':
            return '01'
        case 'February':
        case 'Feb':
            return '02'
        case 'March':
        case 'Mar':
            return '03'
        case 'April':
        case 'Apr':
            return '04'
        case 'May':
            return '05'
        case 'June':
        case 'Jun':
            return '06'
        case 'July':
        case 'Jul':
            return '07'
        case 'August':
        case 'Aug':
            return '08'
        case 'September':
        case 'Sep':
            return '09'
        case 'October':
        case 'Oct':
            return '10'
        case 'November':
        case 'Nov':
            return '11'
        case 'December':
        case 'Dec':
            return '12'
        default:
            return '00'
    }
}

const createDateTimeMonthYear = ({ month, year }: Props): string => {
    return `${year}-${numericMonth(month)}`
}

const createDateTimeFull = (date: Date): string => {
    return date.toISOString().split('T')[0]
}

export const createDateTime = {
    monthYear: createDateTimeMonthYear,
    full: createDateTimeFull,
}
