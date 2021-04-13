<template>
    <a-table :columns="columns" :data-source="tableColumns" size="small"
             :loading="isTableDataLoading"
             :pagination="false"
             rowKey="columnName">
    </a-table>
</template>

<script>
    import service from "./service"

    export default {
        name: "StepColumn",

        props: {
            current: {type: Number, default: -1},
            schema: {type: String, required: true},
            table: {type: String, required: true},
        },

        data() {
            return {
                tableColumns: [],
                columns: [
                    {dataIndex: 'ordinalPosition', title: '序号', align: 'center'},
                    {dataIndex: 'columnName', title: '数据库字段名称'},
                    {dataIndex: 'columnCamelName', title: '实体字段名称'},
                    {dataIndex: 'dataType', title: '数据库字段类型'},
                    {dataIndex: 'javaDataType', title: '实体字段类型'},
                    // {dataIndex: 'nullable', title: '能否为空'},
                    // {dataIndex: 'characterMaximumLength', title: '最大字符长度'},
                    // {dataIndex: 'numericPrecision', title: '整数位精度'},
                    // {dataIndex: 'numericScale', title: '小数位精度'},
                    // {dataIndex: 'datetimePrecision', title: '日期时间精度'},
                    {dataIndex: 'columnComment', title: '备注'}
                ],
                isTableDataLoading: false
            }
        },


        methods: {
            async fetchTableColumns() {
                this.isTableDataLoading = true
                const params = {
                    schema: this.schema,
                    table: this.table,
                }
                this.tableColumns = await service.fetchTableColumns(params)
                this.isTableDataLoading = false
            },
        },

        watch: {
            current(value) {
                if (value === 2) {
                    this.fetchTableColumns()
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>