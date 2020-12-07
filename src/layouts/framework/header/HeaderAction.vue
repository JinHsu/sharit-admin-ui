<template>
    <div class="framework-right-header-action">
        <notice-action/><!--系统通知-->
        <setting-action/><!--系统设置-->
        <setting-action-drawer/>
        <user-action/><!--用户设置-->
    </div>
</template>

<script>
    import {NoticeAction, SettingAction, SettingActionDrawer, UserAction} from './action'

    export default {
        name: "HeaderAction",
        components: {
            NoticeAction, SettingAction, SettingActionDrawer, UserAction
        }
    }
</script>

<style lang="less" scoped>
    .framework-right-header-action {
        float: right;
    }
</style>