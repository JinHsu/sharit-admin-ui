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
        <sider-header/>
        <!---->
        <a-tree-menu
                mode="inline"
                :theme="themeSider"
                class="ant-layout-framework-sider-menu"/>
    </a-layout-sider>
</template>

<script>
    import {device, framework} from '@/mixins'
    import SiderHeader from "./SiderHeader"

    export default {
        name: "CollapsiableSider",

        components: {
            SiderHeader
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

</style>