<template>
    <div class="wf-design">
        <bpmn-designer/>
    </div>
</template>

<script>
    import BpmnDesigner from '@/components/bpmn-designer'

    export default {
        name: "WFDesign",

        components: {
            BpmnDesigner
        },

        data() {
            return {
                users: [
                    {name: '张三', id: 'zhangsan'},
                    {name: '李四', id: 'lisi'},
                    {name: '王五', id: 'wangwu'}
                ],
                groups: [
                    {name: 'web组', id: 'web'},
                    {name: 'java组', id: 'java'},
                    {name: 'python组', id: 'python'}
                ],
                categorys: [
                    {name: 'OA', id: 'oa'},
                    {name: '财务', id: 'finance'}
                ],
                roles: [
                    {value: 'manager', label: '经理'},
                    {value: 'personnel', label: '人事'},
                    {value: 'charge', label: '主管'}
                ],
            }
        }
    }
</script>

<style lang="less" scoped>
    .wf-design {
        background: #FFFFFF;
        height: 100%;
    }
</style>