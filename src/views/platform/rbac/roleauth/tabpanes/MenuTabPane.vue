<template>
    <div class="menu-tab-pane">
        <a-tree
                class="tree"
                :blockNode="true"
                :showIcon="true"
                :checkable="true"
                checkStrictly
                :replaceFields="{key:'id', value: 'id', title: 'title', children: 'children'}"
                :selectedKeys="selectedKeys"
                :checkedKeys="checkedKeys"
                :treeData="treeData"
                :expandedKeys="expandedKeys"
                @check="onCheck"
                @select="onSelect"
                @expand="onExpand">
            <template slot="custom" slot-scope="{ selected, title, icon }">
                <a-icon v-if="icon" :type="icon"/>
                <a-icon v-else type="question-circle"/>
            </template>
        </a-tree>

        <a-descriptions title="菜单详情" size="middle" class="desc" v-if="selectedKeys.length > 0">
            <a-descriptions-item label="菜单编码">
                {{this.selectedMenu.code}}
            </a-descriptions-item>
            <a-descriptions-item label="菜单名称">
                {{this.selectedMenu.title}}
            </a-descriptions-item>
            <a-descriptions-item label="路由path">
                {{this.selectedMenu.path}}
            </a-descriptions-item>
            <a-descriptions-item label="路由name">
                {{this.selectedMenu.name}}
            </a-descriptions-item>
            <a-descriptions-item label="重定向路径">
                {{this.selectedMenu.redirect}}
            </a-descriptions-item>
            <a-descriptions-item label="是否虚菜单">
                {{this.selectedMenu.fake ? '是' : '否'}}
            </a-descriptions-item>
            <a-descriptions-item label="备注">
                {{this.selectedMenu.remark}}
            </a-descriptions-item>
        </a-descriptions>
        <a-empty v-else description="请选择菜单" class="empty"/>
    </div>
</template>

<script>
    import menuService from "@/views/platform/rbac/menu/service"
    import array2Tree from "@/utils/data/array2Tree"
    import {EventBus, REFRESH, SAVE} from '../eventbus'
    import service from "../service"
    import {array2Map} from "@/utils/data"

    export default {
        name: "MenuTabPane",

        props: {
            roleId: {}
        },

        data() {
            return {
                //
                menuMap: null,
                treeData: [], // 树型结构菜单数据
                selectedKeys: [], // 勾选的数据
                checkedKeys: {checked: [], halfChecked: []},
                selectedMenu: {},
                expandedKeys: []
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

            // 勾选时, 勾选所有下级
            checkSub(node, checkedKeys) {
                const children = node.$children
                children.forEach(node => {
                    if (node['checked'] !== undefined) {
                        const key = node['eventKey']
                        if (checkedKeys.checked.indexOf(key) === -1) {
                            checkedKeys.checked.push(key)
                        }
                        this.checkSub(node, checkedKeys)
                    }
                })
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

            onSelect(selectedKeys) {
                this.selectedKeys = selectedKeys
                this.selectedMenu = this.menuMap.get(selectedKeys[0])
            },

            onExpand(expandedKeys) {
                this.expandedKeys = expandedKeys
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
                this.menuMap = array2Map(menus, 'id')
                menus.forEach(menu => {
                    menu.checkable = !menu.fake
                    menu.scopedSlots = {icon: 'custom'}
                })
                this.treeData = array2Tree(menus, {})
            },

            // 查询角色分配的菜单
            async fetchRoleMenu() {
                if (this.roleId) {
                    const rolemenus = await service.fetchRoleMenu(this.roleId)
                    this.checkedKeys.checked = (rolemenus || []).map(rolemenu => rolemenu.menuId)
                    this.expandedKeys = this.checkedKeys.checked
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
                    value && this.refresh()
                } else {
                    this.checkedKeys.checked = []
                }
            }

        }

    }
</script>

<style lang="less" scoped>
    .menu-tab-pane {
        display: flex;
        align-items: stretch;

        .tree {
            width: 400px;
            margin-right: 10px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
        }

        .desc {
            flex: 1;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            padding: 10px;
        }

        .empty {
            margin: auto;
        }

    }
</style>