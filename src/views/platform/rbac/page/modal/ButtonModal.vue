<template>
    <a-modal centered
             :visible="value"
             :maskClosable="false"
             title="按钮管理"
             width="960px"
             @cancel="onCancel">
        <template slot="footer">
            <a-button type="primary" @click="onAdd">新增</a-button>
            <a-button type="info" @click="onRefresh">刷新</a-button>
            <a-button @click="onCancel">关闭</a-button>
        </template>

        <a-table
                :columns="columns"
                :data-source="data"
                :pagination="false"
                :scroll="{ y: 400 }"
        >
            <span slot="operation" slot-scope="text, record">
                <a @click="onEdit(record)">修改</a>
                <a-divider type="vertical"/>
                <a @click="onDelete(record)">删除</a>

            </span>
        </a-table>
    </a-modal>
</template>

<script>
    export default {
        name: "ButtonModal",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            pageData: {
                type: Object
            }
        },

        data() {
            return {
                columns: [
                    {
                        dataIndex: 'seq',
                        title: '序号',
                        width: 80,
                        align: 'center',
                        customRender: (text, record, index) => index + 1
                    },
                    {dataIndex: 'code', title: '按钮编码', width: 100, ellipsis: true},
                    {dataIndex: 'title', title: '按钮名称', width: 100, ellipsis: true},
                    {dataIndex: 'url', title: '请求路径', width: 200, ellipsis: true},
                    {dataIndex: 'method', title: '请求方法', width: 100, ellipsis: true},
                    {
                        dataIndex: 'operation',
                        title: '操作',
                        width: 150,
                        // fixed: 'right',
                        scopedSlots: {customRender: 'operation'},
                    }
                ],
                data: []
            }
        },

        methods: {
            onCancel() {
                this.$emit('input', false)
            },

            onAdd() {
                this.data.push({id: '', code: '1', title: '新增'})
            },

            onEdit() {

            },

            onDelete() {

            },

            onRefresh() {
            }
        }
    }
</script>

<style lang="less" scoped>

</style>