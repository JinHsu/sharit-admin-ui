<template>
    <div class="rbac-buttonauth">
        <div class="content">
            <a-card :bordered="false" size="small" :bodyStyle="{width: '300px'}" class="left">
                <a-input-search placeholder="搜索菜单" class="page-search"/>
                <a-directory-tree
                        class="tree"
                        :blockNode="true"
                        :showIcon="false"
                        :replaceFields="{key:'id', value: 'id', title: 'title', children: 'children'}"
                        :selectedKeys="selectedKeys"
                        :treeData="treeData"
                        @select="onSelect">
                </a-directory-tree>
            </a-card>

            <a-card :bordered="false" size="small" class="right">
                <template slot="title">
                    <a-button type="primary" icon="save" @click="onSave" class="left-button">保存</a-button>
                    <a-button icon="reload" :loading="isLoading" @click="doRefresh">刷新</a-button>
                </template>

                <div v-if="pageId">
                    <a-descriptions title="关联页面" size="middle" class="desc">
                        <a-descriptions-item label="页面编码">
                            {{this.selectedPage.code}}
                        </a-descriptions-item>
                        <a-descriptions-item label="页面名称">
                            {{this.selectedPage.title}}
                        </a-descriptions-item>
                        <a-descriptions-item label="组件路径">
                            {{this.selectedPage.component}}
                        </a-descriptions-item>
                        <a-descriptions-item label="是否启用按钮权限">
                            {{this.selectedPage.usePerm ? '是' : '否'}}
                        </a-descriptions-item>
                        <a-descriptions-item label="备注">
                            {{this.selectedPage.remark}}
                        </a-descriptions-item>
                    </a-descriptions>

                    <a-divider :dashed="true">页面按钮</a-divider>
                    <div v-if="!disabled">
                        <a-checkbox class="button-check-all" :indeterminate="indeterminate" :checked="checkAll"
                                    :disabled="disabled"
                                    @change="onCheckAllChange">全选
                        </a-checkbox>
                        <a-checkbox-group :disabled="disabled" v-model="checkedList" :options="options"
                        />
                    </div>
                    <a-empty v-else/>
                </div>
                <a-empty v-else description="请选择菜单"/>
            </a-card>
        </div>
    </div>
</template>

<script>
    import menuService from "@/views/platform/rbac/menu/service"
    import pageService from '@/views/platform/rbac/page/service'
    import buttonService from '@/views/platform/rbac/button/service'
    import {array2Map, array2Tree, arraySort} from "@/utils/data"
    import service from './service'

    export default {
        name: "ButtonAuth",

        components: {},

        data() {
            return {
                menuMap: null,
                selectedPage: {},
                selectedKeys: [],
                treeData: [],

                // 该页面下的所有按钮
                options: [],

                //
                isLoading: false,

                //
                checkedList: [],
            }
        },

        computed: {
            pageId() {
                if (this.selectedKeys.length === 0) {
                    return null
                }
                const menuId = this.selectedKeys[0]
                const menu = this.menuMap.get(menuId)
                return menu ? menu.pageId : null
            },
            disabled() {
                return this.selectedPage ? !this.selectedPage.usePerm : true
            },
            optionList() {
                return this.options.map(option => option.value)
            },

            indeterminate() {
                return !!this.checkedList.length && this.checkedList.length < this.options.length
            },

            checkAll() {
                return this.checkedList.length === this.options.length
            }

        },

        methods: {
            onCheckAllChange(e) {
                Object.assign(this, {
                    checkedList: e.target.checked ? this.optionList : [],
                })
            },

            onSelect(selectedKeys) {
                this.selectedKeys = selectedKeys
                this.fetchPage()
                this.fetchButtons()
                this.fetchMenuButtons()
            },

            async onSave() {
                if (!this.pageId) {
                    this.$message.error('请选择菜单！')
                    return
                }
                const menuId = this.selectedKeys[0]
                const data = this.checkedList.map(buttonId => {
                    return {buttonId: buttonId, menuId: menuId}
                })
                const menuButtons = await service.saveMenuButton(menuId, data)
                this.checkedList = menuButtons.map(menuButton => menuButton.buttonId)
                this.$message.success('保存成功！')
            },

            async doRefresh() {
                this.loading = true
                if (!this.pageId) {
                    this.$message.error('请选择菜单！')
                    return
                }
                try {
                    await this.fetchPage()
                    await this.fetchButtons()
                    await this.fetchMenuButtons()
                    this.$message.success('刷新成功！')
                } finally {
                    this.loading = false
                }
            },

            async fetchAllMenus() {
                const menus = await menuService.fetchAll()
                this.menuMap = array2Map(menus, 'id')
                menus.forEach(menu => {
                    menu.disabled = menu.fake
                    menu.scopedSlots = {icon: 'custom'}
                })
                this.treeData = array2Tree(menus, {})
            },

            // 查询菜单关联的页面
            async fetchPage() {
                const page = await pageService.fetchOne(this.pageId)
                if (page) {
                    this.selectedPage = page
                } else {
                    this.selectedPage = {}
                }
            },

            // 查询页面上所有按钮
            async fetchButtons() {
                const params = {pageId: this.pageId}
                const buttons = await buttonService.fetchAll(params)
                arraySort(buttons, 'code')
                if (buttons && buttons.length > 0) {
                    let _plainOptions = []
                    buttons.forEach(button => {
                        const {id, title} = button
                        _plainOptions.push({label: title, value: id})
                    })
                    this.options = _plainOptions
                } else {
                    this.options = []
                }
            },

            // 查询菜单分配的按钮
            async fetchMenuButtons() {
                const menuId = this.selectedKeys[0]
                const menuButtons = await service.fetchMenuButton(menuId)
                if (menuButtons && menuButtons.length > 0) {
                    this.checkedList = menuButtons.map(menuButton => menuButton.buttonId)
                } else {
                    this.checkedList = []
                }
            },

        },

        created() {
            this.fetchAllMenus()
        }
    }
</script>

<style lang="less">
    .rbac-buttonauth {
        .content {
            display: flex;
            align-items: stretch;
        }

        .left, .left-button {
            margin-right: 8px;
        }

        .right {
            flex: 1;
        }

        .page-search {
            margin-bottom: 8px;
        }

        .ant-divider-inner-text {
            padding: 10px;
            font-size: 14px;
        }

        .button-check-all {
            padding: 0 20px 10px 0;
            color: #1890ff;
        }
    }
</style>