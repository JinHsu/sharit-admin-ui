<template>
    <div>
        <a-modal :visible="taskListenerEditorVisible" title="任务监听器" :maskClosable="false" width="900px"
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
                <a-table :columns="columns" :data-source="datas"
                         :pagination="false" size="middle">
                    <span slot="eventTitle">
                        <span style="margin-right: 8px;">事件</span>
                        <a-tooltip :overlayStyle="{minWidth: '480px'}" placement="right" trigger="click">
                            <a-icon type="info-circle" theme="filled" style="color: #1890ff;"/>
                            <template slot="title">
                                <event-tooltip/>
                            </template>
                        </a-tooltip>
                    </span>

                    <template slot="type" slot-scope="text">
                        {{ text | type }}
                    </template>

                    <template slot="operation" slot-scope="text, record">
                        <a @click="() => onEdit(record)">编辑</a>
                        <a-divider type="vertical"/>
                        <a-popconfirm title="确定要删除吗？" @confirm="() => onDelete(record)">
                            <a>删除</a>
                        </a-popconfirm>
                    </template>
                </a-table>
            </a-card>
        </a-modal>

        <task-listener-modal
                v-model="taskListenerModalVisible"
                :modal-type="taskListenerModalType"
                :modal-data="taskListenerModalData"
                @onSave="onSave"/>
    </div>
</template>

<script>
    import itemMixin from "../../../mixins/itemMixin"
    import EventTooltip from './EventTooltip'
    import columns from './columns'
    import TaskListenerModal from './modal'

    export default {
        name: "TaskListener",

        props: {
            modeler: {type: Object, required: true},
            element: {type: Object, required: true}
        },

        components: {EventTooltip, TaskListenerModal},

        data() {
            return {
                //
                loading: false,
                datas: [],
                columns: columns,

                taskListenerModalVisible: false,
                taskListenerModalType: 'add',
                taskListenerModalData: null,
            }
        },

        mixins: [itemMixin],

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
            onCancel() {
                this.setTaskListenerEditorVisible(false)
            },

            onAdd() {
                this.taskListenerModalType = 'add'
                this.taskListenerModalVisible = true
            },

            onSave(data, callback) {
                if (this.taskListenerModalType === 'add') { // 新增
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
                this.taskListenerModalType = 'edit'
                this.taskListenerModalData = record
                this.taskListenerModalVisible = true
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

            onSaveAll() {
                this.loading = true
                // 删除key
                const taskListeners = this.deepClone2(this.datas)
                const callback = (show = false) => {
                    this.loading = false
                    this.setTaskListenerEditorVisible(show)
                }
                this.setTaskListenerSize(taskListeners.length)
                // 更新属性
                this.$emit('save', taskListeners, callback)
            },

            deepClone(taskListeners) { // 添加key
                let index = 0
                return taskListeners.map(item => ({...item, key: index++}))
            },

            deepClone2(taskListeners) { // 删除key
                return taskListeners.map(item => {
                    let data = {...item}
                    delete data.key
                    return data
                })
            },
        },

        mounted() {
            const taskListeners = this.obtainListeners(this.element, 'TaskListener')
            this.datas = this.deepClone(taskListeners)
            this.setTaskListenerSize(taskListeners.length)
        }
    }
</script>

<style lang="less" scoped>

</style>