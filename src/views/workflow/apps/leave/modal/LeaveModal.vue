<template>
    <a-modal :visible="value" :title="modalTitle" :maskClosable="false" :width="1040"
             @cancel="onCancel">
        <template slot="footer">
            <a-button icon="undo" @click="onCancel">取消</a-button>
            <a-button type="primary" icon="save" :loading="loading" @click="onSave">保存</a-button>
            <a-button type="primary" :loading="loading">保存并提交</a-button>
        </template>

        <a-form id="form" :form="form" ref="form">
            <a-row :gutter="[8, 8]">
                <a-col :span="6">
                    <a-form-item label="单据类型">
                        <a-input v-decorator="['billType', rules.billType]" disabled=""/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="单据编码">
                        <a-input v-decorator="['billCode', rules.billCode]" disabled=""/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="单据名称">
                        <a-input v-decorator="['billName', rules.billName]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="单据状态">
                        <a-select v-decorator="['billState', rules.billState]" disabled="">
                            <template v-for="billStateOption in billStateOptions">
                                <a-select-option :key="billStateOption.value" :value="billStateOption.value">
                                    {{ billStateOption.label }}
                                </a-select-option>
                            </template>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="[8, 8]">
                <a-col :span="6">
                    <a-form-item label="请假天数">
                        <a-input-number :min="1" :max="30" v-decorator="['leaveDays', rules.leaveDays]"
                                        autoComplete="off" style="width: 100%"/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="开始日期">
                        <a-date-picker placeholder="" v-decorator="['startDate', rules.startDate]" style="width: 100%"/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="结束日期">
                        <a-date-picker placeholder="" v-decorator="['endDate', rules.endDate]" disabled=""
                                       style="width: 100%"/>
                    </a-form-item>
                </a-col>
            </a-row>

            <a-form-item label="请假原因" autoComplete="off">
                <a-textarea :maxLength="200" v-decorator="['leaveReason', rules.leaveReason]"/>
            </a-form-item>

            <a-row :gutter="[8, 8]">
                <a-col :span="6">
                    <a-form-item label="提交人">
                        <a-input v-decorator="['submittedBy']" disabled=""/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="提交时间">
                        <a-date-picker showTime placeholder="" v-decorator="['submittedTime']" disabled=""
                                       style="width: 100%"/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="审批人">
                        <a-input v-decorator="['approvedBy']" disabled=""/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="审批时间">
                        <a-date-picker showTime placeholder="" v-decorator="['approvedTime']" disabled=""
                                       style="width: 100%"/>
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="[8, 8]">
                <a-col :span="6">
                    <a-form-item label="创建人">
                        <a-input v-decorator="['createdBy']" disabled=""/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="创建时间">
                        <a-date-picker showTime placeholder="" v-decorator="['createdTime']" disabled=""
                                       style="width: 100%"/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="最后修改人">
                        <a-input v-decorator="['lastModifiedBy']" disabled=""/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="最后修改时间">
                        <a-date-picker showTime placeholder="" v-decorator="['lastModifiedTime']" disabled=""
                                       style="width: 100%"/>
                    </a-form-item>
                </a-col>
            </a-row>

        </a-form>
    </a-modal>
</template>

<script>
    import rules from '../rules'
    import {formatDate} from "@/utils/datetime";

    export default {
        name: "GroupModal",
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
                loading: false,

                billStateOptions: [
                    {label: '未保存', value: 0},
                    {label: '已保存', value: 1},
                    {label: '已提交', value: 2},
                    {label: '审批中', value: 3},
                    {label: '驳回', value: 4},
                    {label: '审批成功', value: 5},
                    {label: '审批失败', value: 6},
                ]
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
                return this.modalType === 'add' ? '新增请假申请' : '修改请假申请'
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
                    const {
                        processKey, billCode, billName, billState, leaveDays, leaveReason,
                        startDate, endDate, submittedBy, submittedTime, approvedBy, approvedTime,
                        createdBy, createdTime, lastModifiedBy, lastModifiedTime
                    } = this.modalData || {}
                    const values = {
                        processKey, billCode, billName, billState, leaveDays, leaveReason,
                        startDate, endDate, submittedBy, submittedTime, approvedBy, approvedTime,
                        createdBy, createdTime, lastModifiedBy, lastModifiedTime
                    }
                    this.$nextTick(() => this.form.setFieldsValue(values))
                } else {
                    const callback = (defaultValue) => {
                        this.$nextTick(() => this.form.setFieldsValue(defaultValue))
                    }

                    this.$emit('setDefaultValue', callback)
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>