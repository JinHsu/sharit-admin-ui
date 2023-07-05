import axios from "@/axios";

const baseUrl = '/rbac/auth'

export default {

    /**
     * 登录
     */
    login: (data) => axios({
        url: '/ps/authc/v1/auth',
        method: "POST",
        data: data,
        headers: {"Content-Type": "application/json"}
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