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
                    <a-form-item label="流程模型编码">
                        <a-input v-decorator="['key', rules.key]" autoComplete="off" :disabled="modalType === 'edit'"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="流程模型名称">
                        <a-input v-decorator="['name', rules.name]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="8">
                <a-col :span="12">
                    <a-form-item label="流程分类">
                        <a-input v-decorator="['category', rules.category]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">

                </a-col>
            </a-row>
            <a-form-item label="元信息">
                <a-textarea v-decorator="['metaInfo', rules.metaInfo]" autoComplete="off"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import rules from '../rules'

    export default {
        name: "ModelModal",
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
                loading: false,
                form: this.$form.createForm(this, {
                    onFieldsChange: this.onFieldsChange
                }),
                rules: rules,
            }
        },

        methods: {
            onSave() {
                this.loading = true
                // eslint-disable-next-line no-unused-vars
                this.form.validateFields({force: true}, (err, values) => {
                        if (!err) {
                            const saveData = {}
                            if (this.modalType === 'edit') {
                                Object.assign(saveData, this.modalData)
                            }
                            // 添加界面上的数据
                            Object.assign(saveData, values)
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
                return this.modalType === 'add' ? '新增流程模型' : '修改流程模型'
            }
        },

        watch: {
            value(visible) {
                if (!visible) {
                    this.form.resetFields()
                    this.loading = false
                } else if (this.modalType === 'edit') {
                    let {key, name, category, metaInfo} = this.modalData || {}
                    const values = {key, name, category, metaInfo}
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

<style scoped>

</style>