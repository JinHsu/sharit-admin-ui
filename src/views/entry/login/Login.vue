<template>
    <div class="entry-main">
        <a-tabs
                :tab-bar-style="{textAlign: 'center', borderBottom: 'unset'}"
                :active-key="activeTabKey" @change="onTabClick">
            <a-tab-pane key="username" tab="用户名登录"/>
            <a-tab-pane key="mobile" tab="手机号登录"/>
        </a-tabs>
        <a-form class="form" :form="form">
            <!-- 用户名登录 -->
            <a-form-item v-show="!isMobileLogin">
                <a-input size="large" type="text" placeholder="用户名" autocomplete="new-password"
                         allowClear v-decorator="['username', rules.username]">
                    <a-icon slot="prefix" type="user" class="icon-prefix"/>
                </a-input>
            </a-form-item>
            <a-form-item v-show="!isMobileLogin">
                <a-input size="large" type="password" placeholder="密码" autocomplete="new-password"
                         allowClear v-decorator="['password', rules.password]">
                    <a-icon slot="prefix" type="lock" class="icon-prefix"/>
                </a-input>
            </a-form-item>

            <!-- 手机号登录 -->
            <a-form-item v-show="isMobileLogin">
                <a-input size="large" type="text" placeholder="手机号" autocomplete="new-password"
                         allowClear v-decorator="['mobile', rules.mobile]">
                    <a-icon slot="prefix" type="mobile" class="icon-prefix"/>

                </a-input>
            </a-form-item>
            <a-form-item v-show="isMobileLogin">
                <a-input size="large" type="text" placeholder="验证码" autocomplete="new-password"
                         :maxLength="6"
                         allowClear v-decorator="['captcha', rules.captcha]">
                    <a-icon slot="prefix" type="mail" class="icon-prefix"/>
                    <div slot="suffix">
                        <a-divider type="vertical"/>
                        <span v-if="isGetCaptcha" v-text="captchaText"></span>
                        <a @click="doGetCaptcha" class="sms-button" v-else>发送验证码</a>
                    </div>
                </a-input>
            </a-form-item>

            <!--登录-->
            <a-button size="large" type="primary" block
                      :loading="isLogin" @click="doLogin" class="login-button">
                登录
            </a-button>

            <a-form-item class="form-other-login">
                <span>其他登录方式</span>
                <a>
                    <a-icon class="item-icon" type="weibo"/>
                </a>
                <a>
                    <a-icon class="item-icon" type="qq"/>
                </a>
                <router-link :to="{ name: 'recover'}" class="forge-password">
                    找回密码
                </router-link>
            </a-form-item>

        </a-form>
        <a-vaptcha ref="vaptcha" @vaptchaSuccess="onVaptchaSuccess" @vaptchaClose="onVaptchaClose"/>
    </div>
</template>

<script>
    import {app} from '@/mixins'
    import {postLogin} from '@/auth/authc'
    import {HOME_UTL} from "@/config/auth"
    import rules from './rules'
    import service from './service'

    export default {
        name: "Login",

        data() {
            return {
                activeTabKey: 'username',
                form: this.$form.createForm(this),
                rules: rules,
                // 登录按钮状态
                isLogin: false,
                // captcha
                token: '',
                // 获取验证码按钮状态
                isGetCaptcha: false,
                // 验证码获取周期
                captchaCycleTime: 60,
            }
        },

        computed: {
            isMobileLogin() {
                return this.activeTabKey !== 'username'
            },
            captchaText() {
                return this.captchaCycleTime + 's'
            }
        },

        mixins: [app],

        methods: {
            onTabClick(key) {
                this.activeTabKey = key
                this.form.resetFields()
                this.token = null
                this.$refs.vaptcha && this.$refs.vaptcha.reset()
            },

            onVaptchaSuccess(token) {
                this.token = token
                this.activeTabKey === 'username' && this.doLogin()
                this.activeTabKey === 'mobile' && this.doGetCaptcha()
            },

            onVaptchaClose() {
                this.$refs.vaptcha && this.$refs.vaptcha.reset()
                if (this.activeTabKey === 'username') {
                    this.isLogin = false
                } else if (this.activeTabKey === 'mobile') {
                    this.isGetCaptcha = false
                }
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

            async onLoginSuccess() {
                let redirect = this.$store.state.framework.multiTab.activeKey || HOME_UTL
                await this.$router.push({path: redirect})

                const {nickname} = this.userInfo || {}
                this.$notification.success({message: `您好，${nickname}`, description: `欢迎回来`})
            },

            // 登录
            doLogin() {

                this.isLogin = true

                let validateFieldsKey = this.activeTabKey === 'username' ? ['username', 'password'] : ['mobile', 'captcha']
                // 字段校验
                this.form.validateFields(validateFieldsKey, {force: true},
                    (err, values) => {
                        if (!err) {
                            if (!this.token && this.activeTabKey === 'username') {
                                this.$refs.vaptcha && this.$refs.vaptcha.validate()
                                this.isLogin = false
                                return
                            }

                            let params = {}
                            if (this.activeTabKey === 'username') {
                                const {username, password} = values
                                Object.assign(params, {username, password})
                            } else {
                                const {mobile, captcha} = values
                                Object.assign(params, {mobile, captcha})
                            }

                            Object.assign(params, {vaptcha: this.token, type: this.activeTabKey})

                            //
                            postLogin(params)
                                .then(() => this.onLoginSuccess())
                                .finally(() => {
                                    this.token = null
                                    this.$refs.vaptcha && this.$refs.vaptcha.reset()
                                    this.isLogin = false
                                })
                        } else {
                            this.isLogin = false
                        }
                    }
                )
            },

            // 获取短信验证码
            doGetCaptcha() {
                if (this.isGetCaptcha || this.captchaCycleTime < 60) {
                    return
                }

                this.isGetCaptcha = true

                let validateFieldsKey = ['mobile']
                // 字段校验
                this.form.validateFields(validateFieldsKey, {force: true},
                    (err, values) => {
                        if (!err) {
                            //
                            if (!this.token && this.activeTabKey === 'mobile') {
                                this.$refs.vaptcha && this.$refs.vaptcha.validate()
                                this.isGetCaptcha = false
                                return
                            }

                            const {mobile} = values
                            let params = {vaptcha: this.token, mobile}
                            service.fetchCaptcha(params)
                                .then(() => {
                                    this.countDown()
                                    this.$message.success("短信验证码发送成功！")
                                })
                                .catch(() => {
                                    this.isGetCaptcha = false
                                })
                                .finally(() => {
                                    this.token = null
                                    this.$refs.vaptcha && this.$refs.vaptcha.reset()
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