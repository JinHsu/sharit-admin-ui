<template>
    <div class="el-navbar-message">
        <el-popover :width="300" placement="top-end">
            <MessageContentPane/>
            <div slot="reference">
                <el-icon name="bell" :size="20"/>
            </div>
        </el-popover>
    </div>
</template>

<script>
    import MessageContentPane from "./MessageContentPane"

    export default {
        name: "Message",

        components: {MessageContentPane},

        data() {
            return {}
        }
    }
</script>

<style lang="scss">
    .el-navbar-message {
        font-size: 16px;
        color: #888888;
        width: 60px;
        height: 64px;
        line-height: 64px;

        cursor: pointer;

        &:hover {
            background: #f9f9f9;
        }

        text-align: center;

        svg {
            display: inline-block;
            vertical-align: middle;
        }

    }
</style>