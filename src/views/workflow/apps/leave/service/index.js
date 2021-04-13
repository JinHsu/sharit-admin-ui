import axios from '@/axios'

const baseUrl = '/workflow/app/leave'

export default {

    fetchAllByPage: (params) => axios({
        url: '/workflow/app/leaves',
        method: 'GET',
        params: params
    }),

    fetchAll: (params) => axios({
        url: baseUrl,
        method: 'GET',
        params: params
    }),

    fetchDefaultValue: () => axios({
        url: '/workflow/app/leave/init',
        method: 'GET',
    }),

    create: (data) => axios({
        url: baseUrl,
        method: 'POST',
        data: data
    }),

    update: (data) => axios({
        url: baseUrl,
        method: 'PUT',
        data: data
    }),

    delete: (data) => axios({
        url: baseUrl,
        method: 'DELETE',
        data: data
    }),

    submit: (data) => axios({
        url: `${baseUrl}/submit`,
        method: 'POST',
        data: data
    })

}