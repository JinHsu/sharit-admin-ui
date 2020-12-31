<template>
    <div>
        <a-modal :visible="signalEditorVisible" title="信号（alpha）" :maskClosable="false" width="900px"
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
                    <template slot="scope" slot-scope="text">
                        {{ text | scope }}
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

        <signal-modal
                v-model="signalModalVisible"
                :modal-type="signalModalType"
                :modal-data="signalModalData"
                @onSave="onSave"/>
    </div>
</template>

<script>
    import itemMixin from "../../../mixins/itemMixin"
    import columns from './columns'
    import SignalModal from './modal'

    export default {
        name: "Signal",

        props: {
            modeler: {type: Object, required: true},
            element: {type: Object, required: true}
        },

        components: {SignalModal},

        data() {
            return {
                //
                loading: false,
                datas: [],
                columns: columns,

                signalModalVisible: false,
                signalModalType: 'add',
                signalModalData: null,
            }
        },

        mixins: [itemMixin],

        filters: {
            scope(value) {
                if (value === 'start') return '全局'
                if (value === 'end') return '流程实例'
            }
        },

        methods: {
            //
            onCancel() {
                this.setSignalEditorVisible(false)
            },

            onAdd() {
                this.signalModalType = 'add'
                this.signalModalVisible = true
            },

            onSave(data, callback) {

                callback && callback()
            },

            onEdit() {

            },

            onDelete() {

            },

            onSaveAll() {

            },
        },

        mounted() {

        }
    }
</script>

<style lang="less" scoped>

</style>