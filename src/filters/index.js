// 全局过滤器
import Vue from 'vue'
import moment from 'moment'
import {FORMAT_DATE, FORMAT_DATETIME, FORMAT_TIME} from '@/config/filter'

Vue.filter('momentDate', (date, format = FORMAT_DATE) => {
    return moment(date).format(format)
})

Vue.filter('momentTime', (time, format = FORMAT_TIME) => {
    return moment(time).format(format)
})

Vue.filter('momentDateTime', (datetime, format = FORMAT_DATETIME) => {
    return moment(datetime).format(format)
})