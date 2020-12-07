<template>
    <div style="background-color: #fff; padding: 10px;">
        <!-- 查询区 -->

        <!-- 按钮区 -->
        <div style="margin-bottom: 10px;">
            <a-space>
                <a-button type="primary" icon="plus" @click="onAdd">新增</a-button>
                <a-button type="info" icon="sync" :loading="isLoading" @click="doRefresh">刷新</a-button>
            </a-space>
        </div>

        <!-- 表格区 -->
        <a-table :columns="columns" :data-source="data"
                 :pagination="pagination"
                 :loading="isTableDataLoading" rowKey="id">
            <span slot="enabled" slot-scope="text, record">
                <a-tag :color="record.enabled ? 'green' : 'red'">
                    {{record.enabled ? '已启用' : '已停用'}}
                </a-tag>
            </span>
            <span slot="locked" slot-scope="text, record">
                <a-tag :color="record.locked ? 'red' : 'green'">
                    {{record.locked ? '已锁定' : '未锁定'}}
                </a-tag>
            </span>
            <span slot="operation" slot-scope="text, record">
                <a @click="onEdit(record)">修改</a>
                <a-divider type="vertical"/>

                <a @click="onDelete(record)">删除</a>
                <a-divider type="vertical"/>

                <a v-if="record.enabled" @click="onDisable(record)">停用</a>
                <a v-else @click="onEnable(record)">启用</a>
                <a-divider type="vertical"/>

                <a v-if="record.locked" @click="onUnLock(record)">解锁</a>
                <a v-else @click="onLock(record)">锁定</a>
                <a-divider type="vertical"/>

                <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        更多
                        <a-icon type="down"/>
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <a @click="onModifyPwd(record)">修改密码</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </span>
        </a-table>

        <!-- 模态框 -->
        <UserModal
                v-model="modalVisible"
                :modal-data="modalData"
                :modal-type="modalType"
                @doSave="doSave"/>
    </div>
</template>

<script>
    import {device} from '@/mixins'
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
                pagination: {
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
                this.$confirm({
                    title: '提示', content: '确定要删除吗？', okType: 'danger',
                    onOk: () => this.doDelete(data)
                });
            },

            async doDelete(data) {
                await service.delete(data)
                await this.fetchAll()
                this.$message.success({content: '删除成功！'})
            },

            async doSave(data, callback) {
                if (data.id) { // 修改
                    await service.update(data)
                    await this.fetchAll()
                    this.$message.success({content: '修改成功！'})
                } else { // 新增
                    await service.create(data)
                    await this.fetchAll()
                    this.$message.success({content: '新增成功！'})
                }
                callback && callback()
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

            async doDisable(data) {
                data.enabled = false
                const user = await service.update(data)
                Object.assign(data, user)
            },

            onEnable(data) {
                this.$confirm({
                    title: '提示', content: '确定要启用吗？', okType: 'danger',
                    onOk: () => this.doEnable(data)
                })
            },

            async doEnable(data) {
                data.enabled = true
                const user = await service.update(data)
                Object.assign(data, user)
            },

            onUnLock(data) {
                this.$confirm({
                    title: '提示', content: '确定要解锁吗？', okType: 'danger',
                    onOk: () => this.doUnLock(data)
                })
            },

            async doUnLock(data) {
                data.locked = false
                const user = await service.update(data)
                Object.assign(data, user)
            },

            onLock(data) {
                this.$confirm({
                    title: '提示', content: '确定要锁定吗？', okType: 'danger',
                    onOk: () => this.doLock(data)
                })
            },

            async doLock(data) {
                data.locked = true
                const user = await service.update(data)
                Object.assign(data, user)
            },

            async doRefresh() {
                this.isLoading = true
                await this.fetchAll()
                this.$message.success('刷新成功！')
                this.isLoading = false
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
            }

        },

        mixins: [device],

        created() {
            this.isTableDataLoading = true
            this.fetchAll().then(() => {
                this.isTableDataLoading = false
            })
        },

    }
</script>

<style lang="less" scoped>

</style>