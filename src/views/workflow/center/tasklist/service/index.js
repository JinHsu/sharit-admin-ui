import axios from '@/axios'

const baseUrl = '/sys/bpm/task'

export default {

    fetchAllByPage: (params) => axios({
        url: '/sys/bpm/tasks',
        method: 'GET',
        params: params
    }),

    fetchAll: (params) => axios({
        url: baseUrl,
        method: 'GET',
        params: params
    }),

    approve: (data, params) => axios({
        url: baseUrl,
        method: 'POST',
        params: params,
        data: data
    }),

    taskHistory: (taskId) => axios({
        url: `/sys/bpm/task/${taskId}/history`,
        method: 'GET',
    })

}