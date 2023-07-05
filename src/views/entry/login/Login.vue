<template>
    <div class="entry-main">
        <a-form class="form" :form="form">
            <!-- 用户名登录 -->
            <a-form-item>
                <a-input size="large" type="text" placeholder="登录名" autocomplete
                         allowClear v-decorator="['loginName', rules.loginName]">
                    <template #prefix>
                        <a-icon type="user" class="icon-prefix"/>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input size="large" type="password" placeholder="密码" autocomplete
                         allowClear v-decorator="['password', rules.password]">
                    <template #prefix>
                        <a-icon type="lock" class="icon-prefix"/>
                    </template>
                </a-input>
            </a-form-item>

            <!--登录-->
            <a-button size="large" type="primary" block :loading="isLogin" @click="doLogin" class="login-button">
                登录
            </a-button>

        </a-form>
    </div>
</template>

<script>
import {app} from '@/mixins'
import {postLogin} from '@/auth/authc'
import {HOME_UTL} from "@/config/auth"
import rules from './rules'

export default {
    name: "Login",

    data() {
        return {
            form: this.$form.createForm(this),
            rules: rules,
            // 登录按钮状态
            isLogin: false,
            token: null
        }
    },

    computed: {},

    mixins: [app],

    methods: {
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
                        let params = {}
                        const {username, password} = values
                        Object.assign(params, {username, password})
                        //
                        postLogin(params)
                            .then(() => this.onLoginSuccess())
                            .finally(() => {
                                this.token = null
                                this.isLogin = false
                            })
                    } else {
                        this.isLogin = false
                    }
                }
            )
        },

    },

    mounted() {
        const {query: {token}} = this.$route
        if (token) {
            this.setAccessToken(token)
            window.location.reload()
        }
    }

}
</script>

<style lang="less" scoped>
@import "index.less";
</style>