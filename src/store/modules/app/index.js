export default {

    namespaced: true,

    state: {
        device: '', // 设备类型
        locale: '', // 本地语言
    },

    mutations: {
        setDevice: (state, device) => {
            state.device = device
        },
        setLocale: (state, locale) => {
            state.locale = locale
            // ls
        }

    },

    actions: {
        setDevice: ({commit}, device) => commit('setDevice', device),
        setLocale: ({commit}, locale) => commit('setLocale', locale)
    }

}
