<template>
    <div class="row">
        <div class="col-md-12 mt-5">
            <button type="button" class="btn btn-primary" @click="openAddProduct">Add Product</button>
            <div v-if="showModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="productLabel">{{form.id ? 'Update Product': 'Add Product'}}</h5>
                                    <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="mb-3">
                                            <label for="title" class="col-form-label">Title:</label>
                                            <input type="text" class="form-control" id="title" v-model="form.title">
                                        </div>
                                        <div class="mb-3">
                                            <label for="description" class="col-form-label">Description:</label>
                                            <textarea class="form-control" id="description" v-model="form.description"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label for="price" class="col-form-label">Price:</label>
                                            <input type="number" class="form-control" id="price" v-model="form.price">
                                        </div>
                                        <div class="mb-3">
                                            <label for="image" class="col-form-label">Image:</label>
                                            <input type="file" class="form-control" id="image" accept="image/x-png,image/gif,image/jpeg" @change="onFileChange" >
                                        </div>
                                        <div class="mb-3">
                                            <label class="col-form-label">Preview:</label>
                                            <img :src="currentImage ? currentImage : (form.image ? imagePath + form.image : '')" height="100px" width="100px"/>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                                    <button type="button" class="btn btn-primary" v-if="form.id" @click="updateProduct()">Update Product</button>
                                    <button type="button" class="btn btn-primary" v-else @click="saveProduct()">Save Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
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
                <tbody v-if="allProduct">
                    <tr v-for="(product, productIndex) in allProduct" :key="productIndex">
                        <td>{{ productIndex+1 }}</td>
                        <td>{{ product.title }}</td>
                        <td>{{ product.description }}</td>
                        <td>{{ product.price }}</td>
                        <td>
                            <img :src="product.image ? imagePath+product.image : ''" width="60px" style="min-height: 60px">
                        </td>
                        <td>
                            <button type="button" class="btn btn-primary mx-2" ><i class="far fa-edit" @click="editProduct(product.id)"></i></button>
                            <button type="button" class="btn btn-danger" @click="deleteProduct(product.id)"><i class="far fa-trash-alt"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import mixin from '../mixins/mixin'
import * as common from "../helpers/commonHelper"
import {mapGetters} from "vuex"
// import $ from "jquery"

export default {
    name: 'products',
    mixins: [mixin],
    data(){
        return{
            imagePath: common.getImagePath(),
            form:{
                'title': '',
                'description': '',
                'price': '',
                'image': null,
                'id': null,
            },
            currentImage: null,
            showModal: false,
        }
    },
    computed: {
        ...mapGetters({
            allProduct: 'getAllProduct',
        })
    },
    mounted() { 
        this.$store.dispatch('getAllProduct')
    },
    methods:{
        clearFormData(){
            this.form ={
                'title': '',
                'description': '',
                'price': '',
                'image': '',
                'id': null,
            }
            this.currentImage= null
        },
        openAddProduct(){
            this.clearFormData()
            this.showModal = true
        },
        async deleteProduct(id){
            if (await this.takeConfirmation() !== false) {
                this.$store.dispatch('deleteProduct', id)
            }
        },
        async updateProduct(){
            if(this.currentImage){
                this.form.image = this.currentImage
            }
            await this.$store.dispatch('updateProduct', this.form)
            .then(() => {
                this.$store.dispatch('getAllProduct')
                this.showModal = false
                this.clearFormData()
            })
        },
        async saveProduct(){
            if(this.currentImage){
                this.form.image = this.currentImage
            }
            await this.$store.dispatch('saveProduct', this.form)
            .then(() => {
                this.$store.dispatch('getAllProduct')
                this.showModal = false
                this.clearFormData()
            })
        },
        async editProduct(id){
            let selectedProduct = this.allProduct.find(product => product.id == id)
            await this.$set(this, 'form', selectedProduct)
            this.showModal = true
        },
        onFileChange(e) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = e => {
                this.currentImage = e.target.result
            }
        },
        removeImage: function () {
            
        }
    }
    
}
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  overflow: auto;
}
.modal-content{
    overflow: auto;
    max-height: 600px!important;
}
</style>