import axios from "@/axios";

const baseUrl = '/rbac/auth'

export default {

    /**
     * 登录
     */
    login: (params) => axios({
        url: '/login',
        method: "POST",
        params: params,
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }),

    /**
     * 获取用户信息
     */
    fetchUser: () => axios({
        url: `${baseUrl}/user`,
        method: "GET"
    }),

    /**
     * 查询用户菜单
     */
    fetchUserMenu: () => axios({
        url: `${baseUrl}/user/menu`,
        method: "GET"
    }),

    /**
     * 注销
     */
    logout: () => axios({
        url: '/logout',
        method: "POST"
    }),

}