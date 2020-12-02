<template>
    <div class="el-entry-content">
        <el-form ref="form" :model="form">

            <el-tabs v-model="activeTabPane" class="">
                <el-tab-pane label="用户名登录" name="username">
                    <el-form-item>
                        <el-input prefix-icon="el-icon-user" type="text" clearable
                                  placeholder="用户名"
                                  v-model="form.username"/>
                    </el-form-item>
                    <el-form-item>
                        <el-input prefix-icon="el-icon-lock" type="password" show-password
                                  placeholder="密码"
                                  v-model="form.password"/>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="手机号登录" name="mobile">
                    <el-form-item>
                        <el-input prefix-icon="el-icon-mobile" type="text" clearable
                                  placeholder="手机号"
                                  v-model="form.mobile"/>
                    </el-form-item>
                    <el-form-item>
                        <el-input prefix-icon="el-icon-message" type="text"
                                  placeholder="验证码" style="float: left;"
                                  v-model="form.captcha"/>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>

            <el-form-item>
                <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
                <router-link
                        :to="{ name: 'recover' }"
                        style="float: right;">
                    忘记密码
                </router-link>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" style="width: 100%;">登录</el-button>
            </el-form-item>

            <div>
                <span>其他方式登录</span>
            </div>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data() {
            return {
                activeTabPane: 'username',
                form: {
                    username: '',
                    password: '',
                    mobile: '',
                    captcha: '',
                    rememberMe: false,
                }
            }
        },

    }
</script>

<style lang="scss" scoped>
    .el-entry-content {
        margin: auto;
        padding: 10px;
        max-width: 400px;
    }

</style>

<style lang="scss">
    .el-entry-content .el-tabs__nav-wrap {
        margin: auto;
        display: table;

        &::after {
            background-color: transparent;
        }
    }
</style>