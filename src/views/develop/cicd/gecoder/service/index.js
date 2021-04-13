import axios from "@/axios"

export default {

    fetchUserSchemas: (params) => axios({
        url: '/dev/code/schemas',
        method: 'GET',
        params: params
    }),

    fetchSchemaTables: (params) => axios({
        url: '/dev/code/tables',
        method: 'GET',
        params: params
    }),

    fetchTableColumns: (params) => axios({
        url: '/dev/code/columns',
        method: 'GET',
        params: params
    }),

    generateCode: (data) => axios({
        url: '/dev/code',
        method: 'POST',
        data: data,
        responseType: 'blob' //
    })

}