import {mapActions, mapState} from 'vuex'

export default {
    computed: {
        ...mapState({
            routes: state => state.app.routes,
            menus: state => state.app.menus,
            userInfo: state => state.app.userInfo,
            avatar: state => (state.app.userInfo || {}).avatar,
            nickname: state => (state.app.userInfo || {}).nickname,
        })
    },

    methods: {
        ...mapActions({
            setUserInfo: 'app/setUserInfo',
            setAccessToken: 'app/setAccessToken'
        })
    }

}