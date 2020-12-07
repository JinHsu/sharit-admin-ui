<template>
    <div style="background-color: #fff; padding: 10px; display: flex; flex-direction: column; ">
        <RoleRefer v-model="roleId" style="max-width: 400px;"/>

        <a-tabs :activeKey="activeKey" @change="onTabChange">
            <div slot="tabBarExtraContent">
                <a-button type="primary" icon="save" style="margin-left: 10px;" @click="onSave" :loading="saving">
                    保存
                </a-button>
                <a-button type="info" icon="sync" style="margin-left: 10px;" @click="onRefresh" :loading="refreshing">
                    刷新
                </a-button>
            </div>

            <a-tab-pane key="menu" tab="菜单" force-render>
                <MenuTabPane :role-id="roleId"/>
            </a-tab-pane>
            <a-tab-pane key="user" tab="用户" force-render>
                <UserTabPane :role-id="roleId"/>
            </a-tab-pane>
            <a-tab-pane key="org" tab="组织" force-render disabled>
                <OrgTabPane :role-id="roleId"/>
            </a-tab-pane>
        </a-tabs>

    </div>
</template>

<script>
    import RoleRefer from "@/views/platform/rbac/role/refer";
    import {MenuTabPane, OrgTabPane, UserTabPane} from './tabpanes'
    import {EventBus, REFRESH, SAVE} from './eventbus'

    export default {
        name: "RoleAuth",

        components: {RoleRefer, MenuTabPane, UserTabPane, OrgTabPane},

        data() {
            return {
                //
                roleId: undefined, // 设置为undefined,placeholder才会显示
                roles: [],
                //
                activeKey: 'menu', // 激活的页签
                saving: false,
                refreshing: false,

            }
        },

        methods: {
            onTabChange(activeKey) {
                this.activeKey = activeKey
            },

            onSave() {
                this.saving = true
                EventBus.$emit(SAVE, this.activeKey, () => this.saving = false)
                this.saving = false
            },

            onRefresh() {
                this.refreshing = true
                EventBus.$emit(REFRESH, this.activeKey, () => this.refreshing = false)
            }

        }

    }
</script>

<style lang="less" scoped>


</style>