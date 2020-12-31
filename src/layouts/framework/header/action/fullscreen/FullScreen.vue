<template>
    <div class="action" @click="fullScreen">
        <a-icon :type="isFullScreen ? 'fullscreen-exit' : 'fullscreen'"/> <!---->
    </div>
</template>

<script>
    import screenfull from "screenfull"

    export default {
        name: "FullScreen",

        data() {
            return {
                isFullScreen: false
            }
        },

        methods: {
            fullScreen() {
                screenfull.toggle()
                this.isFullScreen = !this.isFullScreen
            }
        }
    }
</script>

<style lang="less" scoped>
    .action {
        display: inline-block;
        padding: 0 8px;
        transition: all 0.3s;
        cursor: pointer;

        &:hover {
            background: rgba(0, 0, 0, 0.02);
        }

        i {
            font-size: 16px;
            padding: 4px;
        }
    }
</style>