<template>
    <a-modal :visible="value" :title="modalTitle" :maskClosable="false" @cancel="onCancel">
        <template slot="footer">
            <a-button icon="undo" @click="onCancel">取消</a-button>
            <a-button type="primary" icon="save" :loading="loading" @click="onSave">保存</a-button>
        </template>

        <a-form :form="form">
            <a-row :gutter="8">
                <a-col :span="12">
                    <a-form-item label="事件">
                        <a-select v-decorator="['event', rules.event]">
                            <template v-for="eventOption in eventOptions">
                                <a-select-option :key="eventOption.value" :value="eventOption.value">
                                    {{eventOption.label}}
                                </a-select-option>
                            </template>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="类型">
                        <a-select v-decorator="['type', rules.type]">
                            <template v-for="typeOption in typeOptions">
                                <a-select-option :key="typeOption.value" :value="typeOption.value">
                                    {{typeOption.label}}
                                </a-select-option>
                            </template>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>

            <a-form-item label="类名">
                <a-input v-decorator="['className', rules.className]" autoComplete="off"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import rules from "../rules"

    export default {
        name: "TaskListenerModal",

        props: {
            value: {
                type: Boolean,
                default: false
            },
            modalData: {
                type: Object,
                default: null
            },
            modalType: {
                type: String,
                default: 'add'
            },
        },

        data() {
            return {
                form: this.$form.createForm(this, {
                    onFieldsChange: this.onFieldsChange
                }),
                rules: rules,
                loading: false,
                formData: {},

                //
                eventOptions: [
                    {label: 'create', value: 'create'},
                    {label: 'assignment', value: 'assignment'},
                    {label: 'complete', value: 'complete'},
                    {label: 'delete', value: 'delete'}
                ],
                typeOptions: [
                    {label: '类', value: 'class'},
                    {label: '表达式', value: 'expression'},
                    {label: '委托表达式', value: 'delegateExpression'}
                ],
            }
        },

        computed: {
            modalTitle() {
                return this.modalType === 'add' ? '新增任务监听器' : '修改任务监听器'
            }
        },

        methods: {
            onFieldsChange(props, fields) {
                Object.values(fields).forEach((field) => {
                    const {name, value} = field
                    this.formData[name] = value
                })
            },

            onSave() {
                this.loading = true
                this.form.validateFields({force: true}, (err) => {
                    if (!err) {
                        const saveData = {}
                        if (this.modalType === 'edit') {
                            Object.assign(saveData, this.modalData)
                        }
                        Object.assign(saveData, this.formData)

                        const callback = (show = false) => {
                            this.loading = false
                            this.$emit('input', show)
                        }

                        try {
                            this.$emit('onSave', saveData, callback)
                        } finally {
                            this.loading = false
                        }

                    } else {
                        this.loading = false
                    }
                })
            },

            onCancel() {
                this.$emit('input', false)
            }
        },

        watch: {
            value(visible) {
                if (!visible) {
                    this.form.resetFields()
                    this.loading = false
                } else if (this.modalType === 'edit') {
                    let {event, type, className} = this.modalData || {}
                    const values = {event, type, className}
                    this.$nextTick(() => {
                        this.form.setFieldsValue(values)
                    })
                } else if (this.modalType === 'add') {
                    // const values = {enabled: false, locked: false}
                    // this.$nextTick(() => this.form.setFieldsValue(values))
                }
            }
        }

    }
</script>

<style lang="less" scoped>

</style>