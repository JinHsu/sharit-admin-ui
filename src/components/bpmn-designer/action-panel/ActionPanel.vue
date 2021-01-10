<template>
    <div>
        <a-space>
            <!--
            <a-tooltip title="打开" placement="top" v-if="!isView">
                <a-upload :beforeUpload="openBpmn" :showUploadList="false">
                    <a-button icon="folder-open"/>
                </a-upload>
            </a-tooltip>

            <a-tooltip title="新建" placement="top" v-if="!isView">
                <a-button icon="file-add" @click="newDiagram"/>
            </a-tooltip>
            -->

            <a-tooltip title="保存" placement="top" v-if="!isView">
                <a-button icon="save" @click="save"/>
            </a-tooltip>

            <a-button-group v-if="!isView">
                <a-tooltip title="撤销" placement="top">
                    <a-button icon="undo" @click="undo()"/>
                </a-tooltip>
                <a-tooltip title="重做" placement="top">
                    <a-button icon="redo" @click="redo()"/>
                </a-tooltip>
            </a-button-group>

            <a-button-group>
                <a-tooltip title="适应屏幕" placement="top">
                    <a-button icon="drag" @click="fitViewport"/>
                </a-tooltip>
                <a-tooltip title="放大" placement="top">
                    <a-button icon="zoom-in" @click="zoomViewport(true)"/>
                </a-tooltip>
                <a-tooltip title="缩小" placement="top">
                    <a-button icon="zoom-out" @click="zoomViewport(false)"/>
                </a-tooltip>
            </a-button-group>

            <!--
            <a-radio-group :default-value="true" @change="onShowGrid">
                <a-tooltip title="显示网格" placement="top">
                    <a-radio-button :value="true">
                        <a-icon type="table"/>
                    </a-radio-button>
                </a-tooltip>
                <a-tooltip title="隐藏网格" placement="top">
                    <a-radio-button :value="false">
                        <a-icon type="border"/>
                    </a-radio-button>
                </a-tooltip>
            </a-radio-group>
            -->

            <a-tooltip :title="showPropertiesPanel ? '隐藏属性面板' : '显示属性面板'" placement="top" v-if="!isView">
                <a-button @click="onShowPropertiesPanel">
                    <a-icon type="select" :rotate="showPropertiesPanel ? 180 : 0"/>
                </a-button>
            </a-tooltip>

            <!--
            <a-button-group v-if="!isView">
                <a-tooltip title="导出xml" placement="top">
                    <a-button icon="export" @click="saveXML(true)">xml</a-button>
                </a-tooltip>
                <a-tooltip title="导出svg" placement="top">
                    <a-button icon="export" @click="saveImg('svg', true)">svg</a-button>
                </a-tooltip>
            </a-button-group>
            -->
        </a-space>
    </div>
</template>

