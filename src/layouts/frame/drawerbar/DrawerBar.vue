<template>
    <el-drawer
            direction="ltr" size="240px"
            :visible="!collapsed" :show-close="false" :modal="true"
            :append-to-body="true" :withHeader="false"
            @close="onClose">
        <side-bar-logo/>
        <side-bar-menu/>
    </el-drawer>
</template>

<script>
    import SideBarLogo from "@/layouts/frame/sidebar/sidebarlogo/SideBarLogo"
    import SideBarMenu from "../sidebarmenu/SideBarMenu"
    import {frame} from '@/mixins'

    export default {
        name: "DrawerBar",

        components: {SideBarLogo, SideBarMenu},

        mixins: [frame],

        methods: {
            onClose() {
                this.setCollapsed(true)
            }
        },

        created() {
            this.setCollapsed(true)
        }

    }
</script>

<style lang="scss" scoped>

</style>