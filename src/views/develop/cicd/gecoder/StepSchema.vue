<template>
    <a-table :columns="columns" :data-source="userSchemas" size="small"
             :rowSelection="{
                    type: 'radio',
                    selectedRowKeys: this.selectedRowKeys,
                    onChange: this.onChange
                }"

             :customRow="onRowClick"
             :loading="isTableDataLoading"
             :pagination="pagination"
             rowKey="schemaName">
    </a-table>
</template>

<script>
    import service from "./service"

    export default {
        name: "StepSchema",

        props: {
            current: {type: Number, default: -1}
        },

        data() {
            return {
                //
                userSchemas: [],

                columns: [{dataIndex: 'schemaName', title: '名称'}],
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
                            this.selectedRowKeys = [record.schemaName]
                            this.$emit('input', this.selectedRowKeys[0])
                        }
                    }
                }
            },

            async fetchUserSchemas() {
                this.isTableDataLoading = true
                const params = {
                    page: this.pagination.current - 1, // 当前页码
                    size: this.pagination.pageSize, // 每页条数
                }
                const {content, total} = await service.fetchUserSchemas(params)
                this.userSchemas = content
                this.pagination.total = total
                this.isTableDataLoading = false
            },
        },

        created() {
            this.fetchUserSchemas()
        },

        watch: {
            current(value) {
                if (value === 0) {
                    this.fetchUserSchemas()
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>