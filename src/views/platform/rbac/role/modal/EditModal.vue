<template>
    <a-modal :visible="value" :title="modalTitle" centered @cancel="onCancel">
        <template slot="footer">
            <a-button @click="onCancel">取消</a-button>
            <a-button type="primary" :loading="loading" @click="onSave">保存</a-button>
        </template>

        <a-form id="form" :form="form" ref="form">
            <a-form-item label="角色编码">
                <a-input v-decorator="['code', rules.code]" autoComplete="off"/>
            </a-form-item>
            <a-form-item label="角色名称">
                <a-input v-decorator="['title', rules.title]" autoComplete="off"/>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-decorator="['remark']"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import rules from '../rules'

    export default {
        name: "EditModal",
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
            }
        },

        data() {
            return {
                form: this.$form.createForm(this, {
                    onFieldsChange: this.onFieldsChange
                }),
                loading: false,
                formData: {},
                rules: rules
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
                // eslint-disable-next-line no-unused-vars
                this.form.validateFields({force: true}, (err, values) => {
                        if (!err) {
                            const saveData = {}
                            if (this.modalType === 'edit') {
                                Object.assign(saveData, this.modalData)
                            }
                            Object.assign(saveData, this.formData)

                            const callback = () => {
                                this.loading = false
                                this.$emit('input', false)
                            }

                            this.$emit('doSave', saveData, callback)

                        } else {
                            this.loading = false
                        }
                    }
                )
            },

            onCancel() {
                this.$emit('input', false)
            }
        },

        computed: {
            modalTitle() {
                return this.modalType === 'add' ? '新增角色' : '修改角色'
            }
        },

        watch: {
            value(visible) {
                if (!visible) {
                    this.form.resetFields()
                    this.loading = false
                } else if (this.modalType === 'edit') {
                    const {code, title, remark} = this.modalData || {}
                    const values = {code, title, remark}
                    this.$nextTick(() => {
                        this.form.setFieldsValue(values)
                    })
                }
            }
        }

    }
</script>

<style scoped>

</style>