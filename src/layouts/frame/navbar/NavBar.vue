<template>
    <div class="el-navbar">
        <div class="el-navbar-left">
            <NavBarLogo v-if="showLogo"/>
            <ToggleButton/>
        </div>
        <div class="el-navbar-right">
            <Settings/>
        </div>
    </div>
</template>

<script>
    // 左侧
    import NavBarLogo from "./logo/NavBarLogo"
    import ToggleButton from "./togglebutton/ToggleButton"
    //右侧
    import Settings from "./settings/Settings"


    export default {
        name: "NavBar",
        props: {
            showLogo: {
                type: Boolean,
                default: true
            }
        },
        components: {NavBarLogo, ToggleButton, Settings},
        data() {
            return {}
        },
        mixins: [],
        computed: {},
        methods: {},
        created() {
        },
        mounted() {
        },
        watch: {}
    }
</script>

<style lang="scss" scoped>
    .el-navbar {
        height: 100%;
        width: 100%;

        .el-navbar-left {
            display: inline-flex;
            flex-wrap: wrap;
            height: 64px;
            line-height: 64px;
        }

        .el-navbar-right {
            float: right;
            height: 64px;
            line-height: 64px;
        }
    }
</style>