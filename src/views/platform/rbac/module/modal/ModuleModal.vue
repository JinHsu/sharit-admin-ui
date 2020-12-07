<template>
    <a-modal :visible="value" :title="modalTitle" centered @cancel="onCancel">
        <template slot="footer">
            <a-button @click="onCancel">取消</a-button>
            <a-button type="primary" :loading="loading" @click="onSave">保存</a-button>
        </template>

        <a-form id="form" :form="form" ref="form">
            <a-form-item label="模块编码">
                <a-input v-decorator="['code', rules.code]" autoComplete="off"/>
            </a-form-item>
            <a-form-item label="模块名称">
                <a-input v-decorator="['title', rules.title]" autoComplete="off"/>
            </a-form-item>
            <a-form-item label="上级模块">
                <ModuleRefer :sync="value" v-decorator="['parentId']" :disabled="isEdit"/>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-decorator="['remark']"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import ModuleRefer from "@/views/platform/rbac/module/refer/ModuleRefer";

    export default {
        name: "ModuleModal",
        components: {ModuleRefer},
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
                rules: {
                    code: {
                        rules: [
                            {required: true, message: '请输入模块编码'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    title: {
                        rules: [
                            {required: true, message: '请输入模块名称'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
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
                return this.modalType === 'add' ? '新增模块' : '修改模块'
            },
            isEdit() {
                return this.modalType === 'edit'
            }
        },

        watch: {
            value(visible) {
                if (!visible) {
                    this.form.resetFields()
                    this.loading = false
                } else if (this.modalType === 'edit') {
                    const {code, title, parentId, remark} = this.modalData || {}
                    const values = {code, title, parentId, remark}
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