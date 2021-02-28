<template>
    <div class="col-md-12 mt-5">
        <h3>Welcome Home {{ currentUser ? currentUser.name :'' }} </h3>
    </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
    name: 'home',
    data(){
        return{
            
        }
    },
    computed: {
        ...mapGetters({
            currentUser: 'getCurrentUser',
        })
    },
    
}
</script>