<template>
    <div style="background-color: #fff; padding: 10px;">
        <!-- 按钮区 -->
        <div style="margin-bottom: 10px;">
            <a-button type="primary" icon="plus" style="margin-right: 5px;" @click="onAdd">新增</a-button>
            <a-button type="info" icon="sync" style="margin-right: 5px;" :loading="isLoading" @click="doRefresh">刷新
            </a-button>
        </div>

        <!-- 表格区 -->
        <a-table :columns="columns" :data-source="data"
                 :pagination="pagination"
                 :loading="isTableDataLoading" rowKey="id">
            <span slot="module" slot-scope="text, record">
                {{ record.moduleId | moduleFilter(moduleMap) }}
            </span>

            <span slot="operation" slot-scope="text, record">
                <a @click="onEdit(record)">修改</a>
                <a-divider type="vertical"/>
                <a @click="onDelete(record)">删除</a>
                <a-divider type="vertical"/>
                <a @click="onShowButtonModal(record)">按钮管理</a>

            </span>
        </a-table>

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
    import {array2Map} from '@/utils/data'

    export default {
        name: "Page",
        components: {PageModal, ButtonModal},
        data() {
            return {
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
                this.isLoading = true
                await this.fetchAll()
                this.$message.success('刷新成功！')
                this.isLoading = false
            },
            //
            async fetchAll() {
                const params = {
                    page: this.pagination.current - 1, // 当前页码
                    size: this.pagination.pageSize, // 每页条数
                    sort: ['code,asc']
                }

                const moduleFetch = moduleService.fetchAll()
                const pageFetch = service.fetchAllByPage(params)

                const [modules, pages] = await Promise.all([moduleFetch, pageFetch])

                this.moduleMap = array2Map(modules, 'id')
                this.data = pages.content
                this.pagination.total = pages.total
            }

        },

        filters: {
            // 所属模块过滤器
            moduleFilter(value, moduleMap) {
                return moduleMap.has(value) ? moduleMap.get(value).title : ''
            }
        },

        created() {
            this.isTableDataLoading = true
            this.fetchAll().then(() => {
                this.isTableDataLoading = false
            })
        }
    }
</script>

<style lang="less" scoped>

</style>