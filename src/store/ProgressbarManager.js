
export const state = {
        progress: {
            show: false,
            status: 0,
        },
    }

export const mutations = {
        SHOW_PROGRESS(state) {
          state.progress.show = true;
        },
        HIDE_PROGRESS(state) {
          state.progress.show = false;
        },
        UPDATE_PROGRESS_STATUS(state, status) {
          state.progress.status = status;
        }
    }
export const actions = {
        showProgress({ commit }) {
          commit('SHOW_PROGRESS');
        },
        hideProgress({ commit }) {
          commit('HIDE_PROGRESS');
        },
        updateProgressStatus({ commit }, status) {
          commit('UPDATE_PROGRESS_STATUS', status);
        },
    }
export const getters = {
        getProgressShow: (state) => state.progress.show,
        getProgressStatus: (state) => state.progress.status,
    }
