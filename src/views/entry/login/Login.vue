<template>
    <div class="entry-main">
        <a-form class="form" :form="form"
                @submit="onLogin">
            <a-tabs
                    :tab-bar-style="{textAlign: 'center', borderBottom: 'unset'}"
                    :active-key="activeTabKey" @change="onTabClick">
                <a-tab-pane key="username" tab="用户名登录"/>
                <a-tab-pane key="mobile" tab="手机号登录"/>
            </a-tabs>

            <a-form-item v-show="activeTabKey === 'username'">
                <a-input size="large" type="text" placeholder="用户名"
                         v-decorator="['username', rules.username]">
                    <a-icon slot="prefix" type="user" class="icon-prefix"/>
                </a-input>
            </a-form-item>
            <a-form-item v-show="activeTabKey === 'username'">
                <a-input size="large" type="password" placeholder="密码"
                         v-decorator="['password', rules.password]">
                    <a-icon slot="prefix" type="lock" class="icon-prefix"/>
                </a-input>
            </a-form-item>

            <a-form-item v-show="activeTabKey === 'mobile'">
                <a-input size="large" type="text" placeholder="手机号"
                         v-decorator="['mobile', rules.mobile]">
                    <a-icon slot="prefix" type="mobile" class="icon-prefix"/>
                </a-input>
            </a-form-item>

            <a-form-item>
                <Vaptcha ref="vaptcha" @vaptchaSuccess="onVaptchaSuccess"/>
            </a-form-item>

            <a-row :gutter="16" v-show="activeTabKey === 'mobile'">
                <a-col :span="16">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="验证码"
                                 v-decorator="['captcha', rules.captcha]">
                            <a-icon slot="prefix" type="mail" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-button class="captcha-button" tabindex="-1" :loading="isGetCaptcha"
                              v-text="captchaText"
                              @click="onSmsCode">
                    </a-button>
                </a-col>
            </a-row>


            <a-form-item>
                <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">
                    记住我
                </a-checkbox>
                <router-link v-if="activeTabKey === 'username'"
                             :to="{ name: 'recover'}" class="forge-password">
                    找回密码
                </router-link>
            </a-form-item>

            <a-form-item>
                <a-button block size="large" type="primary" htmlType="submit"
                          :loading="isLogin" :disabled="isLogin">
                    登录
                </a-button>
            </a-form-item>

            <div class="form-other-login">
                <span>其他登录方式</span>
                <a>
                    <a-icon class="item-icon" type="weibo"/>
                </a>
                <a>
                    <a-icon class="item-icon" type="qq"/>
                </a>
            </div>

        </a-form>

    </div>
</template>

<script>
    import {postLogin} from '@/auth/authc'
    import {HOME_UTL} from "@/config/auth"
    import Vaptcha from "@/components/vaptcha"
    import {app} from '@/mixins'
    import rules from './rules'
    import service from './service'

    export default {
        name: "Login",

        components: {Vaptcha},

        data() {
            return {
                activeTabKey: 'username',
                form: this.$form.createForm(this),
                rules: rules,
                isLogin: false, // 登录按钮状态
                isLoginFailed: false,
                token: '', // vaptcha
                //
                isGetCaptcha: false, // 获取验证码按钮状态
                captchaCycleTime: 60, // 验证码获取周期
            }
        },

        computed: {
            captchaText() {
                return !this.isGetCaptcha && '获取验证码' || (this.captchaCycleTime + '秒')
            }
        },

        mixins: [app],

        methods: {
            onTabClick(key) {
                this.activeTabKey = key
                this.form.resetFields()
                this.token = null
                this.$refs.vaptcha.reset()
            },

            onVaptchaSuccess(token) {
                this.token = token
            },

            // 登录
            onLogin(e) {
                e.preventDefault()

                if (!this.token && this.activeTabKey === 'username') {
                    this.$message.info("请先进行人机验证！")
                    return
                }

                this.isLogin = true

                let validateFieldsKey = this.activeTabKey === 'username' ? ['username', 'password'] : ['mobile', 'captcha']
                // 字段校验
                this.form.validateFields(validateFieldsKey, {force: true},
                    (err, values) => {
                        if (!err) {
                            let params = {}
                            if (this.activeTabKey === 'username') {
                                const {username, password} = values
                                Object.assign(params, {username, password})
                            } else {
                                const {mobile, captcha} = values
                                Object.assign(params, {mobile, captcha})
                            }

                            Object.assign(params, {vaptcha: this.token})

                            //
                            postLogin(params).then(() => this.onLoginSuccess()).finally(() => this.isLogin = false)

                        } else {
                            this.isLogin = false
                        }
                    }
                )
            },

            async onLoginSuccess() {
                this.isLogin = false
                this.isLoginFailed = false
                //
                let redirect = this.$store.state.framework.multiTab.activeKey || HOME_UTL
                await this.$router.push({path: redirect})

                const {nickname} = this.userInfo || {}
                setTimeout(() => this.$notification.success({message: `您好，${nickname}`, description: `欢迎回来`}), 10)
            },

            // 获取短信验证码
            onSmsCode(e) {
                e.preventDefault()


                this.isGetCaptcha = true

                let validateFieldsKey = ['mobile']
                // 字段校验
                this.form.validateFields(validateFieldsKey, {force: true},
                    (err, values) => {
                        if (!err) {
                            const {mobile} = values
                            let params = {vaptcha: this.token, mobile}
                            //

                            if (!this.token && this.activeTabKey === 'mobile') {
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

                            service.fetchSmsCode(params).then(() => this.$message.success("短信验证码发送成功！"))
                                .catch(() => this.$message.success("短信验证码发送失败！"))
                                .finally(() => {
                                    this.token = null
                                    this.$refs.vaptcha.reset()
                                })

                        } else {
                            this.isGetCaptcha = false
                        }
                    }
                )
            }
        },

    }
</script>

<style lang="less" scoped>
    @import "index.less";
</style>