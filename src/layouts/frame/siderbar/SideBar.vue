<template>
    <div class="el-sidebar">
        <side-bar-logo/>
        <side-bar-menu/>
    </div>
</template>

<script>
    import SideBarLogo from "./sidebarlogo/SideBarLogo"
    import SideBarMenu from "./sidebarmenu/SideBarMenu"

    export default {
        name: "SideBar",
        props: {},
        components: {SideBarLogo, SideBarMenu},
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
    .el-sidebar {
        height: 100vh;
        background-color: #001529;
    }
</style>