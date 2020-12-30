<template>
    <!--框架整体布局-->
    <a-layout class="framework">
        <!--左侧：侧边栏-->
        <collapsiable-sider v-if="!isMobile()"/>

        <!--右侧-->
        <a-layout class="framework-right" :style="{paddingLeft: siderWidth}">
            <!--头部-->
            <a-layout-header class="framework-right-header" :style="{paddingLeft: siderWidth}">
                <header-control/>
                <header-action/><!--头部右侧action-->
            </a-layout-header>

            <!--多页签栏-->
            <div class="framework-right-multi-tab" :style="{paddingLeft: siderWidth}">
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

        created() {
            this.siderWidth = this.adapt(this.device)
        },

        watch: {
            device(n, o) {
                this.siderWidth = this.adapt(n, o)
            },

            collapsed() {
                this.siderWidth = this.onCollapse(this.device)
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
                    /*z-index: 100;*/

                }
            }

        }

    }
</style>

<style lang="less">

    .framework-right-content-page .ant-card {
        border-radius: 4px;
    }
</style>