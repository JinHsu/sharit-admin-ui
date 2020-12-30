<template>
    <div class="bpmn-design">
        <action-panel
                v-if="modeler"
                :modeler="modeler"/>
        <div class="containers" ref="content" :style="{left: siderWidth}">
            <div class="canvas" ref="canvas"></div>
            <div class="panel">
                <properties-panel
                        v-if="modeler"
                        :modeler="modeler"
                        :users="users"
                        :groups="groups"
                        :categorys="categorys"
                        :roles="roles"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Modeler from 'bpmn-js/lib/Modeler'
    import customTranslate from './i18n/customTranslate' // 国际化
    import ActionPanel from './action-panel'
    import PropertiesPanel from './properties-panel'
    import {device, framework} from "@/mixins"
    import diagramXml from './bpmn'
    import flowableModule from './flowable.json'

    export default {
        name: "WFDsign",

        components: {ActionPanel, PropertiesPanel},

        data() {
            return {
                // bpmn建模器
                modeler: null,
                container: null,
                canvas: null,

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

                //
                siderWidth: '256px',
            }
        },

        mixins: [device, framework],

        methods: {},

        mounted() {
            this.modeler = new Modeler({
                container: this.$refs.canvas,
                additionalModules: [
                    {
                        translate: ['value', customTranslate]// 国际化
                    }
                ],
                moddleExtensions: {
                    flowable: flowableModule
                }
            })

            this.modeler.importXML(diagramXml)
        },

        created() {
            this.siderWidth = this.adapt(this.device)
        },

        watch: {
            device(n, o) {
                this.siderWidth = this.adapt(n, o)
            },

            collapsed() {
                this.siderWidth = this.onCollapse(this.device)
            }
        }

    }
</script>

<style lang="less">
    @import "~bpmn-js/dist/assets/diagram-js.css";
    @import "~bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
    @import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
    @import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

    .bpmn-design {

        .containers {
            position: absolute;
            background-color: #FFFFFF;
            top: 152px;
            right: 0;
            bottom: 0;
        }

        .bjs-container a {
            display: none;
        }

        .canvas {
            padding-right: 360px;
            width: 100%;
            height: 100%;
        }

        .panel {
            position: absolute;
            right: 20px;
            top: 20px;
            bottom: 20px;
            width: 360px;
            overflow-y: auto;
            border: 1px solid #ccc;
            border-radius: 2px;
            background: #fafafa;
        }

    }
</style>