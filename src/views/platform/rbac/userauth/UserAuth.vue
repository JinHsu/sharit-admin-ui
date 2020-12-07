<template>
    <div style="background-color: #fff; padding: 10px; display: flex; flex-direction: column; ">
        <UserRefer style="max-width: 400px;" v-model="userId"/>

        <a-tabs :activeKey="activeKey" @change="onTabChange">
            <div slot="tabBarExtraContent">
                <a-button type="primary" icon="save" style="margin-left: 10px;" @click="onSave" :loading="saving">
                    保存
                </a-button>
                <a-button type="info" icon="sync" style="margin-left: 10px;" @click="onRefresh" :loading="refreshing">
                    刷新
                </a-button>
            </div>

            <a-tab-pane key="role" tab="角色" force-render>
                <RoleTabPane :user-id="userId"/>
            </a-tab-pane>
            <a-tab-pane key="org" tab="组织" force-render disabled>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import {RoleTabPane} from './tabpanes'
    import UserRefer from '../user/refer'
    import {EventBus, REFRESH, SAVE} from "./eventbus";

    export default {
        name: "UserAuth",

        components: {RoleTabPane, UserRefer},

        data() {
            return {
                userId: '',
                activeKey: 'role',
                saving: false,
                refreshing: false
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

<style scoped>

</style>