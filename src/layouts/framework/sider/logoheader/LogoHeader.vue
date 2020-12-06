<template>
    <div :class="['ant-layout-framework-logo-header', `theme-${themeSider}`]">
        <router-link :to="{path: '#'}">
            <img src="~@/assets/logo.svg" alt="logo" class="img">
            <h1>{{title}}</h1>
        </router-link>
    </div>
</template>

<script>
    import {framework} from '@/mixins'

    export default {
        name: "LogoHeader",

        data() {
            return {
                title: 'Ant Design Pro'
            }
        },

        mixins: [framework],


    }
</script>

<style lang="less" scoped>
    .ant-layout-framework-logo-header {
        position: relative;
        height: 64px;
        line-height: 64px;
        padding-left: 24px;
        overflow: hidden;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;

        img {
            width: 32px;
            height: 32px;
            display: inline-block;
            vertical-align: middle;
        }

        h1 {
            color: #fff;
            font-size: 20px;
            margin: 0 0 0 12px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            font-weight: 600;
            display: inline-block;
            vertical-align: middle;
        }
    }

    .ant-layout-framework-logo-header.theme-dark {
        background: #002140;
        box-shadow: none;
    }

    .ant-layout-framework-logo-header.theme-light {
        background: #FFFFFF;
        -webkit-box-shadow: 0 1px 0 0 #e8e8e8;
        box-shadow: 0 1px 0 0 #e8e8e8;

        h1 {
            color: unset;
        }
    }
</style>