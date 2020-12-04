<template>
    <el-container style="height: 100vh;">
        <el-aside v-if="!isMobile()" :width="sidebarWidth">
            <SideBar/>
        </el-aside>
        <el-container>
            <el-header height="64px">
                <NavBar/>
            </el-header>
            <el-main style="background-color: #F2F2F2">
                <router-view/>
            </el-main>
            <!--
            <el-footer height="64px" style="background-color: brown">
            </el-footer>
            -->
        </el-container>
    </el-container>
</template>

<script>
    import SideBar from "./sidebar/SideBar"
    import NavBar from "./navbar/NavBar"
    import menus from './sidebarmenu/menus'
    import {device, frame} from '@/mixins'

    export default {
        name: "FrameLayout",

        components: {SideBar, NavBar},

        data() {
            return {
                sidebarWidth: '',
                menus: menus,
            }
        },

        mixins: [device, frame],

        methods: {

            resize() {
                const event = document.createEvent('HTMLEvents')
                event.initEvent('resize', true, true)
                event.eventType = 'message'
                window.dispatchEvent(event)
            },

            // 根据设备自适应（侧边栏自动折叠与展开）
            adapt(n, o) {
                // console.info(o, '变', n)
                let paddingLeft
                // <<<<<<<<<<<<<<<<<<<<<<
                if (o === 'desktop' && (n === 'tablet' || n === 'mobile')) {
                    // 响应式：强制折叠
                    this.setCollapsed(true)
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
                    // 响应式：强制展开
                    this.setCollapsed(false)
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
            // 注意2个方法的顺序
            this.adapt(this.device)
        },

        watch: {
            device(n, o) {
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