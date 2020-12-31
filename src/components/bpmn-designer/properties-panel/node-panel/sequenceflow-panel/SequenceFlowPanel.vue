<template>
    <div style="padding: 10px 0;">
        <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="ID">
                <a-input v-decorator="['id', rules.id]"/>
            </a-form-item>
            <a-form-item label="名称">
                <a-input v-decorator="['name']"/>
            </a-form-item>
            <a-form-item label="描述">
                <a-textarea v-decorator="['documentation']"/>
            </a-form-item>
            <a-form-item label="颜色">
                <a-color-picker v-decorator="['color', rules.color]"/>
            </a-form-item>
            <a-form-item label="执行监听器">
                <a-badge :count="executionListenerSize">
                    <a-button @click="setExecutionListenerEditorVisible(true)">编辑</a-button>
                </a-badge>
            </a-form-item>
            <a-form-item label="跳转条件">
                <a-input v-decorator="['conditionExpression']"/>
            </a-form-item>
            <a-form-item label="跳过表达式">
                <a-input v-decorator="['skipExpression']"/>
            </a-form-item>
        </a-form>

        <execution-listener-editor
                :modeler="this.modeler" :element="this.element" @save="onSaveExecutionListener"/>
    </div>
</template>

<script>
    import {itemMixin, panelMixin} from '../../../mixins'
    import {ExecutionListenerEditor} from '../../item-editor'
    import rules from "./rules"

    export default {
        name: 'SequenceFlowPanel',

        components: {
            ExecutionListenerEditor
        },

        data() {
            return {
                form: this.$form.createForm(this, {
                    onFieldsChange: this.onFieldsChange
                }),
                formData: {},
                rules: rules
            }
        },

        mixins: [panelMixin, itemMixin],

        methods: {
            onSaveExecutionListener(executionListeners, callback) {
                this.updateListeners(executionListeners)
                callback && callback()
            }
        },

        created() {
            const {id, name, documentation, color, executionListener, conditionExpression, skipExpression}
                = this.parseElement(this.element)
            this.$nextTick(() => this.form.setFieldsValue({
                id,
                name,
                documentation, color,
                executionListener,
                conditionExpression,
                skipExpression
            }))
        },

    }
</script>

<style></style>
