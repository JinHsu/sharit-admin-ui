import {mapActions, mapState} from 'vuex'

export default {

    computed: {
        ...mapState({
            collapsed: state => state.framework.collapsed,
            //
            themeColor: state => state.framework.themeColor,
            themeSider: state => state.framework.themeSider,
            //
            drawerOpened: state => state.framework.drawerOpened,
        })
    },

    methods: {
        ...mapActions({
            setCollapsed: `framework/setCollapsed`,
            setThemeColor: `framework/setThemeColor`,
            setThemeSider: `framework/setThemeSider`,
            setDrawerOpened: `framework/setDrawerOpened`
        })
    }

}