<template>
    <div class="el-navbar-toggle">
        <el-icon :name="collapsed ? 'indent' : 'outdent'" :size="24"/>
    </div>
</template>

<script>
    import {device} from '@/mixins'

    export default {
        name: "ToggleButton",

        data() {
            return {
                collapsed: false,
            }
        },
        mixins: [device],

        methods: {

            onToggle(collapsed) {
                this.collapsed = collapsed
                console.log("FrameLayout:collapsed:" + collapsed)
            },

            adapt(n, o) {
                if (n === 'mobile' && o !== undefined) {
                    this.collapsed = false
                }
            }
        },

        mounted() {
            this.$eventBus.$on(this.$events.on_click_toggle, this.onToggle)
        },

        watch: {
            device(n, o) {
                this.adapt(n, o)
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

        &:hover, &:focus {
            background: #f9f9f9;
        }

        text-align: center;

        svg {
            display: inline-block;
            vertical-align: middle;
        }

    }
</style>