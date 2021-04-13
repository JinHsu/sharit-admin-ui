import Vue from 'vue'

export default {

    namespaced: true,

    state: {
        accessToken: '', // x-auth-token
        // { username: '', mobile: '', emial: '', enabled: true, locked: false, expiryDate: '', remark: '',
        // userId: '', cropper: '', nickname: '', birthday: '', sex: 'sex', area: '', lang: '', timeZone: '' }
        routes: [], // 动态路由表
        menus: [], // 动态菜单
        buttons: null, // 菜单按钮
        userInfo: null, // 用户信息,默认为null不要修改为{}
    },

    getters: {},

    mutations: {
        setAccessToken: (state, accessToken) => {
            state.accessToken = accessToken
            Vue.ls.set('accessToken', accessToken, 7 * 24 * 60 * 60 * 1000) // 有效期7天
        },
        setRoutes: (state, routes) => {
            state.routes = routes
        },
        setMenus: (state, menus) => {
            state.menus = menus
        },
        setButtons: (state, buttons) => {
            state.buttons = buttons
        },
        setUserInfo: (state, userInfo) => {
            state.userInfo = userInfo
        },
        setLogout: (state) => {
            state.accessToken = ''
            state.userInfo = null
            Vue.ls.remove('accessToken')
        }
    },

    actions: {
        setAccessToken: ({commit}, accessToken) => commit('setAccessToken', accessToken),
        setRoutes: ({commit}, routes) => commit('setRoutes', routes),
        setMenus: ({commit}, menus) => commit('setMenus', menus),
        setButtons: ({commit}, buttons) => commit('setButtons', buttons),
        setUserInfo: ({commit}, userInfo) => commit('setUserInfo', userInfo),
        setLogout: ({commit}) => commit('setLogout')
    }

}
