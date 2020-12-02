import Vuex from 'vuex'
import {app} from './modules'

const store = new Vuex.Store({
    strict: false,

    modules: {
        app: app,
    }

})

export default store