<template>
    <div :class="['framework-sider-logo-header', `theme-${themeSider}`]">
        <router-link :to="{path: '#'}">
            <img src="~@/assets/logo.svg" alt="logo" class="img">
            <h1>{{title}}</h1>
        </router-link>
    </div>
</template>

<script>
    import {framework} from '@/mixins'
    import bootstrap from '@/config/bootstrap'

    export default {
        name: "LogoHeader",

        data() {
            return {
                title: bootstrap.name
            }
        },

        mixins: [framework],


    }
</script>

<style lang="less" scoped>
    .framework-sider-logo-header {
        position: relative;
        height: 64px;
        line-height: 64px;
        padding-left: 24px;
        overflow: hidden;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;

        img {
            width: 36px;
            height: 36px;
            display: inline-block;
            margin-top: 12px;
            vertical-align: top;
        }

        h1 {
            color: #fff;
            font-size: 24px;
            margin: 0 0 0 12px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            font-weight: 600;
            display: inline-block;
            vertical-align: top;
        }
    }

    .framework-sider-logo-header.theme-dark {
        background: #002140;
        box-shadow: none;
    }

    .framework-sider-logo-header.theme-light {
        background: #FFFFFF;
        -webkit-box-shadow: 0 1px 0 0 #e8e8e8;
        box-shadow: 0 1px 0 0 #e8e8e8;

        h1 {
            color: unset;
        }
    }
</style>