import Vue from 'vue'

const EventBus = new Vue()

const SIDEBAR_COLLAPSED = "e66b23a7-dfd1-4f8d-822a-dd83d009b970"

Vue.prototype.$eventBus = EventBus

Vue.prototype.$events = {
    on_toggle: SIDEBAR_COLLAPSED
}