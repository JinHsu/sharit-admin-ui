<template>
    <div class="rbac-role">
        <a-card :bordered="false" size="small">
            <template slot="title">
                <a-button type="primary" icon="plus" @click="onAdd" class="left-button">新增</a-button>
                <a-button icon="reload" :loading="isLoading" @click="doRefresh" class="left-button">刷新</a-button>
            </template>
            <template slot="extra">
                <a-input-search placeholder="搜索"/>
            </template>

            <a-table :columns="columns" :data-source="data" size="middle"
                     :pagination="pagination"
                     :loading="isTableDataLoading" rowKey="id">

                <span slot="code" slot-scope="text, record">
                    {{text}}
                    <a-tag v-if="record.preset" color="#f5222d">
                        预置
                    </a-tag>
                </span>

                <span slot="operation" slot-scope="text, record">
                    <a @click="onEdit(record)">修改</a>
                    <a-divider type="vertical"/>
                    <a @click="onDelete(record)">删除</a>
                </span>
            </a-table>
        </a-card>

        <role-modal
                v-model="modalVisible"
                :modal-data="modalData"
                :modal-type="modalType"
                @doSave="doSave">
        </role-modal>
    </div>
</template>

<script>
    import {device} from '@/mixins'
    import RoleModal from './modal'
    import columns from './columns'
    import service from './service'

    export default {
        name: "Role",

        components: {RoleModal},

        data() {
            return {
                columns: columns,
                data: [],
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

        mixins: [device],

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

            doDelete(data) {
                service.delete(data).then(() => {
                    this.$message.success({content: '删除成功！'})
                    this.fetchAll()
                })
            },

            doSave(data, callback) {
                if (data.id) { // 修改
                    service.update(data).then((newData) => {
                        this.$message.success({content: '修改成功！'})
                        callback && callback()
                        this.fetchAll()
                    }).catch(() => callback && callback(true))
                } else { // 新增
                    service.create(data).then(() => {
                        this.$message.success({content: '新增成功！'})
                        callback && callback()
                        this.fetchAll()
                    }).catch(() => callback && callback(true))
                }
            },

            doRefresh() {
                this.isLoading = true
                this.fetchAll().then(() => {
                    this.$message.success('刷新成功！')
                }).finally(() => this.isLoading = false)
            },

            fetchAll() {
                const params = {
                    page: this.pagination.current - 1, // 当前页码
                    size: this.pagination.pageSize, // 每页条数
                    sort: ['code,asc']
                }

                return new Promise((resolve, reject) => {
                    service.fetchAllByPage(params).then(({content, total}) => {
                        this.data = content
                        this.pagination.total = total
                        resolve()
                    }).catch(e => reject(e))
                })
            }
        },

        created() {
            this.isTableDataLoading = true
            this.fetchAll().then(() => this.isTableDataLoading = false)
        },

    }
</script>

<style lang="less" scoped>
    .rbac-role {
        .left-button {
            margin-right: 8px;
        }
    }
</style>