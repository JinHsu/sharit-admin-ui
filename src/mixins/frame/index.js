import {mapActions, mapState} from 'vuex'

export default {

    computed: {
        ...mapState({
            collapsed: state => state.frame.collapsed,
            themeColor: state => state.frame.themeColor,
            themeSidebar: state => state.frame.themeSidebar,
            drawerOpened: state => state.frame.drawerOpened,
        })
    },

    methods: {
        ...mapActions({
            setCollapsed: `frame/setCollapsed`,
            setThemeColor: `frame/setThemeColor`,
            setThemeSidebar: `frame/setThemeSidebar`,
            setDrawerOpened: `frame/setDrawerOpened`
        })
    }

}