import {formatDate, formatDateTime, formatTime, momentDate, momentDateTime, momentTime} from '@/utils/datetime'

/**
 * setFieldsValue数据处理
 *
 * @param data
 * @param dateFields
 * @param timeFields
 * @param datetimeFields
 */
const processSetFormData = (data = {}, dateFields = [], timeFields = [], datetimeFields = []) => {
    Object.keys(data).forEach((key) => {
        if (dateFields.indexOf(key) > -1) {
            data[key] = momentDate(data[key])
        } else if (timeFields.indexOf(key) > -1) {
            data[key] = momentTime(data[key])
        } else if (datetimeFields.indexOf(key) > -1) {
            data[key] = momentDateTime(data[key])
        }
    })

}

/**
 * 处理获取的表单数据
 *
 * @param formData
 * @param fields
 * @param dateFields
 * @param timeFields
 * @param datetimeFields
 */
const processGetFormData = (formData = {}, fields = {}, dateFields = [], timeFields = [], datetimeFields = []) => {
    Object.values(fields).forEach((field) => {
        const {name, value} = field
        if (dateFields.indexOf(name) > -1) {
            formData[name] = formatDate(value)
        } else if (timeFields.indexOf(name) > -1) {
            formData[name] = formatTime(value)
        } else if (datetimeFields.indexOf(name) > -1) {
            formData[name] = formatDateTime(value)
        } else {
            formData[name] = value
        }
    })
}

export {
    processSetFormData, processGetFormData
}