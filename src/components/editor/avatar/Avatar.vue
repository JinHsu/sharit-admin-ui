<template>
    <a-modal
            title="修改头像"
            :visible="visible"
            :maskClosable="false"
            :confirmLoading="confirmLoading"
            @cancel="cancelHandel">
        <template slot="footer">
            <a-button
                    @click="cancelHandel">
                取消
            </a-button>
            <a-button
                    type="primary"
                    :loading="loading"
                    @click="finish('blob')">
                保存
            </a-button>
        </template>

        <div style="height: 300px;">
            <vue-cropper
                    ref="cropper"
                    :img="options.img"
                    :info="true"
                    :autoCrop="options.autoCrop"
                    :autoCropWidth="options.autoCropWidth"
                    :autoCropHeight="options.autoCropHeight"
                    :fixedBox="options.fixedBox"
                    @realTime="realTime">
            </vue-cropper>
        </div>
        <br>
        <div class="avatar-button">
            <a-button icon="plus" @click="changeScale(1)"/>
            <a-button icon="minus" @click="changeScale(-1)"/>
            <a-button icon="undo" @click="rotateLeft"/>
            <a-button icon="redo" @click="rotateRight"/>
            <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false">
                <a-button icon="upload">选择图片</a-button>
            </a-upload>
        </div>
    </a-modal>

</template>
<script>
    export default {
        name: 'Avatar',
        data() {
            return {
                visible: false,
                id: null,
                confirmLoading: false,
                fileList: [],
                uploading: false,
                options: {
                    // img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    img: '',
                    autoCrop: true,
                    autoCropWidth: 200,
                    autoCropHeight: 200,
                    fixedBox: true
                },
                previews: {
                    url: ''
                },
                loading: false
            }
        },

        methods: {
            edit(id) {
                this.visible = true
                this.id = id
                /* 获取原始头像 */
            },
            close() {
                this.id = null
                this.visible = false
            },
            cancelHandel() {
                this.close()
            },
            changeScale(num) {
                num = num || 1
                this.$refs.cropper.changeScale(num)
            },
            rotateLeft() {
                this.$refs.cropper.rotateLeft()
            },
            rotateRight() {
                this.$refs.cropper.rotateRight()
            },
            beforeUpload(file) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    this.options.img = reader.result
                }

                return false
            },

            // 上传图片（点击上传按钮）
            finish(type) {
                console.log('finish')
                const _this = this
                const formData = new FormData()
                // 输出
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        const img = window.URL.createObjectURL(data)
                        this.model = true
                        this.modelSrc = img
                        formData.append('file', data, this.fileName)
                        this.$http.post('https://www.mocky.io/v2/5cc8019d300000980a055e76', formData, {
                            contentType: false,
                            processData: false,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        })
                            .then((response) => {
                                console.log('upload response:', response)
                                _this.$message.success('上传成功')
                                _this.$emit('ok', response.url)
                                _this.visible = false
                            })
                    })
                } else {
                    this.$refs.cropper.getCropData((data) => {
                        this.model = true
                        this.modelSrc = data
                    })
                }
            },
            okHandel() {
                const vm = this

                vm.confirmLoading = true
                setTimeout(() => {
                    vm.confirmLoading = false
                    vm.close()
                    vm.$message.success('上传头像成功')
                }, 2000)
            },

            realTime(data) {
                this.previews = data
            }
        }
    }
</script>

<style lang="less" scoped>
    .avatar-button button {
        margin-right: 8px;
    }

    .avatar-upload-preview {
        position: absolute;
        top: 50%;
        transform: translate(50%, -50%);
        width: 180px;
        height: 180px;
        border-radius: 50%;
        box-shadow: 0 0 4px #ccc;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }
</style>
