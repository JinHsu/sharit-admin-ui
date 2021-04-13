<template>
    <div class="main">
        <a-card :bordered="false" size="small">
            <template slot="title">
                <a-button icon="reload" :loading="isLoading" @click="doRefresh" class="left-button">
                    刷新
                </a-button>
            </template>
            <template slot="extra">
                <a-input-search placeholder="搜索"/>
            </template>

            <a-table :columns="columns" :data-source="data" size="middle"
                     :rowSelection="rowSelection"
                     :pagination="pagination"
                     :loading="isTableDataLoading" rowKey="id">

                <template slot="suspensionState" slot-scope="text">
                    {{ text === 1 ? '激活': '挂起' }}
                </template>

                <template slot="operation" slot-scope="text, record">
                    <a @click="onDelete(record)">删除</a>
                    <a-divider type="vertical"/>
                    <a @click="onSuspend(record)">挂起</a>
                    <a-divider type="vertical"/>
                    <a @click="onActive(record)">激活</a>
                </template>

            </a-table>
        </a-card>

    </div>
</template>

<script>
    import columns from "./columns"
    import service from "./service"

    export default {
        name: "Definition",

        components: {},

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

                //
                modelDesignVisible: false,
                model: null,
                cascade: true
            }
        },

        methods: {
            //
            onDelete(data) {
                this.$confirm({
                    title: '提示', content: '确定要删除吗？', okType: 'danger',
                    onOk: () => this.doDelete(data)
                });
            },

            async doDelete(data) {
                await service.delete(data, {cascade: this.cascade})
                this.$message.success({content: '删除成功！'})
                await this.fetchAll()
            },

            async doRefresh() {
                this.isLoading = true
                await this.fetchAll()
                this.isLoading = false
                this.$message.success('刷新成功！')
            },

            onSuspend() {

            },

            onActive() {

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
        }

    }
</script>

<style lang="less" scoped>
    .main {
        .left-button {
            margin-right: 8px;
        }
    }
</style>