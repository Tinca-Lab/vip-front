export const state = () => ({
  isError: false,
});

export const mutations = {
  setError(state, payload) {
    state.isError = payload;
  },
};

export const actions = {
  setError({ commit }, payload) {
    commit("setError", payload);
  },
};
