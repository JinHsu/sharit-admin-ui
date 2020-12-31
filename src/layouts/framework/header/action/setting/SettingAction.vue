<template>
    <div class="action" @click="onClick">
        <a-icon type="unordered-list"/>
        <setting-action-drawer/>
    </div>
</template>

<script>
    import SettingActionDrawer from './SettingActionDrawer'
    import {framework} from '@/mixins'

    export default {
        name: "SettingActionWrapper", // 设置按钮

        components: {SettingActionDrawer},

        mixins: [framework],

        methods: {
            onClick() {
                this.setDrawerOpened(true)
            }
        }
    }
</script>

<style lang="less" scoped>
    .action {
        display: inline-block;
        line-height: 64px;
        padding: 0 12px;
        transition: all 0.3s;
        cursor: pointer;

        vertical-align: initial;

        &:hover {
            background: rgba(0, 0, 0, 0.02);
        }

    }
</style>