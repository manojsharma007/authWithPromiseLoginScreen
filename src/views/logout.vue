<template>
  <div class="logout">
  <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-sm-2">
                    <div>
                       
                    <div class="panel-body">
                  <div class="login-icon"> <i class="fa fa-sign-out"></i> </div>
                  <h1 class="font-semibold text-center">You Have Been Logged Out</h1>
                  
                    <div class="form-group">
                      <div class="col-md-12">
                        <h4 class="text-center mgbt-xs-20">Thank you for using our website</h4>
                        <p class="text-center"> Please    <router-link v-bind:to="'/login'">click here</router-link>
                         to login back to our site
                        </p>
                   
                      </div>
                    </div>
                   
                 
                </div>
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'logout',
   created: function() {
              
         
       
                this.$toast.success({
                     title:'Logout msg',
                    message:'Your are successfully logout'
           })
       
     }
}
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
 
</style>