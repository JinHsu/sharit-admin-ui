import axios from "@/axios";

export default {

    //
    fetchAllByPage: (params) => axios({
        url: "/rbac/users",
        method: 'GET',
        params: params
    }),

    fetchAll: (params) => axios({
        url: "/rbac/user",
        method: 'GET',
        params: params
    }),

    fetchOne: (userId) => axios({
        url: `/rbac/user/${userId}`,
        method: 'GET'
    }),

    create: (data) => axios({
        url: "/rbac/user",
        method: 'POST',
        data: data
    }),

    update: (data) => axios({
        url: "/rbac/user",
        method: 'PUT',
        data: data
    }),

    delete: (data) => axios({
        url: "/rbac/user",
        method: 'DELETE',
        data: data
    })


}