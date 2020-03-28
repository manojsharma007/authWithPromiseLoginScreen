import Vue from 'vue'
import Vuex from 'vuex'
import auth0 from 'auth0-js'
import router from './router'
//const axios = require('axios').default;
//import { addLocale } from 'core-js'

Vue.use(Vuex)


export default new Vuex.Store({  
    state:{
        userIsAuthorized:false,
        auth0: new auth0.WebAuth({
            domain: process.env.VUE_APP_AUTHCONFIGDOMAIN,
            clientID: process.env.VUE_APP_AUTHCONFIGCLIENTID,
            // make sure this line is contains the port: 8080
            redirectUri: process.env.VUE_APP_URL+'/callback',
            // we will use the api/v2/ to access the user information as payload
            audience: 'https://' + process.env.VUE_APP_AUTHCONFIGDOMAIN + '/api/v2/', 
            responseType: 'token id_token',
            scope: 'openid profile' // define the scopes you want to use
        }), 
        userDetails:{}
    },
    computed: {
      user: {
        get: function() {           
          return JSON.parse(localStorage.getItem('user'))
        },
        set: function(user) {            
          localStorage.setItem('user', JSON.stringify(user))
        }
      }
    },
    mutations:{
        setUserIsAuthenticated(state,replacement){
            state.userIsAuthorized=replacement;
        },
     
    },
    methods: {
      
  },
    actions:{
        authLogin(context){
           context.state.auth0.authorize();
        },
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
              //   context.state.auth0.client.userInfo(localStorage.getItem('access_token'), function (err, userData) { 
                
              //    localStorage.setItem('user', userData.name);  
              //   // context.state.userDetails=localStorage.getItem('user_name');            
               
              // })
               router.replace('/profile/success');
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
          },
        
         

        
    },    
    getters: {
        userInfo() {  
        //   return new Promise((resolve, reject) => {
        //     state.auth0.client.userInfo(localStorage.getItem('access_token'),function(err,ruseu){

        //       console.log(ruseu)
        //       console.log(reject)
        //       return resolve(ruseu);
              
        //     })
        // });
      let userinfo=localStorage.getItem('user'); 
       //let userinfo=localStorage.getItem('user'); 
          //console.log(typeof(userinfo))
          let obj = JSON.parse(userinfo);
        return  obj.name

        // return new Promise((resolve, reject) => {  
        //    state.auth0.client.userInfo(localStorage.getItem('access_token'),function(err, authResult)
        //      { 
        //         console.log("resolve "+ resolve)
        //         console.log("authResult "+JSON.stringify(authResult))
        //         console.log("reject "+reject)
        //         let data=JSON.stringify(authResult);
        //        return resolve(data)
        //        // return data;
                
  
        //   })
        // })
       
       // let userDetails="";
       //  let token= localStorage.getItem('access_token');
        // console.log(token);
       
       
          

       },
       // return this.http.get(environment.authUrl + "/userlogin?username=" + users.username + "&loginpwd=" + users.loginpwd)
      
        //  let userinfo="Name";        
        //  state.auth0.client.userInfo(localStorage.getItem('access_token'), function (err, user) {            
          
        //       userinfo= user.name;
        //       alert(user.name)
             
             
        //     })    
        //  alert(userinfo)
        //   return userinfo
        // const data = await axios.get("http://jsonplaceholder.typicode.com/todos/1");
        // return data
        
          // try {
          //   // fetch data from a url endpoint
          //   const data = await state.auth0.client.userInfo(localStorage.getItem('access_token'));
          //   console.log("DATA", data);
          //   return data;
          // } catch(error) {
          //   console.log("error", error);
          //   // appropriately handle the error
          // }
      
        
      
      isUserLogin(state){
       return  state.userIsAuthorized;
      }
  },

  
})