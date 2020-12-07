<template>
    <a-dropdown :trigger="['click']">
        <span class="header-action-user">
          <a-avatar class="avatar" size="small" :src="avatar"/>
        </span>
        <a-menu slot="overlay" class="header-action-user-wrapper">
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
            <a-menu-item key="3">
                <a>
                    <a-icon type="logout"/>
                    <span>退出登录</span>
                </a>
            </a-menu-item>
        </a-menu>
    </a-dropdown>
</template>

<script>
    export default {
        name: "UserAction",

        data() {
            return {
                nickname: '天野远子',
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
            }
        }
    }
</script>

<style lang="less">
    .header-action-user {
        cursor: pointer;
        padding: 0 12px;
        display: inline-block;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        height: 100%;
        color: #000000a6;

        .avatar {
            color: #1890ff;
            font-size: 16px;
            background: hsla(0, 0%, 100%, 0.85);
            vertical-align: middle;
        }

        vertical-align: initial;
    }

    .header-action-user-wrapper.ant-dropdown-menu {
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