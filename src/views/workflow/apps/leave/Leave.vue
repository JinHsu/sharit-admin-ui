<template>
    <div class="main">
        <a-card :bordered="false" size="small">
            <template slot="title">
                <a-button v-action:add type="primary" icon="plus" @click="onAdd" class="left-button">新增</a-button>
                <a-button v-action:refresh icon="reload" :loading="isLoading" @click="doRefresh" class="left-button">
                    刷新
                </a-button>
            </template>
            <template slot="extra">
                <a-input-search placeholder="搜索"/>
            </template>

            <a-table :columns="columns" :data-source="data" size="middle" :scroll="{ x: 1200 }"
                     :rowSelection="rowSelection" tableLayout="fixed"
                     :pagination="pagination"
                     :loading="isTableDataLoading" rowKey="id">

                <template slot="operation" slot-scope="text, record">
                    <a>删除</a>
                    <a-divider type="vertical"/>
                    <a @click="onEdit(record)">修改</a>
                    <a-divider type="vertical"/>
                    <a @click="onSubmit(record)">提交</a>
                    <a-divider type="vertical"/>
                    <a>收回</a>
                    <a-divider type="vertical"/>
                    <a>流程历史</a>
                </template>
            </a-table>
        </a-card>

        <leave-modal
                v-model="modalVisible"
                :modal-data="modalData"
                :modal-type="modalType"
                @onSave="doSave"
                @setDefaultValue="setDefaultValue"
        />
    </div>
</template>

<script>
    import columns from "./columns"
    import service from "./service"
    import LeaveModal from "./modal"

    export default {
        name: "Leave",

        components: {
            LeaveModal
        },

        data() {
            return {
                columns: columns,
                data: [],
                rowSelection: {},
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

                //
                modalVisible: false, // 模态框状态
                modalType: null, //
                modalData: null,
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
                this.modalData = data
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
                });
            },

            async doDelete(data) {
                await service.delete(data)
                this.$message.success({content: '删除成功！'})
                await this.fetchAll()
            },

            async doSave(data, callback) {
                try {
                    if (data.id) { // 修改
                        await service.update(data)
                        this.$message.success({content: '修改成功！'})
                    } else { // 新增
                        await service.create(data)
                        this.$message.success({content: '新增成功！'})
                    }
                    callback && callback()
                    await this.fetchAll()
                } catch (e) {
                    callback && callback(true)
                }
            },

            async setDefaultValue(callback) {
                const defaultValue = await service.fetchDefaultValue()
                callback && callback(defaultValue)
            },

            async onSubmit(record) {
                await service.submit(record)
                this.$message.success('提交成功！')
                await this.fetchAll()
            },

            async doRefresh() {
                this.isLoading = true
                await this.fetchAll()
                this.isLoading = false
                this.$message.success('刷新成功！')
            },

            async fetchAll() {
                const params = {
                    page: this.pagination.current - 1, // 当前页码
                    size: this.pagination.pageSize, // 每页条数
                }
                const {content, total} = await service.fetchAllByPage(params)
                this.data = content
                this.pagination.total = total
            },


        },

        created() {
            this.isTableDataLoading = true
            this.fetchAll().then(() => this.isTableDataLoading = false)
        },

    }
</script>

<style lang="less" scoped>
    .main {
        .left-button {
            margin-right: 8px;
        }
    }
</style>