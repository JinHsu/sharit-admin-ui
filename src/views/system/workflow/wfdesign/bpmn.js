const bpmnXmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:flowable="http://flowable.org/bpmn" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.flowable.org/processdef">\n' +
    '  <process id="LeaveApplication" name="请假申请" flowable:processCategory="oa">\n' +
    '    <startEvent id="startNode1" name="开始">\n' +
    '      <extensionElements>\n' +
    '        <flowable:executionListener expression="555" event="start" />\n' +
    '      </extensionElements>\n' +
    '      <outgoing>Flow_1i6ntl4</outgoing>\n' +
    '    </startEvent>\n' +
    '    <sequenceFlow id="Flow_1i6ntl4" sourceRef="startNode1" targetRef="Activity_02v0kq2" />\n' +
    '    <userTask id="Activity_02v0kq2" name="一级审批" flowable:formKey="Approve:Level1" flowable:assignee="${approverId}" userType="assignee" assignee="${approverId}">\n' +
    '      <extensionElements>\n' +
    '        <flowable:executionListener class="666" event="take">\n' +
    '          <flowable:field name="6" stringValue="6" />\n' +
    '        </flowable:executionListener>\n' +
    '      </extensionElements>\n' +
    '      <incoming>Flow_1i6ntl4</incoming>\n' +
    '      <incoming>Flow_1n4cqa6</incoming>\n' +
    '      <outgoing>Flow_101x41f</outgoing>\n' +
    '    </userTask>\n' +
    '    <exclusiveGateway id="Gateway_1mdfbn1">\n' +
    '      <incoming>Flow_101x41f</incoming>\n' +
    '      <outgoing>Flow_1oexhjd</outgoing>\n' +
    '      <outgoing>Flow_0ms36c0</outgoing>\n' +
    '    </exclusiveGateway>\n' +
    '    <sequenceFlow id="Flow_101x41f" sourceRef="Activity_02v0kq2" targetRef="Gateway_1mdfbn1" />\n' +
    '    <sequenceFlow id="Flow_1oexhjd" sourceRef="Gateway_1mdfbn1" targetRef="Activity_0pbabwd">\n' +
    '      <conditionExpression xsi:type="tFormalExpression">${status == \'approve\'}</conditionExpression>\n' +
    '    </sequenceFlow>\n' +
    '    <userTask id="Activity_0pbabwd" name="二级审批" flowable:formKey="Approve:Level2" flowable:candidateUsers="zhangsan,lisi" userType="candidateUsers" candidateUsers="zhangsan,lisi">\n' +
    '      <extensionElements>\n' +
    '        <flowable:executionListener delegateExpression="65646" event="end">\n' +
    '          <flowable:field name="1" stringValue="1" />\n' +
    '          <flowable:field name="2" stringValue="2" />\n' +
    '        </flowable:executionListener>\n' +
    '        <flowable:executionListener expression="6546" event="start">\n' +
    '          <flowable:field name="1" stringValue="1" />\n' +
    '        </flowable:executionListener>\n' +
    '        <flowable:executionListener class="65467657" event="start">\n' +
    '          <flowable:field name="1" stringValue="1" />\n' +
    '          <flowable:field name="2" stringValue="2" />\n' +
    '          <flowable:field name="3" expression="3" />\n' +
    '        </flowable:executionListener>\n' +
    '      </extensionElements>\n' +
    '      <incoming>Flow_1oexhjd</incoming>\n' +
    '      <outgoing>Flow_0oidzit</outgoing>\n' +
    '    </userTask>\n' +
    '    <exclusiveGateway id="Gateway_01lgsw5">\n' +
    '      <incoming>Flow_0oidzit</incoming>\n' +
    '      <outgoing>Flow_1mqv4d2</outgoing>\n' +
    '      <outgoing>Flow_0ubisbp</outgoing>\n' +
    '    </exclusiveGateway>\n' +
    '    <sequenceFlow id="Flow_0oidzit" sourceRef="Activity_0pbabwd" targetRef="Gateway_01lgsw5" />\n' +
    '    <endEvent id="Event_1mqklz0" name="结束">\n' +
    '      <incoming>Flow_1mqv4d2</incoming>\n' +
    '    </endEvent>\n' +
    '    <sequenceFlow id="Flow_1mqv4d2" sourceRef="Gateway_01lgsw5" targetRef="Event_1mqklz0">\n' +
    '      <conditionExpression xsi:type="tFormalExpression">${status == \'approve\'}</conditionExpression>\n' +
    '    </sequenceFlow>\n' +
    '    <userTask id="Activity_15gykiz" name="修改填报">\n' +
    '      <extensionElements>\n' +
    '        <flowable:executionListener class="67675" event="start" />\n' +
    '      </extensionElements>\n' +
    '      <incoming>Flow_0ms36c0</incoming>\n' +
    '      <incoming>Flow_0ubisbp</incoming>\n' +
    '      <outgoing>Flow_1n4cqa6</outgoing>\n' +
    '    </userTask>\n' +
    '    <sequenceFlow id="Flow_0ms36c0" sourceRef="Gateway_1mdfbn1" targetRef="Activity_15gykiz">\n' +
    '      <conditionExpression xsi:type="tFormalExpression">${status == \'reject\'}</conditionExpression>\n' +
    '    </sequenceFlow>\n' +
    '    <sequenceFlow id="Flow_0ubisbp" sourceRef="Gateway_01lgsw5" targetRef="Activity_15gykiz">\n' +
    '      <conditionExpression xsi:type="tFormalExpression">${status == \'reject\'}</conditionExpression>\n' +
    '    </sequenceFlow>\n' +
    '    <sequenceFlow id="Flow_1n4cqa6" sourceRef="Activity_15gykiz" targetRef="Activity_02v0kq2" />\n' +
    '  </process>\n' +
    '  <bpmndi:BPMNDiagram id="BPMNDiagram_flow">\n' +
    '    <bpmndi:BPMNPlane id="BPMNPlane_flow" bpmnElement="LeaveApplication">\n' +
    '      <bpmndi:BPMNEdge id="Flow_1n4cqa6_di" bpmnElement="Flow_1n4cqa6">\n' +
    '        <di:waypoint x="490" y="440" />\n' +
    '        <di:waypoint x="370" y="440" />\n' +
    '        <di:waypoint x="370" y="255" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0ubisbp_di" bpmnElement="Flow_0ubisbp">\n' +
    '        <di:waypoint x="880" y="240" />\n' +
    '        <di:waypoint x="880" y="440" />\n' +
    '        <di:waypoint x="590" y="440" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0ms36c0_di" bpmnElement="Flow_0ms36c0">\n' +
    '        <di:waypoint x="540" y="240" />\n' +
    '        <di:waypoint x="540" y="400" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1mqv4d2_di" bpmnElement="Flow_1mqv4d2">\n' +
    '        <di:waypoint x="905" y="215" />\n' +
    '        <di:waypoint x="1002" y="215" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_0oidzit_di" bpmnElement="Flow_0oidzit">\n' +
    '        <di:waypoint x="760" y="215" />\n' +
    '        <di:waypoint x="855" y="215" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1oexhjd_di" bpmnElement="Flow_1oexhjd">\n' +
    '        <di:waypoint x="565" y="215" />\n' +
    '        <di:waypoint x="660" y="215" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_101x41f_di" bpmnElement="Flow_101x41f">\n' +
    '        <di:waypoint x="420" y="215" />\n' +
    '        <di:waypoint x="515" y="215" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNEdge id="Flow_1i6ntl4_di" bpmnElement="Flow_1i6ntl4">\n' +
    '        <di:waypoint x="225" y="215" />\n' +
    '        <di:waypoint x="320" y="215" />\n' +
    '      </bpmndi:BPMNEdge>\n' +
    '      <bpmndi:BPMNShape id="BPMNShape_startNode1" bpmnElement="startNode1" bioc:stroke="">\n' +
    '        <omgdc:Bounds x="195" y="200" width="30" height="30" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <omgdc:Bounds x="198" y="237" width="22" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_0wi8psg_di" bpmnElement="Activity_02v0kq2">\n' +
    '        <omgdc:Bounds x="320" y="175" width="100" height="80" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Gateway_1mdfbn1_di" bpmnElement="Gateway_1mdfbn1" isMarkerVisible="true">\n' +
    '        <omgdc:Bounds x="515" y="190" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_17nhy2b_di" bpmnElement="Activity_0pbabwd">\n' +
    '        <omgdc:Bounds x="660" y="175" width="100" height="80" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Gateway_01lgsw5_di" bpmnElement="Gateway_01lgsw5" isMarkerVisible="true">\n' +
    '        <omgdc:Bounds x="855" y="190" width="50" height="50" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Event_1mqklz0_di" bpmnElement="Event_1mqklz0">\n' +
    '        <omgdc:Bounds x="1002" y="197" width="36" height="36" />\n' +
    '        <bpmndi:BPMNLabel>\n' +
    '          <omgdc:Bounds x="1009" y="240" width="23" height="14" />\n' +
    '        </bpmndi:BPMNLabel>\n' +
    '      </bpmndi:BPMNShape>\n' +
    '      <bpmndi:BPMNShape id="Activity_183ksl7_di" bpmnElement="Activity_15gykiz">\n' +
    '        <omgdc:Bounds x="490" y="400" width="100" height="80" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '    </bpmndi:BPMNPlane>\n' +
    '  </bpmndi:BPMNDiagram>\n' +
    '</definitions>\n'

export default bpmnXmlStr