<template>
  <div class="px-5 py-32">
    <h1
      v-if="schedules.length > 0"
      class="text-karla font-bold tracking-wider text-2xl"
    >
      Mis Citas
    </h1>
    <span
      v-else
      class="text-gray-500 text-karla font-bold tracking-wider text-2xl"
    >
      No tienes citas programadas
    </span>
    <div v-if="schedules.length > 0">
      <div
        v-for="(schedule, i) in schedules"
        :key="i"
        class="bg-indigo-100 p-5 rounded-lg flex flex-col"
      >
        <p class="text-karla">Cedula: {{ schedule.id_person }}</p>
        <p class="text-karla">Servicio: {{ schedule.service.name }}</p>
        <p class="uppercase text-karla">
          {{ formatDate(schedule.date, true) }}
        </p>
      </div>
    </div>
    <button
      class="text-karla uppercase tracking-wider shadow-sm text-white font-bold bg-gray-400 rounded-lg py-2 px-5 block my-3 mx-auto"
      type="button"
      @click="toggleView"
    >
      Agendar Cita
    </button>
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="bg-white h-screen w-screen fixed top-0 left-0 z-50"
      >
        <div class="bg-white p-5">
          <div
            class="bg-white p-5 shadow rounded-lg block mx-auto w-full flex flex-col justify-center items-center"
          >
            <div class="flex w-full justify-between">
              <p class="text-karla text-lg tracking-widest font-bold">
                Angendamiento de Citas
              </p>
              <button type="button" @click="toggleView">
                <span
                  class="hover:text-gray-300 ease-in-out duration-75 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <form class="w-full my-3" @submit.prevent="onSubmit">
              <div class="flex flex-col my-3">
                <label class="text-karla uppercase" for="service">
                  Selecciona un servicio
                </label>
                <select
                  id="service"
                  v-model="idService"
                  class="text-karla text-lg tracking-widest font-bold w-full p-3"
                  name="service"
                  required
                  @change="toggleService"
                >
                  <option selected disabled>Selecciona un servicio</option>
                  <option
                    v-for="(service, i) in services"
                    :key="i"
                    :value="service.id"
                  >
                    {{ service.name }}
                  </option>
                </select>
                <div class="my-3">
                  <h2 class="text-karla tracking-wide">
                    Fechas y Horarios Disponibles
                  </h2>
                  <select
                    v-model="date"
                    class="bg-gray-100 text-karla w-full p-3"
                  >
                    <option selected disabled>Selecciona una fecha</option>
                    <option
                      v-for="(quote, i) in dates"
                      :key="i"
                      :value="quote"
                      class="uppercase text-karla"
                    >
                      {{ quote }}
                    </option>
                  </select>
                </div>
              </div>
              <button
                class="bg-indigo-50 px-5 py-3 text-karla rounded-lg"
                type="submit"
              >
                Agendar
              </button>
            </form>
          </div>
        </div>
      </div>
    </Transition>
    <LoadingComponent v-if="isLoading" />
  </div>
</template>

<script>
import moment from "moment";

moment.locale("es");

export default {
  name: "ScheduleView",
  layout: "SlimLayout",
  middleware({ store, redirect }) {
    if (store.state.auth.user.role === 1) {
      redirect("/admin/dashboard");
    }
    if (store.state.auth.user.verified === false) {
      redirect("/not-verified");
    }
  },
  data: () => ({
    isOpen: false,
    isLoading: false,
    idService: "",
    date: null,
  }),
  computed: {
    schedules() {
      return this.$store.state.schedules;
    },
    services() {
      return this.$store.state.services;
    },
    dates() {
      return this.$store.state.available.map((item) => {
        return moment(item.date).format("MMMM D YYYY, h:mm:ss a");
      });
    },
  },
  beforeMount() {
    this.isLoading = true;
    this.$store.dispatch("getSchedules");
    this.$store.dispatch("getServices");
    this.isLoading = false;
  },
  methods: {
    toggleView() {
      this.isOpen = !this.isOpen;
    },
    formatDate(date, bool) {
      if (bool) {
        return moment(date).format("MMMM D YYYY, h:mm:ss");
      } else {
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    async toggleService() {
      this.isLoading = true;
      await this.$store.dispatch("getAvailable", this.idService).then(() => {
        this.isLoading = false;
      });
    },
    async onSubmit() {
      await this.$axios.post("api/schedule/customer", {
        date: this.formatDate(this.date, false),
        person_id: this.$auth.user.person.id,
        service_id: this.idService,
      });
      this.toggleView();
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
