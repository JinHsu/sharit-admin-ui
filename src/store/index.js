import Vuex from 'vuex'
import {app, framework} from './modules'

const store = new Vuex.Store({
    strict: false,

    modules: {
        app, framework
    }

})

export default store