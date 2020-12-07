<template>
    <a-transfer
            :data-source="roles"
            :target-keys="targetKeys"
            :show-search="true"
            :show-select-all="true"
            :titles="['待选', '已选']"
            :filter-option="(inputValue, item) => {
                // 按用户名或昵称过滤
                return item['title'].indexOf(inputValue) !== -1
                    || item['code'].indexOf(inputValue) !== -1
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
    import roleService from '@/views/platform/rbac/role/service'
    import service from '../service'
    import difference from "lodash/difference";
    import {EventBus, REFRESH, SAVE} from "../eventbus";

    export default {
        name: "RoleTabPane",

        props: {
            userId: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                roles: [],
                targetKeys: [],

                //
                leftColumns: [
                    {dataIndex: 'code', title: '角色编码', width: 150, ellipsis: true},
                    {dataIndex: 'title', title: '角色名称', ellipsis: true}
                ],
                rightColumns: [
                    {dataIndex: 'code', title: '角色编码', width: 150, ellipsis: true},
                    {dataIndex: 'title', title: '角色名称', ellipsis: true}
                ]
            }
        },

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
                if (this.userId) {
                    const data = (this.targetKeys || []).map(roleId => {
                        return {userId: this.userId, roleId}
                    })
                    await service.saveUserRole(this.userId, data)
                    this.$message.success({content: '保存成功！'})
                } else {
                    this.$message.error({content: '请选择角色！'})
                }
            },

            async onRefresh() {
                if (this.userId) {
                    await this.refresh()
                    this.$message.success({content: '刷新成功！'})
                } else {
                    this.$message.error({content: '请选择角色！'})
                }
            },

            async fetchAllRole() {
                const params = {page: 0, size: 2147483647, sort: "code,asc"}
                const roles = await roleService.fetchAllByPage(params);

                (roles.content || []).forEach(role => {
                    const {id, code} = role
                    // 添加transfer组件必须的2个属性：key，title
                    Object.assign(role, {key: id, code})
                })

                this.roles = roles.content
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