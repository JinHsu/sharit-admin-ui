<template>
    <a-modal
            :visible="value"
            :title="modalTitle"
            @cancel="onCancel">

        <template slot="footer">
            <a-button
                    @click="onCancel">
                取消
            </a-button>
            <a-button
                    type="primary"
                    :loading="loading"
                    @click="onSave">
                保存
            </a-button>
        </template>

        <a-form layout="horizontal"
                id="form" :form="form" ref="form">

            <a-tabs defaultActiveKey="menu">
                <a-tab-pane key="menu" tab="基本信息" forceRender>
                    <a-row :gutter="8">
                        <a-col :span="12">
                            <a-form-item label="菜单编码">
                                <a-input v-decorator="['code', rules.code]" autoComplete="off"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="菜单名称">
                                <a-input v-decorator="['title', rules.title]" autoComplete="off"/>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col>
                            <a-form-item label="是否虚菜单">
                                <a-radio-group v-decorator="['fake', rules.fake]">
                                    <a-radio :value="true">是</a-radio>
                                    <a-radio :value="false">否</a-radio>
                                </a-radio-group>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col>
                            <a-form-item label="关联页面">
                                <PageRefer :sync="value" :disabled="formData.fake"
                                           v-decorator="['pageId', rules.pageId]"/>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col>
                            <a-form-item label="上级菜单">
                                <MenuRefer :sync="value"
                                           v-decorator="['parentId', rules.parentId]"/>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-tab-pane>

                <a-tab-pane key="route" tab="路由信息" forceRender>
                    <a-row :gutter="8">
                        <a-col :span="12">
                            <a-form-item label="路由路径">
                                <a-input v-decorator="['path', rules.path]" autoComplete="off"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="路由名称">
                                <a-input v-decorator="['name', rules.name]" autoComplete="off"/>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col>
                            <a-form-item label="重定向路径">
                                <a-input v-decorator="['redirect']" autoComplete="off"/>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col>
                            <a-form-item label="备注">
                                <a-textarea v-decorator="['remark', rules.remark]" autoComplete="off"/>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-tab-pane>

                <a-tab-pane key="icon" tab="图标" forceRender>
                    <a-row>
                        <a-col>
                            <a-form-item label="图标">
                                <a-input v-decorator="['icon']" autoComplete="off"/>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-tab-pane>
            </a-tabs>

        </a-form>
    </a-modal>
</template>

<script>
    import MenuRefer from "@/views/platform/rbac/menu/refer";
    import PageRefer from '@/views/platform/rbac/page/refer'

    export default {
        name: "ModuleModal",

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
            treeData: {
                type: Array,
                default: null
            }
        },

        components: {MenuRefer, PageRefer},

        data() {
            return {
                form: this.$form.createForm(this, {
                    onFieldsChange: this.onFieldsChange
                }),

                rules: {
                    code: {
                        rules: [
                            {required: true, message: '请输入菜单编码'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    title: {
                        rules: [
                            {required: true, message: '请输入菜单名称'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    path: {
                        rules: [
                            {required: true, message: '请输入路由路径'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    name: {
                        rules: [
                            {required: true, message: '请输入路由名称'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    fake: {
                        rules: [
                            {required: true, message: '请输入是否虚菜单'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    pageId: {},
                },

                loading: false,

                formData: {}
            }

        },

        methods: {
            onFieldsChange(props, fields) {
                Object.values(fields).forEach((field) => {
                    const {name, value} = field
                    this.formData[name] = value
                    if (name === 'fake') {
                        if (value) {
                            this.formData.pageId = null
                            this.$nextTick(() => this.form.setFieldsValue({pageId: null}))
                        }
                    }
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
            treeSelectData() {
                return this.treeData ? this.treeData : []
            },
            modalTitle() {
                return this.modalType === 'add' ? '新增菜单' : '修改菜单'
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
                    const {code, title, fake, pageId, parentId, path, name, redirect, remark, icon} = this.modalData || {}
                    const values = {code, title, fake, pageId, parentId, path, name, redirect, remark, icon}
                    this.$nextTick(() => this.form.setFieldsValue(values))
                } else if (this.modalType === 'add') {
                    const values = {fake: true}
                    this.$nextTick(() => this.form.setFieldsValue(values))
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    /deep/ .ant-modal-body {
        padding: 0 12px !important;
    }
</style>