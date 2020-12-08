<template>
    <div :style="{width: previewSize}">
        <div class="ant-upload-preview" @click="edit">
            <a-icon type="cloud-upload-o" class="upload-icon"/>
            <div class="mask">
                <a-icon type="plus"/>
            </div>
            <img :src="imageUrl" alt="头像"/>
        </div>
        <a-modal ref="cropperModal" :title="title" :visible="visible"
                 :maskClosable="false" :destroyOnClose="true"
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
            title: {type: String, default: '修改头像'},
            previewSize: {type: String, default: '200px'},
            cropWidth: {type: Number, default: 100},
            cropHeight: {type: Number, default: 100},
            imageUrl: {
                type: String,
                default: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }
        },

        data() {
            return {
                visible: false,
                options: {
                    img: this.imageUrl,
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
                this.options.img = this.image
                this.visible = false
            },

            getRandomFileFile() {
                const strArray = this.file.name.split('.')
                return UUID() + "." + strArray[strArray.length - 1]
            },

            getFileInfo() {
                return {
                    type: this.file.type,
                    lastModified: Date.now()
                }
            },

            async onSave() {
                this.loading = true
                try {
                    this.$message.loading({content: '正在准备上传文件...', key: 'uploadImage'})
                    // 获取policy
                    const policyData = await ossService.getPolicy()
                    const {accessid, policy, signature, dir, host, callback} = policyData
                    // 组装FormData
                    const formData = new FormData()
                    formData.append("policy", policy)
                    formData.append("OSSAccessKeyId", accessid)
                    formData.append("signature", signature)
                    formData.append("dir", dir)
                    formData.append("success_action_status", "200")
                    formData.append("callback", callback)

                    const fileName = this.getRandomFileFile()
                    formData.append("key", dir + fileName) // 文件名

                    //
                    const cb = (blob) => {
                        const croppedFile = new File([blob], fileName, this.getFileInfo()) // blob转file
                        formData.append('file', croppedFile)
                        // 上传图片到服务器
                        this.$message.loading({content: '正在上传文件...', key: 'uploadImage'})
                        ossService.upload(host, formData).then((res) => {
                            this.$message.success({content: '上传文件成功...', key: 'uploadImage'})
                            this.options.img = res.data.url
                            this.$emit('success', res.data.url)
                            this.visible = false
                        })
                    }

                    this.$refs.cropper.getCropBlob(cb)
                } catch (e) {
                    this.$message.error(e)
                } finally {
                    this.loading = false
                }

            }

        }
    }
</script>

<style lang="less" scoped>
    @import "./index.less";
</style>
