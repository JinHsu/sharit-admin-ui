import {mapActions, mapState} from 'vuex'

export default {

    computed: {
        ...mapState({
            locale: state => state.framework.locale,
            //
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
            setLocale: `framework/setLocale`,
            setThemeColor: `framework/setThemeColor`,
            setThemeSider: `framework/setThemeSider`,
            setDrawerOpened: `framework/setDrawerOpened`
        })
    }

}