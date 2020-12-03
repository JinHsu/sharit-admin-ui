<template>
    <div class="el-sidebar">
        <side-bar-logo :collapsed="collapsed"/>
        <side-bar-menu :tree-data="treeData" :collapsed="collapsed"/>
    </div>
</template>

<script>
    import SideBarLogo from "./sidebarlogo/SideBarLogo"
    import SideBarMenu from "./sidebarmenu/SideBarMenu.js"
    import menus from './menus'

    export default {
        name: "SideBar",
        props: {
            collapsed: {
                type: Boolean,
                default: false
            }
        },
        components: {SideBarLogo, SideBarMenu},
        data() {
            return {
                treeData: menus,
            }
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