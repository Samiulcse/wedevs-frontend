import axios from 'axios'
import * as common from "../helpers/commonHelper"
const baseUrl = common.getBaseUrl()

export default {
    state: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null,
        paginateData: {},
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setCurrentUser(state, payload) {
            state.currentUser = payload
        },
        getPaginateData(state, paginateData) {
            state.paginateData = paginateData
        }, 
    },
    actions: {
        login(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post(baseUrl+'/login', payload).then((response) => {
                    let user = response.data
                    context.commit('setUser', user)
                    localStorage.setItem('user', JSON.stringify(user))
                    
                    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
                    context.dispatch('setCurrentUser')
                    resolve(user)
                }).catch((error) => {
                    reject(error.response.data)
                })
            })
        },
        register(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post(baseUrl+'/register', payload).then((response) => {
                    let user = response.data.user
                    resolve(user)
                }).catch((error) => {
                    reject(error.response.data)
                })
            })
        },
        setCurrentUser(context){
            const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
            let currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
            if (user && !currentUser){
                axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
                axios.get(baseUrl+'/profile').then((response) => {
                    let currentUser = response.data
                    localStorage.setItem('currentUser', JSON.stringify(currentUser))
                    context.commit('setCurrentUser', currentUser)
                })
            }
        },
        logout(context) {
            context.commit('setUser', null)
            context.commit('setCurrentUser', null)
            localStorage.removeItem('user')
            localStorage.removeItem('currentUser')
            axios.defaults.headers.common['Authorization'] = null
        },
    },
    getters: {
        getUser: (state) => state.user,
        getCurrentUser: (state) => state.currentUser,
        paginateData:(state) => state.paginateData
    },
}
