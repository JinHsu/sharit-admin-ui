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
                    <a-form-item label="用户名">
                        <a-input v-decorator="['username', rules.username]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="失效日期">
                        <a-date-picker v-decorator="['expiryDate', rules.expiryDate]"
                                       style="width: 100%;"
                                       format="YYYY-MM-DD"/>
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="8">
                <a-col :span="12">
                    <a-form-item label="电子邮箱">
                        <a-input v-decorator="['email', rules.email]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="手机号">
                        <a-input v-decorator="['mobile', rules.mobile]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
            </a-row>

            <a-form-item label="备注">
                <a-textarea v-decorator="['remark']"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import rules from '../rules'
    import {formatDate, momentDate} from '@/utils/datetime'

    export default {
        name: "UserModal",
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
                            // 处理日期时间字段的格式
                            Object.keys(saveData).forEach(key => {
                                const value = saveData[key]
                                if (value && value['_isAMomentObject']) {
                                    saveData[key] = formatDate(value)
                                }
                            })

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
                return this.modalType === 'add' ? '新增用户' : '修改用户'
            }
        },

        watch: {
            value(visible) {
                if (!visible) {
                    this.form.resetFields()
                    this.loading = false
                } else if (this.modalType === 'edit') {
                    let {username, expiryDate, email, mobile, remark} = this.modalData || {}
                    expiryDate = momentDate(expiryDate)
                    const values = {username, expiryDate, email, mobile, remark}
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