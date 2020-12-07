<template>
    <div class="header-toggle">
        <a-icon :type="iconType"/>
    </div>
</template>

<script>
    import {framework} from '@/mixins'

    export default {
        name: "ToggleActionWrapper",

        mixins: [framework],

        computed: {
            iconType() {
                return this.collapsed ? 'menu-unfold' : 'menu-fold'
            }
        }

    }
</script>

<style lang="less" scoped>
    .header-toggle {
        font-size: 20px;
        display: inline-block;
        line-height: 64px;
        padding: 0 24px;
        transition: all 0.3s;
        cursor: pointer;

        vertical-align: initial;

        &:hover {
            background: rgba(0, 0, 0, 0.02);
        }
    }
</style>