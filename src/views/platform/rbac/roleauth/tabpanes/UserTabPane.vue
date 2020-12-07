<template>
    <a-transfer
            :data-source="users"
            :target-keys="targetKeys"
            :show-search="true"
            :show-select-all="true"
            :titles="['待选', '已选']"
            :filter-option="(inputValue, item) => {
                // 按用户名或昵称过滤
                return item['username'].indexOf(inputValue) !== -1
                    || item['nickname'].indexOf(inputValue) !== -1
            }"
            @change="onChange"
            style="max-width: 844px;"
    >

        <template slot="children" slot-scope="{
            props: { direction, filteredItems, selectedKeys, disabled: listDisabled },
            on: { itemSelectAll, itemSelect },
        }">
            <a-table rowKey="id" size="small"
                     :data-source="filteredItems"
                     :columns="direction === 'left' ? leftColumns : rightColumns"

                     :row-selection="getRowSelection({
                        disabled: listDisabled,
                        selectedKeys,
                        itemSelectAll,
                        itemSelect
                     })"

                     :custom-row="({key, disabled: itemDisabled}) => ({
                         on: {
                            click: () => {
                                if (itemDisabled || listDisabled) {
                                    return
                                }
                                itemSelect(key, !selectedKeys.includes(key))
                            },
                         },
                     })"
            />
        </template>
    </a-transfer>
</template>

<script>
    import userService from '@/views/platform/rbac/user/service'
    import difference from 'lodash/difference';
    import service from '../service'
    import {EventBus, REFRESH, SAVE} from "@/views/platform/rbac/roleauth/eventbus";

    export default {
        name: "UserTabPane",

        props: {
            roleId: {
                type: String,
                required: true,
                default: ''
            }
        },

        data() {
            return {
                users: [],
                targetKeys: [],

                //
                leftColumns: [
                    {dataIndex: 'username', title: '用户名', width: 150, ellipsis: true},
                    {dataIndex: 'nickname', title: '昵称', ellipsis: true}
                ],
                rightColumns: [
                    {dataIndex: 'username', title: '用户名', width: 150, ellipsis: true},
                    {dataIndex: 'nickname', title: '昵称', ellipsis: true}
                ]
            }
        },

        computed: {},

        methods: {
            // 移动选项事件
            onChange(targetKeys) {
                this.targetKeys = targetKeys
            },

            // 获取表格行选中事件
            getRowSelection({disabled, selectedKeys, itemSelectAll, itemSelect}) {
                return {
                    //
                    getCheckboxProps: item => ({props: {disabled: disabled || item.disabled}}),
                    //
                    onSelectAll(selected, selectedRows) {
                        const treeSelectedKeys = selectedRows
                            .filter(item => !item.disabled)
                            .map(({key}) => key);
                        const diffKeys = selected
                            ? difference(treeSelectedKeys, selectedKeys)
                            : difference(selectedKeys, treeSelectedKeys)
                        itemSelectAll(diffKeys, selected);
                    },
                    //
                    onSelect({key}, selected) {
                        itemSelect(key, selected);
                    },
                    //
                    selectedRowKeys: selectedKeys,
                }
            },

            async onSave() {
                if (this.roleId) {
                    const data = (this.targetKeys || []).map(userId => {
                        return {roleId: this.roleId, userId}
                    })
                    await service.saveRoleUser(this.roleId, data)
                    this.$message.success({content: '保存成功！'})
                } else {
                    this.$message.error({content: '请选择角色！'})
                }
            },

            async onRefresh() {
                if (this.roleId) {
                    await this.refresh()
                    this.$message.success({content: '刷新成功！'})
                } else {
                    this.$message.error({content: '请选择角色！'})
                }
            },

            async fetchAllUser() {
                const params = {page: 0, size: 2147483647, sort: "username,asc"}
                const users = await userService.fetchAllByPage(params)
                users.content.forEach(user => {
                    const {id, username} = user
                    // 添加transfer组件必须的2个属性：key，title
                    Object.assign(user, {key: id, title: username})
                })
                //
                this.users = users.content
            },

            // 查询角色关联的用户
            async fetchRoleUser() {
                if (this.roleId) {
                    const userroles = await service.fetchRoleUser(this.roleId);
                    this.targetKeys = (userroles || []).map(userrole => userrole.userId)
                } else {
                    this.targetKeys = []
                }
            },

            async refresh() {
                await this.fetchAllUser()
                await this.fetchRoleUser()
            }

        },

        created() {
            this.refresh()
        },

        mounted() {
            EventBus.$on(SAVE, (activeKey, call) => {
                if (activeKey === 'user') {
                    this.onSave().then(() => call())
                }
                call()
            })
            EventBus.$on(REFRESH, (activeKey, call) => {
                if (activeKey === 'user') {
                    this.onRefresh().then(() => call())
                }
                call()
            })
        },

        watch: {
            roleId(value) {
                value && this.refresh()
            }
        }
    }
</script>

<style lang="less" scoped>

</style>