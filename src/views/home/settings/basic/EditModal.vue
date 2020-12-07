<template>
    <a-modal
            :visible="value"
            title="修改基础信息"
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
            <a-form-item label="昵称">
                <a-input v-decorator="['nickname', rules.nickname]"/>
            </a-form-item>
            <a-form-item label="性别">
                <a-radio-group
                        v-decorator="['sex', rules.sex]"
                >
                    <a-radio :value="1">
                        男
                    </a-radio>
                    <a-radio :value="0">
                        女
                    </a-radio>
                    <a-radio :value="-1">
                        保密
                    </a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="生日">
                <a-date-picker style="width:100%;" placeholder="请填写生日"
                               v-decorator="['birthdate', rules.birthdate]"/>
            </a-form-item>
            <a-form-item label="所在地区">
                <a-input v-decorator="['area', rules.area]"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import {mapState} from 'vuex'
    import {processGetFormData, processSetFormData} from '@/utils/form'

    export default {
        name: "EditModal",

        props: {
            value: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                form: this.$form.createForm(this, {
                    onFieldsChange: this.onFieldsChange
                }),
                rules: {
                    nickname: {
                        rules: [
                            {required: true, message: '请输入昵称'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    sex: {
                        rules: [
                            {required: true, message: '请输入性别'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    birthdate: {},
                    area: {}
                },
                loading: false,
                formData: {}
            }

        },

        computed: {
            ...mapState('app', ['userInfo'])
        },

        methods: {
            onFieldsChange(props, fields) {
                processGetFormData(this.formData, fields, ['birthdate'])
            },

            onSave() {
                this.loading = true
                // eslint-disable-next-line no-unused-vars
                this.form.validateFields({force: true}, (err, values) => {
                        if (!err) {
                            Object.assign(this.userInfo, this.formData)

                            // userService.updateUserInfo(this.userInfo).then((data) => {
                            //     this.$store.dispatch('app/setUserInfo', data)
                            //     this.$message.success({content: '保存成功！'})
                            //     this.$emit('input', false)
                            // }).finally(() => {
                            //     this.loading = false
                            // })
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

        mounted() {

        },

        watch: {
            value(visible) {
                if (visible) {
                    const {nickname, sex, birthdate, area} = this.userInfo || {}
                    const values = {nickname, sex, birthdate, area}
                    processSetFormData(values, ['birthdate'])
                    this.$nextTick(() => {
                        this.form.setFieldsValue(values)
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>