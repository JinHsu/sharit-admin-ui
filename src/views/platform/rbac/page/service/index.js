import axios from '@/axios'

const baseUrl = '/rbac/page'

export default {

    fetchAllByPage: (params) => axios({
        url: '/rbac/pages',
        method: 'GET',
        params: params
    }),

    fetchAll: (params) => axios({
        url: '/rbac/page',
        method: 'GET',
        params: params
    }),

    fetchOne: (pageId) => axios({
        url: `/rbac/page/${pageId}`,
        method: 'GET',
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