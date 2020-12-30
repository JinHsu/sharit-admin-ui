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
            <a-form-item label="执行监听器">
                <a-badge :count="executionListenerSize">
                    <a-button @click="setExecutionListenerEditorVisible(true)">编辑</a-button>
                </a-badge>
            </a-form-item>
            <a-form-item label="异步">
                <a-switch checked-children="是" un-checked-children="否"
                          v-decorator="['async', rules.async]"/>
            </a-form-item>
        </a-form>

        <execution-listener-editor
                :modeler="this.modeler" :element="this.element" @save="onSaveExecutionListener"/>
    </div>
</template>

<script>
    import {itemMixin, panelMixin} from '../../mixins'
    import {ExecutionListenerEditor} from '../../item-editor'
    import rules from "./rules"

    export default {
        name: 'GatewayPanel',

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
            const {id, name, documentation, executionListener, async}
                = this.parseElement(this.element)
            this.$nextTick(() => this.form.setFieldsValue({
                id, name, documentation, executionListener, async
            }))
        },

    }
</script>

<style>

</style>
