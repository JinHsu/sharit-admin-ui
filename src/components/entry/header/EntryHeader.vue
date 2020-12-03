<template>
    <div class="el-entry-header">
        <div class="el-navbar-logo">
            <a href="#">
                <img src="../../../assets/logo.svg" alt="ElementUI" class="logo">
            </a>
        </div>
        <div class="desc">
            Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库
        </div>
    </div>
</template>

<script>
    export default {
        name: "EntryHeader"
    }
</script>

<style lang="scss" scoped>
    .el-entry-header {
        text-align: center;
        margin: 10px 0 60px 0;


        .el-navbar-logo {
            height: 50px;
            line-height: 50px;

            .logo {
                height: 50px;
                vertical-align: top;
            }
        }

        .desc {
            margin-top: 10px;
            color: #888;
        }
    }
</style>