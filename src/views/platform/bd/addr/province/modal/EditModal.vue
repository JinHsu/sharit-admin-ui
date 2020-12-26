<template>
    <a-modal :visible="value" :title="modalTitle" :maskClosable="false"
             @cancel="onCancel">
        <template slot="footer">
            <a-button icon="undo" @click="onCancel">取消</a-button>
            <a-button type="primary" icon="save" :loading="loading" @click="onSave">保存</a-button>
        </template>

        <a-form id="form" :form="form" ref="form">
            <a-row :gutter="8">
                <a-col :span="12">
                    <a-form-item label="省（直辖市）编码">
                        <a-input v-decorator="['code', rules.code]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="省（直辖市）简称">
                        <a-input v-decorator="['title', rules.title]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="8">
                <a-col :span="12">
                    <a-form-item label="全称">
                        <a-input v-decorator="['name', rules.name]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="邮政编码">
                        <a-input v-decorator="['zip', rules.zip]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item label="所属国家（地区）">
                <nation-refer v-decorator="['parentId', rules.parentId]"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import NationRefer from "@/views/platform/bd/addr/nation/refer/NationRefer"
    import rules from '../rules'

    export default {
        name: "EditModal",

        components: {NationRefer},

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

                            const callback = (show = false) => {
                                this.loading = false
                                this.$emit('input', show)
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
                return this.modalType === 'add' ? '新增省（直辖市）' : '修改省（直辖市）'
            }
        },

        watch: {
            value(visible) {
                if (!visible) {
                    this.form.resetFields()
                    this.loading = false
                } else if (this.modalType === 'edit') {
                    const {code, title, name, zip, parentId} = this.modalData || {}
                    const values = {code, title, name, zip, parentId}
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