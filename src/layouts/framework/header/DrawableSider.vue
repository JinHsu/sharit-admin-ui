<template>
    <a-drawer
            placement="left"
            :closable="false"
            :visible="!collapsed"
            @close="onClose"
            :bodyStyle="{padding: 0}"
    >
        <collapsiable-sider/>
    </a-drawer>
</template>

<script>
    import {framework} from '@/mixins'
    import CollapsiableSider from '../sider/CollapsiableSider'

    export default {
        name: "DrawableSider",

        components: {
            CollapsiableSider
        },

        methods: {
            onClose() {
                this.setCollapsed(true)
            }
        },

        mixins: [framework]

    }
</script>

<style lang="less" scoped>

</style>