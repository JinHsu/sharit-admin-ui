<template>
    <div class="entry-recover">
        <span class="title">找回密码</span>

        <a-steps :current="current" v-if="!isMobile()">
            <template v-for="item in steps">
                <a-step :key="item.key" :title="item.title">
                </a-step>
            </template>
        </a-steps>

        <div class="entry-recover-content">
            <div v-show="current === 0">
                <a-form :form="form">
                    <a-form-item>
                        <a-input size="large" type="email" placeholder="电子邮箱" autocomplete="new-password"
                                 allowClear v-decorator="['email', rules.email]">
                            <a-icon slot="prefix" type="mail" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>

                    <a-button size="large" type="primary" block
                              @click="onFetchCaptcha" class="captcha-button">
                        获取验证码
                    </a-button>

                </a-form>
            </div>
            <div v-show="current === 1">
                <a-form :form="form">
                    <a-form-item>
                        <a-input size="large" placeholder="验证码" autocomplete="new-password"
                                 allowClear v-decorator="['captcha', rules.captcha]">
                            <a-icon slot="prefix" type="mail" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input-password size="large" placeholder="新密码" autocomplete="new-password"
                                          allowClear v-decorator="['password', rules.password]">
                            <a-icon slot="prefix" type="lock" class="icon-prefix"/>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item>
                        <a-input-password size="large" placeholder="确认密码" autocomplete="new-password"
                                          allowClear v-decorator="['password2', rules.password2]">
                            <a-icon slot="prefix" type="lock" class="icon-prefix"/>
                        </a-input-password>
                    </a-form-item>
                    <a-row :gutter="8">
                        <a-col :span="8">
                            <a-button size="large" block @click="onBack">重新开始</a-button>
                        </a-col>
                        <a-col :span="16">
                            <a-button size="large" type="primary" block
                                      :loading="isSubmit" @click="onSubmit">
                                提交
                            </a-button>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div v-show="current === 2">
                <div class="success" v-if="success">
                    <a-icon type="check-circle" class="check"/>
                    <span class="title">操作成功</span>
                    <span class="desc"></span>

                    <div class="bottom">
                        <a-button type="primary" size="large" block @click="toLogin">重新登录</a-button>
                    </div>
                </div>
                <div class="fail" v-else>
                    <a-icon type="close-circle" class="check"/>
                    <span class="title">操作失败</span>
                    <span class="desc"></span>
                    <div class="bottom">
                        <a-row :gutter="8">
                            <a-col :span="8">
                                <a-button size="large" block @click="onBack">再试一次</a-button>
                            </a-col>
                            <a-col :span="16">
                                <a-button type="primary" size="large" block @click="toLogin">重新登录</a-button>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </div>
        </div>

        <a-vaptcha ref="vaptcha" @vaptchaSuccess="onVaptchaSuccess" @vaptchaClose="onVaptchaClose"/>
    </div>
</template>

<script>
    import {device} from '@/mixins'
    import rules from './rules'
    import service from "./service"

    export default {
        name: "Recover",

        data() {
            return {
                current: 0,
                steps: [
                    {key: 0, title: '验证邮箱', description: ''},
                    {key: 1, title: '修改密码', description: ''},
                    {key: 2, title: '找回结果', description: ''}
                ],

                rules: rules,
                form: this.$form.createForm(this),
                token: null,
                // 获取验证码按钮状态
                isGetCaptcha: false,
                // 验证码获取周期
                captchaCycleTime: 60,

                //
                isSubmit: false,
                success: true
            }
        },

        mixins: [device],

        methods: {
            onVaptchaSuccess(token) {
                this.token = token
                this.onFetchCaptcha()
            },

            onVaptchaClose() {
                this.$refs.vaptcha.reset()
                this.isGetCaptcha = false
            },

            countDown() {
                const interval = window.setInterval(() => {
                    if (this.captchaCycleTime-- <= 0) {
                        this.captchaCycleTime = 60
                        this.isGetCaptcha = false
                        window.clearInterval(interval)
                    }
                }, 1000)
            },

            onBack() {
                if (this.current === 1) {
                    this.$refs.vaptcha.reset()
                    this.isGetCaptcha = false
                }
                this.form.resetFields()
                this.current = 0;
            },

            // 获取邮箱验证码
            onFetchCaptcha() {
                if (this.isGetCaptcha) {
                    return
                }

                this.isGetCaptcha = true

                let validateFieldsKey = ['email']
                // 字段校验
                this.form.validateFields(validateFieldsKey, {force: true},
                    (err, values) => {
                        if (!err) {
                            if (!this.token && this.current === 0) {
                                this.$refs.vaptcha && this.$refs.vaptcha.validate()
                                this.isGetCaptcha = false
                                return
                            }
                            //
                            const {email} = values
                            let params = {vaptcha: this.token, email}
                            service.fetchMailCode(params)
                                .then(() => {
                                    this.countDown()
                                    this.$message.success("邮箱验证码发送成功！")
                                    this.current++
                                })
                                .catch(() => {
                                    this.isGetCaptcha = false
                                })
                                .finally(() => {
                                    this.token = null
                                    this.$refs.vaptcha.reset()
                                })

                        } else {
                            this.isGetCaptcha = false
                        }
                    }
                )
            },

            onSubmit() {

                this.isSubmit = true

                let validateFieldsKey = ['email', 'captcha', 'password', 'password2']
                // 字段校验
                this.form.validateFields(validateFieldsKey, {force: true},
                    (err, values) => {
                        if (!err) {
                            //
                            const {email, captcha, password, password2} = values
                            if (password !== password2) {
                                this.$message.error("两次输入的密码不一致！")
                                this.isSubmit = false
                                return
                            }
                            let params = {email, captcha, password}
                            service.updatePassword(params)
                                .then(() => {
                                    this.$message.success("提交成功！")
                                    this.success = true
                                })
                                .catch(() => {
                                    this.success = false
                                })
                                .finally(() => {
                                    this.current++
                                    this.isSubmit = false
                                })

                        } else {
                            this.isSubmit = false
                        }
                    }
                )
            },

            toLogin() {
                this.$router.push({path: '/login'})
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "index.less";
</style>