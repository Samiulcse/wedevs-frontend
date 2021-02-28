<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
                    </li>
                    <li class="nav-item" v-if="!currentUser">
                        <router-link class="nav-link" :to="{name: 'login'}">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="!currentUser">
                        <router-link class="nav-link" :to="{name: 'register'}">Register</router-link>
                    </li>
                    <li class="nav-item" v-if="currentUser">
                        <router-link class="nav-link" :to="{name: 'products'}">Products</router-link>
                    </li>
                    <li class="nav-item" v-if="currentUser">
                        <button type="button" class="btn btn-link nav-link" @click="logout()">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import {mapGetters} from "vuex"
export default {
    name: 'mainHeader',
    data(){
        return{

        }
    },
    computed: {
        ...mapGetters({
            currentUser: 'getCurrentUser',
        })
    },
    methods:{
        logout() {
            this.$store.dispatch('logout');
            this.$router.push({name: 'home'}).catch(() => {});
        },
    }
    
}
</script>