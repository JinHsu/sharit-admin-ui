<template>
    <div style="display: flex; flex-direction: column;">
        <a-input-search placeholder="选择用户" @search="onSearch" read-only v-model="inputValue"/>

        <a-modal v-model="visible" title="选择用户" destroyOnClose>
            <template slot="footer">
                <a-button @click="onCancel">取消</a-button>
                <a-button type="primary" :disabled="okButtonDisabled" @click="onOK">确定</a-button>
            </template>

            <a-table
                    :columns="columns"
                    :dataSource="data"
                    :pagination="pagination"
                    :loading="isTableDataLoading" rowKey="id"
                    :row-selection="{ type: 'radio', selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            >

            </a-table>

        </a-modal>
    </div>
</template>

<script>
    import service from '../service'

    export default {
        name: "UserRefer",

        props: {
            value: {
                type: String,
                required: false
            }
        },

        data() {
            return {
                inputValue: undefined,
                visible: false,
                columns: [
                    {dataIndex: 'username', title: '用户名', ellipsis: true},
                    {dataIndex: 'nickname', title: '昵称', ellipsis: true},
                ],
                data: [],
                pagination: {
                    current: 1, // 当前页码
                    pageSize: 10, //
                    showTotal: (total) => `共${total}条`,
                    total: 0,
                    // current改变
                    onChange: (page, pageSize) => {
                        this.pagination.current = page
                        this.pagination.pageSize = pageSize
                        this.fetchAll()
                    },
                },
                isTableDataLoading: false,
                selectedRowKeys: [],
                selectedRows: []
            }
        },

        computed: {
            okButtonDisabled() {
                return this.selectedRowKeys.length <= 0
            }
        },

        methods: {
            onSearch() {
                this.visible = true
            },

            onOK() {
                this.$emit('input', this.selectedRowKeys[0])
                const {username} = this.selectedRows[0]
                this.inputValue = username
                this.visible = false
            },

            onCancel() {
                this.visible = false
            },

            onSelectChange(selectedRowKeys, selectedRows) {
                this.selectedRowKeys = selectedRowKeys
                this.selectedRows = selectedRows
            },

            async fetchAll() {
                const params = {
                    page: this.pagination.current - 1, // 当前页码
                    size: this.pagination.pageSize, // 每页条数
                    sort: ['username,asc']
                }
                const {content, total} = await service.fetchAllByPage(params)
                this.data = content
                this.pagination.total = total
            },

            async init(value) {
                if (value) {
                    const user = await service.fetchOne(this.value)
                    if (user) {
                        const {id, username} = user
                        this.selectedRowKeys = [id]
                        this.inputValue = username
                        return
                    }
                }

                this.selectedRowKeys = []
                this.inputValue = undefined
            }

        },

        created() {
            this.fetchAll()
        },

        mounted() {
            this.init(this.value)
        },

        watch: {
            value(value) {
                this.init(value)
            },
            visible(value) {
                if (value) {
                    this.fetchAll()
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>