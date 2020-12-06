<template>
    <a-icon class="header-toggle" :type="iconType" @click="onToggle"/>
</template>

<script>
        import {device, framework} from '@/mixins'

        export default {
        name: "ToggleButton",

        mixins: [device, framework],

        computed: {
            iconType() {
                return this.collapsed ? 'menu-unfold' : 'menu-fold'
            }
        },

        methods: {
            onToggle() {
                this.setCollapsed(!this.collapsed)
            }
        }

    }
</script>

<style lang="less" scoped>
    .header-toggle {
        font-size: 20px;
        padding: 0 24px;
        line-height: 64px;
        cursor: pointer;
        -webkit-transition: color 0.3s;
        transition: color 0.3s;

        vertical-align: initial;

        &:hover {
            background: rgba(0, 0, 0, 0.02);
        }
    }
</style>