<template>
    <div class="framework-right-header-action">
        <notice-action/><!--系统通知-->
        <setting-action/><!--系统设置-->
        <user-action/><!--用户设置-->
    </div>
</template>

<script>
    import NoticeAction from './notice'
    import SettingAction from './setting'
    import UserAction from './user'

    export default {
        name: "HeaderAction",
        components: {
            NoticeAction, SettingAction, UserAction
        }
    }
</script>

<style lang="less" scoped>
    .framework-right-header-action {
        float: right;
    }
</style>