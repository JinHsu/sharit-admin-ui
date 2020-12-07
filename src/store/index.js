import Vue from 'vue'
import Vuex from 'vuex'
import {app, framework} from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: false,

    modules: {
        app, framework
    }

})