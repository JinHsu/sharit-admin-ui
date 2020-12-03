<template>
    <div class="el-navbar-settings">
        <i class="el-icon-setting" @click="showDrawer()"></i>
        <SettingsDrawer v-model="drawerVisible"/>
    </div>
</template>

<script>
    import SettingsDrawer from "./drawer/SettingsDrawer"

    export default {
        name: "Settings",
        props: {},
        components: {SettingsDrawer},
        data() {
            return {
                drawerVisible: false
            }
        },
        mixins: [],
        computed: {},
        methods: {
            showDrawer() {
                this.drawerVisible = true
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {}
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
        padding: 0 10px;
        text-align: center;

        &:hover {
            background: #f9f9f9;
        }


    }
</style>