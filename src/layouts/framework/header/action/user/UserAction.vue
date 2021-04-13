<template>
    <a-dropdown :trigger="['click']"
                placement="bottomRight"
                :getPopupContainer="()=>$refs.dropdownRef.parentElement">
        <span class="action" ref="dropdownRef">
            <a-tooltip :title="nickname">
                <a-avatar class="avatar" size="small" icon="user"
                          :src="avatar"/>
            </a-tooltip>
        </span>
        <a-menu slot="overlay" class="action-wrapper">
            <a-menu-item key="0">
                <router-link :to="{ path: 'center' }">
                    <a-icon type="user"/>
                    <span>个人中心</span>
                </router-link>
            </a-menu-item>
            <a-menu-item key="1">
                <router-link :to="{ path: 'settings' }">
                    <a-icon type="setting"/>
                    <span>账户设置</span>
                </router-link>
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item key="3" @click="onLogout">
                <a-icon type="logout"/>
                <span>退出登录</span>
            </a-menu-item>
        </a-menu>
    </a-dropdown>
</template>

<script>
    import {postLogout} from '@/auth/authc'
    import {app} from '@/mixins'
    import {LOGIN_URL} from "@/config/auth"
    import authService from "@/auth/service"
    import {resetRouter} from '@/router'

    export default {
        name: "UserAction",

        data() {
            return {}
        },

        mixins: [app],

        methods: {
            onLogout() {
                this.$confirm({
                    title: '提示',
                    content: '真的要注销登录吗？',
                    onOk: () => this.doLogout()
                })
            },

            async doLogout() {
                await postLogout()
                // 1.跳转到登录页面
                await this.$router.push({path: LOGIN_URL})
                // 2.刷新路由
                resetRouter()
                // window.location.reload()
            }
        },

        created() {
            if (!this.userInfo) {
                authService.fetchUser().then(userInfo => {
                    this.setUserInfo(userInfo)
                })
            }
        },

        watch: {}

    }
</script>

<style lang="less">
    .action {
        cursor: pointer;
        padding: 0 12px;
        display: inline-block;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        height: 100%;
        color: rgba(0, 0, 0, 0.65);

        .avatar {
            font-size: 16px;
            vertical-align: middle;
        }

        vertical-align: initial;
    }

    .action-wrapper.ant-dropdown-menu {
        padding: 4px 0;

        .ant-dropdown-menu-item {
            width: 120px;
        }

        .ant-dropdown-menu-item > .anticon:first-child,
        .ant-dropdown-menu-item > a > .anticon:first-child,
        .ant-dropdown-menu-submenu-title > .anticon:first-child.ant-dropdown-menu-submenu-title > a > .anticon:first-child {
            min-width: 12px;
            margin-right: 8px;
        }
    }
</style>