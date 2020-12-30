import {mapActions, mapState} from 'vuex'

export default {

    computed: {
        ...mapState({
            executionListenerEditorVisible: state => state.bpmn.executionListenerEditorVisible,
            executionListenerSize: state => state.bpmn.executionListenerSize,
            //
            taskListenerEditorVisible: state => state.bpmn.taskListenerEditorVisible,
            taskListenerSize: state => state.bpmn.taskListenerSize,
            //
            multiInstanceEditorVisible: state => state.bpmn.multiInstanceEditorVisible,
            //
            signalEditorVisible: state => state.bpmn.signalEditorVisible,
        }),

    },

    methods: {
        ...mapActions({
            setExecutionListenerEditorVisible: 'bpmn/setExecutionListenerEditorVisible',
            setExecutionListenerSize: 'bpmn/setExecutionListenerSize',
            //
            setTaskListenerEditorVisible: 'bpmn/setTaskListenerEditorVisible',
            setTaskListenerSize: 'bpmn/setTaskListenerSize',
            //
            setMultiInstanceEditorVisible: 'bpmn/setMultiInstanceEditorVisible',
            //
            setSignalEditorVisible: `bpmn/setSignalEditorVisible`
        }),

        // 获取监听器
        obtainListeners(element, listener) {
            const type = `flowable:${listener}`
            return element.businessObject.extensionElements?.values
                .filter(item => item.$type === type)
                .map(item => {
                    let type
                    if ('class' in item) type = 'class'
                    if ('expression' in item) type = 'expression'
                    if ('delegateExpression' in item) type = 'delegateExpression'
                    return {
                        event: item.event, type: type, className: item[type],
                        params: item.fields?.map(field => {
                            let fieldType
                            if ('stringValue' in field) fieldType = 'stringValue'
                            if ('expression' in field) fieldType = 'expression'
                            return {name: field.name, type: fieldType, value: field[fieldType]}
                        }) ?? []
                    }
                }) ?? []
        },

        // 更新监听器
        updateListeners(executionListeners, listener) {
            const type = `flowable:${listener}`
            if (executionListeners?.length) {
                let extensionElements = this.element.businessObject.get('extensionElements')
                if (!extensionElements) {
                    extensionElements = this.modeler.get('moddle').create('bpmn:ExtensionElements')
                }
                // 清除旧值
                extensionElements.values = extensionElements.values?.filter(item => item.$type !== type) ?? []
                executionListeners.forEach(item => {
                    const executionListener = this.modeler.get('moddle').create(type)
                    executionListener['event'] = item.event
                    executionListener[item.type] = item.className
                    if (item.params && item.params.length) {
                        item.params.forEach(field => {
                            const fieldElement = this.modeler.get('moddle').create('flowable:Field')
                            fieldElement['name'] = field.name
                            fieldElement[field.type] = field.value
                            executionListener.get('fields').push(fieldElement)
                        })
                    }
                    extensionElements.get('values').push(executionListener)
                })
                this.updateProperties({extensionElements: extensionElements})
            } else {
                const extensionElements = this.element.businessObject[`extensionElements`]
                if (extensionElements) {
                    extensionElements.values = extensionElements.values?.filter(item => item.$type !== type) ?? []
                }
            }
        },

        // 更新多实例
        updateMultiInstance(multiInstance) {
            if (multiInstance.isSequential !== undefined && multiInstance.isSequential !== null) {
                let loopCharacteristics = this.element.businessObject.get('loopCharacteristics')
                if (!loopCharacteristics) {
                    loopCharacteristics = this.modeler.get('moddle').create('bpmn:MultiInstanceLoopCharacteristics')
                }
                loopCharacteristics['isSequential'] = multiInstance.isSequential
                loopCharacteristics['collection'] = multiInstance.collection
                loopCharacteristics['elementVariable'] = multiInstance.elementVariable
                if (multiInstance.completionCondition) {
                    loopCharacteristics['completionCondition'] = this.modeler.get('moddle').create('bpmn:Expression', {body: multiInstance.completionCondition})
                }
                this.updateProperties({loopCharacteristics: loopCharacteristics})
            } else {
                delete this.element.businessObject.loopCharacteristics
            }
        },

    }

}