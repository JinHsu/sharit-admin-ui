import axios from "@/axios";

export default {

    /**
     * 查询角色分配的菜单
     */
    fetchRoleMenu: (roleId) => axios({
        url: `/rbac/rolemenu/role/${roleId}`,
        method: "GET"
    }),

    /**
     * 保存角色分配的菜单
     */
    saveRoleMenu: (roleId, data) => axios({
        url: `/rbac/rolemenu/role/${roleId}`,
        method: "POST",
        data: data
    }),

    /**
     * 查询角色关联的用户
     */
    fetchRoleUser: (roleId) => axios({
        url: `/rbac/userrole/role/${roleId}`,
        method: "GET"
    }),

    /**
     * 保存角色关联的用户
     */
    saveRoleUser: (roleId, data) => axios({
        url: `/rbac/userrole/role/${roleId}`,
        method: "POST",
        data: data
    })
}