<script>
    import initBpmnXml from "./initBpmnXml"

    export default {
        name: "ActionPanel",

        props: {
            modeler: {type: Object, required: true},
            xml: {type: String, default: ''},
            isView: {type: Boolean, default: false}
        },

        data() {
            return {
                //
                zoom: 1,
                showPropertiesPanel: true
            }
        },

        methods: {
            undo() {
                this.modeler.get('commandStack').undo()
            },

            redo() {
                this.modeler.get('commandStack').redo()
            },

            // 让图能自适应屏幕
            fitViewport() {
                this.zoom = this.modeler.get('canvas').zoom('fit-viewport')
                const bbox = document.querySelector('.canvas .viewport').getBBox()
                const currentViewbox = this.modeler.get('canvas').viewbox()
                const elementMid = {
                    x: bbox.x + bbox.width / 2 - 30,
                    y: bbox.y + bbox.height / 2
                }
                this.modeler.get('canvas').viewbox({
                    x: elementMid.x - currentViewbox.width / 2,
                    y: elementMid.y - currentViewbox.height / 2,
                    width: currentViewbox.width,
                    height: currentViewbox.height
                })
                this.zoom = bbox.width / currentViewbox.width * 1.8
            },

            // 放大，缩小
            zoomViewport(zoomIn) {
                this.zoom = this.modeler.get('canvas').zoom()
                this.zoom += (zoomIn ? 0.1 : -0.1)
                this.modeler.get('canvas').zoom(this.zoom)
            },

            onShowGrid(e) {
                this.$emit('showGrid', e.target.value)
            },

            onShowPropertiesPanel() {
                // const callback =
                this.showPropertiesPanel = !this.showPropertiesPanel
                this.$emit('showPropertiesPanel', this.showPropertiesPanel)
                this.$nextTick(() => this.fitViewport())
            },

            openBpmn(file) {
                this.$confirm({
                    title: '提示', content: '您是否已保存当前流程设计，确定要打开吗？', okType: 'danger',
                    onOk: () => {
                        this.readFile(file)
                    }
                })
                return false
            },

            readFile(file) {
                const reader = new FileReader()
                reader.readAsText(file, 'utf-8')
                reader.onload = () => {
                    this.createNewDiagram(reader.result)
                }
                return false
            },

            newDiagram() {
                this.$confirm({
                    title: '提示', content: '您是否已保存当前流程设计，确定要新建吗？', okType: 'danger',
                    onOk: () => this.createNewDiagram(initBpmnXml())
                })
            },

            async save() {
                const process = this.getProcess()
                const xml = await this.saveXML()
                const svg = await this.saveImg()
                const result = {...process, xml, svg}
                this.$emit('save', result)
                // window.parent.postMessage(result, '*') //在iframe父子页面数据传输
            },

            async saveXML(download = false) {
                try {
                    const {xml} = await this.modeler.saveXML({format: true})
                    if (download) {
                        this.downloadFile(`${this.getProcessElement().name}.bpmn20.xml`, xml, 'application/xml')
                    }
                    return xml
                } catch (err) {
                    this.$notification.error({message: '错误', description: err})
                }
            },

            async saveImg(type = 'svg', download = false) {
                try {
                    if (type === 'svg') {
                        const {svg} = await this.modeler.saveSVG({format: true})
                        if (download) {
                            this.downloadFile(this.getProcessElement().name, svg, 'image/svg+xml')
                        }
                        return svg
                    }
                } catch (err) {
                    this.$notification.error({message: '错误', description: err})
                }
            },

            downloadFile(filename, data, type) {
                const a = document.createElement('a');
                const url = window.URL.createObjectURL(new Blob([data], {type: type}));
                a.href = url
                a.download = filename
                a.click()
                window.URL.revokeObjectURL(url)
            },

            async createNewDiagram(data) {
                // 将字符串转换成图显示出来
                data = data.replace(/<!\[CDATA\[(.+?)]]>/g, function (match, str) {
                    return str.replace(/</g, '&lt;')
                })
                try {
                    await this.modeler.importXML(data)
                    // this.adjustPalette()
                    this.fitViewport()
                    // this.fillColor()
                } catch (err) {
                    this.$notification.error({message: '错误', description: err})
                }
            },

            getProcess() {
                const element = this.getProcessElement()
                return {
                    id: element.id,
                    name: element.name,
                    category: element.$attrs['flowable:processCategory'],
                }
            },

            getProcessElement() {
                const rootElements = this.modeler.getDefinitions().rootElements
                for (let i = 0; i < rootElements.length; i++) {
                    if (rootElements[i].$type === 'bpmn:Process') {
                        return rootElements[i]
                    }
                }
            },

            init() {
                if (this.xml) {
                    this.$nextTick(() => this.createNewDiagram(this.xml))
                } else {
                    this.$nextTick(() => this.createNewDiagram(initBpmnXml()))
                }
            }

        },

        mounted() {
            this.init()
        },

        watch: {
            xml: function (val) {
                if (val) {
                    this.init()
                }
            }
        },

    }
</script>

<style lang="less" scoped>

</style>