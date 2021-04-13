import axios from "@/axios";

const baseUrl = '/sys/bpm/model'

export default {

    //
    fetchAllByPage: (params) => axios({
        url: "/sys/bpm/models",
        method: 'GET',
        params: params
    }),

    fetchAll: (params) => axios({
        url: baseUrl,
        method: 'GET',
        params: params
    }),

    fetchOne: (userId) => axios({
        url: `${baseUrl}/${userId}`,
        method: 'GET'
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

    saveModelSource: (data) => axios({
        url: `${baseUrl}/source`,
        method: 'POST',
        data: data
    }),

    getModelSource: (modelId) => axios({
        url: `${baseUrl}/source/${modelId}`,
        method: 'GET',
    }),

    deploy: (data) => axios({
        url: `${baseUrl}/deploy`,
        method: 'POST',
        data: data
    }),
}

