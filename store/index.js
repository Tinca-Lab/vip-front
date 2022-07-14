export const state = () => ({
  isError: false,
  services: [],
  schedules: [],
  available: [],
  beneficiaries: [],
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
  },
  setBeneficiaries(state, payload) {
    state.beneficiaries = payload;
  }
};

export const actions = {
  setError(state, isError) {
    state.commit("setError", isError);
  },

  async getServices({ commit }) {
    try {
      const response = await this.$axios.$get("/api/services/customer");
      commit("setServices", response);
    } catch (error) {
      commit("setError", true);
    }
  },

  async getSchedules({ commit }) {
    try {
      const { schedules } = await this.$axios.$get(
        `/api/schedule/customer/${this.$auth.user.person.id}`
      );
      commit("setSchedules", schedules);
    } catch (error) {
      commit("setError", true);
    }
  },

  async getAvailable({ commit }, payload) {
    try {
      const response = await this.$axios.$get(
        `/api/available/customer/${payload}`
      );
      commit("setAvailable", response);
    } catch (error) {
      commit("setError", true);
    }
  },
  async getBeneficiaries({ commit }, payload) {
    try {
      const response = await this.$axios.$get(
        `/api/beneficiary/customer/person/${payload}`
      );
      commit("setBeneficiaries", response);
    } catch (error) {
      commit("setError", true);
    }
  }
};
