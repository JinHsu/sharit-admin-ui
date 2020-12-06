import Vuex from 'vuex'
import {framework} from './modules'

const store = new Vuex.Store({
    strict: false,

    modules: {
        framework
    }

})

export default store