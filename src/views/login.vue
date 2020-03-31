<!-- <button v-on:click="login" class="btn btn-primary">Login With Auth0</button> -->

<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-sm-2">
                    <div>
                        <h2>Login</h2>
                        <form @submit.prevent="login">
                            <h3>{{errorMsg}}</h3>
                            <div class="form-group">
                                <label for="username">User Name</label>
                                <input type="text" v-model="user.username" id="username" name="username" 
                                class="form-control"  />
                                <div v-if="submitted && !$v.user.username.required"
                                 class="invalid-feedback">User Name is required</div>
                            </div>
                            <div class="form-group">
                                <label for="Password">Password</label>
                                <input type="text" v-model="user.password" id="password" name="password" class="form-control"/>
                                <div v-if="submitted && !$v.user.password.required" class="invalid-feedback">Password is required</div>
                            </div>
                          
                        
                            <div class="form-group">
                                <button class="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import { required } from "vuelidate/lib/validators";
 import auth0 from 'auth0-js'
//  import CxltToastr from 'cxlt-vue2-toastr'
// import Vue from 'vue'
// var toastrConfigs = {
//     position: 'top right',
//     showDuration: 2000
// }
// Vue.use(CxltToastr, toastrConfigs)
import Store from '../store'
    export default {
        name: "login",
        data() {
            return {
                user: {
                    username: "",
                    password: "",
               
                },
                submitted: false,
                errorMsg:"",
                apicall: new auth0.WebAuth({
                domain: "dev-manoj007.auth0.com",
                clientID: "x6z8VPCUcKFeWSCUHzh8DXfmbx7fVy5t",
                // make sure this line is contains the port: 8080
                redirectUri: process.env.VUE_APP_URL+'/callback',
                // we will use the api/v2/ to access the user information as payload
                audience: 'https://' + process.env.VUE_APP_AUTHCONFIGDOMAIN + '/api/v2/', 
                responseType: 'token id_token',
                scope: 'openid profile', // define the scopes you want to use,
                // responseType: 'id_token',
                    }),  
            };
        }, 
        validations: {
            user: {
                username: { required },
                password: { required },
            
            }
        },
        methods: {
             login() {
                this.submitted = true;               
               this.$v.user.$touch();
                // if its still pending or an error is returned do not submit
                if (this.$v.user.$pending || this.$v.user.$error) return;

               Store.dispatch('authLogin', this.user).then(response => {
                console.log(response);
                 }).catch(e => {               
                console.log(e);
                   this.$toast.error({
                    title:'Error msg',
                    message:e.error_description
           })
            });

               
            }



}

                //   this.$toast.error({
                //     title:'fdsffafasfa',
                //     message:'fadsfadfaffafa'
                //    })
            //      Store.dispatch('authLogin', this.user).catch(error => {
            //  alert("eeee"+error)
     
            //      })  
                //  Store.dispatch('authLogin', this.user).then((res) => {
                //    alert(res)
                //     })
            
        
    };
</script>
<style scoped>
    .jumbotron {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
    .form-group{
       margin: 15px 7px 13px 11px
    }
</style>