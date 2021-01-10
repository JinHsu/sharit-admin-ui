import axios from "@/axios";

const baseUrl = '/sys/bpm/process'

export default {

    //
    fetchAllByPage: (params) => axios({
        url: "/sys/bpm/process",
        method: 'GET',
        params: params
    }),

    delete: (data, params) => axios({
        url: baseUrl,
        method: 'DELETE',
        params: params,
        data: data
    }),

}

