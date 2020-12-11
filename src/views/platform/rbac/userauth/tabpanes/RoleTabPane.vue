<template>
    <a-transfer
            :data-source="roles"
            :target-keys="targetKeys"
            :show-search="true"
            :show-select-all="true"
            :titles="['待选', '已选']"
            :filter-option="filterOption"
            @change="keys => this.targetKeys = keys">

        <template slot="children" slot-scope="{
            props: { direction, filteredItems, selectedKeys, disabled: listDisabled },
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
    import difference from "lodash/difference"
    import roleService from '@/views/platform/rbac/role/service'
    import {arraySort} from "@/utils/data"
    import {EventBus, REFRESH, SAVE} from "../eventbus"
    import service from '../service'
    import columns from '../columns'

    export default {
        name: "RoleTabPane",

        props: {
            userId: {}
        },

        data() {
            return {
                roles: [],
                targetKeys: [],
                columns: columns,
            }
        },

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

            async onSave() {
                if (this.userId) {
                    const data = (this.targetKeys || []).map(roleId => {
                        return {userId: this.userId, roleId}
                    })
                    await service.saveUserRole(this.userId, data)
                    this.$message.success({content: '保存成功！'})
                } else {
                    this.$message.error({content: '请选择用户！'})
                }
            },

            filterOption(inputValue, item) {
                // 按角色编码或名称过滤
                return (item['title'] || '').indexOf(inputValue) > -1 || (item['code'] || '').indexOf(inputValue) > -1
            },

            async onRefresh() {
                if (this.userId) {
                    await this.refresh()
                    this.$message.success({content: '刷新成功！'})
                } else {
                    this.$message.error({content: '请选择用户！'})
                }
            },

            async fetchAllRole() {
                let roles = await roleService.fetchAll()
                roles = arraySort(roles, 'code')
                roles.forEach(role => {
                    const {id, code} = role
                    // 添加transfer组件必须的2个属性：key，title
                    Object.assign(role, {key: id, code})
                })
                this.roles = roles
            },

            // 查询用户分配的角色
            async fetchUserRole() {
                if (this.userId) {
                    const userroles = await service.fetchUserRole(this.userId)
                    this.targetKeys = (userroles || []).map(userrole => userrole.roleId)
                } else {
                    this.targetKeys = []
                }
            },

            async refresh() {
                await this.fetchAllRole()
                await this.fetchUserRole()
            }
        },

        created() {
            this.refresh()
        },

        mounted() {
            EventBus.$on(SAVE, (activeKey, call) => {
                if (activeKey === 'role') {
                    this.onSave().then(() => call())
                }
                call()
            })
            EventBus.$on(REFRESH, (activeKey, call) => {
                if (activeKey === 'role') {
                    this.onRefresh().then(() => call())
                }
                call()
            })
        },

        watch: {
            userId(value) {
                if (value) {
                    value && this.refresh()
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>