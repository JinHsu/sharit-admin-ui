export default {
    namespaced: true,

    state: {
        device: 'desktop', // 设备类型
        //
        collapsed: false, // 折叠侧边
        //
        themeColor: '#1890ff', // 主题颜色
        themeSider: 'dark', // 侧边栏外观
        // ...
        drawerOpened: false, // 系统设置是否打开
    },

    mutations: {
        setDevice: (state, device) => {
            state.device = device
        },

        setCollapsed: (state, collapsed) => {
            state.collapsed = collapsed
        },

        setThemeColor: (state, color) => {
            state.themeColor = color
        },

        setThemeSider: (state, theme) => {
            state.themeSider = theme
        },

        setDrawerOpened: (state, drawerOpened) => {
            state.drawerOpened = drawerOpened
        }
    },

    actions: {
        setDevice: ({commit}, device) => commit('setDevice', device),
        setCollapsed: ({commit}, collapsed) => commit('setCollapsed', collapsed),
        setThemeColor: ({commit}, color) => commit('setThemeColor', color),
        setThemeSider: ({commit}, theme) => commit('setThemeSider', theme),
        setDrawerOpened: ({commit}, drawerOpened) => commit('setDrawerOpened', drawerOpened),
    }
}