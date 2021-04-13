import axios from "@/axios";

const baseUrl = '/workflow/setup/usergroup/group'

export default {

    fetchUserGroup: (groupId) => axios({
        url: `${baseUrl}/${groupId}`,
        method: "GET"
    }),

    saveUserGroup: (groupId, data) => axios({
        url: `${baseUrl}/${groupId}`,
        method: "POST",
        data: data
    })
}