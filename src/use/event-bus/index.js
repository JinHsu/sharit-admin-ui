import Vue from 'vue'

const EventBus = new Vue()

const _EVENT_01_ = "e66b23a7-dfd1-4f8d-822a-dd83d009b970"
const _EVENT_02_ = "3f6fef76-9495-4319-874e-8fb9fac141c0"

Vue.prototype.$eventBus = EventBus

Vue.prototype.$events = {
    on_click_toggle: _EVENT_01_,
    on_click_setting: _EVENT_02_

}