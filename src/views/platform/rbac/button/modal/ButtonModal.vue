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
                    <a-form-item label="按钮编码">
                        <a-input v-decorator="['code', rules.code]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="按钮名称">
                        <a-input v-decorator="['title', rules.title]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="[8, 8]">
                <a-col :span="12">
                    <a-form-item label="Url">
                        <a-input v-decorator="['url', rules.url]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Method">
                        <a-select v-decorator="['method', rules.method]" autoComplete="off">
                            <a-select-option :value="1">GET</a-select-option>
                            <a-select-option :value="2">POST</a-select-option>
                            <a-select-option :value="3">PUT</a-select-option>
                            <a-select-option :value="4">DELETE</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="[8, 8]">
                <a-col :span="12">
                    <a-form-item label="所属页面">
                        <page-refer :sync="value" v-decorator="['pageId', rules.pageId]"/>
                    </a-form-item>
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
    import PageRefer from "@/views/platform/rbac/page/refer/PageRefer"
    import rules from "../rules"

    export default {
        name: "ButtonModal",

        components: {PageRefer},

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
            pageId: {
                type: String,
                required: false
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
                    const {code, title, url, method, pageId, remark} = this.modalData || {}
                    const values = {code, title, url, method, pageId, remark}
                    this.$nextTick(() => this.form.setFieldsValue(values))
                } else if (this.modalType === 'add') {
                    this.$nextTick(() => this.form.setFieldsValue({pageId: this.pageId}))
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>