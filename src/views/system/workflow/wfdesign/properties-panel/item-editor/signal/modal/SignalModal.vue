<template>
    <a-modal :visible="value" :title="modalTitle" :maskClosable="false" @cancel="onCancel">
        <template slot="footer">
            <a-button icon="undo" @click="onCancel">取消</a-button>
            <a-button type="primary" icon="save" :loading="loading" @click="onSave">保存</a-button>
        </template>

        <a-form :form="form">
            <a-form-item label="scope">
                <a-select v-decorator="['scope', rules.scope]">
                    <template v-for="scopeOption in scopeOptions">
                        <a-select-option :key="scopeOption.value" :value="scopeOption.value">
                            {{scopeOption.label}}
                        </a-select-option>
                    </template>
                </a-select>
            </a-form-item>
            <a-row :gutter="8">
                <a-col :span="12">
                    <a-form-item label="ID">
                        <a-input v-decorator="['id', rules.id]"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="名称">
                        <a-input v-decorator="['name', rules.name]"/>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script>
    import rules from "../rules"

    export default {
        name: "SignalModal",

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
                scopeOptions: [
                    {label: '全局', value: 'start'},
                    {label: '流程实例', value: 'end'}
                ],
            }
        },

        computed: {
            modalTitle() {
                return this.modalType === 'add' ? '新增信号' : '修改信号'
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
                    let {scope, id, name} = this.modalData || {}
                    const values = {scope, id, name}
                    this.$nextTick(() => {
                        this.form.setFieldsValue(values)
                    })
                }
            }
        }

    }
</script>

<style lang="less" scoped>

</style>