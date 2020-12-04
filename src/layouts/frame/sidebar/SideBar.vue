<template>
    <div class="el-sidebar">
        <side-bar-logo/>
        <side-bar-menu/>
    </div>
</template>

<script>
    import SideBarLogo from "./sidebarlogo/SideBarLogo"
    import SideBarMenu from "../sidebarmenu/SideBarMenu"

    export default {
        name: "SideBar",

        components: {SideBarLogo, SideBarMenu}

    }
</script>

<style lang="scss">
    .el-sidebar {
        height: 100vh;

        .el-menu {
            border-right: none;

            .el-menu-item.is-active {
                border-right: 2px solid #409EFF;
                background-color: #ecf5ff;
            }

        }
    }
</style>