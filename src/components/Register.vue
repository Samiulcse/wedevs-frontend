<template>
    <form class="row m-5 g-3">
        <div class="col-md-6">
            <label for="name" class="form-label">Name</label>
            <input type="name" class="form-control" id="name" v-model="form.name" required>
            <v-errors :errors="errorFor('name')"></v-errors>
        </div>
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
        <div class="col-md-6">
            <label for="password_confirmation" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" v-model="form.password_confirmation" id="password_confirmation" required>
        </div>
        <div class="col-12">
            <button type="button" class="btn btn-primary" @click="register()">Register</button>
        </div>
    </form>
</template>
<script>
import validationErrors from "../mixins/validationErrors"
export default {
    name: 'register',
    mixins: [validationErrors],
    data(){
        return{
            form:{
                email: '',
                name: '',
                password: '',
                password_confirmation: '',
            }
        }
    },
    methods: {
        async register() {
            this.errors = null
            await this.$store.dispatch('register', this.form)
                .then(async (response) => {
                    let loginData = response
                    loginData.password = this.form.password
                    await this.$store.dispatch('login', loginData)
                    .then(() => this.$router.push({name: 'home'}))
                })
                .catch((err) => this.errors = err.errors)
                .finally(() => {})
        },
    },
}
</script>