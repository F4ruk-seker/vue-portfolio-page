import { createStore } from "vuex";
import axios from "axios";


const store = createStore({
  state:{
    AuthStatus: false,
    user: {}
  },
  getters:{
    get_auth_status(state){
      return state.AuthStatus
    },
    get_user(state){
      return state.user
    },
    get_email(state){
      return state.user.email
    },
    get_user_name(state){
      if (state.user && state.user.email) {
        let email = state.user.email;
        const email_parse = email.split('@');
        return email_parse[0];
      } else {
        // Handle the case where email is undefined or null
        return "N/A"; // Or any default value you want to return
      }
    }

  },
  mutations:{
    change_auth_status(state, { status }){
      console.log('(f)|change_auth_status' + status)
      if (!status){
        state.user = {}
      }
      state.AuthStatus = status
    },
    set_user(state, { user }){
      state.user = user
    }
  },
  actions:{
    set_auth_status(context, status){
      console.log('(f)|set_auth_status' + status)
      context.commit('change_auth_status', status)
    },
    check_auth_status(context,  status){
      console.log(status)
      axios.get(`user/`).then((response) => {
        if (response.status === 200){
          context.commit('change_auth_status', {status:true})
          context.commit('set_user', {user: response.data})
        }
        else {
          console.log("else")
          context.commit('change_auth_status', {status:false})
        }
      })


    }
  }


});

export default store;
