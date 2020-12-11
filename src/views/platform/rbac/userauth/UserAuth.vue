<template>
    <div class="rbac-userauth">
        <a-card :bordered="false" size="small">
            <template slot="title">
                <a-button type="primary" icon="save" @click="onSave" :loading="refreshing" class="left-button">
                    保存
                </a-button>
                <a-button icon="reload" @click="onRefresh" :loading="refreshing" class="left-button">
                    刷新
                </a-button>
            </template>
            <template slot="extra">
                <span class="user-refer-required">选择用户</span>
                <user-refer v-model="userId" class="user-refer"/>
                <a-radio-group
                        default-value="role"
                        button-style="solid"
                        @change="e => this.activeKey = e.target.value">
                    <a-radio-button value="role">分配角色</a-radio-button>
                    <a-radio-button value="org">分配组织</a-radio-button>
                </a-radio-group>
            </template>


            <role-tab-pane v-show="activeKey === 'role'" :user-id="userId"/>
            <div v-show="activeKey === 'org'">
                分配组织
            </div>
        </a-card>
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
                userId: undefined, // 设置为undefined,placeholder才会显示
                tabList: [{key: 'role', tab: '角色'}, {key: 'org', tab: '组织'}],
                activeKey: 'role',
                saving: false,
                refreshing: false
            }
        },


        methods: {
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
    .rbac-userauth {
        .left-button {
            margin-right: 8px;
        }

        .user-refer {
            width: 256px;
            margin-right: 8px;
        }

        .user-refer-required {
            &::before {
                display: inline-block;
                margin-right: 4px;
                color: #f5222d;
                font-size: 14px;
                font-family: SimSun, sans-serif;
                line-height: 1;
                content: '*';
            }

            &::after {
                content: ':';
                position: relative;
                top: -0.5px;
                margin: 0 8px 0 2px;
            }
        }
    }
</style>