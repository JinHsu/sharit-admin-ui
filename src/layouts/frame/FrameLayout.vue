<template>
    <el-container style="height: 100vh;">
        <el-aside v-if="!isMobile()" :width="sidebarWidth">
            <SideBar :collapsed="collapsed"/>
        </el-aside>
        <el-container>
            <el-header height="64px">
                <NavBar :show-logo="isMobile()"/>
            </el-header>
            <el-main style="background-color: #F2F2F2">
                <router-view/>
            </el-main>
            <!--
            <el-footer height="64px" style="background-color: brown">
                Footer
            </el-footer>
            -->
        </el-container>
    </el-container>
</template>

<script>
    import SideBar from "./siderbar/SideBar"
    import NavBar from "./navbar/NavBar"
    import menus from './siderbar/menus'
    import {device} from '@/mixins'

    export default {
        name: "FrameLayout",

        props: {},
        components: {SideBar, NavBar},
        data() {
            return {
                sidebarWidth: '',
                collapsed: false,
                menus: menus,
            }
        },
        mixins: [device],
        computed: {},
        methods: {
            onToggle(collapsed) {
                this.collapsed = collapsed
                console.log("FrameLayout:collapsed:" + collapsed)
            },

            resize() {
                const event = document.createEvent('HTMLEvents')
                event.initEvent('resize', true, true)
                event.eventType = 'message'
                window.dispatchEvent(event)
            },

            // 根据设备自适应（侧边栏自动折叠与展开）
            adapt(n, o) {
                console.info(o, '变', n)
                let paddingLeft
                // <<<<<<<<<<<<<<<<<<<<<<
                if (o === 'desktop' && (n === 'tablet' || n === 'mobile')) {
                    this.collapsed = true // 响应式：强制折叠
                    this.$eventBus.$emit(this.$events.on_toggle, this.collapsed)
                    // this.$store.dispatch('settings/setNavbarCollapsed', this.collapsed)
                    paddingLeft = n === 'tablet' ? '64px' : '0px'
                }
                if (o === 'tablet' && n === 'mobile') {
                    paddingLeft = '0px'
                }

                // >>>>>>>>>>>>>>>>>>>>>>
                if (o === 'mobile' && n === 'tablet') {
                    paddingLeft = this.collapsed ? '64px' : '240px'
                }
                if ((o === 'tablet' || o === 'mobile') && n === 'desktop') {
                    this.collapsed = false // 响应式：强制展开
                    this.$eventBus.$emit(this.$events.on_toggle, this.collapsed)
                    // this.$store.dispatch('settings/setNavbarCollapsed', this.collapsed)
                    paddingLeft = '240px'
                }

                // ~~~~~~~~~~~~~~~~~~~~~~
                if (o === undefined) {
                    if (n === 'mobile') {
                        paddingLeft = '0px'
                    } else {
                        paddingLeft = this.collapsed ? '64px' : '240px'
                    }
                }

                this.sidebarWidth = paddingLeft
                this.resize()
            },

            onCollapse() {
                let paddingLeft
                if (this.isMobile()) {
                    paddingLeft = '0px'
                } else if (this.isTablet()) {
                    paddingLeft = this.collapsed ? '64px' : '240px'
                } else if (this.isDesktop()) {
                    paddingLeft = this.collapsed ? '64px' : '240px'
                }

                this.sidebarWidth = paddingLeft
            }
        },
        created() {
            this.collapsed = false
            this.adapt(this.device)
        },
        mounted() {
            this.$eventBus.$on(this.$events.on_toggle, this.onToggle)
        },
        watch: {
            device(n, o) {
                // console.log(n,o)
                this.adapt(n, o)
            },

            collapsed() {
                this.onCollapse()
            }
        }
    }
</script>

<style lang="scss">
    .el-header {
        padding: 0 20px 0 0;
    }
</style>