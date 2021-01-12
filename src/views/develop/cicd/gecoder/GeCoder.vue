<template>
    <div class="gecoder">
        <a-card :bordered="false" size="small">
            <template slot="title">
                <a-steps :current="current" size="small">
                    <template v-for="item in steps">
                        <a-step :key="item.key" :title="item.title">
                            <template #description>
                                <span>{{item.description}}</span>
                            </template>
                        </a-step>
                    </template>
                </a-steps>
            </template>
            <template #actions>
                <a-button type="primary" @click="pre()" :disabled="current === 0">
                    <a-icon type="left"/>
                    上一步
                </a-button>
                <a-button type="primary" @click="next()" :disabled="current === steps.length - 1">
                    下一步
                    <a-icon type="right"/>
                </a-button>
            </template>

            <div style="margin-top: 10px;">
                <div v-show="current === 0" style="max-width: 640px; margin: 0 auto;">
                    <step-schema v-model="schema" :current="current"/>
                </div>
                <div v-show="current === 1" style="max-width: 640px; margin: 0 auto;">
                    <step-table v-model="table" :current="current" :schema="schema"/>
                </div>
                <div v-show="current === 2" style="margin: 0 auto;">
                    <step-column :current="current" :schema="schema" :table="table"/>
                </div>
                <div v-show="current === 3" style="max-width: 640px; margin: 0 auto;">
                    <step-config v-model="configForm" :current="current" :schema="schema" :table="table"/>
                </div>
                <div v-show="current === 4" style="max-width: 640px; margin: 0 auto; ">
                    <step-summary :current="current" :schema="schema" :table="table" :config="config"/>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script>
    import StepSchema from './StepSchema'
    import StepTable from './StepTable'
    import StepColumn from './StepColumn'
    import StepConfig from './StepConfig'
    import StepSummary from "./StepSummary"

    export default {
        name: "GeCoder",

        components: {
            StepSchema, StepTable, StepColumn, StepConfig, StepSummary
        },

        data() {
            return {
                current: 0,
                steps: [
                    {key: 0, title: '选择数据库', description: '选择一个数据库'},
                    {key: 1, title: '选择表', description: '选择一张表'},
                    {key: 2, title: '字段映射', description: ''},
                    {key: 3, title: '后端代码配置', description: ''},
                    {key: 4, title: '生成代码', description: ''}
                ],

                schema: '',
                table: '',
                configForm: null,
                config: null
            }
        },

        methods: {
            pre() {
                if (this.current > 0) {
                    this.current--
                }
            },
            //
            async next() {
                if (this.current === 0 && !this.schema) {
                    this.$notification.error({message: '错误', description: "请选择一个数据库！"})
                    return
                }
                if (this.current === 1 && !this.table) {
                    this.$notification.error({message: '错误', description: "请选择一张表！"})
                    return
                }
                if (this.current === 3 && this.configForm) {
                    await this.configForm.validateFields({force: true}, this.validate)
                }
                if (this.current < this.steps.length) {
                    this.current++
                }
            },

            //
            validate(err, values) {
                if (!err) {
                    this.config = values
                    this.current++
                }
            }

        },

        watch: {
            schema(value) {
                if (value) {
                    this.steps[0].description = value
                }
            },

            table(value) {
                if (value) {
                    this.steps[1].description = value
                }
            }
        }

    }
</script>

<style lang="less" scoped>
    .gecoder {

    }
</style>