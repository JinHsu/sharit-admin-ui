<template>
    <div class="rbac-user">
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

            <a-table :columns="columns" :data-source="data" size="middle"
                     :rowSelection="rowSelection"
                     :pagination="pagination"
                     :loading="isTableDataLoading" rowKey="id">

                <template slot="username" slot-scope="text, record">
                    {{text}}
                    <a-tag v-if="record.preset" color="#f5222d">
                        预置
                    </a-tag>
                </template>

                <template slot="enabled" slot-scope="text, record">
                    <a-tag :color="record.enabled ? 'green' : 'red'">
                        {{record.enabled ? '已启用' : '未启用'}}
                    </a-tag>
                </template>
                <template slot="locked" slot-scope="text, record">
                    <a-tag :color="record.locked ? 'red' : 'green'">
                        {{record.locked ? '已锁定' : '未锁定'}}
                    </a-tag>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <a @click="onEdit(record)">修改</a>
                    <a-divider type="vertical"/>

                    <a @click="onDelete(record)">删除</a>
                    <a-divider type="vertical"/>

                    <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                            更多
                            <a-icon type="down"/>
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a v-if="record.enabled" @click="onDisable(record)">停用</a>
                                <a v-else @click="onEnable(record)">启用</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a v-if="record.locked" @click="onUnLock(record)">解锁</a>
                                <a v-else @click="onLock(record)">锁定</a>
                            </a-menu-item>
                            <a-menu-divider/>
                            <a-menu-item>
                                <a @click="onModifyPwd(record)">修改密码</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table>
        </a-card>

        <user-modal
                v-model="modalVisible"
                :modal-data="modalData"
                :modal-type="modalType"
                @doSave="doSave"/>
    </div>
</template>

<script>
    import columns from './columns'
    import service from './service'
    import {UserModal} from './modal'

    export default {
        name: "User",

        components: {UserModal},

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

            doDelete(data) {
                service.delete(data).then(() => {
                    this.$message.success({content: '删除成功！'})
                    this.fetchAll()
                })
            },

            doSave(data, callback) {
                if (data.id) { // 修改
                    service.update(data).then(() => {
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
            //
            onModifyPwd() {
            },
            //
            onDisable(data) {
                this.$confirm({
                    title: '提示', content: '确定要停用吗？', okType: 'danger',
                    onOk: () => this.doDisable(data)
                })
            },

            doDisable(data) {
                data.enabled = false
                service.update(data).then(newData => Object.assign(data, newData))
            },

            onEnable(data) {
                this.$confirm({
                    title: '提示', content: '确定要启用吗？', okType: 'danger',
                    onOk: () => this.doEnable(data)
                })
            },

            doEnable(data) {
                data.enabled = true
                service.update(data).then(newData => Object.assign(data, newData))
            },

            onUnLock(data) {
                this.$confirm({
                    title: '提示', content: '确定要解锁吗？', okType: 'danger',
                    onOk: () => this.doUnLock(data)
                })
            },

            doUnLock(data) {
                data.locked = false
                service.update(data).then(newData => Object.assign(data, newData))
            },

            onLock(data) {
                this.$confirm({
                    title: '提示', content: '确定要锁定吗？', okType: 'danger',
                    onOk: () => this.doLock(data)
                })
            },

            doLock(data) {
                data.locked = true
                service.update(data).then(newData => Object.assign(data, newData))
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
                    sort: ['username,asc']
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
    .rbac-user {
        .left-button {
            margin-right: 8px;
        }
    }
</style>