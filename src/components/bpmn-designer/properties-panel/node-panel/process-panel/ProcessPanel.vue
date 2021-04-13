<template>
    <div style="padding: 10px 0;">
        <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="ID">
                <a-input v-decorator="['id', rules.id]" readOnly=""/>
            </a-form-item>
            <a-form-item label="名称">
                <a-input v-decorator="['name']"/>
            </a-form-item>
            <a-form-item label="描述">
                <a-textarea v-decorator="['documentation']"/>
            </a-form-item>
            <a-form-item label="分类">
                <a-select v-decorator="['processCategory', rules.category]">
                    <template v-for="category in categorys">
                        <a-select-option :key="category.id" :value="category.id">
                            {{category.name}}
                        </a-select-option>
                    </template>
                </a-select>
            </a-form-item>
            <a-form-item label="颜色">
                <a-color-picker v-decorator="['color', rules.color]"/>
            </a-form-item>
            <a-form-item label="执行监听器">
                <a-badge :count="executionListenerSize">
                    <a-button @click="setExecutionListenerEditorVisible(true)">编辑</a-button>
                </a-badge>
            </a-form-item>
            <a-form-item label="信号">
                <a-badge :count="0">
                    <a-button @click="setSignalEditorVisible(true)">编辑</a-button>
                </a-badge>
            </a-form-item>
        </a-form>

        <execution-listener-editor
                :modeler="this.modeler" :element="this.element"
                @save="onSaveExecutionListener"/>
        <signal-editor
                :modeler="this.modeler" :element="this.element"/>
    </div>
</template>

<script>
    import {itemMixin, panelMixin} from '../../../mixins'
    import {ExecutionListenerEditor, SignalEditor} from '../../item-editor'
    import rules from './rules'

    export default {
        name: 'ProcessPanel',

        props: {
            categorys: {type: Array, required: true}
        },

        components: {
            ExecutionListenerEditor, SignalEditor,
        },

        data() {
            return {
                form: this.$form.createForm(this, {
                    onFieldsChange: this.onFieldsChange
                }),
                formData: {},
                rules: rules,
            }
        },

        mixins: [panelMixin, itemMixin],

        methods: {
            onSaveExecutionListener(executionListeners, callback) {
                this.updateListeners(executionListeners, 'ExecutionListener')
                callback && callback()
            }
        },

        created() {
            const {id, name, documentation, processCategory, color, executionListener, signal}
                = this.parseElement()
            this.$nextTick(() => this.form.setFieldsValue({
                id, name, documentation, processCategory, color, executionListener, signal
            }))
        }

    }
</script>

<style lang="less" scoped>

</style>
