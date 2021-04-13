import Vue from 'vue'
import store from '@/store'

function userConf(username = '') {
    const conf = Vue.ls.get(username)
    return conf ? JSON.parse(conf) : null
}

function conf(username = '', key = '') {
    const conf = userConf(username)
    return conf ? conf[key] : null
}

function userfConfObj(username = '') {
    const conf = Vue.ls.get(username)
    return conf ? JSON.parse(conf) : {}
}

function set(username = '', key = '', value) {
    const confObj = userfConfObj(username)
    confObj[key] = value
    Vue.ls.set(username, JSON.stringify(confObj))
}

function username() {
    const userInfo = store.state.app.userInfo
    return userInfo ? userInfo.username : null
}

export default {
    get: (key = '', def) => {
        const value = conf(username(), key)
        return value ? value : def
    },
    set: (key = '', value) => set(username(), key, value),
}