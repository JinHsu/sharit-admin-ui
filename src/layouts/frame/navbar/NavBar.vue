<template>
    <div class="el-navbar">
        <div class="el-navbar-left">
            <ToggleButton @click.native="onClickToggle()"/>
        </div>
        <div class="el-navbar-right">
            <Message/>
            <Settings @click.native="onClickSetting()"/>
        </div>
    </div>
</template>

<script>
    import {frame} from '@/mixins'
    // 左侧
    import ToggleButton from "./togglebutton/ToggleButton"
    //右侧
    import Settings from "./settings/Settings" // 系统设置
    import Message from './message/Message' // 消息中心

    export default {
        name: "NavBar",

        components: {
            ToggleButton,
            Settings, Message
        },

        mixins: [frame],

        methods: {
            // 点击切换按钮
            onClickToggle() {
                this.setCollapsed(!this.collapsed)
                console.log("FrameLayout:collapsed:" + this.collapsed)
            },

            // 点击设置按钮
            onClickSetting() {
                this.setDrawerOpened(true)
            }
        }

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
            display: inline-flex;
            flex-wrap: wrap;
        }
    }
</style>