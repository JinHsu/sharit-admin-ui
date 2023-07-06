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
                         allowClear v-decorator="['userPwd', rules.userPwd]">
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
import {loginRules} from './rules'

export default {
    name: "Login",

    data() {
        return {
            form: this.$form.createForm(this), // 登录表单
            rules: loginRules, // 校验规则
            isLogin: false, // 登录按钮状态
            token: null
        }
    },

    computed: {},

    mixins: [app],

    methods: {
        // 登录
        doLogin() {

            this.isLogin = true

            let validateFieldsKey = ['loginName', 'userPwd']
            // 字段校验
            this.form.validateFields(validateFieldsKey, {force: true},
                (err, values) => {
                    if (!err) {
                        let data = {}
                        const {loginName, userPwd} = values
                        Object.assign(data, {loginName, userPwd})
                        //
                        postLogin(data)
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

        async onLoginSuccess() {
            let redirect = this.$store.state.framework.multiTab.activeKey || HOME_UTL
            await this.$router.push({path: redirect})

            // TODO 迁移到首页
            const {nickName} = this.userInfo || {}
            this.$notification.success({message: `您好，${nickName}`, description: `欢迎回来`})
        },

    },

    mounted() {

    }

}
</script>

<style lang="less" scoped>
@import "index.less";
</style>