<template>
    <div class="entry-recover">
        <span class="title">找回密码</span>

        <a-steps :current="current" size="small" v-if="!isMobile()">
            <template v-for="item in steps">
                <a-step :key="item.key" :title="item.title">
                </a-step>
            </template>
        </a-steps>

        <div class="entry-recover-content">
            <div v-show="current === 0">
                <a-form :form="form">
                    <a-form-item>
                        <a-input type="email" size="large" v-decorator="['email', rules.email]" placeholder="电子邮箱"
                                 allowClear autocomplete="new-password">
                            <a-icon slot="prefix" type="mail" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <Vaptcha ref="vaptcha" @vaptchaSuccess="onVaptchaSuccess"/>
                    </a-form-item>

                    <a-form-item>
                        <a-button type="primary" tabindex="-1" class="captcha-button" @click="onMailCode"
                                  v-text="captchaText">
                        </a-button>
                    </a-form-item>

                </a-form>
            </div>
            <div v-show="current === 1">
                <a-form :form="form">
                    <a-form-item>
                        <a-input size="large" v-decorator="['captcha', rules.captcha]" placeholder="验证码"
                                 allowClear autocomplete="new-password">
                            <a-icon slot="prefix" type="lock" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input-password size="large" v-decorator="['password', rules.password]" placeholder="新密码"
                                          autocomplete="new-password">
                            <a-icon slot="prefix" type="lock" class="icon-prefix"/>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item>
                        <a-input-password size="large" v-decorator="['password2', rules.password2]" placeholder="确认密码"
                                          autocomplete="new-password">
                            <a-icon slot="prefix" type="lock" class="icon-prefix"/>
                        </a-input-password>
                    </a-form-item>
                    <a-row :gutter="16">
                        <a-col :span="8">
                            <a-button size="large" block @click="current--">上一步</a-button>
                        </a-col>
                        <a-col :span="16">
                            <a-button type="primary" size="large" block :loading="isSubmit" @click="onModifyPassword">
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
                    <span class="desc">提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。</span>

                    <div class="bottom">
                        <a-button type="primary" size="large" block @click="toLogin">重新登录</a-button>
                    </div>
                </div>
                <div class="fail" v-else>
                    <a-icon type="close-circle" class="check"/>
                    <span class="title">操作失败</span>
                    <span class="desc">提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。</span>
                    <div class="bottom">
                        <a-row :gutter="8">
                            <a-col :span="8">
                                <a-button size="large" block @click="current--">上一步</a-button>
                            </a-col>
                            <a-col :span="16">
                                <a-button type="primary" size="large" block @click="toLogin">回到登录页面</a-button>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vaptcha from "@/components/vaptcha"
    import {device} from '@/mixins'
    import rules from './rules'
    import service from "./service"

    export default {
        name: "Recover",

        components: {Vaptcha},

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
                //
                isGetCaptcha: false, // 获取验证码按钮状态
                captchaCycleTime: 60, // 验证码获取周期

                //
                isSubmit: false,
                success: false
            }
        },

        mixins: [device],

        computed: {
            captchaText() {
                return !this.isGetCaptcha && '获取验证码' || (this.captchaCycleTime + '秒')
            }
        },

        methods: {
            onModifyPassword(e) {
                e.preventDefault()

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
                            service.updatePassword(params).then(() => {
                                this.$message.success("提交成功！")
                                this.current++
                                this.success = true
                            }).catch(() => {
                                this.$message.success("提交失败！")
                                this.success = false
                            }).finally(() => {
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
            fetchMailCode() {

            },
            onVaptchaSuccess(token) {
                this.token = token
            },
            // 获取邮箱验证码
            onMailCode(e) {
                e.preventDefault()

                this.isGetCaptcha = true

                let validateFieldsKey = ['email']
                // 字段校验
                this.form.validateFields(validateFieldsKey, {force: true},
                    (err, values) => {
                        if (!err) {
                            if (!this.token && this.current === 0) {
                                this.$message.info("请进行人机验证！")
                                this.isGetCaptcha = false
                                return
                            }

                            const interval = window.setInterval(() => {
                                if (this.captchaCycleTime-- <= 0) {
                                    this.captchaCycleTime = 60
                                    this.isGetCaptcha = false
                                    window.clearInterval(interval)
                                }
                            }, 1000)

                            //
                            const {email} = values
                            let params = {vaptcha: this.token, email}
                            service.fetchMailCode(params).then(() => {
                                this.$message.success("邮箱验证码发送成功！")
                                this.current++
                            }).catch(() => {
                                this.$message.success("邮箱验证码发送失败！")
                            }).finally(() => {
                                this.token = null
                                this.$refs.vaptcha.reset()
                            })

                        } else {
                            this.isGetCaptcha = false
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "index.less";
</style>