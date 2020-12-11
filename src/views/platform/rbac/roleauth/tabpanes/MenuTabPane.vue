<template>
    <div>
        <a-tree
                style="width: 400px;"
                :blockNode="true"
                :showIcon="true"
                :checkable="true"
                checkStrictly
                :replaceFields="{key:'id', value: 'id', title: 'title', children: 'children'}"
                :selectedKeys="selectedKeys"
                :checkedKeys="checkedKeys"
                :treeData="treeData"
                @check="onCheck"
                @select="onSelect">
            <template slot="custom" slot-scope="{ selected, title, icon }">
                <a-icon v-if="icon" :type="icon"/>
                <a-icon v-else type="question-circle"/>
            </template>
        </a-tree>
        <a-descriptions>

        </a-descriptions>
    </div>
</template>

<script>
    import menuService from "@/views/platform/rbac/menu/service"
    import array2Tree from "@/utils/data/array2Tree"
    import {EventBus, REFRESH, SAVE} from '../eventbus'
    import service from "../service"

    export default {
        name: "MenuTabPane",

        props: {
            roleId: {}
        },

        data() {
            return {
                //
                treeData: [], // 树型结构菜单数据
                selectedKeys: [], // 勾选的数据
                checkedKeys: {checked: [], halfChecked: []},
                selectedMenu: {}
            }
        },

        computed: {},

        methods: {
            onCheck(checkedKeys, e) {
                if (e.checked) {
                    this.checkParent(e.node, checkedKeys)
                } else {
                    this.uncheckParent(e.node, checkedKeys)
                }
                this.checkedKeys = checkedKeys
            },

            // 勾选时，默认勾选所有上级
            checkParent(node, checkedKeys) {
                const parent = node.$parent
                if (parent['checked'] === false) {
                    const parentKey = parent['eventKey']
                    if (checkedKeys.checked.indexOf(parentKey) === -1) {
                        checkedKeys.checked.unshift(parentKey)
                    }
                    this.checkParent(parent, checkedKeys)
                }
            },

            // 取消勾勾选且当前同级仅有自身被勾选时，默认也取消勾选上级
            uncheckParent(node, checkedKeys) {
                const parent = node.$parent
                const children = parent.$children
                let count = 0

                children.forEach(node => {
                    if (node.checked) {
                        count++
                    }
                })

                if (count === 1) { // 有且仅有1个
                    const parentKey = parent['eventKey']
                    const index = checkedKeys.checked.indexOf(parentKey)
                    checkedKeys.checked.splice(index, 1)
                    this.uncheckParent(parent, checkedKeys)
                }
            },

            onSelect(selectedKeys, e) {
                this.selectedKeys = selectedKeys
                this.selectedMenu = e
            },

            async onSave() {
                if (this.roleId) {
                    const data = (this.checkedKeys.checked || []).map(menuId => {
                        return {roleId: this.roleId, menuId}
                    })
                    await service.saveRoleMenu(this.roleId, data)
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

            async fetchAllMenus() {
                const menus = await menuService.fetchAll()
                menus.forEach(menu => {
                    menu.disabled = menu.fake
                    menu.scopedSlots = {icon: 'custom'}
                })
                this.treeData = array2Tree(menus, {})
            },

            // 查询角色分配的菜单
            async fetchRoleMenu() {
                if (this.roleId) {
                    const rolemenus = await service.fetchRoleMenu(this.roleId)
                    this.checkedKeys.checked = (rolemenus || []).map(rolemenu => rolemenu.menuId)
                } else {
                    this.checkedKeys.checked = []
                }
            },

            async refresh() {
                await this.fetchAllMenus()
                await this.fetchRoleMenu()
            }
        },

        created() {
            this.refresh()
        },

        mounted() {
            EventBus.$on(SAVE, (activeKey, call) => {
                if (activeKey === 'menu') {
                    this.onSave().then(() => call())
                }
                call()
            })
            EventBus.$on(REFRESH, (activeKey, call) => {
                if (activeKey === 'menu') {
                    this.onRefresh().then(() => call())
                }
                call()
            })
        },

        watch: {
            roleId(value) {
                if (value) {
                    this.refresh()
                } else {
                    this.checkedKeys.checked = []
                }
            }

        }

    }
</script>

<style lang="less" scoped>

</style>