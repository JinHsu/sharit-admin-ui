<template>
    <div class="rbac-roleauth">
        <a-card :bordered="false" size="small">
            <template slot="title">
                <a-button type="primary" icon="save" @click="onSave" :loading="saving" class="left-button">
                    保存
                </a-button>
                <a-button type="info" icon="reload" @click="onRefresh" :loading="refreshing" class="left-button">
                    刷新
                </a-button>
            </template>
            <template slot="extra">
                <span class="role-refer-required">选择角色</span>
                <role-refer v-model="roleId" class="role-refer"/>
                <a-radio-group
                        default-value="menu"
                        button-style="solid"
                        @change="e => this.activeKey = e.target.value">
                    <a-radio-button value="menu">分配菜单</a-radio-button>
                    <a-radio-button value="user">分配用户</a-radio-button>
                    <a-radio-button value="org">分配组织</a-radio-button>
                </a-radio-group>
            </template>

            <menu-tab-pane v-show="activeKey === 'menu'" :role-id="roleId"/>
            <user-tab-pane v-show="activeKey === 'user'" :role-id="roleId"/>
            <org-tab-pane v-show="activeKey === 'org'" :role-id="roleId"/>
        </a-card>
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
            onSave() {
                if (!this.roleId) {
                    this.$notification.error({message: '错误', description: "请选择角色！"})
                    return
                }
                this.saving = true
                EventBus.$emit(SAVE, this.activeKey, () => this.saving = false)
                this.saving = false
            },

            onRefresh() {
                if (!this.roleId) {
                    this.$notification.error({message: '错误', description: "请选择角色！"})
                    return
                }
                this.refreshing = true
                EventBus.$emit(REFRESH, this.activeKey, () => this.refreshing = false)
            }

        }

    }
</script>

<style lang="less" scoped>
    .rbac-roleauth {
        .left-button {
            margin-right: 8px;
        }

        .role-refer {
            width: 256px;
            margin-right: 8px;


        }

        .role-refer-required {
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