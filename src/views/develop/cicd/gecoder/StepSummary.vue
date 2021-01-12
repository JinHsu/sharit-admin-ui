<template>
    <div>
        <a-descriptions size="small" bordered title="配置信息概览"
                        :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
            <a-descriptions-item :span="1" label="数据库">
                {{this.schema}}
            </a-descriptions-item>
            <a-descriptions-item :span="1" label="表">
                {{this.table}}
            </a-descriptions-item>

            <template v-for="(value, key) in config">
                <a-descriptions-item :label="key">
                    {{value}}
                </a-descriptions-item>
            </template>
        </a-descriptions>

        <div style="display: block; text-align: center; margin-top: 20px;">
            <a-button ghost icon="cloud-download" type="primary" @click="onGenerate">生成代码</a-button>
        </div>
    </div>
</template>

<script>
    import service from './service'
    import download from '@/components/download'

    export default {
        name: "StepSummary",

        props: {
            current: {type: Number, default: -1},
            schema: {type: String, required: true},
            table: {type: String, required: true},
            config: {type: Object, required: false}
        },

        data() {
            return {
                href: '#'
            }
        },

        methods: {
            async onGenerate() {
                const data = await service.generateCode({
                    schemaName: this.schema,
                    tableName: this.table,
                    ...this.config
                })

                download(data, {
                    type: 'application/x-zip-compressed'
                }, 'demo.zip', () => this.$message.success("代码生成成功！"))

            }
        }


    }
</script>

<style lang="less" scoped>

</style>