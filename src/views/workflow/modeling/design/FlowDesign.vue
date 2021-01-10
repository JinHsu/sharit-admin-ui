<template>
    <div class="wf-design">
        <bpmn-designer
                :is-view="false"
                :users="users" :groups="groups" :categorys="categorys" :roles="roles"
                @save="onSave"/>
    </div>
</template>

<script>
    import BpmnDesigner from '@/components/bpmn-designer'
    import service from './service'

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
                    {name: '审批流', id: 'apprv'},
                    {name: '工作流', id: 'work'},
                    {name: '业务流', id: 'busi'},
                ],
                roles: [
                    {value: 'manager', label: '经理'},
                    {value: 'personnel', label: '人事'},
                    {value: 'charge', label: '主管'}
                ],
            }
        },

        methods: {
            onSave(data) {
                console.log(data)
                service.deploy(data).then((res) => {
                    console.log(res)
                })
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