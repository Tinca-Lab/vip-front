<template>
  <div class="px-5 py-32">
    <div class="header">
      <h1 v-if="schedules.length > 0" class="text-karla font-bold tracking-wider text-2xl">Mis Citas</h1>
      <h1 v-else class="text-gray-500 text-karla font-bold tracking-wider text-2xl">No tienes citas
        programadas</h1>
    </div>
    <button
      class="text-karla uppercase tracking-wider shadow-sm text-white font-bold bg-gray-400 rounded-lg py-2 px-5 block my-3 mx-auto"
      type="button"
      @click="toggleView">
      Agendar Cita
    </button>
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="bg-white h-screen w-screen fixed top-0 left-0 z-50">
        <div class="bg-white p-5">
          <div
            class="bg-white p-5 shadow rounded-lg block mx-auto w-full flex flex-col  justify-center items-center">
            <div class="flex w-full justify-between">
              <p class="text-karla text-lg tracking-widest font-bold">
                Angendamiento de Citas
              </p>
              <button type="button" @click="toggleView">
                <span class="hover:text-gray-300 ease-in-out duration-75 transition-all">
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
                  v-model="date"
                  class="text-karla text-lg tracking-widest font-bold w-full p-3"
                  name="service"
                  required
                  @change="toggleService">
                  <option selected>Selecciona un servicio</option>
                  <option v-for="(service,i) in services" :key="i" :value="service.date">
                    {{ service.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col my-3">
                <label class="text-karla uppercase" for="date">
                  Fecha
                </label>
                <input v-model="date" class="text-karla my-3" type="datetime-local"/>
                {{ date }}
              </div>
              <button class="bg-indigo-50 px-5 py-3 text-karla rounded-lg" type="submit">
                Agendar
              </button>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "ScheduleView",
  layout: "SlimLayout",
  data: () => ({
    isOpen: false,
    date: null,
  }),
  computed: {
    schedules() {
      return this.$store.state.schedules;
    },
    services() {
      return this.$store.state.services;
    }
  },
  beforeCreate() {
    this.$store.dispatch("getSchedules");
    this.$store.dispatch("getServices");
  },
  methods: {
    toggleView() {
      this.isOpen = !this.isOpen;
    },
    toggleService() {
      // this.date = new Date(this.date);
      console.log(this.date);
    }
  }
};
</script>

<style scoped>
.bg-white {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
