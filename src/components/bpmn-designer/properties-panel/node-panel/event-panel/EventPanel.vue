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
            <a-form-item label="发起人" v-show="!!itemVisible.initiator">
                <a-input v-decorator="['initiator']"/>
            </a-form-item>
            <a-form-item label="表单标识key" v-show="!!itemVisible.formKey">
                <a-input v-decorator="['formKey']"/>
            </a-form-item>
        </a-form>

        <execution-listener-editor
                :modeler="this.modeler" :element="this.element" @save="onSaveExecutionListener"/>
    </div>
</template>

<script>
    import {itemMixin, panelMixin} from '../../../mixins'
    import {ExecutionListenerEditor} from "../../item-editor"
    import rules from './rules'

    export default {
        name: 'EventPanel',

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
            const {id, name, documentation, color, executionListener, initiator, formKey}
                = this.parseElement(this.element)
            this.$nextTick(() => this.form.setFieldsValue({
                id, name, documentation, color, executionListener, initiator, formKey
            }))
        },

    }
</script>

<style lang="less" scoped>

</style>
