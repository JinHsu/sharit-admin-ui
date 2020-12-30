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
            //
            multiTab: state => state.framework.multiTab,
        }),

    },

    methods: {
        ...mapActions({
            setCollapsed: `framework/setCollapsed`,
            setLocale: `framework/setLocale`,
            setThemeColor: `framework/setThemeColor`,
            setThemeSider: `framework/setThemeSider`,
            setDrawerOpened: `framework/setDrawerOpened`,
            setMultiTab: `framework/setMultiTab`,
        }),

        // n: newDevice; o: oldDevice
        adapt(n, o) {
            // console.info(o, '变', n)
            let _siderWidth
            // <<<<<<<<<<<<<<<<<<<<<<
            if (o === 'desktop' && (n === 'tablet' || n === 'mobile')) {
                // 响应式：强制折叠
                this.setCollapsed(true)
                _siderWidth = n === 'tablet' ? '80px' : '0px'
            }
            if (o === 'tablet' && n === 'mobile') {
                _siderWidth = '0px'
            }

            // >>>>>>>>>>>>>>>>>>>>>>
            if (o === 'mobile' && n === 'tablet') {
                _siderWidth = this.collapsed ? '80px' : '256px'
            }
            if ((o === 'tablet' || o === 'mobile') && n === 'desktop') {
                // 响应式：强制展开
                this.setCollapsed(false)
                _siderWidth = '256px'
            }

            // ~~~~~~~~~~~~~~~~~~~~~~
            if (o === undefined) {
                if (n === 'mobile') {
                    _siderWidth = '0px'
                } else {
                    _siderWidth = this.collapsed ? '80px' : '256px'
                }
            }

            return _siderWidth
        },

        onCollapse(device) {
            let _siderWidth
            if (device === 'mobile') {
                _siderWidth = '0px'
            } else if (device === 'tablet') {
                _siderWidth = this.collapsed ? '80px' : '256px'
            } else if (device === 'desktop') {
                _siderWidth = this.collapsed ? '80px' : '256px'
            }
            return _siderWidth
        },
    }

}