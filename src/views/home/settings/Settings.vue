<template>
    <div class="page-header-index-wide">
        <a-card :bordered="false"
                :bodyStyle="{ padding: '16px 0', height: '100%' }"
                :style="{ height: '100%' }">
            <a-tabs
                    default-active-key="basic"
                    :tabBarStyle="{textAlign: 'left'}"
                    :tab-position="isMobile() ? 'top' : 'left'"
                    :tabBarGutter=" isMobile() ? 0 : 16 ">

                <template v-for="tab in tabs">
                    <a-tab-pane :key="tab.key" forceRender>
                        <span slot="tab">{{tab.title}}</span>
                        <div class="settings-info-right">
                            <component :is="tab.component"/>
                        </div>
                    </a-tab-pane>
                </template>

            </a-tabs>
        </a-card>
    </div>
</template>

<script>
    import {device} from '@/mixins'
    import BasicSetting from "./basic";
    import AvatarSetting from "./avatar"
    import AccountSetting from './account'
    import SecuritySetting from './security'

    export default {
        name: 'Settings',

        components: {
            'avatar': AvatarSetting,
            'basic': BasicSetting,
            'security': SecuritySetting,
            'account': AccountSetting,
        },

        props: {},

        data() {
            return {
                tabs: [
                    {key: 'avatar', title: '头像', component: 'avatar'},
                    {key: 'basic', title: '基础信息', component: 'basic'},
                    {key: 'security', title: '安全设置', component: 'security'},
                    {key: 'account', title: '账号绑定', component: 'account'},
                ],
            }
        },

        mixins: [device],

        methods: {},

        mounted() {

        },

        watch: {}
    }
</script>

<style lang="less" scoped>
    .settings-info-right {
        flex: 1 1;
        padding: 0 20px;

        .settings-info-title {
            color: rgba(0, 0, 0, .85);
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
            margin-bottom: 12px;
        }
    }

</style>

<style lang="less">
    .ant-tabs .ant-tabs-left-bar {
        min-width: 160px;
    }
</style>
