<template>
    <div class="rbac-page">
        <div class="content">
            <a-card :bordered="false" size="small" :bodyStyle="{width: '300px'}" class="left">
                <a-input-search placeholder="搜索模块" class="module-search"/>
                <a-directory-tree
                        :defaultExpandAll="true"
                        :treeData="modules"
                        :replace-fields="{key:'id', title:'title', children: 'children'}"
                        @select="onTreeSelect"/>
            </a-card>
            <!-- 表格区 -->
            <a-card :bordered="false" size="small">
                <template slot="title">
                    <a-button type="primary" icon="plus" @click="onAdd" class="left-button">新增</a-button>
                    <a-button icon="reload" :loading="isLoading" @click="doRefresh">刷新</a-button>
                </template>
                <template slot="extra">
                    <a-input-search placeholder="搜索"/>
                </template>
                <a-table :columns="columns" :data-source="pages" size="middle"
                         :pagination="pagination"
                         :loading="isTableDataLoading" rowKey="id">
                    <template slot="code" slot-scope="text, record">
                        {{text}}
                        <a-tag v-if="record.preset" color="#f5222d">
                            预置
                        </a-tag>
                    </template>
                    <template slot="usePerm" slot-scope="text, record">
                        <a-checkbox v-model="record.usePerm" :disabled="true"/>
                    </template>
                    <template slot="operation" slot-scope="text, record">
                        <a @click="onEdit(record)">修改</a>
                        <a-divider type="vertical"/>
                        <a @click="onDelete(record)">删除</a>
                    </template>
                </a-table>
            </a-card>
        </div>

        <page-modal v-model="modalVisible"
                    :modal-data="page"
                    :modal-type="modalType"
                    @onSave="doSave"/>
    </div>
</template>

<script>
    import moduleService from '@/views/platform/rbac/module/service'
    import {array2Tree} from '@/utils/data'
    import columns from './columns/page'
    import service from './service'
    import PageModal from "./modal"

    export default {
        name: "Page",

        components: {PageModal},

        data() {
            return {
                modules: [], // 模块数据
                moduleId: '',

                columns: columns,
                pages: [],

                pagination: {
                    size: 'default',
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
                        this.fetchPages()
                    },
                    // pageSize变化
                    onShowSizeChange: (current, size) => {
                        this.pagination.current = current
                        this.pagination.pageSize = size
                        this.fetchPages()
                    }
                },
                isLoading: false,
                isTableDataLoading: false,

                page: null,
                modalVisible: false,
                modalType: ''
            }
        },
        methods: {
            //
            onAdd() {
                this.modalType = 'add'
                this.modalVisible = true
            },
            //
            onEdit(data) {
                this.page = data
                this.modalType = 'edit'
                this.modalVisible = true
            },

            //
            onDelete(data) {
                if (data.preset) {
                    this.$notification.error({message: '错误', description: "预置数据不能删除！"})
                    return
                }
                this.$confirm({
                    title: '提示', content: '确定要删除吗？', okType: 'danger',
                    onOk: () => this.doDelete(data)
                })
            },
            //
            doDelete(data) {
                service.delete(data).then(() => {
                    this.$message.success({content: '删除成功！'})
                    this.fetchPages()
                })
            },

            //
            doSave(data, callback) {
                if (data.id) { // 修改
                    service.update(data).then(() => {
                        this.$message.success({content: '修改成功！'})
                        callback && callback()
                        this.fetchPages()
                    }).catch(() => callback && callback(true))
                } else { // 新增
                    service.create(data).then(() => {
                        this.$message.success({content: '新增成功！'})
                        callback && callback()
                        this.fetchPages()
                    }).catch(() => callback && callback(true))
                }
            },

            //
            doRefresh() {
                if (this.moduleId) {
                    this.isLoading = true
                    this.fetchPages().then(() => {
                        this.$message.success('刷新成功！')
                    }).finally(() => this.isLoading = false)
                } else {
                    this.$message.error('请选择模块！')
                }
            },

            onTreeSelect(selectedKeys) {
                if (this.moduleId !== selectedKeys[0]) {
                    this.moduleId = selectedKeys[0]
                    this.isTableDataLoading = true
                    this.fetchPages().then(() => this.isTableDataLoading = false)
                }
            },

            //
            fetchModules() {
                return new Promise((resolve, reject) => {
                    moduleService.fetchAll().then((modules) => {
                        this.modules = array2Tree(modules, {})
                        resolve()
                    }).catch(e => reject(e))
                })
            },

            fetchPages() {
                const params = {
                    page: this.pagination.current - 1, // 当前页码
                    size: this.pagination.pageSize, // 每页条数
                    sort: ['code,asc']
                }

                return new Promise((resolve, reject) => {
                    service.fetchAllByPage({...params, moduleId: this.moduleId})
                        .then(({content, total}) => {
                            this.pages = content
                            this.pagination.total = total
                            resolve()
                        })
                        .catch(e => reject(e))
                })
            }

        },

        created() {
            this.fetchModules()
        }
    }
</script>

<style lang="less" scoped>
    .rbac-page {
        .content {
            display: flex;
            align-items: stretch;
        }

        .left, .left-button {
            margin-right: 8px;
        }

        .module-search {
            margin-bottom: 8px;
        }
    }
</style>