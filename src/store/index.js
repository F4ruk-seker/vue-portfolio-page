import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';


export const store = createStore({
  state:{
    user:{
      email: ''
    }
  },
  getters: {
    get_user(state){
      return state.user
    }
  },
  mutations:{
    set_user(state, { user }){
      state.user = user
    }
  },
  actions:{
    login ({ commit }, user){
      commit('set_user', {user: user})
      console.log(commit)
      console.log(user)
    }
  },
  plugins: [createPersistedState()],
});

