<template>
    <div style="background-color: #fff; padding: 10px;">
        <!-- 按钮区 -->
        <div style="margin-bottom: 10px;">
            <a-button type="primary" icon="plus" style="margin-right: 5px;" @click="onAdd">新增</a-button>
            <a-button type="info" icon="sync" style="margin-right: 5px;" :loading="isLoading" @click="doRefresh">刷新
            </a-button>
        </div>

        <!-- 表格区 -->
        <a-space align="start" size="large">
            <div>
                <a-input-search style="margin-bottom: 8px" placeholder="搜索模块"/>
                <a-tree
                        style="width: 240px; border-right: 1px solid #d9d9d9;"
                        :tree-data="modules"
                        :blockNode="true"
                        :replace-fields="{key:'id', title:'title', children: 'children'}"
                        @select="onTreeSelect"
                />
            </div>
            <!---->
            <a-table :columns="columns" :data-source="data"
                     :pagination="pagination"
                     :loading="isTableDataLoading" rowKey="id">
                <span slot="operation" slot-scope="text, record">
                <a @click="onEdit(record)">修改</a>
                <a-divider type="vertical"/>
                <a @click="onDelete(record)">删除</a>
                <a-divider type="vertical"/>
                <a @click="onShowButtonModal(record)">按钮管理</a>

            </span>
            </a-table>
        </a-space>


        <!-- 模态框 -->
        <PageModal
                v-model="pageModalVisible"
                :modal-data="selectedData"
                :modal-type="pageModalType"
                @doSave="doSave"/>
        <ButtonModal
                v-model="buttonModalVisibel"
                :page-data="selectedData"/>
    </div>
</template>

<script>
    import columns from './columns'
    import {ButtonModal, PageModal} from './modal'
    import service from './service'
    import moduleService from '@/views/platform/rbac/module/service'
    import {array2Tree} from '@/utils/data'

    export default {
        name: "Page",
        components: {PageModal, ButtonModal},
        data() {
            return {
                modules: [], // 模块数据
                moduleId: '',

                columns: columns,
                data: [],

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
                        this.fetchAll()
                    },
                    // pageSize变化
                    onShowSizeChange: (current, size) => {
                        this.pagination.current = current
                        this.pagination.pageSize = size
                        this.fetchAll()
                    }
                },
                isLoading: false,
                isTableDataLoading: false,
                moduleMap: null,

                selectedData: null,
                pageModalVisible: false,
                pageModalType: '',
                buttonModalVisibel: false
            }
        },
        methods: {
            //
            onAdd() {
                this.pageModalType = 'add'
                this.pageModalVisible = true
            },
            //
            onEdit(data) {
                this.selectedData = data
                this.pageModalType = 'edit'
                this.pageModalVisible = true
            },

            //
            onShowButtonModal(data) {
                this.selectedData = data
                this.buttonModalVisibel = true
            },

            //
            async doSave(data, callback) {
                if (data.id) { // 修改
                    await service.create(data)
                    await this.fetchAll()
                    this.$message.success({content: '修改成功！'})
                } else { // 新增
                    await service.update(data)
                    await this.fetchAll()
                    this.$message.success({content: '新增成功！'})
                }
                callback && callback()
            },
            //
            onDelete(data) {
                let {doDelete} = this
                this.$confirm({
                    title: '提示', content: '确定要删除吗？', okType: 'danger',
                    onOk: () => doDelete(data)
                })
            },
            //
            async doDelete(data) {
                await service.delete(data)
                await this.fetchAll()
                this.$message.success({content: '删除成功！'})
            },
            //
            async doRefresh() {
                if (this.moduleId) {
                    this.isLoading = true
                    await this.fetchPageByModuleId()
                    this.$message.success('刷新成功！')
                    this.isLoading = false
                } else {
                    this.$message.error('请选择模块！')
                }

            },

            onTreeSelect(selectedKeys, {selected}) {
                if (selected) {
                    this.moduleId = selectedKeys[0]
                    this.fetchPageByModuleId()
                } else {
                    this.moduleId = null
                    this.data = []
                }
            },

            //
            async fetchAllModules() {
                const modules = await moduleService.fetchAll()
                this.modules = array2Tree(modules, {})
            },

            async fetchPageByModuleId() {
                const params = {
                    page: this.pagination.current - 1, // 当前页码
                    size: this.pagination.pageSize, // 每页条数
                    sort: ['code,asc']
                }
                const {content, total} = await service.fetchAllByPage({...params, moduleId: this.moduleId})
                this.data = content
                this.pagination.total = total
            }

        },

        created() {
            this.fetchAllModules()
        }
    }
</script>

<style lang="less" scoped>

</style>