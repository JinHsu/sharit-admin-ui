<template>
    <div id="vaptchaContainer">
        <!--vaptcha-container是用来引入VAPTCHA的容器，下面代码为预加载动画，仅供参考-->
        <div class="vaptcha-init-main">
            <div class="vaptcha-init-loading">
                <a href="/" target="_blank">
                    <img src="https://r.vaptcha.net/public/img/vaptcha-loading.gif" alt="vaptcha"/>
                </a>
                <span class="vaptcha-text">Vaptcha启动中...</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Vaptcha",

        data() {
            return {
                script: 'https://v.vaptcha.com/v3.js',
                vid: '5fd92656e1874d214d49aed0',
                vaptchaObj: {}
            }
        },

        methods: {
            reset() {
                this.vaptchaObj.reset()
            }
        },

        mounted() {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = this.script
            document.body.appendChild(script)
            const _this = this
            script.onload = () => {

                vaptcha({
                    //配置参数
                    vid: this.vid, // 验证单元id
                    type: 'click', // 展现类型 点击式
                    container: '#vaptchaContainer', // 按钮容器，可为Element 或者 selector
                    scene: 1, // 场景值 默认0
                    offline_server: "", //离线模式服务端地址，若尚未配置离线模式，请填写任意地址即可。
                    //可选参数
                    lang: 'zh-CN', // 语言 默认auto,可选值auto,zh-CN,en,zh-TW,jp
                    https: true, // 使用https 默认 true
                    style: 'dark' //按钮样式 默认dark，可选值 dark,light
                }).then(function (vaptchaObj) {
                    _this.vaptchaObj = vaptchaObj
                    vaptchaObj.render() // 调用验证实例 vpObj 的 render 方法加载验证按钮(click方式调用)
                    //获取token
                    vaptchaObj.listen("pass", () => _this.$emit('vaptchaSuccess', vaptchaObj.getToken()))
                    //关闭验证弹窗时触发
                    vaptchaObj.listen("close", () => vaptchaObj.reset())
                })
            }
        },

    }
</script>

<style lang="less">
    @import "index";
</style>