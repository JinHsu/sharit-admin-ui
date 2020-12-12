<template>
    <!--框架整体布局-->
    <a-layout class="framework">
        <!--左侧：侧边栏-->
        <collapsiable-sider v-if="!isMobile()"/>

        <!--右侧-->
        <a-layout class="framework-right" :style="{paddingLeft: paddingLeft}">
            <!--头部-->
            <a-layout-header class="framework-right-header" :style="{paddingLeft: paddingLeft}">
                <header-control/>
                <header-action/><!--头部右侧action-->
            </a-layout-header>

            <!--多页签栏-->
            <div class="framework-right-multi-tab" :style="{paddingLeft: paddingLeft}">
                <multi-tab/>
            </div>

            <!--内容区-->
            <a-layout-content class="framework-right-content">
                <!--页面-->
                <transition name="page-transition">
                    <keep-alive>
                        <!--设置key解决keep-alive失效的问题-->
                        <router-view :key="this.$route.fullPath" class="framework-right-content-page"/>
                    </keep-alive>
                </transition>
            </a-layout-content>

            <!--页脚-->
        </a-layout>
    </a-layout>
</template>

<script>
    import {device, framework} from '@/mixins'
    import CollapsiableSider from "./sider"
    import MultiTab from './multitab'
    import {HeaderAction, HeaderControl} from './header'

    export default {
        name: "FrameworkLayout",

        components: {
            CollapsiableSider, MultiTab, HeaderControl, HeaderAction
        },

        data() {
            return {
                siderWidth: '256px'
            }
        },

        mixins: [device, framework],

        computed: {
            paddingLeft() {
                return this.siderWidth
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

                this.siderWidth = _siderWidth
                this.resize()
            },

            onCollapse() {
                let _siderWidth
                if (this.isMobile()) {
                    _siderWidth = '0px'
                } else if (this.isTablet()) {
                    _siderWidth = this.collapsed ? '80px' : '256px'
                } else if (this.isDesktop()) {
                    _siderWidth = this.collapsed ? '80px' : '256px'
                }

                this.siderWidth = _siderWidth
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
    .framework {

        &-right { //
            min-height: 100vh;
            -webkit-transition: all 0.2s;
            transition: all 0.2s;

            &-header { // 头部
                position: fixed; // 固定
                right: 0;
                width: 100%;
                padding-right: 12px;
                z-index: 105;
                background-color: #ffffff;
                -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
                box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

                &-left {
                    display: inline-flex;
                }
            }

            &-multi-tab {
                position: fixed; // 固定
                top: 64px;
                right: 0;
                width: 100%;
                background: #f0f2f5;
                z-index: 100;
            }

            &-content {
                padding-top: 112px;
                z-index: 50;

                &-page {
                    margin: 0 24px 24px 24px;
                    border-radius: 4px;
                    z-index: 100;

                    .ant-card {
                        border-radius: 4px;
                    }
                }
            }

        }

    }
</style>