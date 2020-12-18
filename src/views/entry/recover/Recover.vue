<template>
    <div class="entry-recover">
        <span class="title">找回密码</span>

        <a-steps :current="current" size="small" v-if="!isMobile()">
            <a-step v-for="item in steps" :key="item.key" :title="item.title">
            </a-step>
        </a-steps>

        <div class="entry-recover-content">
            <div v-show="current === 0">
                <a-form>
                    <a-form-item>
                        <a-input type="email" size="large" v-decorator="['email']" placeholder="请输入电子邮箱"
                                 allowClear>
                            <a-icon slot="prefix" type="mail" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <Vaptcha ref="vaptcha"/>
                    </a-form-item>

                    <a-row :gutter="16">
                        <a-col :span="16">
                            <a-form-item>
                                <a-input type="password" size="large" v-decorator="['captcha']" placeholder="邮箱验证码"
                                         allowClear autocomplete="new-password">
                                    <a-icon slot="prefix" type="lock" class="icon-prefix"/>
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-button tabindex="-1" class="captcha-button">
                                获取验证码
                            </a-button>
                        </a-col>
                    </a-row>

                    <a-form-item>
                        <a-button type="primary" size="large" block @click="onNext(1)">下一步</a-button>
                    </a-form-item>
                </a-form>
            </div>
            <div v-show="current === 1">
                <a-form>
                    <a-form-item>
                        <a-input type="password" size="large" placeholder="新密码">
                            <a-icon slot="prefix" type="lock" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input type="password" size="large" placeholder="确认密码">
                            <a-icon slot="prefix" type="lock" class="icon-prefix"/>
                        </a-input>
                    </a-form-item>
                    <a-row :gutter="16">
                        <a-col :span="8">
                            <a-button size="large" block @click="current--">上一步</a-button>
                        </a-col>
                        <a-col :span="16">
                            <a-button type="primary" size="large" block @click="onNext(2)">提交</a-button>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div v-show="current === 2">
                <div class="success" v-if="false">
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
                ]
            }
        },

        mixins: [device],

        methods: {
            onNext(step) {
                this.current++
            },
            toLogin() {
                this.$router.push({path: '/login'})
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "index.less";
</style>