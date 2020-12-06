<template>
    <a-layout-sider
            width="256px"
            collapsed-width="80px"
            :collapsible="true"
            :collapsed="collapsed"
            :trigger="null"
            @collapse="onCollapse"
            :class="['ant-layout-framework-sider', `theme-${themeSider}`]"
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
        top: 0;
        height: 100%;
        z-index: 106;

        &-menu {
            height: calc(100% - 64px); // 减去Logo栏的高度
            padding: 16px 0;
            border-right: none;

            transition: background .3s, width .2s;

            &:hover {
                overflow: auto; // 鼠标进入才显示滚动条
            }
        }
    }

    // 黑色主题阴影
    .ant-layout-framework-sider.theme-dark {
        -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
        box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    }

    .ant-layout-framework-sider.theme-light {
        background: #ffffff;
        -webkit-box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
        box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
        border-right: none;
    }
</style>