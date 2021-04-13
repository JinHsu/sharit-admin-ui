import axios from '@/axios'

const baseUrl = '/rbac/button'

export default {

    fetchAllByPage: (params) => axios({
        url: '/rbac/buttons',
        method: 'GET',
        params: params
    }),

    fetchAll: (params) => axios({
        url: `${baseUrl}`,
        method: 'GET',
        params: params
    }),

    fetchOne: (buttonId) => axios({
        url: `${baseUrl}/${buttonId}`,
        method: 'GET'
    }),

    create: (data) => axios({
        url: `${baseUrl}`,
        method: 'POST',
        data: data
    }),

    update: (data) => axios({
        url: `${baseUrl}`,
        method: 'PUT',
        data: data
    }),

    delete: (data) => axios({
        url: `${baseUrl}`,
        method: 'DELETE',
        data: data
    })

}