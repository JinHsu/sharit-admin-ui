<template>
    <div class="bpmn-designer">
        <!--顶部按钮栏-->
        <div class="header">
            <action-panel
                    ref="action"
                    v-if="modeler"
                    :modeler="modeler"
                    :xml="xml"/>
        </div>

        <div class="content">
            <!--左侧画布-->
            <div class="canvas" ref="canvas"/>
            <!--右侧属性面板-->
            <div class="sider">
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
    import flowableModule from './flowable/flowable.json'

    export default {
        name: "BpmnDesigner",

        props: {
            xml: {type: String, default: ''},
            users: {type: Array, default: () => []},
            groups: {type: Array, default: () => []},
            roles: {type: Array, default: () => []},
            categorys: {type: Array, default: () => []},
            isView: {type: Boolean, default: false}
        },

        components: {
            ActionPanel, PropertiesPanel
        },

        data() {
            return {
                modeler: null,
            }
        },

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
        },

    }
</script>

<style lang="less">
    @import "../../../node_modules/bpmn-js/dist/assets/diagram-js.css";
    @import "../../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
    @import "../../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
    @import "../../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

    .bjs-container a {
        display: none;
    }

    .bpmn-designer {
        position: relative;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .header {
            padding: 8px;
        }

        .content {
            position: relative;
            height: 100%;
            width: 100%;

            .canvas {
                position: absolute;
                top: 0;
                right: 400px;
                bottom: 0;
                left: 0;
            }

            .sider {
                position: absolute;
                top: 20px;
                right: 20px;
                bottom: 20px;
                width: 380px;
                border: 1px solid #ccc;
                border-radius: 2px;
                background: #fafafa;
                overflow-y: auto;
            }
        }

    }
</style>