import axios from 'axios'
import * as common from "../helpers/commonHelper"
const baseUrl = common.getBaseUrl()

export default {
    state: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null,
        allProduct: [],
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setCurrentUser(state, payload) {
            state.currentUser = payload
        },
        setAllProduct(state, allProduct) {
            state.allProduct = allProduct
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
            context.commit('setAllProduct', [])
            localStorage.removeItem('user')
            localStorage.removeItem('currentUser')
            axios.defaults.headers.common['Authorization'] = null
        },
        async getAllProduct(context, payload) {
            const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            axios.get(baseUrl+'/products', payload).then((response) => {
                context.commit('setAllProduct', response.data.data)
            }).catch(() => {
                
            }) 
        },
        deleteProduct(context, payload) {
            const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            axios.delete(baseUrl+'/products/'+payload).then((response) => {
                let resProduct = response.data.data
                let allProduct = context.state.allProduct
                allProduct = allProduct.filter(product => product.id != resProduct.id )
                context.commit('setAllProduct', allProduct)
            }).catch(() => {
                
            }) 
        },
        updateProduct(context, payload) {
            const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            axios.put(baseUrl+'/products/'+ payload.id , payload).then((response) => {
                let resProduct = response.data.data
                let allProduct = context.state.allProduct
                let foundIndex = allProduct.findIndex(product => product.id == resProduct.id )
                if(foundIndex > -1){
                    allProduct[foundIndex] = resProduct
                    console.log(allProduct[foundIndex] , resProduct)
                    context.commit('setAllProduct', allProduct)
                }
            }).catch(() => {
                
            }) 
        },
        saveProduct(context, payload) {
            const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            axios.post(baseUrl+'/products/', payload).then((response) => {
                let resProduct = response.data.data
                let allProduct = context.state.allProduct
                allProduct.push(resProduct)
                context.commit('setAllProduct', allProduct)
            }).catch(() => {
                
            }) 
        },
    },
    getters: {
        getUser: (state) => state.user,
        getCurrentUser: (state) => state.currentUser,
        getAllProduct:(state) => state.allProduct,
    },
}
