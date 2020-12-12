import axios from "@/axios";

const baseUrl = '/rbac/menubutton/menu'

export default {

    /**
     * 查询菜单分配的按钮
     */
    fetchMenuButton: (menuId) => axios({
        url: `${baseUrl}/${menuId}`,
        method: 'GET'
    }),

    /**
     * 保存菜单分配的按钮
     */
    saveMenuButton: (menuId, data) => axios({
        url: `${baseUrl}/${menuId}`,
        method: 'POST',
        data: data
    }),

}