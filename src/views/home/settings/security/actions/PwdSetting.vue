<template>
    <div>
        <a-modal
                :visible="value"
                destroyOnClose
                title="修改密码"
                @cancel="onCancel">
            <template slot="footer">
                <a-button
                        @click="onCancel">
                    取消
                </a-button>
                <a-button
                        type="primary"
                        :loading="loading"
                        @click="onOk">
                    保存
                </a-button>
            </template>
            <a-form id="form" :form="form" ref="form">
                <a-form-item label="原密码">
                    <a-input
                            autocomplete="false"
                            type="password"
                            v-decorator="['password', rules.password]">
                        <a-icon slot="prefix" type="lock"/>
                    </a-input>
                </a-form-item>
                <a-form-item label="新密码">
                    <a-input
                            autocomplete="false"
                            type="password"
                            v-decorator="['newpassword', rules.newpassword]">
                        <a-icon slot="prefix" type="lock"/>
                    </a-input>
                </a-form-item>
                <a-form-item label="确认密码">
                    <a-input
                            autocomplete="false"
                            type="password"
                            v-decorator="['newpassword2', rules.newpassword2]">
                        <a-icon slot="prefix" type="lock"/>
                    </a-input>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
    import {device} from '@/mixins'

    export default {
        name: "ModifyPwd",
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                form: this.$form.createForm(this),
                rules: {
                    password: {
                        rules: [
                            {required: true, message: '请输入原密码'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    newpassword: {
                        rules: [
                            {required: true, message: '请输入新密码'}
                        ],
                        validateTrigger: ['change', 'blur']
                    },
                    newpassword2: {
                        rules: [
                            {required: true, message: '请输入确认密码'}
                        ],
                        validateTrigger: ['change', 'blur']
                    }
                },
                loading: false
            }
        },

        mixins: [device],

        methods: {
            onOk(e) {
                e.preventDefault()
                this.loading = true

                setTimeout(() => {
                    this.loading = false
                    this.$emit('input', false)
                }, 5000)


            },
            onCancel() {
                this.form.resetFields()
                this.$emit('input', false)
            }
        }
    }
</script>

<style scoped>

</style>