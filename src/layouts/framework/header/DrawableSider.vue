<template>
    <a-drawer
            placement="left"
            :closable="false"
            :visible="!collapsed"
            @close="onClose"
            :class="['framework-drawer-sider', `theme-${themeSider}`]"
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

<style lang="less">
    .framework-drawer-sider {
        .ant-drawer-body {
            padding: 0;
        }
    }

    .framework-drawer-sider.theme-dark {
        .ant-drawer-content {
            background-color: #000000;
        }
    }
</style>