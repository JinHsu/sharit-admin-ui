<template>
    <div style="padding: 10px 0;">
        <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="ID">
                <a-input v-decorator="['id', rules.id]"/>
            </a-form-item>
            <a-form-item label="名称">
                <a-input v-decorator="['name']"/>
            </a-form-item>
            <a-form-item label="描述">
                <a-textarea v-decorator="['documentation']"/>
            </a-form-item>
            <a-form-item label="执行监听器">
                <a-badge :count="executionListenerSize">
                    <a-button @click="setExecutionListenerEditorVisible(true)">编辑</a-button>
                </a-badge>
            </a-form-item>
            <a-form-item label="任务监听器" v-show="!!itemVisible.taskListener">
                <a-badge :count="taskListenerSize">
                    <a-button @click="setTaskListenerEditorVisible(true)">编辑</a-button>
                </a-badge>
            </a-form-item>
            <a-form-item label="人员类型" v-show="!!itemVisible.userType">
                <a-select v-decorator="['userType']" placeholder="请选择人员类型">
                    <template v-for="userTypeOption in userTypeOptions">
                        <a-select-option :key="userTypeOption.value" :value="userTypeOption.value">
                            {{userTypeOption.label}}
                        </a-select-option>
                    </template>
                </a-select>
            </a-form-item>
            <a-form-item label="指定人员"
                         v-show="!!itemVisible.assignee && formData.userType === 'assignee'">
                <a-select v-decorator="['assignee']">
                    <template v-for="user in users">
                        <a-select-option :key="user.id" :value="user.id">
                            {{user.name}}
                        </a-select-option>
                    </template>
                </a-select>
            </a-form-item>
            <a-form-item label="候选人员"
                         v-show="!!itemVisible.candidateUsers && formData.userType === 'candidateUsers'">
                <a-select mode="multiple" v-decorator="['candidateUsers']">
                    <template v-for="user in users">
                        <a-select-option :key="user.id" :value="user.id">
                            {{user.name}}
                        </a-select-option>
                    </template>
                </a-select>
            </a-form-item>
            <a-form-item label="候选组"
                         v-show="!!itemVisible.candidateGroups && formData.userType === 'candidateGroups'">
                <a-select mode="multiple" v-decorator="['candidateGroups']">
                    <template v-for="group in groups">
                        <a-select-option :key="group.id" :value="group.id">
                            {{group.name}}
                        </a-select-option>
                    </template>
                </a-select>
            </a-form-item>
            <a-form-item label="多实例">
                <a-badge :count="taskListenerSize" dot="">
                    <a-button @click="setMultiInstanceEditorVisible(true)">编辑</a-button>
                </a-badge>
            </a-form-item>
            <a-form-item label="异步" v-show="!!itemVisible.async">
                <a-switch checked-children="是" un-checked-children="否"
                          v-decorator="['async', rules.async]"/>
            </a-form-item>
            <a-form-item label="优先级" v-show="!!itemVisible.priority">
                <a-input v-decorator="['priority']"/>
            </a-form-item>
            <a-form-item label="跳过表达式" v-show="!!itemVisible.skipExpression">
                <a-input v-decorator="['skipExpression']"/>
            </a-form-item>
            <a-form-item label="是否为补偿" v-show="!!itemVisible.isForCompensation">
                <a-switch checked-children="是" un-checked-children="否"
                          v-decorator="['isForCompensation', rules.isForCompensation]"/>
            </a-form-item>
            <a-form-item label="服务任务可触发" v-show="!!itemVisible.triggerable">
                <a-switch checked-children="是" un-checked-children="否"
                          v-decorator="['triggerable', rules.triggerable]"/>
            </a-form-item>
            <a-form-item label="自动存储变量" v-show="!!itemVisible.autoStoreVariables">
                <a-switch checked-children="是" un-checked-children="否"
                          v-decorator="['autoStoreVariables', rules.autoStoreVariables]"/>
            </a-form-item>
            <a-form-item label="输入变量" v-show="!!itemVisible.ruleVariablesInput">
                <a-input v-decorator="['ruleVariablesInput']"/>
            </a-form-item>
            <a-form-item label="规则" v-show="!!itemVisible.rules">
                <a-input v-decorator="['rules']"/>
            </a-form-item>
            <a-form-item label="结果变量" v-show="!!itemVisible.resultVariable">
                <a-input v-decorator="['resultVariable']"/>
            </a-form-item>
            <a-form-item label="排除" v-show="!!itemVisible.exclude">
                <a-switch checked-children="是" un-checked-children="否"
                          v-decorator="['exclude', rules.exclude]"/>
            </a-form-item>
            <a-form-item label="类" v-show="!!itemVisible.class">
                <a-input v-decorator="['class']"/>
            </a-form-item>
            <a-form-item label="到期时间" v-show="!!itemVisible.dueDate">
                <a-date-picker showTime v-decorator="['dueDate']" style="width: 100%;"/>
            </a-form-item>
            <a-form-item label="表单标识key" v-show="!!itemVisible.formKey">
                <a-input v-decorator="['formKey']"/>
            </a-form-item>
        </a-form>

        <execution-listener-editor
                :modeler="this.modeler" :element="this.element" @save="onSaveExecutionListener"/>

        <task-listener-editor
                :modeler="this.modeler" :element="this.element" @save="onSaveTaskListener"/>

        <multi-instance-editor
                :modeler="this.modeler" :element="this.element" @save="onSaveMultiInstance"/>

    </div>
</template>

<script>
    import {itemMixin, panelMixin} from '../../mixins'
    import {ExecutionListenerEditor, MultiInstanceEditor, TaskListenerEditor} from '../../item-editor'
    import rules from './rules'

    export default {
        name: 'TaskPanel',

        props: {
            users: {type: Array, required: true},
            groups: {type: Array, required: true}
        },

        components: {
            ExecutionListenerEditor, TaskListenerEditor, MultiInstanceEditor
        },

        data() {
            return {
                userTypeOptions: [
                    {label: '指定人员', value: 'assignee'},
                    {label: '候选人员', value: 'candidateUsers'},
                    {label: '候选组', value: 'candidateGroups'}
                ],
                form: this.$form.createForm(this, {
                    onFieldsChange: this.onFieldsChange
                }),
                formData: {},
                rules: rules
            }
        },

        mixins: [panelMixin, itemMixin],

        methods: {
            onSaveExecutionListener(executionListeners, callback) {
                this.updateListeners(executionListeners, 'ExecutionListener')
                callback && callback()
            },

            onSaveTaskListener(taskListeners, callback) {
                this.updateListeners(taskListeners, 'TaskListener')
                callback && callback()
            },

            onSaveMultiInstance(multiInstance, callback) {
                this.updateMultiInstance(multiInstance)
                callback && callback()
            }
        },

        created() {
            const element = this.parseElement()

            const {
                id, name, documentation, executionListener, taskListener, userType, assignee, candidateUsers, //
                candidateGroups, multiInstance, async, priority, formKey, skipExpression, isForCompensation, triggerable,//
                autoStoreVariables, ruleVariablesInput, rules, resultVariable, exclude, dueDate//
            } = element

            this.$nextTick(() => this.form.setFieldsValue({
                id, name, documentation, executionListener, taskListener, userType, assignee, candidateUsers,
                //
                candidateGroups, multiInstance, async, priority, formKey, skipExpression, isForCompensation,
                //
                triggerable, autoStoreVariables, ruleVariablesInput, rules, resultVariable, exclude, dueDate,
                class: element.class
            }))
        },

    }
</script>

<style></style>
