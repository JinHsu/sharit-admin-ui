<template>
    <a-card :bordered="false" :bodyStyle="{ padding: '10px' }">
        <a-tabs default-active-key="basic">
            <template v-for="tab in tabs">
                <a-tab-pane :key="tab.key" :disabled="tab.disabled" forceRender>
                    <span slot="tab">{{tab.title}}</span>
                    <div class="settings-info-right">
                        <component :is="tab.component"/>
                    </div>
                </a-tab-pane>
            </template>
        </a-tabs>
    </a-card>
</template>

<script>
    import BasicSetting from "./basic"
    import AccountSetting from './account'
    import SecuritySetting from './security'

    export default {
        name: 'Settings',

        components: {
            'basic': BasicSetting, 'security': SecuritySetting, 'account': AccountSetting,
        },

        data() {
            return {
                tabs: [
                    {key: 'basic', title: '基础信息', component: 'basic'},
                    {key: 'security', title: '安全设置', component: 'security', disabled: true},
                    {key: 'account', title: '账号关联', component: 'account', disabled: true}
                ]
            }
        }

    }
</script>

<style lang="less" scoped>
    .settings-info-right {
        /*display: table;*/
        margin: auto;
    }
</style>
