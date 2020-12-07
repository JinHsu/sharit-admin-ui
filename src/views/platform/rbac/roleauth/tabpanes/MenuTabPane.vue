<template>
    <div>
        <!--<a-input-search
                style="margin-bottom: 10px; max-width: 400px;"
                placeholder="搜索菜单"
                @change="onChange"/>-->
        <a-tree
                :treeData="menus"
                :checkedKeys="checkedKeys"
                :replaceFields=replaceFields
                :checkable="true"
                :show-icon="true"
                checkStrictly
                @check="checkedKeys => this.checkedKeys = checkedKeys"
        >
            <template slot="custom" slot-scope="{ selected, title, icon }">
                <a-icon v-if="icon" :type="icon"/>
                <a-icon v-else type="question-circle"/>
            </template>
        </a-tree>
    </div>
</template>

<script>
    import menuService from "@/views/platform/rbac/menu/service";
    import service from "@/views/platform/rbac/roleauth/service";
    import {array2Tree} from "@/utils/data";
    import {EventBus, REFRESH, SAVE} from '../eventbus'

    export default {
        name: "MenuTabPane",

        props: {
            roleId: {
                type: String,
                required: true,
                default: ''
            }
        },

        data() {
            return {
                //
                menus: [],
                replaceFields: {key: 'id', title: 'title', children: 'children'},
                checkedKeys: []
            }
        },

        methods: {
            onChange() {

            },

            async onSave() {
                if (this.roleId) {
                    const data = (this.checkedKeys || []).map(menuId => {
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
                const menus = await menuService.fetchAll();
                // 添加scopedSlots属性
                (menus || []).forEach(menu => {
                    menu.scopedSlots = {icon: 'custom'}
                })
                this.menus = array2Tree(menus, {})
            },

            // 查询角色分配的菜单
            async fetchRoleMenu() {
                if (this.roleId) {
                    const rolemenus = await service.fetchRoleMenu(this.roleId);
                    this.checkedKeys = (rolemenus || []).map(rolemenu => rolemenu.menuId)
                } else {
                    this.checkedKeys = []
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
                    this.checkedKeys = []
                }
            }

        }

    }
</script>

<style scoped>

</style>