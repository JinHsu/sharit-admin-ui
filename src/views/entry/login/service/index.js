import axios from "@/axios";

export default {

    /**
     * 登录
     */
    login: (params) => axios({
        url: '/login', method: "POST", params: params,
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    })

}