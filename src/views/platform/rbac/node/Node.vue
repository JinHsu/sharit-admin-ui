<template>
    <div style="background-color: #fff; padding: 10px; ">
        <!-- 按钮区 -->
        <div style="margin-bottom: 10px;">
            <a-button type="primary" icon="plus" style="margin-right: 5px;" @click="onAdd">新增</a-button>
            <a-button type="info" icon="sync" style="margin-right: 5px;" :loading="isLoading" @click="doRefresh">刷新
            </a-button>
        </div>

        <a-row :gutter="10">
            <a-col :span="6">
                <div>
                    <a-input-search style="margin-bottom: 8px" placeholder="搜索模块" @change="onSearch"/>
                    <a-tree
                            :treeData="modules"
                            :replaceFields="{key: 'id', title: 'title', children: 'children'}"
                            :show-line="false"
                            :show-icon="false"
                            :blockNode="true"
                            @select="onSelectNode"
                            style="border-right: 1px solid #d9d9d9;"
                    >
                        <template slot="custom" slot-scope="{ selected, title, code }">
                            {{code + " " + title}}
                        </template>
                    </a-tree>
                </div>
            </a-col>
            <a-col :span="18">
                <a-table
                        :columns="columns"
                        :data-source="nodes"
                        :loading="isTableDataLoading"
                        :pagination="pagination"
                        rowKey="id"
                >
                    <span slot="operation" slot-scope="text, record">
                        <a @click="onEdit(record)">修改</a>
                        <a-divider type="vertical"/>
                        <a @click="onDelete(record)">删除</a>
                    </span>
                </a-table>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import moduleService from '@/views/platform/rbac/module/service'
    import array2Tree from "@/utils/data/array2Tree"
    import columns from './columns'
    import service from './service'

    export default {
        name: "Node",

        props: {},

        components: {},
        data() {
            return {
                isLoading: false,
                modules: [],

                columns: columns,
                nodes: [],
                isTableDataLoading: false,
                pagination: {
                    current: 1, // 当前页码
                    pageSize: 10, //
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50'],
                    showTotal: (total) => `共${total}条`,
                    total: 0,
                    // current改变
                    onChange: (page, pageSize) => {
                        this.pagination.current = page
                        this.pagination.pageSize = pageSize
                        this.fetchNode()
                    },
                    // pageSize变化
                    onShowSizeChange: (current, size) => {
                        this.pagination.current = current
                        this.pagination.pageSize = size
                        this.fetchNode()
                    }
                },

                selectedKey: null
            }
        },

        methods: {
            onSearch() {
            },

            async onSelectNode(selectedKeys) {
                this.selectedKey = selectedKeys[0]
                if (this.selectedKey) {
                    this.isTableDataLoading = true
                    await this.fetchNode()
                    this.isTableDataLoading = false
                } else {
                    this.isTableDataLoading = true
                    this.nodes = []
                    this.pagination.total = 0
                    this.isTableDataLoading = false
                }
            },

            onAdd() {
            },

            doRefresh() {
            },

            onEdit() {
            },

            onDelete() {
            },

            async fetchAllModules() {
                const modules = await moduleService.fetchAll();

                (modules || []).forEach(module => module.scopedSlots = {title: 'custom', code: 'custom'})

                const sortedModules = array2Tree(modules, {});

                (modules || []).forEach(module => module.disabled = module.children !== undefined)

                this.modules = sortedModules

            },

            async fetchNode() {
                const params = {
                    page: this.pagination.current - 1, // 当前页码
                    size: this.pagination.pageSize, // 每页条数
                    sort: ['code,asc'],
                    moduleId: this.selectedKey
                }
                const nodes = await service.fetchAllByPage(params)
                this.nodes = nodes.content
                this.pagination.total = nodes.total
            }
        },

        created() {
            this.fetchAllModules()
        },

        mounted() {
        },

        watch: {}

    }
</script>

<style lang="less" scoped>

</style>