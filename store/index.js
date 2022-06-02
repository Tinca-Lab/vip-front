export const state = () => ({
  isError: false,
  services: [],
});

export const mutations = {
  setIsError(state, isError) {
    state.isError = isError;
  },
  setServices(state, payload) {
    state.services = payload;
  },
};

export const actions = {
  setIsError(state, isError) {
    state.commit("setIsError", isError);
  },

  async getServices({ commit }) {
    try {
      const response = await this.$axios.$get("/api/services/all");
      commit("setServices", response);
    } catch (error) {
      commit("setError", true);
    }
  },
};
