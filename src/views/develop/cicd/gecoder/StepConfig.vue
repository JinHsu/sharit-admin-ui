<template>
    <div>
        <a-form :form="form">
            <a-form-item>
                <a-input addon-before="basePackageName" allowClear
                         v-decorator="['basePackageName', rules.basePackageName]"/>
            </a-form-item>
            <a-form-item>
                <a-input :addon-before="formData.basePackageName? formData.basePackageName + '.entity.' : ''"
                         allowClear suffix="Entity" :placeholder="prefix"
                         v-decorator="['entityName', rules.entityName]"/>
            </a-form-item>
            <a-form-item>
                <a-input :addon-before="formData.basePackageName? formData.basePackageName + '.view.' : ''"
                         allowClear suffix="VO" :placeholder="prefix"
                         v-decorator="['voName', rules.voName]"/>
            </a-form-item>
            <a-form-item>
                <a-input :addon-before="formData.basePackageName? formData.basePackageName + '.converter.' : ''"
                         allowClear suffix="Converter" :placeholder="prefix"
                         v-decorator="['converterName', rules.converterName]"/>
            </a-form-item>
            <a-form-item>
                <a-input :addon-before="formData.basePackageName? formData.basePackageName + '.repository.' : ''"
                         allowClear suffix="Repository" :placeholder="prefix"
                         v-decorator="['repositoryName', rules.repositoryName]"/>
            </a-form-item>
            <a-form-item>
                <a-input :addon-before="formData.basePackageName? formData.basePackageName + '.service.' : ''"
                         allowClear suffix="Service" :placeholder="prefix"
                         v-decorator="['serviceName', rules.serviceName]"/>
            </a-form-item>
            <a-form-item>
                <a-input :addon-before="formData.basePackageName? formData.basePackageName + '.controller.' : ''"
                         allowClear suffix="Controller" :placeholder="prefix"
                         v-decorator="['controllerName', rules.controllerName]"/>
            </a-form-item>
            <a-form-item>
                <a-input addon-before="controllerUrl" allowClear :placeholder="controllerUrl"
                         v-decorator="['controllerUrl', rules.controllerUrl]"/>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    export default {
        name: "StepConfig",

        props: {
            current: {type: Number, default: -1},
            schema: {type: String, required: true},
            table: {type: String, required: true},
        },

        data() {
            return {
                form: this.$form.createForm(this, {
                    onFieldsChange: this.onFieldsChange
                }),
                formData: {},
                rules: {
                    basePackageName: {
                        rules: [
                            {required: true, message: '请输入basePackageName'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    entityName: {
                        rules: [
                            {required: true, message: '请输入entityName'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    voName: {
                        rules: [
                            {required: true, message: '请输入voName'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    converterName: {
                        rules: [
                            {required: true, message: '请输入converterName'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    repositoryName: {
                        rules: [
                            {required: true, message: '请输入repositoryName'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    serviceName: {
                        rules: [
                            {required: true, message: '请输入serviceName'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    controllerName: {
                        rules: [
                            {required: true, message: '请输入controllerName'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    controllerUrl: {
                        rules: [
                            {required: true, message: '请输入controllerUrl'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                }

            }
        },

        computed: {

            prefix() {
                if (this.table) {
                    if (this.table.indexOf("_") > 0) {
                        const strings = this.table.split("_");
                        let s = ""
                        strings.forEach(string => {
                            s += string.substr(0, 1).toUpperCase() + string.substr(1).toLowerCase()
                        })
                        return s
                    } else {
                        return this.table.substr(0, 1).toUpperCase() + this.table.substr(1).toLowerCase()
                    }
                }
                return null
            },

            controllerUrl() {
                if (this.table) {
                    if (this.table.indexOf("_") > 0) {
                        const strings = this.table.split("_");
                        let s = ""
                        strings.forEach(string => s += "/" + string.toLowerCase())
                        return s
                    } else {
                        return "/" + this.table.toLowerCase()
                    }
                }
                return null
            }
        },

        methods: {
            onFieldsChange(props, fields) {
                Object.values(fields).forEach((field) => {
                    const {name, value} = field
                    this.formData[name] = value
                })
                this.$emit('input', this.form)
            },
        },

        watch: {
            current(value) {
                if (value === 3) {
                    this.$emit('input', this.form)
                }
            }
        }

    }
</script>

<style scoped>

</style>