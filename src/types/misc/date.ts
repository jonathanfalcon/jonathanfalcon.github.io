export type MonthShort =
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

export type MonthLong =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December'

export type Month = MonthShort | MonthLong

export type DateShortMonth = {
    month: MonthShort
    year: number
}

export type DateLongMonth = {
    month: MonthLong
    year: number
}

export type Date = DateShortMonth | DateLongMonth
