<template>
  <div id="app">
        <div class="container">
            <Header/>
            <div id="wrapper">  
                <router-view></router-view>
            </div>
        </div> 
  </div>
</template>

<script>
import Header from './components/shared/Header.vue';

export default {
    name: 'App',
    components: {
        Header,
    }
}
</script>
