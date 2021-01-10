<template>
    <a-modal class="model-modal"
             :visible="value" :title="modalTitle" :maskClosable="false" centered
             width="85%" :bodyStyle="{height: modalBodyHeight, padding: '0'}"
             @cancel="onCancel">
        <template slot="footer">
            <a-button icon="close" @click="onCancel">关闭</a-button>
        </template>

        <bpmn-designer
                :is-view="false"
                :xml="xml"
                :users="users" :groups="groups" :categorys="categorys" :roles="roles"
                @save="onSave"/>

    </a-modal>
</template>

<script>
    import BpmnDesigner from '@/components/bpmn-designer'

    export default {
        name: "ModelDesign",

        props: {
            value: {
                type: Boolean,
                default: false
            },
            xml: {
                type: String
            }
        },

        components: {
            BpmnDesigner
        },

        data() {
            return {
                users: [
                    {name: '张三', id: 'zhangsan'},
                    {name: '李四', id: 'lisi'},
                    {name: '王五', id: 'wangwu'}
                ],
                groups: [
                    {name: 'web组', id: 'web'},
                    {name: 'java组', id: 'java'},
                    {name: 'python组', id: 'python'}
                ],
                categorys: [
                    {name: '审批流', id: 'apprv'},
                    {name: '工作流', id: 'work'},
                    {name: '业务流', id: 'busi'},
                ],
                roles: [
                    {value: 'manager', label: '经理'},
                    {value: 'personnel', label: '人事'},
                    {value: 'charge', label: '主管'}
                ],

            }
        },

        computed: {
            modalTitle() {
                return '模型设计'
            },
            modalBodyHeight() {
                return document.body.clientHeight - 200 + 'px'
            }
        },

        methods: {
            onCancel() {
                this.$emit('input', false)
            },

            onSave(data) {
                this.$emit('save', data)
            }
        },

        watch: {}

    }
</script>

<style lang="less">
    .model-modal {
        .ant-modal-footer {
            text-align: center;
        }
    }
</style>