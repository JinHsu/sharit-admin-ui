<template>
    <div style="padding: 10px;">
        <a-space align="start" :size="100">
            <div style="width: 500px;">
                <a-form layout="horizontal" id="form" :form="form" ref="form">
                    <a-form-item label="昵称">
                        <a-input v-decorator="['nickname', rules.nickname]"/>
                    </a-form-item>
                    <a-form-item label="性别">
                        <a-radio-group v-decorator="['sex', rules.sex]">
                            <a-radio :value="1"> 男</a-radio>
                            <a-radio :value="0"> 女</a-radio>
                            <a-radio :value="-1"> 保密</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="生日">
                        <a-date-picker style="width:100%;" placeholder="请填写生日"
                                       v-decorator="['birthdate', rules.birthdate]"/>
                    </a-form-item>
                    <a-form-item label="所在地区">
                        <a-input v-decorator="['area', rules.area]"/>
                    </a-form-item>

                    <a-form-item>
                        <a-space size="large">
                            <a-button @click="onCancel"> 取消</a-button>
                            <a-button type="primary" :loading="loading" @click="onSave" :disabled="!changed">
                                保存
                            </a-button>
                        </a-space>
                    </a-form-item>
                </a-form>
            </div>
            <cropper :imageUrl="userInfo.avatar" @success="onAvatarSaveSuccess"/>
        </a-space>
    </div>
</template>

<script>
    import {app} from '@/mixins'
    import rules from './rules'
    import Cropper from "@/components/cropper"
    import userService from '@/views/platform/rbac/user/service'

    export default {
        name: "BasicSetting",

        components: {Cropper},

        mixins: [app],

        data() {
            return {
                rules: rules,
                form: this.$form.createForm(this, {
                    onFieldsChange: this.onFieldsChange
                }),
                loading: false,
                changed: false,
            }
        },

        methods: {
            onFieldsChange(props, fields) {
                console.log(props, fields)
                this.changed = true
            },

            setavatar(url) {
                this.option.img = url
            },

            onSave() {
            },

            onCancel() {
            },

            async onAvatarSaveSuccess(url) {
                this.userInfo.avatar = url
                const newUser = await userService.update(this.userInfo)
                this.setUserInfo(newUser)
            },


        },

        created() {

        },

        mounted() {
        },

        watch: {}

    }
</script>

<style lang="less" scoped>
    .ant-upload-preview {
        position: relative;
        margin: 0 auto;
        width: 100%;
        max-width: 180px;
        border-radius: 50%;
        box-shadow: 0 0 4px #ccc;

        .upload-icon {
            position: absolute;
            top: 0;
            right: 10px;
            font-size: 1.4rem;
            padding: 0.5rem;
            background: rgba(222, 221, 221, 0.7);
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.2);
        }

        .mask {
            opacity: 0;
            position: absolute;
            background: rgba(0, 0, 0, 0.4);
            cursor: pointer;
            transition: opacity 0.4s;

            &:hover {
                opacity: 1;
            }

            i {
                font-size: 2rem;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -1rem;
                margin-top: -1rem;
                color: #d6d6d6;
            }
        }

        img, .mask {
            width: 100%;
            max-width: 180px;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
        }
    }
</style>