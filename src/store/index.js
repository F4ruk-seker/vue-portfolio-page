// store/index.js
import { createStore } from 'vuex';

export const store = createStore({
  state: {
    progress: {
        show: false,
        status: 0,
    },
},
mutations:{
  SHOW_PROGRESS(state) {
    state.progress.show = true;
  },
  HIDE_PROGRESS(state) {
    state.progress.show = false;
  },
  UPDATE_PROGRESS_STATUS(state, status) {
    state.progress.status = status;
  },
 },
 actions: {
  showProgress({ commit }) {
    commit('SHOW_PROGRESS');
  },
  hideProgress({ commit }) {
    commit('HIDE_PROGRESS');
  },
  updateProgressStatus({ commit }, status) {
    commit('UPDATE_PROGRESS_STATUS', status);
  },
},
getters:{
  getProgressShow: (state) => state.progress.show,
  getProgressStatus: (state) => state.progress.status,
}
})