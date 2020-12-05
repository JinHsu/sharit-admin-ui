<template>
    <div class="ant-layout-entry-main">
        <a-form class="form" id="form" ref="form">
            <a-tabs
                    :tab-bar-style="{textAlign: 'center', borderBottom: 'unset'}"
                    :active-key="activeKey" @change="onTabClick">
                <a-tab-pane key="username" tab="用户名登录">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="用户名">
                            <a-icon slot="prefix" type="user" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input size="large" type="password" placeholder="密码">
                            <a-icon slot="prefix" type="lock" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                </a-tab-pane>
                <a-tab-pane key="mobile" tab="手机号登录">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="手机号">
                            <a-icon slot="prefix" type="mobile" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                    <a-row :gutter="16">
                        <a-col :span="16">
                            <a-form-item>
                                <a-input size="large" type="text" placeholder="验证码">
                                    <a-icon slot="prefix" type="mail" class="icon-prefix"/>
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-button class="captcha-button">获取验证码</a-button>
                        </a-col>
                    </a-row>
                </a-tab-pane>
            </a-tabs>

            <a-form-item>
                <a-checkbox>自动登录</a-checkbox>
                <router-link v-if="activeKey === 'username'"
                             :to="{ name: 'recover', params: { user: 'aaa'} }"
                             class="forge-password">
                    忘记密码
                </router-link>
            </a-form-item>

            <a-form-item>
                <a-button size="large" type="primary" block>确定</a-button>
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
    export default {
        name: "Login",

        data() {
            return {
                activeKey: 'username'
            }
        },

        methods: {
            onTabClick(key) {
                this.activeKey = key
            }
        }
    }
</script>

<style lang="less" scoped>
    .ant-layout-entry-main {
        margin: 0 auto;
        padding: 10px;
        max-width: 400px;

        .form {
            height: 100%;

            .icon-prefix {
                color: rgba(0, 0, 0, .25);
            }

            .captcha-button {
                display: block;
                width: 100%;
                height: 40px;
            }

            .forge-password {
                float: right;
            }

            &-other-login {
                text-align: left;
                margin-top: 24px;
                line-height: 22px;

                .item-icon {
                    font-size: 24px;
                    color: rgba(0, 0, 0, 0.2);
                    margin-left: 16px;
                    vertical-align: middle;
                    cursor: pointer;
                    transition: color 0.3s;

                    &:hover {
                        color: #1890ff;
                    }

                }

            }
        }

    }

</style>