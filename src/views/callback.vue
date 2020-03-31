<template>
  <div class="callback"></div>
</template>

<script>
import Store from '../store'
export default {
  name: 'callback',
  mounted(){
   Store.dispatch('auth0HandleAuthentication');
            this.$toast.success({
                    title:'success msg',
                    message:'Your are success login'
           })
  }
}
</script>