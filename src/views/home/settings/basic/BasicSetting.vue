<template>
    <div class="settings">
        <a-space direction="horizontal" align="start" :size="50">
            <div class="main">
                <!---->
                <a-form layout="horizontal" id="form" :form="form" ref="form">
                    <a-form-item label="昵称">
                        <a-input v-decorator="['nickname', rules.nickname]" autocomplete="off"/>
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
                                       v-decorator="['birthday', rules.birthday]"/>
                    </a-form-item>
                    <a-form-item label="所在地区">
                        <a-input v-decorator="['area', rules.area]" autocomplete="off"/>
                    </a-form-item>

                    <a-form-item>
                        <a-space size="large">
                            <a-button type="danger" :loading="loading" @click="onSave" :disabled="!changed">
                                保存
                            </a-button>
                            <a-button @click="onCancel"> 取消</a-button>
                        </a-space>
                    </a-form-item>
                </a-form>
            </div>
            <!---->
            <cropper :imageUrl="avatar" @success="onAvatarSaveSuccess"/>
        </a-space>
    </div>
</template>

<script>
    import {app} from '@/mixins'
    import rules from './rules'
    import Cropper from "@/components/cropper"
    import userService from '@/views/platform/rbac/user/service'
    import {formatDate, momentDate} from "@/utils/datetime"

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
                changed: false
            }
        },

        methods: {
            onFieldsChange(props, fields) {
                this.changed = false
                const keys = Object.keys(fields)
                for (let index = 0; index < keys.length; index++) {
                    const key = keys[index]
                    // eslint-disable-next-line no-prototype-builtins
                    if (fields.hasOwnProperty(key)) {
                        const {value: formValue} = fields[key]
                        const originValue = this.userInfo[key]
                        // eslint-disable-next-line no-prototype-builtins
                        if (fields[key].hasOwnProperty('dirty')
                            && formValue !== originValue) {
                            this.changed = true
                            break
                        }
                    }
                }
            },

            onSave() {
                this.loading = true
                // eslint-disable-next-line no-unused-vars
                this.form.validateFields({force: true}, (err, values) => {
                        if (!err) {
                            const saveData = {...this.userInfo}

                            // 处理日期时间字段的格式
                            Object.keys(values).forEach(key => {
                                const value = values[key]
                                if (value && value['_isAMomentObject']) {
                                    values[key] = formatDate(value)
                                }
                            })
                            // 添加界面上的数据
                            Object.assign(saveData, values)
                            userService.update(saveData).then(user => {
                                this.setUserInfo(user)
                                this.$message.success({content: '保存成功！'})
                            }).finally(() => this.loading = false)
                        } else {
                            this.loading = false
                        }
                    }
                )
            },

            onCancel() {
                this.update(this.userInfo)
            },

            async onAvatarSaveSuccess(url) {
                this.userInfo.avatar = url
                const newUser = await userService.update(this.userInfo)
                this.setUserInfo(newUser)
                this.$message.success('设置头像成功！')
            },

            update(userInfo) {
                if (userInfo) {
                    const {nickname, sex, birthday, area} = userInfo
                    const values = {nickname, sex, birthday: momentDate(birthday), area}
                    this.$nextTick(() => {
                        this.form.setFieldsValue(values)
                    })
                }
            }
        },

        created() {

        },

        mounted() {
            this.update(this.userInfo)
        },

        watch: {
            userInfo(userInfo) {
                this.update(userInfo)
            }
        }

    }
</script>

<style lang="less" scoped>
    .settings {
        padding: 10px;
        margin: 0 auto;
        width: 600px;

        .main {
            max-width: 400px;
            width: 400px;
        }
    }
</style>