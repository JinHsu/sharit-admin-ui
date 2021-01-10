<template>
    <a-modal :visible="value" title="审批" :maskClosable="false" :closable="false">
        <template slot="footer">
            <a-button icon="undo" @click="onCancel">取消</a-button>
            <a-button type="primary" icon="save" :loading="loading" @click="onOk">确定</a-button>
        </template>

        <a-form :form="form">
            <a-form-item>
                <a-radio-group :options="plainOptions"
                               v-decorator="['approval', rules.approval]"
                />
            </a-form-item>
            <a-form-item label="批语">
                <a-textarea v-decorator="['comment', rules.comment]"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    export default {
        name: "ApproveConfirmModal",

        props: {
            value: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                form: this.$form.createForm(this, {
                    onFieldsChange: this.onFieldsChange
                }),
                formData: {},
                loading: false,

                plainOptions: [
                    {label: '同意', value: true},
                    {label: '驳回', value: false},
                ],

                rules: {
                    approval: {
                        // initialValue: true,
                    },
                    comment: {
                        rules: [
                            {required: true, message: '请输入批语'}
                        ],
                        validateTrigger: ['change', 'blur']
                    }
                }
            }
        },

        methods: {
            onFieldsChange(props, fields) {
                Object.values(fields).forEach((field) => {
                    const {name, value} = field
                    this.formData[name] = value
                })
            },
            //
            onCancel() {
                this.$emit('input', false)
            },

            onOk() {
                this.loading = true
                // eslint-disable-next-line no-unused-vars
                this.form.validateFields({force: true}, (err) => {
                        if (!err) {
                            const callback = (show = false) => {
                                this.loading = false
                                this.$emit('input', show)
                            }

                            this.$emit('ok', this.formData, callback)

                        } else {
                            this.loading = false
                        }
                    }
                )
            },

        },

        watch: {
            value(visible) {
                if (!visible) {
                    this.form.resetFields()
                    this.loading = false
                } else {
                    const values = {approval: true}
                    this.$nextTick(() => this.form.setFieldsValue(values))
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>