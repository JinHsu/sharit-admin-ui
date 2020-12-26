import axios from '@/axios'

const baseUrl = '/bd/addr/country'

export default {

    fetchAllByPage: (params) => axios({
        url: '/bd/addr/countries',
        method: 'GET',
        params: params
    }),

    fetchAll: (params) => axios({
        url: baseUrl,
        method: 'GET',
        params: params
    }),

    fetchOne: (id) => axios({
        url: `${baseUrl}/${id}`,
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

}