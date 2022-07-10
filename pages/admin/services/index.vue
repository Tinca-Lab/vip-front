<template>
  <div class="px-5 py-32 h-full background">
    <div v-if="services.length > 0">
      <div v-for="(service, i) in services" :key="i">
        <ServicePopUpComponent :service="service"/>
      </div>
    </div>
    <span
      v-else
      class="bg-white bg-opacity-60 backdrop-blur backdrop-filter rounded-xl flex items-center justify-between py-5 px-5"
    >
      <span class="text-lg text-blue-500 font-semibold tracking-wide px-5 text-center">Aun no has <br> creado servicios</span>
      <img src="@/assets/shortcuts/service.svg" alt="Servicios"/>
    </span>
    <button
      class="block mx-auto bg-gray-400 rounded-lg px-5 py-3 text-white font-bold my-7"
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
          <h1 class="text-lg">Agregar servicio</h1>
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
              <label for="name">Nombre:</label>
              <input
                id="name"
                v-model="name"
                class="bg-gray-100 rounded-lg shadow-sm outline-none px-5 py-3"
                type="text"
                placeholder="Nombre del servicio"
                required
              />
            </div>
            <div class="flex flex-col justify-center my-2">
              <label for="description">Descripcion:</label>
              <input
                id="description"
                v-model="description"
                class="bg-gray-100 rounded-lg shadow-sm outline-none px-5 py-3"
                type="text"
                placeholder="Descripcion del servicio"
                required
              />
            </div>
            <div class="flex flex-col justify-center my-2">
              <label for="price">Precio:</label>
              <div class="flex items-center">
                <span class="mr-3">$</span>
                <input
                  id="price"
                  v-model="price"
                  class="bg-gray-100 rounded-lg shadow-sm outline-none px-5 py-3 inline w-full"
                  type="number"
                  placeholder="Precio del servicio"
                  required
                />
              </div>
            </div>
            <div class="flex flex-col justify-center">
              <label for="available">Disponible:</label>
              <div v-for="i in howAvailable" :key="i">
                <input
                  id="available"
                  ref="available"
                  class="w-full shadow-sm bg-gray-100 rounded px-2 py-3 my-2"
                  type="datetime-local"
                  required
                  @change="addAvailable"
                />
              </div>
              <div class="flex justify-between bg-gray-100 p-2 my-2 rounded">
                <button type="button" @click="howAvailable++">
                  Agregar otra fecha
                </button>
                <button
                  :class="
                    howAvailable > 1
                      ? 'text-red-500 font-bold'
                      : 'text-gray-500'
                  "
                  type="button"
                  :disabled="howAvailable <= 1"
                  @click="removeAvailable"
                >
                  Eliminar fecha
                </button>
              </div>
            </div>
            <div>
              <label
                class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
                for="files"
              >Agregar imagen</label
              >
              <input
                id="files"
                ref="file"
                class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                type="file"
              />
              <p
                id="file_input_help"
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
            </div>
            <button
              class="bg-indigo-100 rounded-lg px-5 py-2 my-2 mx-auto block"
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>
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
    image: null,
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
      await this.$axios
        .post("/api/services/admin", {
          name: this.name,
          description: this.description,
          price: this.price,
          available: this.available,
        })
        .then(async (response) => {
          const {data} = response;
          const formData = new FormData();
          this.image = this.$refs.file.files.item(0);
          formData.append("image", this.image);
          formData.append("service_id", data.service.id);
          await this.$axios
            .post("api/services/admin/save-image", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(() => {
              this.toggleView();
              location.reload();
            });
        });
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
