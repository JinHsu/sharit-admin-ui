<template>
    <div class="header-action-setting">
        <a-icon type="unordered-list"/>
        <setting-action-drawer/>
    </div>
</template>

<script>
    import SettingActionDrawer from './SettingActionDrawer'

    export default {
        name: "SettingActionWrapper", // 设置按钮
        components: {SettingActionDrawer}
    }
</script>

<style lang="less" scoped>
    .header-action-setting {
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