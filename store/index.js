export const state = () => ({
  isError: false,
  services: [],
  schedules: [],
  available: []
});

export const mutations = {
  setError(state, isError) {
    state.isError = isError;
  },
  setServices(state, payload) {
    state.services = payload;
  },
  setSchedules(state, payload) {
    state.schedules = payload;
  },
  setAvailable(state, payload) {
    state.available = payload;
  }
};

export const actions = {
  setError(state, isError) {
    state.commit("setError", isError);
  },

  async getServices({commit}) {
    try {
      const response = await this.$axios.$get("/api/services/customer");
      commit("setServices", response);
    } catch (error) {
      commit("setError", true);
    }
  },

  async getSchedules({commit}) {
    try {
      const {schedule} = await this.$axios.$get(
        `/api/schedule/customer/${this.$auth.user.person.nit}`
      );
      commit("setSchedules", schedule);
    } catch (error) {
      commit("setError", true);
    }
  },

  async getAvailable({commit}, payload) {
    try {
      const response = await this.$axios.$get(
        `/api/available/customer/${payload}`
      );
      commit("setAvailable", response);
    } catch (error) {
      commit("setError", true);
    }
  }
};
