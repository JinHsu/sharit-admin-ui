<template>
    <div class="el-sidebar-logo">
        <div class="el-sidebar-logo-img">
            <ElIcon name="logo-ele" :size="48" color="#409EFF"/>
        </div>
        <span v-show="!collapsed" class="el-sidebar-logo-text">
            ElementUI
        </span>
    </div>
</template>

<script>
    import {device} from '@/mixins'
    import ElIcon from "@/components/iconfont/ElIcon"

    export default {
        name: "SideBarLogo",

        components: {ElIcon},

        props: {
            collapsed: {
                type: Boolean,
                default: false
            }
        },

        mixins: [device]

    }
</script>

<style lang="scss" scoped>
    .el-sidebar-logo {
        height: 64px;
        line-height: 64px;

        display: inline-flex;

        &-img {
            height: 64px;
            width: 64px;
            text-align: center;

            svg {
                display: inline-block;
                vertical-align: middle;
            }
        }

        &-text {
            height: 64px;
            line-height: 64px;
            font-size: 24px;
            color: #409EFF;
            font-weight: 600;
        }

    }
</style>