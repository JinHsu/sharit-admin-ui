<template>
    <div class="header-settings">
        <a-icon type="unordered-list"/>
    </div>
</template>

<script>
    export default {
        name: "SettingsButton"
    }
</script>

<style lang="less" scoped>
    .header-settings {
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