import axios from "@/axios";

export default {

    fetchMailCode: (params) => axios({
        url: '/mail/code',
        method: 'GET',
        params: params
    }),

    updatePassword: (params) => axios({
        url: '/mail/password',
        method: 'PUT',
        params: params
    })

}