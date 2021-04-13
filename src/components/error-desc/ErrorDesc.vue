<template>
    <div class="desc">
        <div class="message">
            {{data.message}}
            <a-button type="link" @click="onShowDetails">
                <span>详细信息<a-icon :type="showDetails ? 'up': 'down'"/></span>
            </a-button>
        </div>
        <div class="details" v-if="showDetails">
            <div class="path">
                <span class="item">
                    <a-icon type="link"/>
                    地址：
                    <a>{{data.path}}</a>
                </span>
            </div>
            <div class="timestamp">
                <span class="item">
                    <a-icon type="clock-circle"/>
                    时间：
                    {{new Date(data.timestamp) | momentDateTime}}
                </span>
            </div>
            <div class="trace">
                <span class="item">
                    <a-icon type="unordered-list"/>
                    堆栈：
                    <a-button type="link" @click="onShowTrace">
                        <span>详情<a-icon :type="showTrace ? 'up': 'down'"/></span>
                    </a-button>
                    <a-button type="link"
                              v-clipboard:copy="data.trace"
                              　　v-clipboard:success="onCopySuccess"
                              　　v-clipboard:error="onCopyError">
                        <span>复制<a-icon type="copy"/></span>
                    </a-button>
                </span>
                <div class="trace-content" v-if="showTrace">
                    {{data.trace}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ErrorDesc",
        props: {
            data: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                showDetails: false,
                showTrace: false,
            }
        },

        methods: {
            onShowDetails() {
                this.showDetails = !this.showDetails
            },
            onShowTrace() {
                this.showTrace = !this.showTrace
            },
            onCopySuccess() {
                this.$message.success("复制成功！")
            },
            onCopyError() {
                this.$message.error("复制失败！")
            }
        }
    }
</script>

<style lang="less" scoped>
    .desc {
        .message {
            font-weight: 500;
            margin: 10px 0;
        }

        .button {
            margin-left: 20px;
        }

        .details {
            border: 1px solid #d9d9d9;
            padding: 10px;
            border-radius: 4px;

            .item {
                font-weight: 500;
            }

            .path {
            }

            .timestamp {
                margin-top: 10px;
            }

            .exception {
                margin-top: 10px;
            }

            .trace {
                margin-top: 10px;

                .trace-content {
                    margin-top: 10px;
                    height: 240px;
                    overflow: auto;
                }
            }
        }
    }
</style>