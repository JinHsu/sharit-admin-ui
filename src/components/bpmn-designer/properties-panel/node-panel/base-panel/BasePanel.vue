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
        </a-form>
    </div>
</template>

<script>
    import {itemMixin, panelMixin} from '../../../mixins'
    import rules from './rules'

    export default {
        name: "BasePanel",

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

        created() {
            const {id, name, documentation}
                = this.parseElement(this.element)
            this.$nextTick(() => this.form.setFieldsValue({
                id, name, documentation
            }))
        },
    }
</script>

<style scoped>

</style>