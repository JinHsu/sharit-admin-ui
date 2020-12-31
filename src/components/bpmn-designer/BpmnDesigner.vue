<template>
    <div class="bpmn-designer">
        <!--顶部按钮栏-->
        <div class="action-wrapper">
            <action-panel v-if="modeler" :modeler="modeler"
                          :xml="xml" :is-view="isView"/>
        </div>

        <div class="content">
            <div class="canvas-wrapper">
                <!--左侧画布-->
                <div class="canvas" ref="canvas"/>
            </div>
            <div class="properties-wrapper" v-if="!isView">
                <!--右侧属性面板-->
                <properties-panel
                        v-if="modeler" :modeler="modeler"
                        :users="users" :groups="groups" :categorys="categorys" :roles="roles"/>
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
            isView: {type: Boolean, default: true}
        },

        components: {
            ActionPanel, PropertiesPanel
        },

        data() {
            return {
                modeler: null,
            }
        },

        computed: {
            options() {
                const additionalModules = {
                    translate: ['value', customTranslate], // 国际化
                }

                if (this.isView) {
                    Object.assign(additionalModules, {
                        zoomScroll: ["value", ""], // 禁用滚轮滚动
                        // bendpoints: ["value", ""],// 禁止拖动线
                        paletteProvider: ["value", ""],// 禁用左侧面板
                        contextPadProvider: ["value", ""],// 禁止点击节点出现contextPad
                        labelEditingProvider: ["value", ""], // 禁止双击节点出现label编辑框
                    })
                }

                return {
                    container: this.$refs.canvas,
                    keyboard: {
                        bindTo: window // 快捷键
                    },
                    additionalModules: [additionalModules],
                    moddleExtensions: {flowable: flowableModule}
                }
            }
        },

        mounted() {
            this.modeler = new Modeler(this.options)
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

        .action-wrapper {
            padding: 8px;
        }

        .content {
            height: 100%;
            width: 100%;
            display: flex;
            flex-flow: row wrap;

            .canvas-wrapper {
                flex: 1 1 auto;
                position: relative;

                .canvas {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    left: 0;
                }
            }

            .properties-wrapper {
                flex: 0 0 360px;
                position: relative;
                margin: 20px 20px 20px 0;

                border: 1px solid #ccc;
                border-radius: 2px;
                background: #fafafa;
                overflow-y: auto;
            }
        }

    }
</style>