import { format } from "date-fns/esm"

export const FormatTime = (time, type) => {
    if (!time) return ''
    const current = new Date(time)
    const timeFormat = "HH:MM"
    const dateFormat = 'dd.MM.yyyy'
    switch (type) {
        case "date":
            return format(current, dateFormat)
        default:
            return format(current, timeFormat) 
    }
} 