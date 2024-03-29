<template>
    <a-transfer
            :data-source="users"
            :target-keys="targetKeys"
            :show-search="true"
            :show-select-all="true"
            :titles="['待选', '已选']"
            :filter-option="filterOption"
            @change="keys => this.targetKeys = keys">

        <template slot="children" slot-scope="{
            props: { filteredItems, selectedKeys, disabled: listDisabled },
            on: { itemSelectAll, itemSelect }  }">

            <a-table rowKey="id" size="small"
                     :data-source="filteredItems"
                     :columns="columns"
                     :row-selection="getRowSelection({ disabled: listDisabled, selectedKeys, itemSelectAll, itemSelect})"
                     :custom-row="({key, disabled: itemDisabled}) => ({
                         on:
                         {
                            click: () => {
                                if (itemDisabled || listDisabled) { return }
                                itemSelect(key, !selectedKeys.includes(key))
                            }
                         }
                     })"
            />
        </template>
    </a-transfer>
</template>

<script>
    import difference from 'lodash/difference'
    import userService from '@/views/platform/rbac/user/service'
    import {EventBus, REFRESH, SAVE} from "../eventbus"
    import service from '../service'
    import columns from '../columns'
    import {arraySort} from "@/utils/data";

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
                columns: columns
            }
        },

        computed: {},

        methods: {
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

            filterOption(inputValue, item) {
                // 按用户名或昵称过滤
                return (item['username'] || '').indexOf(inputValue) > -1 || (item['nickname'] || '').indexOf(inputValue) > -1
            },
            async onSave() {
                const data = (this.targetKeys || []).map(userId => {
                    return {roleId: this.roleId, userId}
                })
                await service.saveRoleUser(this.roleId, data)
                this.$message.success({content: '保存成功！'})
            },

            async onRefresh() {
                await this.refresh()
                this.$message.success({content: '刷新成功！'})
            },

            async fetchAllUser() {
                let users = await userService.fetchAll()
                users = arraySort(users, 'username')
                users.forEach(user => {
                    const {id, username} = user
                    // 添加transfer组件必须的2个属性：key，title
                    Object.assign(user, {key: id, title: username})
                })
                //
                this.users = users
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
                await Promise.all([this.fetchAllUser(), this.fetchRoleUser()])
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