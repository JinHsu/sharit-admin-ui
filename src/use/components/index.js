import Vue from 'vue'
import IconFont from "@/components/iconfont/IconFont"
import Vaptcha from "@/components/vaptcha/Vaptcha"
import ErrorDesc from "@/components/error-desc/ErrorDesc"
import ColorPicker from '@/components/color-picker'

Vue.component('icon-font', IconFont)
Vue.component('a-vaptcha', Vaptcha)
Vue.component('error-desc', ErrorDesc)
Vue.component('a-color-picker', ColorPicker)
