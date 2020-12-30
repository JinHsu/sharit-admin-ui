<template>
    <div class="execution-listener">
        <a-modal :visible="executionListenerEditorVisible" title="执行监听器" :maskClosable="false" width="900px"
                 :bodyStyle="{padding: '0'}"
                 @cancel="onCancel">
            <template slot="footer">
                <a-button icon="undo" @click="onCancel">取消</a-button>
                <a-button type="primary" icon="save" :loading="loading" @click="onSaveAll">保存</a-button>
            </template>

            <a-card :bordered="false" size="small">
                <template slot="title">
                    <a-space>
                        <a-button type="primary" icon="plus" @click="onAdd">新增</a-button>
                    </a-space>
                </template>
                <a-table :columns="executionListenerColumns" :data-source="datas" :pagination="false" size="middle"
                         :expandIconAsCell="false" :expandIconColumnIndex="3"
                         :expandedRowKeys="expandedRowKeys"
                         @expand="onExpand">
                    <span slot="typeTitle">
                        <span style="margin-right: 8px;">类型</span>
                        <a-tooltip :overlayStyle="{minWidth: '480px'}" placement="right" trigger="click">
                            <a-icon type="info-circle" theme="filled" style="color: #1890ff;"/>
                            <template slot="title">
                                <type-tooltip/>
                            </template>
                        </a-tooltip>
                    </span>

                    <template slot="type" slot-scope="text">
                        {{ text | type }}
                    </template>

                    <template slot="params" slot-scope="text, record">
                        <a-space>
                            <a @click="onSubAdd(record)">新增</a>
                            <a-badge :count="text.length">
                            </a-badge>
                        </a-space>
                    </template>

                    <template slot="operation" slot-scope="text, record">
                        <a @click="() => onEdit(record)">编辑</a>
                        <a-divider type="vertical"/>
                        <a-popconfirm title="确定要删除吗？" @confirm="() => onDelete(record)">
                            <a>删除</a>
                        </a-popconfirm>
                    </template>

                    <!-- 内嵌子表 -->
                    <a-table
                            size="middle"
                            slot="expandedRowRender"
                            :columns="listenerParamColumns"
                            slot-scope="text"
                            :data-source="text.params"
                            :pagination="false">
                        <template slot="type" slot-scope="text">
                            {{ text | type }}
                        </template>
                        <template slot="operation" slot-scope="text, record">
                            <a @click="() => onSubEdit(record)">编辑</a>
                            <a-divider type="vertical"/>
                            <a-popconfirm title="确定要删除吗？" @confirm="() => onSubDelete(record)">
                                <a>删除</a>
                            </a-popconfirm>
                        </template>
                    </a-table>
                </a-table>
            </a-card>
        </a-modal>

        <execution-listener-modal
                v-model="executionListenerModalVisible"
                :modal-type="executionListenerModalType"
                :modal-data="executionListenerModalData"
                @onSave="onSave"
        />
        <listener-param-modal
                v-model="listenerParamModalVisible"
                :modal-type="listenerParamModalType"
                :modal-data="listenerParamModalData"
                @onSave="onSubSave"
        />
    </div>
</template>

