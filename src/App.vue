<template>
    <div id="app">   
          <nav>
            <router-link v-bind:to="'/'">Home</router-link> |
            <router-link v-if="!isUserLogin" v-bind:to="'/login'">Login</router-link> |
            <a v-on:click="logout" v-if="isUserLogin" >Logout</a> | 
            <router-link v-bind:to="'/profile'">Profile</router-link> |
            <router-link v-bind:to="'/secure'">Secure</router-link>            
            </nav>
          <router-view></router-view>
    </div>
</template>
<script>
import CxltToastr from 'cxlt-vue2-toastr'
import Vue from 'vue'
import { mapGetters } from 'vuex'
var toastrConfigs = {
    position: 'top right',
    showDuration: 2000
}
Vue.use(CxltToastr, toastrConfigs)

    export default {
        name: 'App',
       
        data(){
            return{
               clientId:  process.env.VUE_APP_AUTHCONFIGDOMAIN
               
            }
        },
        methods:{
            logout: function () {
           this.$store.dispatch('authLogout');           
     }
    },
    
         computed: {
       ...mapGetters({
           
            isUserLogin:'isUserLogin'
        })
    } 
    }
</script>

<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css"></style>
<style>
    body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 1024px;
        margin: auto;
    }
</style>