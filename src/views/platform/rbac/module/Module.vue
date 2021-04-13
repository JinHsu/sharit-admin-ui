<template>
    <div class="rbac-module">
        <a-card :bordered="false" size="small">
            <template slot="title">
                <a-button type="primary" icon="plus" @click="onAdd" class="left-button">新增</a-button>
                <a-button icon="reload" @click="doRefresh" :loading="isLoading" class="left-button">刷新</a-button>
            </template>
            <template slot="extra">
                <a-input-search placeholder="搜索"/>
            </template>
            <a-table :columns="columns" :data-source="data" size="middle"
                     :loading="isTableDataLoading"
                     :pagination="false"
                     rowKey="id">
                <template slot="code" slot-scope="text, record">
                    {{text}}
                    <a-tag v-if="record.preset" color="#f5222d">
                        预置
                    </a-tag>
                </template>

                <template slot="operation" slot-scope="text, record">
                    <a @click="onEdit(record)">修改</a>
                    <template v-if="!record.children || record.children.length === 0">
                        <a-divider type="vertical"/>
                        <a @click="onDelete(record)">删除</a>
                    </template>
                </template>
            </a-table>
        </a-card>

        <!-- 模态框 -->
        <module-modal
                v-model="modalVisible"
                :modal-data="module"
                :modal-type="modalType"
                @onSave="doSave">
        </module-modal>
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
                isTableDataLoading: false,

                isLoading: false,

                // 模态框
                module: null,
                modalVisible: false,
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
                this.module = data
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
                })
            },

            async doDelete(data) {
                await service.delete(data)
                this.$message.success({content: '删除成功！'})
                await this.fetchAll()
            },
            //
            async doSave(data, callback) {
                try {
                    if (data.id) { // 修改
                        await service.update(data)
                        this.$message.success({content: '修改成功！'})
                    } else { // 新增
                        await service.create(data)
                        this.$message.success({content: '新增成功！'})
                    }
                    callback && callback()
                    await this.fetchAll()
                } catch (e) {
                    callback && callback(true)
                }
            },

            async doRefresh() {
                this.isLoading = true
                await this.fetchAll()
                this.isLoading = false
                this.$message.success('刷新成功！')
            },

            async fetchAll() {
                const modules = await service.fetchAll()
                this.data = array2Tree(modules, {})// 转换为树形结构数据
            }
        },
        computed: {},

        created() {
            this.isTableDataLoading = true
            this.fetchAll().then(() => this.isTableDataLoading = false)
        }

    }
</script>

<style lang="less" scoped>
    .rbac-module {
        .left-button {
            margin-right: 8px;
        }
    }
</style>