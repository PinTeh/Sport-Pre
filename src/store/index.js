import Vue from 'vue'
import Vuex from 'vuex'
import {  removeAll, setLocalUserInfo, getLocalUserInfo, getToken } from '../utils/auth'
import Api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: null,
        token: '',
        webSocket: {
            rid: '',
            socket: ''
        },
        categorys: [],
        menu: []
    },
    getters: {
        foo(state) {
            return "￥" + state.token
        }
        //调用方式store.getters.foo
        // `拼接${state.xx}字符`
    },
    mutations: {
        setUserInfo(state, v) {
            state.userInfo = v
        },
        setStateToken(state, v) {
            state.token = v
        },
        setWebSocket(state, v) {
            state.webSocket = v
        },
        setCatrgorys(state, v) {
            state.categorys = v
        },
        setAdminMenu(state, v) {
            state.menu = v
        }
    },
    actions: {
        foo({ commit }, e) {
            commit("foo", e)
        },
        init({ commit }) {
            return new Promise((resolve) => {
                commit('setStateToken', getToken())
                commit('setUserInfo', JSON.parse(getLocalUserInfo()))
                resolve()
            })
        },
        login({ commit }, e) {
            return new Promise((resolve, reject) => {
                Api.login(e.account, e.password).then((res) => {
                    let ret = res.data;
                    console.log(ret)
                    //commit('setStateToken', ret.data.token)
                    commit('setUserInfo', ret.data)
                    //setToken(ret.data.token)
                    setLocalUserInfo(JSON.stringify(ret.data))
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        logout({ commit }) {
            return new Promise(resolve => {
                commit('setStateToken', null)
                commit('setUserInfo', null)
                //commit('setAdminMenu', null)
                removeAll()
                resolve()
            })
        },
        register({ commit }, e) {
            return new Promise((resolve, reject) => {
                Api.register(e).then(() => {
                    commit('')
                }).catch(error => {
                    reject(error)
                })
                resolve()
            })
        },
        sendCode({ commit }, account) {
            return new Promise((resolve, reject) => {
                Api.sendCode(account).then(() => {
                    commit('')
                }).catch(error => {
                    reject(error)
                })
                resolve()
            })
        },
        getCategorys({ commit }) {
            return new Promise((resolve, reject) => {
                Api.getCategory(1, 100).then(res => {
                    let categorys = res.data.data.records;
                    commit('setCatrgorys', categorys)
                }).catch(error => {
                    reject(error)
                })
                resolve()
            })
        },
    }

})

export default store