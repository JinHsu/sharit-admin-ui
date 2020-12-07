<template>
    <div class="entry-main">
        <a-form class="form" :form="form"
                @submit="onLogin">
            <a-tabs
                    :tab-bar-style="{textAlign: 'center', borderBottom: 'unset'}"
                    :active-key="activeTabKey" @change="onTabClick">
                <a-tab-pane key="username" tab="用户名登录">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="用户名"
                                 v-decorator="['username', rules.username]">
                            <a-icon slot="prefix" type="user" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input size="large" type="password" placeholder="密码"
                                 v-decorator="['password', rules.password]">
                            <a-icon slot="prefix" type="lock" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                </a-tab-pane>
                <a-tab-pane key="mobile" tab="手机号登录">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="手机号"
                                 v-decorator="['mobile', rules.mobile]">
                            <a-icon slot="prefix" type="mobile" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                    <a-row :gutter="16">
                        <a-col :span="16">
                            <a-form-item>
                                <a-input size="large" type="text" placeholder="验证码"
                                         v-decorator="['captcha', rules.captcha]">
                                    <a-icon slot="prefix" type="mail" class="icon-prefix"/>
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-button class="captcha-button" tabindex="-1">获取验证码
                            </a-button>
                        </a-col>
                    </a-row>
                </a-tab-pane>
            </a-tabs>

            <a-form-item>
                <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">
                    记住我
                </a-checkbox>
                <router-link v-if="activeTabKey === 'username'"
                             :to="{ name: 'recover'}" class="forge-password">
                    忘记密码
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
                    <a-icon class="item-icon" type="alipay-circle"/>
                </a>
                <a>
                    <a-icon class="item-icon" type="taobao-circle"/>
                </a>
                <a>
                    <a-icon class="item-icon" type="weibo-circle"/>
                </a>
            </div>

        </a-form>
    </div>
</template>

<script>
    import {app} from '@/mixins'
    import rules from './rules'
    import {postLogin} from '@/auth/authc'
    import {HOME_UTL} from "@/config/auth"

    export default {
        name: "Login",

        data() {
            return {
                activeTabKey: 'username',
                form: this.$form.createForm(this),
                rules: rules,
                isLogin: false, // 登录按钮状态
                isGetCaptcha: false, // 获取验证码按钮状态
                captchaCycleTime: 60, // 验证码获取周期
                isLoginFailed: false,
            }
        },

        mixins: [app],

        methods: {
            onTabClick(key) {
                this.activeTabKey = key
                this.form.resetFields()
            },

            // 登录
            onLogin(e) {
                e.preventDefault()

                this.isLogin = true
                let validateFieldsKey = this.activeTabKey === 'username' ? ['username', 'password'] : ['mobile', 'captcha']
                // 字段校验
                this.form.validateFields(validateFieldsKey, {force: true},
                    (err, values) => {
                        if (!err) {
                            let params
                            if (this.activeTabKey === 'username') {
                                const {username, password} = values
                                params = {username, password}
                            } else {
                                const {mobile, captcha} = values
                                params = {mobile, captcha}
                            }

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
                let redirect = this.$route.query.redirect || HOME_UTL
                await this.$router.push({path: redirect})

                const {nickname} = this.userInfo || {}
                setTimeout(() => {
                    this.$notification.success({
                        message: `您好，${nickname}`,
                        description: `欢迎回来`
                    })
                }, 10)
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "index.less";
</style>