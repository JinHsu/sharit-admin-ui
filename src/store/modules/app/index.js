export default {

    namespaced: true,

    state: {
        locale: '', // 本地语言
    },

    mutations: {
        setLocale: (state, locale) => {
            state.locale = locale
            // ls
        }

    },

    actions: {
        setLocale: ({commit}, locale) => commit('setLocale', locale)
    }

}
