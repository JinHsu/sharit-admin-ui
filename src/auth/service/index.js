import axios from "@/axios";

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
        url: `/ps/usercenter/v1/user`,
        method: "GET"
    }),

    /**
     * 查询用户菜单
     */
    fetchUserMenu: () => axios({
        url: `/ps/authz/v1/user-menus`,
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