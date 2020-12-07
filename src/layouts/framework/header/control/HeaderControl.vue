<template>
    <div class="framework-right-header-left">
        <toggle-action/><!--侧边栏切换按钮-->
        <bread-crumb-tab v-if="!isMobile()"/><!--面包屑-->
    </div>
</template>

<script>
    import {device} from '@/mixins'
    import ToggleAction from './toggle'
    import BreadCrumbTab from "./breadcrumb";

    export default {
        name: "HeaderControl",

        components: {
            ToggleAction, BreadCrumbTab
        },

        mixins: [device]

    }
</script>

<style lang="less" scoped>
    .framework-right-header-left {
        display: inline-flex;
    }
</style>