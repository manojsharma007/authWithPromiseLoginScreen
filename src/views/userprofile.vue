<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-sm-2">
                    <div>
                        <h2>Profile Page</h2>
                      Welcome :  {{userInfo}}
                        <!-- Welcome : {{$store.user.name}}                    -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'profile', 

     created: function() {             
         
         if(this.$route.params.msg=="success"){
                this.$toast.success({
                    title:'success msg',
                    message:'Your are success login'
           })
         }
     },
     computed: {
    ...mapGetters({
            userInfo: 'userInfo',
        })
    },
    actions:{

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