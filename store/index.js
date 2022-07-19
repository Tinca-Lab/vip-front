export const state = () => ({
  isError: false,
  services: [],
  schedules: [],
  available: [],
  beneficiaries: [],
  subscriptions: [],
  contract: {},
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
  },
  setSubscriptions(state, payload) {
    state.subscriptions = payload;
  },
  setContract(state, payload) {
    state.contract = payload;
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
      const {schedules} = await this.$axios.$get(
        `/api/schedule/customer/${this.$auth.user.id}`
      );
      commit("setSchedules", schedules);
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
  },
  async getBeneficiaries({commit}, payload) {
    try {
      const {beneficiaries} = await this.$axios.$get(
        `/api/beneficiary/customer/person/${payload}`
      );
      commit("setBeneficiaries", beneficiaries);
    } catch (error) {
      commit("setError", true);
    }
  },

  async getSubscriptions({commit}) {
    try {
      const {subscriptions} = await this.$axios.$get(
        '/api/subscriptions/admin'
      );
      commit("setSubscriptions", subscriptions);
    } catch (error) {
      commit("setError", true);
    }
  },

  async getContract({commit}) {
    try {
      const {contract} = await this.$axios.$get(
        '/api/contract/customer/' + this.$auth.user.id
      );
      commit("setContract", contract);
    } catch (error) {
      commit("setError", true);
    }
  }
};
