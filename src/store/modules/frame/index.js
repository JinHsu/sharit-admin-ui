export default {
    namespaced: true,

    state: {
        device: '', // 设备类型
        collapsed: false, // 侧边栏否是折叠
        themeColor: '', // 主题颜色
        themeSidebar: 'light', // 侧边栏外观
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

        setThemeSidebar: (state, theme) => {
            state.themeSidebar = theme
        },

        setDrawerOpened: (state, drawerOpened) => {
            state.drawerOpened = drawerOpened
        }
    },

    actions: {
        setDevice: ({commit}, device) => commit('setDevice', device),
        setCollapsed: ({commit}, collapsed) => commit('setCollapsed', collapsed),
        setThemeColor: ({commit}, color) => commit('setThemeColor', color),
        setThemeSidebar: ({commit}, theme) => commit('setThemeSidebar', theme),
        setDrawerOpened: ({commit}, drawerOpened) => commit('setDrawerOpened', drawerOpened),
    }
}