<template>
  <div class="px-5 py-32">
    <div v-if="services">
      <div v-for="(service, i) in services" :key="i">
        <ServicePopUpComponent :service="service" />
      </div>
    </div>
    <button
      class="text-karla block mx-auto bg-gray-400 rounded-lg px-5 py-3 text-white font-bold"
      type="button"
      @click="toggleView"
    >
      Agregar Servicio
    </button>
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="bg-white h-screen w-screen absolute top-0 left-0 px-5 py-10 z-50 flex flex-col items-center"
      >
        <div class="flex justify-between w-full">
          <h1 class="text-karla text-lg">Agregar servicio</h1>
          <button type="button" @click="toggleView">
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
          </button>
        </div>
        <div class="my-5 w-full">
          <form @submit.prevent="onSubmit">
            <div class="flex flex-col justify-center mt-2">
              <label class="text-karla" for="name">Nombre:</label>
              <input
                id="name"
                v-model="name"
                class="bg-gray-100 rounded-lg shadow-sm outline-none text-karla px-5 py-3"
                type="text"
                placeholder="Nombre del servicio"
              />
            </div>
            <div class="flex flex-col justify-center my-2">
              <label class="text-karla" for="description">Descripcion:</label>
              <input
                id="description"
                v-model="description"
                class="bg-gray-100 rounded-lg shadow-sm outline-none text-karla px-5 py-3"
                type="text"
                placeholder="Descripcion del servicio"
              />
            </div>
            <div class="flex flex-col justify-center my-2">
              <label class="text-karla" for="price">Precio:</label>
              <div class="flex items-center">
                <span class="mr-3 text-karla">$</span>
                <input
                  id="price"
                  v-model="price"
                  class="bg-gray-100 rounded-lg shadow-sm outline-none text-karla px-5 py-3 inline w-full"
                  type="number"
                  placeholder="Precio del servicio"
                />
              </div>
            </div>
            <div class="text-karla flex flex-col justify-center">
              <label for="available">Disponible:</label>
              <div v-for="i in howAvailable" :key="i">
                <input
                  id="available"
                  ref="available"
                  class="w-full shadow-sm bg-gray-100 rounded px-2 py-3 my-2"
                  type="datetime-local"
                  @change="addAvailable"
                />
              </div>
              <div class="flex justify-between bg-gray-100 p-2 my-2 rounded">
                <button type="button" @click="howAvailable++">
                  Agregar otra fecha
                </button>
                <button
                  :class="howAvailable > 1 ? '' : 'text-gray-500'"
                  type="button"
                  :disabled="howAvailable <= 1"
                  @click="removeAvailable"
                >
                  Eliminar fecha
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <label class="cursor-pointer" for="file">Agregar imagen:</label>
          <input id="file" ref="file" type="file" />
        </div>
        <button
          class="bg-indigo-100 rounded-lg text-karla px-5 py-2 my-2"
          type="button"
          @click="onSubmit"
        >
          Enviar
        </button>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "AdminServicesView",
  layout: "AdminLayout",
  middleware: "role",
  data: () => ({
    isOpen: false,
    howAvailable: 1,
    name: "",
    description: "",
    price: "",
    available: [],
  }),
  computed: {
    services() {
      return this.$store.state.services;
    },
  },
  beforeCreate() {
    this.$store.dispatch("getServices");
  },
  methods: {
    toggleView() {
      this.isOpen = !this.isOpen;
      this.available = [];
      this.howAvailable = 1;
    },
    addAvailable() {
      if (this.available.length === 1) this.available.shift();
      for (let i = 0; i < this.howAvailable; i++) {
        this.available.push(this.$refs.available[i].value);
      }
    },
    removeAvailable() {
      this.howAvailable--;
      this.available.pop();
    },
    async onSubmit() {
      await this.$axios.post("/api/services/admin", {
        name: this.name,
        description: this.description,
        price: this.price,
        available: this.available,
      });
    },
  },
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
