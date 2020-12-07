<template>
    <a-modal centered :visible="value" :title="modalTitle" @cancel="onCancel">
        <template slot="footer">
            <a-button @click="onCancel">取消</a-button>
            <a-button type="primary" :loading="loading" @click="onSave">保存</a-button>
        </template>

        <a-form layout="horizontal" id="form" :form="form" ref="form">
            <a-row :gutter="8">
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
            <a-row>
                <a-col>
                    <a-form-item label="组件路径">
                        <a-input v-decorator="['component', rules.component]" autoComplete="off"/>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <a-form-item label="所属模块">
                        <ModuleRefer :sync="value" v-decorator="['moduleId', rules.moduleId]"/>
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
    import ModuleRefer from "@/views/platform/rbac/module/refer"
    import moduleService from '@/views/platform/rbac/module/service'
    import {array2Tree} from "@/utils/data";
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
                formData: {},
                treeData: []
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
            },

            async syncData() {
                const modules = await moduleService.fetchAll()
                // 转换为树形结构数据
                this.treeData = array2Tree(modules, {})
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

        mounted() {
            this.syncData()
        },

        watch: {
            value(visible) {
                if (visible) {
                    this.syncData()
                }
                if (!visible) {
                    this.form.resetFields()
                    this.loading = false
                } else if (this.modalType === 'edit') {
                    const {code, title, component, moduleId, remark} = this.modalData || {}
                    const values = {code, title, component, moduleId, remark}
                    this.$nextTick(() => this.form.setFieldsValue(values))
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>