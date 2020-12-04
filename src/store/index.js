import Vuex from 'vuex'
import {app, frame} from './modules'

const store = new Vuex.Store({
    strict: false,

    modules: {
        app: app, frame
    }

})

export default store