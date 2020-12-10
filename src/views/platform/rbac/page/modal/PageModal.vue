<template>
    <a-modal :visible="value" :title="modalTitle" :maskClosable="false"
             @cancel="onCancel">
        <template slot="footer">
            <a-button icon="undo" @click="onCancel">取消</a-button>
            <a-button type="primary" icon="save" :loading="loading" @click="onSave">保存</a-button>
        </template>

        <a-form layout="horizontal" id="form" :form="form" ref="form">
            <a-row :gutter="[8, 8]">
                <a-col :span="12">
                    <a-form-item label="页面编码">
                        <a-input v-decorator="['code', rules.code]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="页面名称">
                        <a-input v-decorator="['title', rules.title]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="[8, 8]">
                <a-col :span="12">
                    <a-form-item label="所属模块">
                        <module-refer :sync="value" v-decorator="['moduleId', rules.moduleId]"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="按钮权限">
                        <a-radio-group v-decorator="['usePerm', rules.usePerm]">
                            <a-radio :value="true">启用</a-radio>
                            <a-radio :value="false">不启用</a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <a-col>
                        <a-form-item label="组件路径">
                            <a-input v-decorator="['component', rules.component]" autoComplete="off"/>
                        </a-form-item>
                    </a-col>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <a-form-item label="备注">
                        <a-textarea v-decorator="['remark', rules.remark]"/>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script>
    import ModuleRefer from "@/views/platform/rbac/module/refer/ModuleRefer"
    import rules from '../rules'

    export default {
        name: "PageModal",
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
                rules: rules,
                loading: false,
                formData: {}
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
                return this.modalType === 'add' ? '新增页面' : '修改页面'
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
                    const {code, title, component, usePerm, moduleId, remark} = this.modalData || {}
                    const values = {code, title, component, usePerm, moduleId, remark}
                    this.$nextTick(() => this.form.setFieldsValue(values))
                } else if (this.modalType === 'add') {
                    this.$nextTick(() => this.form.setFieldsValue({usePerm: false}))
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>