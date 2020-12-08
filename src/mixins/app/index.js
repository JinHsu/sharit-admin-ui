import {mapActions, mapState} from 'vuex'

export default {
    computed: {
        ...mapState({
            routes: state => state.app.routes,
            menus: state => state.app.menus,
            userInfo: state => state.app.userInfo
        })
    },

    methods: {
        ...mapActions({
            setUserInfo: 'app/setUserInfo'
        })
    }

}