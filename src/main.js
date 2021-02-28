import Vue from 'vue'
import App from './App.vue'
Vue.use(Vuex)

import router from './routes'

// Vuex
import storeDefinition from './stores/store'
import Vuex from 'vuex'
const store = new Vuex.Store(storeDefinition)

// Validation component
import ValidationErrors from "./components/shared/ValidationErrors"
import Pagination from "./components/shared/Pagination"
Vue.component('Pagination', Pagination)
Vue.component("v-errors", ValidationErrors)

import swal from 'sweetalert2'
window.swal = swal

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
})

window.toast = toast

Vue.mixin({
    data: function() {
        return {
            get baseUrl() {
                return "http://127.0.0.1:8000/api"
            }
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
