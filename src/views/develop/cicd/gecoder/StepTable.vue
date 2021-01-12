<template>
    <a-table :columns="columns" :data-source="schemaTables" size="small"
             :rowSelection="{
                    type: 'radio',
                    selectedRowKeys: this.selectedRowKeys,
                    onChange: this.onChange
                }"
             :customRow="onRowClick"
             :loading="isTableDataLoading"
             :pagination="pagination"
             rowKey="tableName">
    </a-table>
</template>

<script>
    import service from "./service"

    export default {
        name: "StepTable",

        props: {
            current: {type: Number, default: -1},
            schema: {type: String, required: true}
        },

        data() {
            return {
                schemaTables: [],
                columns: [{dataIndex: 'tableName', title: '名称', width: 360}, {dataIndex: 'tableComment', title: '备注'}],
                selectedRowKeys: [],
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
                        this.fetchSchemaTables()
                    },
                    // pageSize变化
                    onShowSizeChange: (current, size) => {
                        this.pagination.current = current
                        this.pagination.pageSize = size
                        this.fetchSchemaTables()
                    }
                },
                isTableDataLoading: false
            }
        },

        methods: {
            onChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys
                this.$emit('input', this.selectedRowKeys[0])
            },

            onRowClick(record) {
                return {
                    on: {
                        click: () => {
                            this.selectedRowKeys = [record.tableName]
                            this.$emit('input', this.selectedRowKeys[0])
                        }
                    }
                }
            },

            async fetchSchemaTables() {
                this.isTableDataLoading = true
                const params = {
                    page: this.pagination.current - 1, // 当前页码
                    size: this.pagination.pageSize, // 每页条数
                }
                const {content, total} = await service.fetchSchemaTables({...params, schema: this.schema})
                this.schemaTables = content
                this.pagination.total = total
                this.isTableDataLoading = false
            },
        },

        watch: {
            current(value) {
                if (value === 1) {
                    this.fetchSchemaTables()
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>