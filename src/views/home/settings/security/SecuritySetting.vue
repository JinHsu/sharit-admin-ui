<template>
    <div>
        <a-list
                itemLayout="horizontal"
                :dataSource="datas">
            <a-list-item slot="renderItem" slot-scope="item" :key="item.code">
                <a-list-item-meta>
                    <span slot="title">
                        <h3>{{ item.title }}</h3>
                    </span>
                    <span slot="description">
                    <span class="security-list-description">{{ item.description }}</span>
                    <span class="security-list-value">{{ item.value }}</span>
                </span>
                </a-list-item-meta>
                <template v-if="item.actions">
                    <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
                </template>

            </a-list-item>
        </a-list>

        <pwd-setting v-model="pwdsettingModalVisible"/>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import PwdSetting from "./actions/PwdSetting";

    export default {
        name: "SecuritySetting",

        components: {
            PwdSetting
        },

        data() {
            return {
                pwdsettingModalVisible: false
            }
        },

        methods: {},

        computed: {
            ...mapState('app', ['accountInfo']),

            datas() {
                const {mobile, email} = this.accountInfo || {}

                return [
                    {
                        title: '密码',
                        code: 'password',
                        description: '密码强度',
                        actions: {
                            title: '修改', callback: () => {

                            }
                        }
                    },
                    {
                        title: '手机号码',
                        code: 'mobile',
                        description: mobile ? mobile : '未绑定',
                        actions: {
                            title: mobile ? '修改' : '绑定', callback: () => {
                                this.$message.success('This is a message of success')
                            }
                        }
                    },
                    {
                        title: '电子邮箱',
                        code: 'email',
                        description: email ? email : '未绑定',
                        actions: {
                            title: email ? '修改' : '绑定', callback: () => {
                                this.$message.warning('This is message of warning')
                            }
                        }
                    }
                ]
            }
        },

        mounted() {

        }
    }
</script>

<style scoped>

</style>