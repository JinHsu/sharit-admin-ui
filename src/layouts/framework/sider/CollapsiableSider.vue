<template>
    <a-layout-sider
            width="256px"
            collapsed-width="80px"
            :collapsible="true"
            :collapsed="collapsed"
            :trigger="null"
            @collapse="onCollapse"
            class="ant-layout-framework-sider"
    >
        <!--top-->
        <logo-header/>
        <!---->
        <a-tree-menu
                mode="inline"
                :theme="themeSider"
                :collapsed="collapsed"
                class="ant-layout-framework-sider-menu"/>
    </a-layout-sider>
</template>

<script>
    import {device, framework} from '@/mixins'
    import LogoHeader from "@/layouts/framework/sider/logoheader/LogoHeader"

    export default {
        name: "CollapsiableSider",

        components: {
            LogoHeader
        },

        mixins: [device, framework],

        methods: {
            onCollapse(collapsed) {
                this.setCollapsed(collapsed)
            }
        }

    }
</script>

<style lang="less" scoped>
    .ant-layout-framework-sider {
        position: fixed; // 固定
        left: 0;
        height: 100%;
        z-index: 1000;

        // 边框阴影
        -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
        box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

        &-menu {
            height: calc(100% - 64px); // 减去Logo栏的高度

            &:hover {
                overflow: auto; // 鼠标进入才显示滚动条
            }
        }
    }
</style>