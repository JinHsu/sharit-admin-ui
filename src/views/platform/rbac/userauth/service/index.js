import axios from "@/axios";

export default {

    /**
     * 查询用户分配的角色
     */
    fetchUserRole: (userId) => axios({
        url: `/rbac/userrole/user/${userId}`,
        method: 'GET'
    }),

    /**
     * 保存用户分配的角色
     */
    saveUserRole: (userId, data) => axios({
        url: `/rbac/userrole/user/${userId}`,
        method: 'POST',
        data: data
    }),

}