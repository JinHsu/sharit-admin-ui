<template>
    <div class="el-sidebar-logo">
        <img v-show="collapsed" src="~@/assets/logo2.svg" alt="ElementUI" class="img">
        <img v-show="!collapsed" src="~@/assets/logo.svg" alt="ElementUI" class="img">
    </div>
</template>

<script>
    import {device} from '@/mixins'

    export default {
        name: "SideBarLogo",
        components: {},
        mixins: [device],

        data() {
            return {
                collapsed: false
            }
        },

        methods: {
            onToggle(collapsed) {
                this.collapsed = collapsed
            }
        },

        mounted() {
            this.$eventBus.$on(this.$events.on_toggle, this.onToggle)
        }
    }
</script>

<style lang="scss" scoped>
    .el-sidebar-logo {
        width: 100%;
        height: 64px;
        line-height: 64px;

        .img {
            height: 64px;
            line-height: 64px;
            margin: auto;
            display: grid;
            padding: 10px;

            cursor: pointer;
        }

    }
</style>