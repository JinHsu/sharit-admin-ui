<template>
    <div class="el-navbar-toggle">
        <i :class="collapsed ? 'el-icon-s-unfold': 'el-icon-s-fold'" @click="toggle()"></i>
    </div>
</template>

<script>
    import {device} from '@/mixins'

    export default {
        name: "ToggleButton",
        props: {},
        components: {},
        data() {
            return {
                collapsed: false,
            }
        },
        mixins: [device],
        computed: {},
        methods: {
            toggle() {
                this.collapsed = !this.collapsed
                this.$eventBus.$emit(this.$events.on_toggle, this.collapsed)
            },

            onToggle(collapsed) {
                this.collapsed = collapsed
                const event = document.createEvent('HTMLEvents')
                event.initEvent('resize', true, true)
                event.eventType = 'message'
                window.dispatchEvent(event)
                console.log("FrameLayout:collapsed:" + collapsed)
            },

            adapt(n, o) {
                if (n === 'mobile' && o !== undefined) {
                    this.collapsed = false
                }
            }
        },
        created() {
        },
        mounted() {
            this.$eventBus.$on(this.$events.on_toggle, this.onToggle)
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

        &:hover {
            background: #f9f9f9;
        }

        > i {
            padding: 20px;
        }

    }
</style>