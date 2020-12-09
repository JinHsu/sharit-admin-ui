import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        device: 'desktop', // 设备类型
        //
        locale: 'zh_CN', // 本地语言：zh_CN, en_US
        //
        collapsed: false, // 折叠侧边
        //
        themeColor: '#1890FF', // 主题颜色
        themeSider: 'dark', // 侧边栏外观
        // ...
        drawerOpened: false, // 系统设置是否打开
    },

    mutations: {
        setDevice: (state, device) => {
            state.device = device
        },

        setLocale: (state, locale) => {
            state.locale = locale
            Vue.ls.set('locale', locale)
        },

        setCollapsed: (state, collapsed) => {
            state.collapsed = collapsed
            Vue.ls.set('collapsed', collapsed)
        },

        setThemeColor: (state, color) => {
            state.themeColor = color
            Vue.ls.set('themeColor', color)
        },

        setThemeSider: (state, theme) => {
            state.themeSider = theme
            Vue.ls.set('themeSider', theme)
        },

        setDrawerOpened: (state, drawerOpened) => {
            state.drawerOpened = drawerOpened
        }
    },

    actions: {
        setDevice: ({commit}, device) => commit('setDevice', device),
        setLocale: ({commit}, locale) => commit('setLocale', locale),
        setCollapsed: ({commit}, collapsed) => commit('setCollapsed', collapsed),
        setThemeColor: ({commit}, color) => commit('setThemeColor', color),
        setThemeSider: ({commit}, theme) => commit('setThemeSider', theme),
        setDrawerOpened: ({commit}, drawerOpened) => commit('setDrawerOpened', drawerOpened),
    }
}