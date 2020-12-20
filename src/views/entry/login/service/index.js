import axios from "@/axios";

export default {

    /**
     * 获取短信验证码
     */
    fetchCaptcha: (params) => axios({
        url: '/sms/code',
        method: "GET",
        params: params
    })

}