<template>
    <div class="rbac-menu">
        <a-card :bordered="false" size="small">
            <template slot="title">
                <a-button type="primary" icon="plus" @click="onAdd" class="left-button">新增</a-button>
                <a-button icon="reload" :loading="isLoading" @click="doRefresh" class="left-button">刷新</a-button>
            </template>
            <a-table :columns="columns" :data-source="data"
                     :pagination="false"
                     :loading="isTableDataLoading" rowKey="id"
            >

            <span slot="name" slot-scope="text, record">
                <a-icon :type="record.icon" v-if="record.icon"/>
                {{ record.title }}
            </span>

                <span slot="fake" slot-scope="text, record">
                <a-checkbox :default-checked="record.fake" :disabled="true"/>
            </span>

                <span slot="page" slot-scope="text, record">
                <a-icon type="link" v-if="record.pageId"/>
                {{ record.pageId | pageFilter(pageMap) }}
            </span>

                <span slot="operation" slot-scope="text, record">
                <a @click="onEdit(record)">修改</a>
                <template v-if="!record.children || record.children.length === 0">
                    <a-divider type="vertical"/>
                    <a @click="onDelete(record)">删除</a>
                </template>
            </span>
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
    import {array2Map, array2Tree} from "@/utils/data"

    export default {
        name: "Menu",
        components: {
            MenuModal,
        },
        data() {
            return {
                columns: columns,
                data: [],
                isLoading: false,
                isTableDataLoading: false,
                pageMap: null,

                //
                schemeId: '87145126-e28d-4697-bbe2-489e793ad474',

                //
                treeData: null, // 树渲染数据
                menu: null, // 选中的数据
                modalVisible: false, // 模态框状态
                modalType: null, // 模块框标题
                searchLoading: false
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
            async doRefresh() {
                this.isLoading = true
                await this.fetchAssociatedPage()
                await this.fetchAll()
                this.$message.success('刷新成功！')
                this.isLoading = false
            },

            async fetchPage() {

            },

            async fetchMenu() {

            },

            async fetchAll() {
                const menus = await service.fetchAll()
                this.data = array2Tree(menus, {})
            },

            async fetchAssociatedPage() {
                const pages = await service.fetchMenuPage()
                this.pageMap = array2Map(pages, 'id')
            }

        },

        filters: {
            // 关联页面过滤器
            pageFilter(value, pageMap) {
                return pageMap.has(value) ? pageMap.get(value).title : ''
            }
        },

        created() {
            this.isTableDataLoading = true
            this.fetchAssociatedPage().then(() => {
                this.fetchAll().then(() => {
                    this.isTableDataLoading = false
                })
            })
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