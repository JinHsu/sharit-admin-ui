<template>
    <div class="el-navbar-toggle">
        <el-icon :name="this.collapsed ? 'indent' : 'outdent'" :size="24"/>
        <DrawerBar v-if="isMobile()"/>
    </div>
</template>

<script>
    import DrawerBar from "@/layouts/frame/drawerbar/DrawerBar"
    import {device, frame} from '@/mixins'

    export default {
        name: "ToggleButton",

        components: {DrawerBar},

        mixins: [device, frame],

        methods: {
            onClick() {
                this.$emit('click')
            }
        }

    }
</script>

<style lang="scss" scoped>
    .el-navbar-toggle {
        font-size: 16px;
        color: #888888;
        width: 64px;
        height: 64px;
        line-height: 64px;

        cursor: pointer;

        &:hover {
            background: #f9f9f9;
        }

        text-align: center;

        svg {
            display: inline-block;
            vertical-align: middle;
        }

    }
</style>