import moment from 'moment'

const dateFormat = 'YYYY-MM-DD'
const timeFormat = 'HH:mm:ss'
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'

const momentDate = (date, format = dateFormat) => {
    return date ? moment(date, format) : null
}

const momentTime = (time, format = timeFormat) => {
    return time ? moment(time, format) : null
}

const momentDateTime = (datetime, format = dateTimeFormat) => {
    return datetime ? moment(datetime, format) : null
}

const formatDate = (dateMoment, format = dateFormat) => {
    return dateMoment ? dateMoment.format(format) : null
}

const formatTime = (timeMoment, format = timeFormat) => {
    return timeMoment ? timeMoment.format(format) : null
}

const formatDateTime = (datetimeMoment, format = dateTimeFormat) => {
    return datetimeMoment ? datetimeMoment.format(format) : null
}

export {
    momentDate, momentTime, momentDateTime, formatDate, formatTime, formatDateTime
}