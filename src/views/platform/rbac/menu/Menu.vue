<template>
    <div class="rbac-menu">
        <a-card :bordered="false" size="small">
            <template slot="title">
                <a-button type="primary" icon="plus" @click="onAdd" class="left-button">新增</a-button>
                <a-button icon="reload" :loading="isLoading" @click="doRefresh" class="left-button">刷新</a-button>
            </template>
            <a-table :columns="columns" :data-source="treeData" size="middle"
                     :pagination="false"
                     :loading="isTableDataLoading" rowKey="id"
            >
                <template slot="code" slot-scope="text, record">
                    {{text}}
                    <a-tag v-if="record.preset" color="#f5222d">
                        预置
                    </a-tag>
                </template>

                <template slot="icon" slot-scope="text, record">
                    <a-icon :type="record.icon" v-if="record.icon"/>
                </template>

                <template slot="fake" slot-scope="text, record">
                    <a-checkbox :default-checked="record.fake" :disabled="true"/>
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

        <menu-modal
                v-model="modalVisible"
                :modal-data="menu"
                :modal-type="modalType"
                @doSave="doSave">
        </menu-modal>

    </div>
</template>

<script>
    import MenuModal from './modal'
    import columns from "./columns"
    import service from './service'
    import {array2Tree} from "@/utils/data"

    export default {
        name: "Menu",
        components: {
            MenuModal,
        },
        data() {
            return {
                columns: columns,
                isLoading: false,
                isTableDataLoading: false,
                //
                treeData: null, // 树渲染数据
                menu: null, // 选中的数据
                modalVisible: false, // 模态框状态
                modalType: null, // 模块框标题
            }
        },

        methods: {

            onAdd() {
                this.modalType = 'add'
                this.modalVisible = true
            },

            onEdit(data) {
                this.menu = data
                this.modalType = 'edit'
                this.modalVisible = true
            },

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
            doRefresh() {
                this.isLoading = true
                this.fetchAll().then(() => {
                    this.$message.success('刷新成功！')
                }).finally(() => this.isLoading = false)
            },

            fetchAll() {
                this.isTableDataLoading = true
                return new Promise((resolve, reject) => {
                    service.fetchAll()
                        .then((menus) => {
                            this.treeData = array2Tree(menus, {})// 转换为树形结构数据
                            resolve()
                        })
                        .catch(e => reject(e))
                        .finally(() => this.isTableDataLoading = false)
                })
            }

        },

        created() {
            this.fetchAll()
        }

    }
</script>

<style lang="less" scoped>
    .rbac-menu {
        .left-button {
            margin-right: 8px;
        }
    }
</style>