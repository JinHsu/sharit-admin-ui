<template>
    <div class="main">
        <a-card :bordered="false" size="small">
            <template slot="title">
                <a-button v-action:refresh icon="reload" :loading="isLoading" @click="doRefresh" class="left-button">
                    刷新
                </a-button>
            </template>
            <template slot="extra">
                <a-input-search placeholder="搜索"/>
            </template>

            <a-table :columns="columns" :data-source="data" size="middle" :scroll="{ x: 1200 }"
                     :rowSelection="rowSelection"
                     :pagination="pagination"
                     :loading="isTableDataLoading" rowKey="id">
                <template slot="createTime" slot-scope="text">
                    {{ text | momentDateTime }}
                </template>

                <template slot="operation" slot-scope="text, record">
                    <a @click="onApprove(record)">审批</a>
                    <a-divider type="vertical"/>
                    <a>单据详情</a>
                    <a-divider type="vertical"/>
                    <a @click="onHistory(record)">流程历史</a>
                </template>
            </a-table>
        </a-card>

        <approve-confirm-modal v-model="visible" @ok="doApprove"/>
    </div>
</template>

<script>
    import {ApproveConfirmModal} from './modal'
    import columns from "./columns"
    import service from "./service"

    export default {
        name: "TaskList",

        components: {
            ApproveConfirmModal
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
                visible: false,
                approveData: null,
            }
        },

        methods: {

            onApprove(record) {
                this.approveData = record
                this.visible = true
            },

            async doApprove(data, callack) {
                console.log(data)
                await service.approve(this.approveData, data)
                callack && callack()
                await this.fetchAll()
                this.$message.success('审批成功！')
            },

            onHistory(record) {
                service.taskHistory(record.id)
            },

            //
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