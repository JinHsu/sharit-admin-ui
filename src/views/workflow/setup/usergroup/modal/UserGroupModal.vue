<template>
    <a-modal :visible="value" title="分配用户" :maskClosable="false" :width="900"
             @cancel="onCancel">
        <template slot="footer">
            <a-button icon="undo" @click="onCancel">取消</a-button>
            <a-button type="primary" icon="save" :loading="loading" @click="onSave">保存</a-button>
        </template>

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
    </a-modal>
</template>

<script>
    import difference from "lodash/difference"
    import {arraySort} from "@/utils/data"
    import userService from "@/views/platform/rbac/user/service"
    import columns from "../columns"
    import service from "../service"

    export default {
        name: "UserGroupModal",
        components: {},
        props: {
            value: {
                type: Boolean,
                default: false
            },
            groupId: {
                type: String,
                required: false
            }
        },
        data() {
            return {
                loading: false,
                users: [],
                targetKeys: [],
                columns: columns
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

            filterOption(inputValue, item) {
                // 按用户名或昵称过滤
                return (item['username'] || '').indexOf(inputValue) > -1 || (item['nickname'] || '').indexOf(inputValue) > -1
            },
            async onSave() {
                this.loading = true
                const data = (this.targetKeys || []).map(userId => {
                    return {groupId: this.groupId, userId}
                })
                await service.saveUserGroup(this.groupId, data)
                this.$message.success({content: '保存成功！'})
                this.loading = false
                this.$emit('input', false)
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

            // 查询
            async fetchUserGroup() {
                if (this.groupId) {
                    const usergroups = await service.fetchUserGroup(this.groupId);
                    this.targetKeys = (usergroups || []).map(usergroup => usergroup.userId)
                } else {
                    this.targetKeys = []
                }
            },

            onCancel() {
                this.$emit('input', false)
            }

        },

        watch: {
            value(visible) {
                if (visible) {
                    this.fetchAllUser()
                    this.fetchUserGroup()
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>