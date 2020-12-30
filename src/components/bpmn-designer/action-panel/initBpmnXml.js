function randomStr() {
    return Math.random().toString(36).slice(-8)
}

export default function () {
    return `
        <?xml version="1.0" encoding="UTF-8"?>
        <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.flowable.org/processdef">
            <process id="process_${randomStr()}" name="name_${randomStr()}" />
            <bpmndi:BPMNDiagram id="BPMNDiagram_flow">
                <bpmndi:BPMNPlane id="BPMNPlane_flow" bpmnElement="process_${randomStr()}" />
            </bpmndi:BPMNDiagram>
        </definitions>
    `
}
