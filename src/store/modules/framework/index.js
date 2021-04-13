import localStorage from '@/use/local-storage/lsWrapper'

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
        // 打开的页面
        multiTab: {
            pages: [],
            activeKey: null
        },
        //
        drawerOpened: false, // 系统设置是否打开

    },

    mutations: {
        setDevice: (state, device) => {
            state.device = device
        },

        setLocale: (state, locale) => {
            state.locale = locale
            localStorage.set('locale', locale)
        },

        setCollapsed: (state, collapsed) => {
            state.collapsed = collapsed
            localStorage.set('collapsed', collapsed)
        },

        setThemeColor: (state, color) => {
            state.themeColor = color
            localStorage.set('themeColor', color)
        },

        setThemeSider: (state, theme) => {
            state.themeSider = theme
            localStorage.set('themeSider', theme)
        },

        setMultiTab: (state, multiTab) => {
            state.multiTab = multiTab
            localStorage.set('multiTab', multiTab)
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
        setMultiTab: ({commit}, multiTab) => commit('setMultiTab', multiTab),
        setDrawerOpened: ({commit}, drawerOpened) => commit('setDrawerOpened', drawerOpened),
    }
}