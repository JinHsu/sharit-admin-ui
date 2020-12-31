<template>
    <a-modal :visible="multiInstanceEditorVisible" title="配置多实例" :maskClosable="false" @cancel="onCancel">
        <template slot="footer">
            <a-button icon="undo" @click="onCancel">取消</a-button>
            <a-button icon="delete" @click="onClear">清空</a-button>
            <a-button type="primary" icon="save" :loading="loading" @click="onSave">保存</a-button>
        </template>

        <top-alert/>

        <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
            <a-form-item>
                <template slot="label">
                    <a-space>
                        <span>集合</span>
                        <collection-tooltip/>
                    </a-space>
                </template>
                <a-input v-decorator="['collection']"/>
            </a-form-item>
            <a-form-item>
                <template slot="label">
                    <a-space>
                        <span>元素变量</span>
                        <element-variable-tooltip/>
                    </a-space>
                </template>
                <a-input v-decorator="['elementVariable']"/>
            </a-form-item>
            <a-form-item label="执行方式">
                <a-radio-group v-decorator="['isSequential']">
                    <a-radio :value="true">串行</a-radio>
                    <a-radio :value="false">并行</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item>
                <template slot="label">
                    <a-space>
                        <span>完成条件</span>
                        <completion-condition-tooltip/>
                    </a-space>
                </template>
                <a-input v-decorator="['completionCondition']"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import {itemMixin, panelMixin} from '../../../mixins'
    import TopAlert from './alert'
    import {CollectionTooltip, CompletionConditionTooltip, ElementVariableTooltip} from './tooltips'

    export default {
        name: "MultiInstance",

        props: {
            modeler: {type: Object, required: true},
            element: {type: Object, required: true}
        },

        components: {
            TopAlert, CollectionTooltip, CompletionConditionTooltip, ElementVariableTooltip
        },

        data() {
            return {
                form: this.$form.createForm(this, {
                    onFieldsChange: this.onFieldsChange
                }),
                loading: false,
                formData: {},
            }
        },

        mixins: [itemMixin, panelMixin],

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
                        Object.assign(saveData, this.formData)

                        const callback = (show = false) => {
                            this.loading = false
                            this.setMultiInstanceEditorVisible(show)
                        }

                        try {
                            this.$emit('save', saveData, callback)
                        } finally {
                            this.loading = false
                        }

                    } else {
                        this.loading = false
                    }
                })
            },

            onCancel() {
                this.setMultiInstanceEditorVisible(false)
            },

            onClear() {
                this.form.resetFields()
            },

            deepClone(value) {
                return JSON.parse(JSON.stringify(value))
            }
        },

        watch: {
            multiInstanceEditorVisible(visible) {
                if (visible) {
                    const cache = this.deepClone(this.element.businessObject.loopCharacteristics ?? {})
                    cache.completionCondition = cache.completionCondition?.body
                    const {collection, completionCondition, elementVariable, isSequential} = this.formatJsonKeyValue(cache)
                    this.$nextTick(() => {
                        this.form.setFieldsValue({collection, completionCondition, elementVariable, isSequential})
                    })
                } else {
                    this.onClear()
                }
            }
        }

    }
</script>

<style lang="less" scoped>

</style>