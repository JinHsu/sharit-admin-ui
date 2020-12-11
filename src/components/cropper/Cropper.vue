<template>
    <div :style="{width: '100%'}">
        <div class="ant-upload-preview" @click="edit">
            <a-icon type="cloud-upload-o" class="upload-icon"/>
            <div class="mask">
                <a-icon type="plus"/>
            </div>
            <img :src="imageUrl" alt=""/>
        </div>
        <a-modal ref="cropperModal" :title="title" :visible="visible"
                 :maskClosable="false" :destroyOnClose="true" :width="360"
                 @cancel="onClose">
            <template slot="footer">
                <a-button @click="onClose">取消</a-button>
                <a-button type="primary" :disabled="file == null" :loading="loading"
                          @click="onSave">
                    保存
                </a-button>
            </template>

            <div style="height: 200px;">
                <vue-cropper ref="cropper"
                             :img="options.img"
                             :autoCrop="options.autoCrop"
                             :autoCropWidth="cropWidth"
                             :autoCropHeight="cropHeight"
                             :fixedBox="options.fixedBox"
                             @realTime="data => this.previews = data">
                </vue-cropper>
            </div>

            <a-divider/>

            <a-space>
                <a-button icon="plus" @click="changeScale(1)"/>
                <a-button icon="minus" @click="changeScale(-1)"/>
                <a-button icon="undo" @click="rotateLeft"/>
                <a-button icon="redo" @click="rotateRight"/>
                <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false">
                    <a-button icon="upload">选择图片</a-button>
                </a-upload>
            </a-space>
        </a-modal>
    </div>
</template>
<script>
    import ossService from './ossService'
    import {v4 as UUID} from 'uuid'

    export default {
        name: 'Cropper',

        props: {
            title: {type: String, default: '设置头像'},
            previewSize: {type: String, default: '200px'},
            cropWidth: {type: Number, default: 120},
            cropHeight: {type: Number, default: 120},
            imageUrl: {
                type: String,
                default: ''
            }
        },

        data() {
            return {
                visible: false,
                options: {
                    img: '',
                    autoCrop: true,
                    fixedBox: true
                },
                file: null,
                previews: {
                    url: ''
                },
                loading: false,
            }
        },

        methods: {
            edit() {
                this.getBase64(this.imageUrl,
                    (dataUrl) => this.options.img = dataUrl)
                this.visible = true
            },
            // 缩放
            changeScale(num) {
                num = num || 1
                this.$refs.cropper.changeScale(num)
            },

            // 左转90度
            rotateLeft() {
                this.$refs.cropper.rotateLeft()
            },

            // 右转90度
            rotateRight() {
                this.$refs.cropper.rotateRight()
            },

            // 选择图片（不上传）
            beforeUpload(file) {
                this.file = file
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => this.options.img = reader.result
                return false
            },

            // 关闭
            onClose() {
                this.visible = false
            },

            async onSave() {
                this.loading = true
                try {
                    this.$refs.cropper.getCropBlob(blob => {
                        ossService.uploadBlobFile(blob, {
                            fileName: UUID() + ".jpg",
                            fileType: this.file.type,
                            lastModified: Date.now()
                        }).then(url => {
                            this.$emit('success', url)
                            this.visible = false
                        })
                    })
                } catch (e) {
                    this.$message.error(e)
                } finally {
                    this.loading = false
                }

            },

            getBase64(url, callback) {
                const image = new Image()
                let dataURL = ''
                image.src = url + '?v=' + Math.random()
                image.setAttribute('crossOrigin', 'Anonymous')
                image.onload = () => {
                    const canvas = document.createElement('canvas')
                    const width = image.width
                    const height = image.height
                    canvas.width = width
                    canvas.height = height
                    canvas.getContext('2d').drawImage(image, 0, 0, width, height)
                    dataURL = canvas.toDataURL('image/jpeg')
                    return callback ? callback(dataURL) : null
                }
            }

        }
    }
</script>

<style lang="less" scoped>
    @import "./index.less";
</style>
