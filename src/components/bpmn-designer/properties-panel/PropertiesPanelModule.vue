<template>
    <div class="properties-panel">
        <div v-if="nodeName" class="panel-name">{{ nodeName }}</div>
        <div class="panel-form">
            <component
                    v-if="element"
                    :is="componentName"
                    :element="element"
                    :modeler="modeler"
                    :users="users"
                    :groups="groups"
                    :categorys="categorys"
            />
        </div>
    </div>
</template>

<script>
    import {BasePanel, EventPanel, GatewayPanel, ProcessPanel, SequenceFlowPanel, TaskPanel} from './node-panel'
    import {NodeName} from '../i18n/lang/zh_CN'
    import registerModule from './store'

    export default {
        name: 'PropertiesPanelModule',

        props: {
            modeler: {type: Object, required: true},
            users: {type: Array, required: true},
            groups: {type: Array, required: true},
            categorys: {type: Array, required: true},
            roles: {type: Array, required: true}
        },

        components: {
            BasePanel, ProcessPanel, TaskPanel, EventPanel, SequenceFlowPanel, GatewayPanel
        },

        data() {
            return {
                element: null,
            }
        },

        computed: {
            componentName() {
                const type = this.element?.type
                let panel = ''
                switch (type) {
                    case 'bpmn:IntermediateThrowEvent':
                    case 'bpmn:StartEvent':
                    case 'bpmn:EndEvent':
                        panel = 'EventPanel'
                        break

                    case 'bpmn:UserTask':
                    case 'bpmn:Task':
                    case 'bpmn:SendTask':
                    case 'bpmn:ReceiveTask':
                    case 'bpmn:ManualTask':
                    case 'bpmn:BusinessRuleTask':
                    case 'bpmn:ServiceTask':
                    case 'bpmn:ScriptTask':
                    case 'bpmn:CallActivity':
                    case 'bpmn:SubProcess':
                    case 'bpmn:Transaction':
                        panel = 'TaskPanel'
                        break

                    case 'bpmn:SequenceFlow':
                        panel = 'SequenceFlowPanel'
                        break

                    case 'bpmn:InclusiveGateway':
                    case 'bpmn:ExclusiveGateway':
                    case 'bpmn:ParallelGateway':
                    case 'bpmn:EventBasedGateway':
                    case 'bpmn:ComplexGateway':
                        panel = 'GatewayPanel'
                        break

                    case 'bpmn:Process':
                        panel = 'ProcessPanel'
                        break

                    case 'bpmn:DataStoreReference':
                    case 'bpmn:DataObjectReference':
                    case 'bpmn:Participant':
                    case 'bpmn:Group':
                        panel = 'BasePanel'
                }

                return panel
            },

            nodeName() {
                if (this.element) {
                    const bizObj = this.element.businessObject
                    const type = bizObj?.eventDefinitions ? bizObj.eventDefinitions[0]['$type'] : bizObj['$type']
                    return NodeName[type] || type
                }
                return ''
            }
        },

        methods: {
            handleModeler() {
                this.modeler.on('root.added', ({element}) => {
                    if (element.type === 'bpmn:Process') {
                        this.element = null
                        this.$nextTick().then(() => this.element = element)
                    }
                })
                this.modeler.on('element.click', ({element}) => {
                    if (element.type === 'bpmn:Process') {
                        this.element = element
                    }
                })
                this.modeler.on('selection.changed', e => {
                    // hack 同类型面板不刷新
                    this.element = null
                    const element = e.newSelection[0]
                    if (element) {
                        this.$nextTick().then(() => this.element = element)
                    }
                })
            }
        },

        created() {
            registerModule() // register module
        },

        mounted() {
            this.handleModeler()
        },
    }
</script>

<style lang="less" scoped>
    .properties-panel {
        position: absolute;
        /*top: 0;
        left: 0;
        bottom: 0;*/
        width: 100%;
        height: 100%;

        padding: 10px;

        .panel-name {
            border-bottom: 1px solid #aaa;
            padding: 0 0 10px 20px;
            font-size: 16px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.85);
        }

        .panel-form {

        }
    }
</style>
