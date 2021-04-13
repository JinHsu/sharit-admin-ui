import {mapState} from 'vuex'

export default {

    computed: {
        ...mapState({
            device: state => state.framework.device
        })
    },

    methods: {
        isMobile() {
            return (this.device || '') === 'mobile'
        },

        isTablet() {
            return (this.device || '') === 'tablet'
        },

        isDesktop() {
            return (this.device || '') === 'desktop'
        }
    }

}