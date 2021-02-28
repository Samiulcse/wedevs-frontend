<template>
    <div class="row">
        <div class="col-md-12 mt-5">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#product">Add Product</button>

            <div class="modal fade" id="product" tabindex="-1" aria-labelledby="productLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="productLabel">New message</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Recipient:</label>
                            <input type="text" class="form-control" id="recipient-name">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Message:</label>
                            <textarea class="form-control" id="message-text"></textarea>
                        </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Send message</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 mt-5">
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 10%">#</th>
                        <th style="width: 20%">Title</th>
                        <th style="width: 35%">Description</th>
                        <th style="width: 10%">Price</th>
                        <th style="width: 10%">Image</th>
                        <th style="width: 15%">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>
                            <button type="button" class="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#product"><i class="far fa-edit"></i></button>
                            <button type="button" class="btn btn-danger" @click="deleteProduct()"><i class="far fa-trash-alt"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-12">
            <Pagination :paginateData="paginateData" v-if="paginateData" @paginate="changePage"/>
        </div>
    </div>
</template>
<script>
import mixin from '../mixins/mixin'
import {mapGetters} from "vuex"
export default {
    name: 'products',
    mixins: [mixin],
    data(){
        return{
            
        }
    },
    computed: {
        ...mapGetters({
            paginateData: 'getProductPaginateData',
            allProduct: 'getAllProduct',
        })
    },
    async mounted() { 
        const currentQuery = this.$router.currentRoute.query
        await this.$store.dispatch('getAllProducts', currentQuery)
    },
    methods:{
        async deleteProduct(){
            if (await this.takeConfirmation() == false) {
                console.log('dd')
            }
        },
        async changePage() {
            this.setRouteQuery()
            const currentQuery = this.$router.currentRoute.query
            await this.$store.dispatch('getAllProducts', currentQuery)
        },
    }
    
}
</script>