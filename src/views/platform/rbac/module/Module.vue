<template>
    <div style="background-color: #fff; padding: 10px;">

        <!-- 按钮区 -->
        <div style="margin-bottom: 10px;">
            <a-button type="primary" icon="plus" style="margin-right: 5px;" @click="onAdd">新增</a-button>
            <a-button type="info" icon="sync" style="margin-right: 5px;" :loading="isLoading" @click="doRefresh">刷新
            </a-button>
        </div>

        <!-- 表格区 -->
        <a-table :columns="columns" :data-source="data" :loading="isTableDataLoading" :pagination="false" rowKey="id">
            <span slot="operation" slot-scope="text, record">
                <a @click="onEdit(record)">修改</a>
                <template v-if="!record.children || record.children.length === 0">
                    <a-divider type="vertical"/>
                    <a @click="onDelete(record)">删除</a>
                </template>
            </span>
        </a-table>

        <!-- 模态框 -->
        <ModuleModal
                v-model="modalVisible"
                :modal-data="selectedData"
                :modal-type="modalType"
                @doSave="doSave">
        </ModuleModal>
    </div>
</template>

<script>
    import columns from './columns'
    import ModuleModal from "./modal"
    import service from './service'
    import {array2Tree} from '@/utils/data'

    export default {
        name: "Module",
        components: {ModuleModal},
        data() {
            return {
                columns: columns,
                data: [],
                selectedRowKeys: [],
                isLoading: false,
                isTableDataLoading: false,
                modalVisible: false,
                selectedData: null,
                modalType: 'add'
            }
        },
        methods: {
            //
            onAdd() {
                this.modalType = 'add'
                this.modalVisible = true
            },
            onEdit(data) {
                this.selectedData = data
                this.modalType = 'edit'
                this.modalVisible = true
            },
            //
            onDelete(data) {
                const {children} = data
                if (children && children.length > 0) {
                    this.$message.error({content: '存在下级，不能删除！'})
                    return
                }
                let {doDelete} = this
                this.$confirm({
                    title: '提示', content: '确定要删除吗？', okType: 'danger',
                    onOk: () => doDelete(data)
                })

            },

            async doDelete(data) {
                await service.delete(data)
                await this.fetchAll()
                this.$message.success({content: '删除成功！'})
            },
            //
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
            async doRefresh() {
                this.isLoading = true
                await this.fetchAll()
                this.$message.success('刷新成功！')
                this.isLoading = false
            },
            async fetchAll() {
                const modules = await service.fetchAll()
                // 转换为树形结构数据
                this.data = array2Tree(modules, {})
            }
        },
        computed: {},

        created() {
            this.isTableDataLoading = true
            this.fetchAll().then(() => this.isTableDataLoading = false)
        }

    }
</script>

<style scoped>

</style>