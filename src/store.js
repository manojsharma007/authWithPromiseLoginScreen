import Vue from 'vue'
import Vuex from 'vuex'
import auth0 from 'auth0-js'
import router from './router'
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import axios from 'axios'

var toastrConfigs = {
  position: 'top right',
  showDuration: 2000
}

Vue.use(Vuex,CxltToastr, toastrConfigs)


let store = new Vuex.Store({  
    state:{
        userIsAuthorized:false,
        // auth0: new auth0.WebAuth({
        //     domain: process.env.VUE_APP_AUTHCONFIGDOMAIN,
        //     clientID: process.env.VUE_APP_AUTHCONFIGCLIENTID,
        //     // make sure this line is contains the port: 8080
        //     redirectUri: process.env.VUE_APP_URL+'/callback',
        //     // we will use the api/v2/ to access the user information as payload
        //     audience: 'https://' + process.env.VUE_APP_AUTHCONFIGDOMAIN + '/api/v2/', 
        //     responseType: 'token id_token',
        //     scope: 'openid profile' // define the scopes you want to use
        // }), 
        auth0: new auth0.WebAuth({
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
        userDetails:{}
    },
  
    mutations:{
        setUserIsAuthenticated(state,replacement){
            state.userIsAuthorized=replacement;
        },
        setCustomers(state,replacement){
          state.userDetails=replacement;
        }
     
    },
    methods: {
      
  },
    actions:{
      
        auth0HandleAuthentication (context) {
            context.state.auth0.parseHash((err, authResult) => {
              if (authResult && authResult.accessToken && authResult.idToken) {
                let expiresAt = JSON.stringify(
                  authResult.expiresIn * 1000 + new Date().getTime()
                )
               // save the tokens locally
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('expires_at', expiresAt);  
                localStorage.setItem("user",JSON.stringify(authResult.idTokenPayload));
                // context.store.expiresAt = authResult.expiresIn
                // context.store.expiresAt.accessToken = authResult.accessToken
                // context.store.expiresAt.token = authResult.idToken
                // context.store.user = authResult.idTokenPayload
                router.replace('/profile');
              } 
              else if (err) {
                alert('login failed. Error #KJN838');
                router.replace('/login');
                console.log(err);
              }
            })
          },
          authLogout(context){
           
              localStorage.removeItem('access_token');
              localStorage.removeItem('id_token');
              localStorage.removeItem('expires_at');
              localStorage.removeItem('user');
              
        
              // redirect to auth0 logout to completely log the user out
              context.state.auth0.logout({
                returnTo: process.env.VUE_APP_URL+'/logout', // Allowed logout URL listed in dashboard
                clientID: process.env.VUE_APP_AUTHCONFIGCLIENTID, // Your client ID
              })
          } ,
          load(context) {
            return new Promise(( res, rej ) => {
              axios.get("https://jsonplaceholder.typicode.com/users")
                .then(result => {
                  context.commit("setCustomers", result.data);
          
                  res();
                })
                .catch(() => rej());
            });
          },
          authLogin:  (context,user) => {
            return new Promise(function(resolve, reject) {
              context.state.auth0.login({                
                  connection: 'Username-Password-Authentication',
                  email:user.username,
                  password: user.password,
                  grant_types:"password",
                  responseType: 'token id_token',
                },
                function(err, decoded) {
                  if (err) {                    
                    reject(err);
                  } else {
                    resolve(decoded);
                  }
              });
            });
          }
         

        
    },    
    getters: {
      userInfo() { 
        let userinfo=localStorage.getItem('user'); 
        let userObj = JSON.parse(userinfo);
        return  userObj.name ;
       
          

       },
        isUserLogin(state){
       return  state.userIsAuthorized;
      }
  },

  
})
export default store
// export default {
//   install: function(Vue) {
//     Vue.prototype.$auth0 = store
//   }
// }