<template>
    <div class="entry-header">
        <div class="top">
            <a href="#">
                <img class="logo" src="../../../assets/logo.svg" alt="Ant Design">
                <span class="title">Ant Design</span>
            </a>
        </div>
        <div class="desc">
            Ant Design 是西湖区最具影响力的 Web 设计规范
        </div>
    </div>
</template>

<script>
    export default {
        name: "EntryHeader"
    }
</script>

<style lang="less" scoped>
    .entry-header {
        text-align: center;

        .top {
            height: 50px;
            line-height: 50px;

            .logo {
                height: 50px;
                vertical-align: top;
                margin-right: 16px;
            }

            .title {
                font-size: 36px;
                color: rgba(0, 0, 0, .85);
                font-weight: 600;
                position: relative;
            }
        }

        .desc {
            margin-top: 10px;
            margin-bottom: 40px;
            color: rgba(0, 0, 0, .45);
        }

    }

</style>