<template>
    <form class="row m-5 g-3">
        <div class="col-md-6">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="form.email" required>
            <v-errors :errors="errorFor('email')"></v-errors>
        </div>
        <div class="col-md-6">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="form.password" id="password" required>
            <v-errors :errors="errorFor('password')"></v-errors>
        </div>
        <div class="col-12">
            <button type="button" class="btn btn-primary" @click="login()">Sign in</button>
            <v-errors :errors="errorFor('error')"></v-errors>
        </div>
    </form>
</template>
<script>
import validationErrors from "../mixins/validationErrors"
export default {
    name: 'login',
    mixins: [validationErrors],
    data(){
        return{
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
            this.errors = null
            await this.$store.dispatch('login', this.form)
                .then(() => this.$router.push({name: 'home'}))
                .catch((err) => this.errors = err.errors)
                .finally(() => {})
        },
    },
}
</script>