import ItemVisibleConfig from '../config'
import {formatJsonKeyValue, parseElement} from "./parseElement"

export default {

    props: {
        modeler: {type: Object, required: true},
        element: {type: Object, required: true},
        categorys: {type: Array, default: () => []}
    },

    computed: {
        elementType() {
            const bizObj = this.element.businessObject
            return bizObj.eventDefinitions ? bizObj.eventDefinitions[0].$type : bizObj.$type
        },

        itemVisible() {
            return ItemVisibleConfig[this.elementType] || {}
        },
    },

    methods: {
        updateProperties(properties) {
            const modeling = this.modeler.get('modeling')
            modeling.updateProperties(this.element, properties)
        },

        setColor(properties) {
            const modeling = this.modeler.get('modeling')
            modeling.setColor(this.element, properties)
        },

        parseElement() {
            return parseElement(this.element)
        },

        formatJsonKeyValue(value) {
            return formatJsonKeyValue(value)
        },

        onFieldsChange(props, fields) {
            Object.values(fields).forEach((field) => {
                const {name, value} = field
                this.formData[name] = value
                this.onFieldValueChange(field)
            })
        },

        onFieldValueChange({name, value}) {
            if (name === 'color') {
                this.setColor({fill: value, stroke: value})
                this.updateProperties({color: value})
            } else if (name === 'documentation') {
                if (!value) {
                    this.updateProperties({documentation: []})
                    return
                }
                const documentationElement = this.modeler.get('moddle').create('bpmn:Documentation', {text: value})
                this.updateProperties({documentation: [documentationElement]})
            } else if (['processCategory', 'initiator', 'formKey', 'async', 'skipExpression', 'dueDate',
                'priority', 'triggerable', 'clazz', 'autoStoreVariables', 'exclude', 'ruleVariablesInput',
                'rules', 'resultVariable'].includes(name)) {
                if (value === '') {
                    value = null
                }
                this.updateProperties({[`flowable:${name}`]: value})
            } else if (name === 'conditionExpression') {
                if (value) {
                    const newCondition = this.modeler.get('moddle').create('bpmn:FormalExpression', {body: value})
                    this.updateProperties({conditionExpression: newCondition})
                } else {
                    this.updateProperties({conditionExpression: null})
                }
            } else {
                this.updateProperties({[name]: value})
            }
        },

    }

}
