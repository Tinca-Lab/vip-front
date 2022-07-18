<template>
  <div
    class="px-5 py-32 background h-full flex flex-col justify-center items-center"
  >
    <h1 v-if="schedules.length > 0" class="font-bold tracking-wider text-2xl">
      Mis Citas
    </h1>
    <Transition name="bounce">
      <span
        v-if="schedules.length === 0 && isShowing"
        class="bg-white w-full bg-opacity-60 backdrop-blur backdrop-filter rounded-3xl flex items-center justify-between py-5 px-5"
      >
        <span
          class="text-lg text-blue-500 font-semibold tracking-wide px-5 text-center"
        >Aún no tienes <br/>
          citas programadas</span
        >
        <img src="@/assets/shortcuts/schedule.svg" alt="Citas medicas"/>
      </span>
    </Transition>
    <div v-if="schedules.length > 0">
      <div
        v-for="(schedule, i) in schedules"
        :key="i"
        class="bg-indigo-100 p-5 rounded-lg flex flex-col"
      >
        <p>Cedula: {{ schedule.id_person }}</p>
        <p>Servicio: {{ schedule.service.name }}</p>
        <p class="uppercase">
          {{ formatDate(schedule.date, true) }}
        </p>
      </div>
    </div>
    <button
      class="tracking-wide text-white hover:bg-blue-500 ease-in-out duration-200 bg-blue-400 rounded-xl py-3.5 px-5 block my-7 mx-auto"
      type="button"
      @click="toggleView"
    >
      Agende una cita
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
              <p class="text-lg tracking-widest font-bold">
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
                <label class="uppercase" for="service">
                  Selecciona un servicio
                </label>
                <select
                  id="service"
                  v-model="idService"
                  class="text-lg tracking-widest font-bold w-full p-3"
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
                  <h2 class="tracking-wide">Fechas y Horarios Disponibles</h2>
                  <select v-model="date" class="bg-gray-100 w-full p-3">
                    <option selected disabled>Selecciona una fecha</option>
                    <option
                      v-for="(quote, i) in dates"
                      :key="i"
                      :value="quote"
                      class="uppercase"
                    >
                      {{ quote }}
                    </option>
                  </select>
                </div>
              </div>
              <button class="bg-indigo-50 px-5 py-3 rounded-lg" type="submit">
                Agendar
              </button>
            </form>
          </div>
        </div>
      </div>
    </Transition>
    <LoadingComponent v-if="isLoading"/>
  </div>
</template>

<script>
import moment from "moment";

moment.locale("es");

export default {
  name: "ScheduleView",
  layout: "SlimLayout",
  middleware({store, redirect}) {
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
    isShowing: false,
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
  mounted() {
    setTimeout(() => {
      this.isShowing = true;
    }, 200);
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
        person_id: this.$auth.user.id,
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

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: translateY(-50px);
  }
  25% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
