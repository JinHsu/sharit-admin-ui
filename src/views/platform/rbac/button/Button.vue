<template>
    <div class="rbac-button">
        <div class="content">
            <a-card :bordered="false" size="small" :bodyStyle="{width: '300px'}" class="left">
                <a-input-search placeholder="搜索页面" class="page-search"/>
                <a-directory-tree
                        :defaultExpandAll="true"
                        :treeData="treeData"
                        :replace-fields="{key:'id', title:'title', children: 'children'}"
                        @select="onTreeSelect"/>
            </a-card>

            <!-- 表格区 -->
            <a-card :bordered="false" size="small">
                <template slot="title">
                    <a-button type="primary" icon="plus" @click="onAdd" class="right-button">新增</a-button>
                    <a-button icon="reload" :loading="isLoading" @click="doRefresh">刷新</a-button>
                </template>
                <template slot="extra">
                    <a-input-search placeholder="搜索"/>
                </template>
                <a-table :columns="columns" :data-source="buttons"
                         :pagination="pagination"
                         :loading="isTableDataLoading" rowKey="id">
                    <template slot="method" slot-scope="text">
                        <a-tag :color="getColor(text)">{{text | getText}}</a-tag>
                    </template>
                    <template slot="operation" slot-scope="text, record">
                        <a @click="onEdit(record)">修改</a>
                        <a-divider type="vertical"/>
                        <a @click="onDelete(record)">删除</a>
                    </template>
                </a-table>
            </a-card>
        </div>

        <button-modal v-model="modalVisible"
                      :modal-data="button"
                      :modal-type="modalType"
                      :page-id="pageId"
                      @onSave="doSave"/>
    </div>
</template>

<script>
    import moduleService from "@/views/platform/rbac/module/service"
    import pageService from "@/views/platform/rbac/page/service"
    import {array2Tree} from "@/utils/data"
    import columns from './columns'
    import service from "./service"
    import ButtonModal from './modal'

    export default {
        name: "Button",

        components: {
            ButtonModal
        },

        data() {
            return {
                treeData: [],
                pageId: null,

                columns: columns,
                buttons: [],
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
                        this.fetchButtons()
                    },
                    // pageSize变化
                    onShowSizeChange: (current, size) => {
                        this.pagination.current = current
                        this.pagination.pageSize = size
                        this.fetchButtons()
                    }
                },
                isLoading: false,
                isTableDataLoading: false,

                //
                button: null,
                modalVisible: false,
                modalType: '',

            }
        },

        filters: {
            getText(value) {
                let text
                switch (value) {
                    case 1:
                        text = 'GET'
                        break
                    case 2:
                        text = 'POST'
                        break
                    case 3:
                        text = 'PUT'
                        break
                    case 4:
                        text = 'DELETE'
                        break

                    default:
                        text = 'NULL'
                        break
                }
                return text
            },
        },

        methods: {
            getColor(value) {
                let color
                switch (value) {
                    case 1:
                        color = '#108ee9'
                        break
                    case 2:
                        color = '#2db7f5'
                        break
                    case 3:
                        color = '#87d068'
                        break
                    case 4:
                    default:
                        color = '#f50'
                        break
                }
                return color
            },

            onAdd() {
                this.modalType = 'add'
                this.modalVisible = true
            },

            onEdit(data) {
                this.button = data
                this.modalType = 'edit'
                this.modalVisible = true
            },
            //
            async doSave(data, callback) {
                if (data.id) { // 修改
                    await service.create(data)
                    await this.fetchButtons()
                    this.$message.success({content: '修改成功！'})
                } else { // 新增
                    await service.update(data)
                    await this.fetchButtons()
                    this.$message.success({content: '新增成功！'})
                }
                callback && callback()
            },

            onDelete(data) {
                this.$confirm({
                    title: '提示', content: '确定要删除吗？', okType: 'danger',
                    onOk: () => this.doDelete(data)
                })
            },

            //
            async doDelete(data) {
                await service.delete(data)
                await this.fetchButtons()
                this.$message.success({content: '删除成功！'})
            },

            async doRefresh() {
                if (this.pageId) {
                    this.isLoading = true
                    await this.fetchButtons()
                    this.$message.success('刷新成功！')
                    this.isLoading = false
                } else {
                    this.$message.error('请选择页面！')
                }
            },

            onTreeSelect(selectedKeys) {
                if (this.pageId !== selectedKeys[0]) {
                    this.pageId = selectedKeys[0]
                    this.fetchButtons()
                }
            },

            //
            async fetchButtons() {
                const params = {
                    page: this.pagination.current - 1, // 当前页码
                    size: this.pagination.pageSize, // 每页条数
                    sort: ['code,asc']
                }
                const {content, total} = await service.fetchAllByPage(
                    {...params, pageId: this.pageId})
                this.buttons = content
                this.pagination.total = total
            },

            //
            async fetchTreeData() {
                let modules = await moduleService.fetchAll()
                let pages = await pageService.fetchAll()

                pages.forEach(page => {
                    page.parentId = page.moduleId
                    page.isLeaf = true
                })

                this.treeData = array2Tree([...modules, ...pages],
                    {nonLeafDisabled: true, leafFieldName: 'isLeaf'})
            },

        },

        created() {
            this.fetchTreeData()
        }

    }
</script>

<style lang="less" scoped>
    .rbac-button {
        .content {
            display: flex;
            align-items: stretch;
        }

        .left, .right-button {
            margin-right: 8px;
        }

        .page-search {
            margin-bottom: 8px;
        }
    }
</style>