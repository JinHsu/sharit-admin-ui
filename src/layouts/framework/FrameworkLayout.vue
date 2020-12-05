<template>
    <!--框架整体布局-->
    <a-layout class="a-layout-framework">
        <!--左侧：侧边栏-->
        <collapsiable-sider v-if="!isMobile()"/>

        <!--右侧-->
        <a-layout class="a-layout-framework-right" :style="{paddingLeft: paddingLeft}">
            <!--头部-->
            <a-layout-header class="a-layout-framework-right-header" :style="{paddingLeft: paddingLeft}">
                <drawable-sider v-if="isMobile()"/>
                <toggle-button/>
            </a-layout-header>

            <!--内容区-->
            <a-layout-content class="a-layout-framework-right-content">

                <div style="background-color: #ffffff">
                    <h1>content1</h1>
                    <h1>content2</h1>
                    <h1>content3</h1>
                    <h1>content4</h1>
                    <h1>content5</h1>
                    <h1>content6</h1>
                    <h1>content7</h1>
                    <h1>content8</h1>
                    <h1>content1</h1>
                    <h1>content2</h1>
                    <h1>content3</h1>
                    <h1>content4</h1>
                    <h1>content5</h1>
                    <h1>content6</h1>
                    <h1>content7</h1>
                    <h1>content8</h1>
                    <h1>content1</h1>
                    <h1>content2</h1>
                    <h1>content3</h1>
                    <h1>content4</h1>
                    <h1>content5</h1>
                    <h1>content6</h1>
                    <h1>content7</h1>
                    <h1>content8</h1>
                    <h1>content1</h1>
                    <h1>content2</h1>
                    <h1>content3</h1>
                    <h1>content4</h1>
                    <h1>content5</h1>
                    <h1>content6</h1>
                    <h1>content7</h1>
                    <h1>content8</h1>

                    <h1>content1</h1>
                    <h1>content2</h1>
                    <h1>content3</h1>
                    <h1>content4</h1>
                    <h1>content5</h1>
                    <h1>content6</h1>
                    <h1>content7</h1>
                    <h1>content8</h1>
                </div>

            </a-layout-content>

            <!--页脚-->
            <a-layout-footer class="a-layout-framework-right-footer">
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    import {CollapsiableSider} from "./sider"
    import {DrawableSider, ToggleButton} from './header'
    import {device, framework} from '@/mixins'

    export default {
        name: "FrameworkLayout",

        components: {
            CollapsiableSider, DrawableSider, ToggleButton,
        },

        data() {
            return {
                padding: '256px'
            }
        },

        mixins: [device, framework],

        computed: {
            paddingLeft() {
                return this.padding
            }
        },

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
                let padding
                // <<<<<<<<<<<<<<<<<<<<<<
                if (o === 'desktop' && (n === 'tablet' || n === 'mobile')) {
                    // 响应式：强制折叠
                    this.setCollapsed(true)
                    padding = n === 'tablet' ? '80px' : '0px'
                }
                if (o === 'tablet' && n === 'mobile') {
                    padding = '0px'
                }

                // >>>>>>>>>>>>>>>>>>>>>>
                if (o === 'mobile' && n === 'tablet') {
                    padding = this.collapsed ? '80px' : '256px'
                }
                if ((o === 'tablet' || o === 'mobile') && n === 'desktop') {
                    // 响应式：强制展开
                    this.setCollapsed(false)
                    padding = '256px'
                }

                // ~~~~~~~~~~~~~~~~~~~~~~
                if (o === undefined) {
                    if (n === 'mobile') {
                        padding = '0px'
                    } else {
                        padding = this.collapsed ? '80px' : '256px'
                    }
                }

                this.padding = padding
                this.resize()
            },

            onCollapse() {
                let padding
                if (this.isMobile()) {
                    padding = '0px'
                } else if (this.isTablet()) {
                    padding = this.collapsed ? '80px' : '256px'
                } else if (this.isDesktop()) {
                    padding = this.collapsed ? '80px' : '256px'
                }

                this.padding = padding
            }
        },

        created() {
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

<style lang="less" scoped>

</style>