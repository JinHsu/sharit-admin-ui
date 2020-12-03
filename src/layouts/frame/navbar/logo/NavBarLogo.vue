<template>
    <div class="el-navbar-logo">
        <img src="../../../../assets/logo2.svg" alt="ElementUI" class="img">
    </div>
</template>

<script>
    export default {
        name: "NavBarLogo"
    }
</script>

<style lang="scss" scoped>
    .el-navbar-logo {
        margin-left: 10px;
        height: 64px;

        .img {
            height: 64px;
            padding: 10px;

            cursor: pointer;
        }

    }
</style>