export const state = () => ({
  isError: false,
  services: [],
  schedules: [],
});

export const mutations = {
  setIsError(state, isError) {
    state.isError = isError;
  },
  setServices(state, payload) {
    state.services = payload;
  },
  setSchedules(state, payload) {
    state.schedules = payload;
  },
};

export const actions = {
  setIsError(state, isError) {
    state.commit("setIsError", isError);
  },

  async getServices({commit}) {
    try {
      const response = await this.$axios.$get("/api/services/all");
      commit("setServices", response);
    } catch (error) {
      commit("setError", true);
    }
  },

  async getSchedules({commit}) {
    try {
      const response = await this.$axios.$get(`/api/schedule/${this.$auth.user.person.nit}`);
      commit("setSchedules", response);
    } catch (error) {
      commit("setError", true);
    }
  },
};
