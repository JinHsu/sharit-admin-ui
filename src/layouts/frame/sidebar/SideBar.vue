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
    .el-sidebar, .el-drawer {
        /*height: 100vh;*/

        .el-menu {
            border-right: none;

            .el-menu-item {


                &:hover {
                    /*background: #409EFF;*/
                }

                &.is-active {
                    /*background: #409EFF;*/
                    border-right: 2px solid #409EFF;
                }

            }

            .el-submenu__title:hover, .el-submenu__title.is-active {
                /*background: #409EFF;*/
            }

        }
    }
</style>