<script>
    import itemMixin from "../../mixins/itemMixin"
    import TypeTooltip from './TypeTooltip'
    import {executionListenerColumns, listenerParamColumns} from './columns'
    import {ExecutionListenerModal, ListenerParamModal} from './modal'

    export default {
        name: "ExecutionListener",

        props: {
            modeler: {type: Object, required: true},
            element: {type: Object, required: true}
        },

        components: {
            TypeTooltip, ExecutionListenerModal, ListenerParamModal
        },

        mixins: [itemMixin],

        data() {

            return {
                //
                loading: false,
                //
                executionListenerColumns: executionListenerColumns,
                listenerParamColumns: listenerParamColumns,
                datas: [],
                expandedRowKeys: [],

                executionListenerModalType: 'add',
                executionListenerModalData: null,
                executionListenerModalVisible: false,

                listenerParamModalVisible: false,
                listenerParamModalData: null,
                listenerParamModalType: 'add',
                //
                editingListener: null,
            }
        },

        filters: {
            type(value) {
                if (value === 'class') return '类'
                if (value === 'expression') return '表达式'
                if (value === 'delegateExpression') return '委托表达式'
                if (value === 'stringValue') return '字符串'
            }
        },

        methods: {
            //
            onExpand(expanded, record) {
                if (expanded) {
                    this.expandedRowKeys = [record.key]
                    this.editingListener = record
                } else {
                    this.expandedRowKeys = []
                }
            },

            //
            onCancel() {
                this.setExecutionListenerEditorVisible(false)
            },

            onAdd() {
                this.executionListenerModalType = 'add'
                this.executionListenerModalVisible = true
            },

            onSave(data, callback) {
                if (this.executionListenerModalType === 'add') { // 新增
                    const length = this.datas.length
                    this.datas.push({...data, params: [], key: length})
                } else { // 修改
                    this.datas.forEach(param => {
                        if (param.key === data.key) {
                            Object.assign(param, data)
                        }
                    })
                }

                callback && callback()
            },

            onEdit(record) {
                this.executionListenerModalType = 'edit'
                this.executionListenerModalData = record
                this.executionListenerModalVisible = true
            },

            onDelete(record) {
                let pos = 0
                const length = this.datas.length
                for (let index = 0; index < length; index++) {
                    if (this.datas[index].key === record.key) {
                        pos = index
                    }
                }
                this.datas.splice(pos, 1)
            },

            onSubAdd(record) {
                this.editingListener = record
                //
                this.listenerParamModalType = 'add'
                this.listenerParamModalData = null
                this.listenerParamModalVisible = true
            },

            onSubEdit(record) {
                this.listenerParamModalType = 'edit'
                this.listenerParamModalData = record
                this.listenerParamModalVisible = true
            },

            onSubDelete(record) {
                let pos = 0
                const length = this.editingListener.params.length
                for (let index = 0; index < length; index++) {
                    if (this.editingListener.params[index].key === record.key) {
                        pos = index
                    }
                }
                this.editingListener.params.splice(pos, 1)
            },

            onSubSave(data, callback) {
                if (this.listenerParamModalType === 'add') { // 新增参数
                    const length = this.editingListener.params.length
                    this.editingListener.params.push({...data, key: length})
                } else { // 修改参数
                    this.editingListener.params.forEach(param => {
                        if (param.key === data.key) {
                            Object.assign(param, data)
                        }
                    })
                }

                callback && callback()
            },

            onSaveAll() {
                this.loading = true
                // 删除key
                const executionListeners = this.deepClone2(this.datas)
                const callback = (show = false) => {
                    this.loading = false
                    this.setExecutionListenerEditorVisible(show)
                }
                this.setExecutionListenerSize(executionListeners.length)
                // 更新属性
                this.$emit('save', executionListeners, callback)
            },

            deepClone(executionListeners) { // 添加key
                let index = 0
                return executionListeners.map(item => {
                    let data = {...item, key: index++}
                    let pos = 0
                    let params = item.params.map(param => ({...param, key: pos++})) ?? []
                    Object.assign(data, {params: params})
                    return data
                })
            },

            deepClone2(executionListeners) { // 删除key
                return executionListeners.map(item => {
                    let data = {...item}
                    delete data.key
                    let params = item.params.map(param => {
                        let param2 = {...param}
                        delete param2.key
                        return param2
                    }) ?? []
                    Object.assign(data, {params: params})
                    return data
                })
            },

        },

        mounted() {
            const executionListeners = this.obtainListeners(this.element, 'ExecutionListener')
            this.datas = this.deepClone(executionListeners)
            this.setExecutionListenerSize(executionListeners.length)
        }

    }
</script>

<style lang="less" scoped>
    .execution-listener {

    }
</style>