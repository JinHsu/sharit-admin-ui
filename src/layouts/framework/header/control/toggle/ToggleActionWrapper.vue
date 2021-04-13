<template>
    <div class="header-toggle">
        <a-icon :type="iconType"/>
        <drawable-sider v-if="isMobile()"/><!--手机端侧边栏-->
    </div>
</template>

<script>
    import {device, framework} from '@/mixins'
    import DrawableSider from './DrawableSider'

    export default {
        name: "ToggleActionWrapper",

        components: {DrawableSider},

        mixins: [device, framework],

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