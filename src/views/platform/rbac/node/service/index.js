import axios from '@/axios'

const baseUrl = '/rbac/node'

export default {

    fetchAllByPage: (params) => axios({
        url: '/rbac/nodes',
        method: 'GET',
        params: params
    }),

    fetchAll: (params) => axios({
        url: `${baseUrl}`,
        method: 'GET',
        params: params
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