<template>
    <div class="entry-header">
        <div class="top">
            <a href="#">
                <img class="logo" src="../../../assets/antd.svg" alt="Ant Design">
                <span class="title">{{title}}</span>
            </a>
        </div>
        <div class="desc">
<!--            {{desc}}-->
        </div>
    </div>
</template>

<script>
    import bootstrap from '@/config/bootstrap'

    export default {
        name: "EntryHeader",
        data() {
            return {
                title: bootstrap.name,
                desc: bootstrap.desc
            }
        }
    }
</script>

<style lang="less" scoped>
    .entry-header {
        text-align: center;

        .top {
            height: 50px;
            line-height: 50px;

            .logo {
                height: 44px;
                line-height: 44px;
                vertical-align: top;
                margin-right: 16px;
            }

            .title {
                font-size: 36px;
                color: rgba(0, 0, 0, .85);
                font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
                font-weight: 600;
            }
        }

        .desc {
            margin-top: 10px;
            margin-bottom: 40px;
            color: rgba(0, 0, 0, .45);
        }

    }

</style>