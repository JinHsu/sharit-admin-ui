<template>
    <div class="el-navbar-settings">
        <el-icon name="setting" :size="20"/>
        <SettingsDrawer/>
    </div>
</template>

<script>
    import SettingsDrawer from "./drawer/SettingsDrawer"

    export default {
        name: "Settings",
        components: {SettingsDrawer}
    }
</script>

<style lang="scss" scoped>
    .el-navbar-settings {
        font-size: 16px;
        color: #888888;
        width: 40px;
        height: 64px;
        line-height: 64px;

        cursor: pointer;

        &:hover {
            background: #f9f9f9;
        }

        text-align: center;

        svg {
            display: inline-block;
            vertical-align: middle;
        }
    }
</style>