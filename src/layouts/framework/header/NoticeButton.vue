<template>
    <a-popover
            v-model="visible"
            trigger="click"
            placement="bottomRight"
    >
        <template slot="content">
            <a-spin :spinning="loading">
                <a-tabs>
                    <a-tab-pane tab="通知" key="1">
                        <a-list>
                            <a-list-item>
                                <a-list-item-meta title="你收到了 14 份新周报" description="一年前">
                                    <a-avatar style="background-color: white" slot="avatar"
                                              src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                                </a-list-item-meta>
                            </a-list-item>
                            <a-list-item>
                                <a-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试" description="一年前">
                                    <a-avatar style="background-color: white" slot="avatar"
                                              src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"/>
                                </a-list-item-meta>
                            </a-list-item>
                            <a-list-item>
                                <a-list-item-meta title="这种模板可以区分多种通知类型" description="一年前">
                                    <a-avatar style="background-color: white" slot="avatar"
                                              src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"/>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </a-tab-pane>
                    <a-tab-pane tab="消息" key="2">
                        123
                    </a-tab-pane>
                    <a-tab-pane tab="待办" key="3">
                        123
                    </a-tab-pane>
                </a-tabs>
            </a-spin>
        </template>
        <span class="header-notice" @click="fetchNotice">
            <a-badge count="12">
                <a-icon type="bell"/>
            </a-badge>
        </span>
    </a-popover>
</template>

<script>
    export default {
        name: "NoticeButton",

        data() {
            return {
                visible: false,
                loading: false
            }
        },

        methods: {
            fetchNotice() {
                this.loading = true
                setTimeout(() => this.loading = false, 500)
            }
        }
    }
</script>

<style lang="less" scoped>
    .header-notice {
        display: inline-block;
        padding: 0 18px;
        transition: all 0.3s;
        cursor: pointer;

        span {
            /*vertical-align: initial;*/
        }

        &:hover {
            background: rgba(0, 0, 0, 0.02);
        }

        i {
            font-size: 16px;
            padding: 4px;
        }
    }

</style>