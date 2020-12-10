<template>
    <a-modal :visible="value"
             :title="modalTitle"
             @cancel="onCancel">
        <template slot="footer">
            <a-button @click="onCancel">取消</a-button>
            <a-button type="primary" :loading="loading" @click="onSave">保存</a-button>
        </template>

        <a-form id="form" :form="form" ref="form">
            <a-row :gutter="[8, 8]">
                <a-col :span="12">
                    <a-form-item label="模块编码">
                        <a-input v-decorator="['code', rules.code]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="模块名称">
                        <a-input v-decorator="['title', rules.title]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <a-form-item label="上级模块">
                        <module-refer :sync="value" v-decorator="['parentId']"/>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <a-form-item label="备注">
                        <a-textarea v-decorator="['remark']"/>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script>
    import ModuleRefer from "../refer"
    import rules from '../rules'

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
                formData: {},
                rules: rules,
                loading: false
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
                this.form.validateFields({force: true}, (err) => {
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

                            this.$emit('onSave', saveData, callback)

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
                    this.$nextTick(() => this.form.setFieldsValue(values))
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>