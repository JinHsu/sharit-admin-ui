<template>
    <div>
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
                    <span v-if="item.value">: </span>
                    <span class="security-list-value">{{ item.value }}</span>
                </span>
                    </a-list-item-meta>
                    <template v-if="item.actions">
                        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
                    </template>

                </a-list-item>
            </a-list>

        </div>
    </div>
</template>

<script>
    export default {
        name: "AccountSetting",

        data() {
            return {
                datas: [],
            }
        },

        created() {
            const res = {}
            const {qq = '1451521857', weibo = '135****9578', github = ''} = res

            this.datas = [
                {
                    title: 'QQ', code: 'qq', description: qq ? '已绑定' : '未绑定', value: qq, actions: {
                        title: qq ? '解绑' : '绑定', callback: () => {
                        }
                    }
                },
                {
                    title: '微博', code: 'weibo', description: weibo ? '已绑定' : '未绑定', value: weibo, actions: {
                        title: weibo ? '解绑' : '绑定', callback: () => {
                        }
                    }
                },
                {
                    title: 'Github', code: 'github', description: github ? '已绑定' : '未绑定', value: github, actions: {
                        title: github ? '解绑' : '绑定', callback: () => {
                        }
                    }
                }
            ]
        }
    }
</script>

<style scoped>

</style>