<template>
  <div class="px-5 py-32 h-full background">
    <section class="flex flex-col items-center w-full justify-center">
      <img
        v-if="user.image !== null"
        :src="user.image.path"
        alt="Imagen de perfil"
        class="w-36 h-36 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover rounded-full"
      />
      <button
        v-else
        @click="toggleChange"
      >
        <svg width="80" height="80" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="50" rx="16" fill="url(#paint0_linear_73_683)"/>
          <path
            d="M25 10C26.9891 10 28.8968 10.7902 30.3033 12.1967C31.7098 13.6032 32.5 15.5109 32.5 17.5C32.5 19.4891 31.7098 21.3968 30.3033 22.8033C28.8968 24.2098 26.9891 25 25 25C23.0109 25 21.1032 24.2098 19.6967 22.8033C18.2902 21.3968 17.5 19.4891 17.5 17.5C17.5 15.5109 18.2902 13.6032 19.6967 12.1967C21.1032 10.7902 23.0109 10 25 10ZM25 28.75C33.2875 28.75 40 32.1063 40 36.25V37C40 38.6569 38.6569 40 37 40H13C11.3431 40 10 38.6569 10 37V36.25C10 32.1063 16.7125 28.75 25 28.75Z"
            fill="url(#paint1_linear_73_683)"/>
          <defs>
            <linearGradient id="paint0_linear_73_683" x1="25" y1="0" x2="25" y2="50" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0.9"/>
              <stop offset="1" stop-color="white" stop-opacity="0.45"/>
            </linearGradient>
            <linearGradient id="paint1_linear_73_683" x1="25" y1="10" x2="25" y2="40" gradientUnits="userSpaceOnUse">
              <stop stop-color="#55C2FF"/>
              <stop offset="1" stop-color="#479AFF"/>
            </linearGradient>
          </defs>
        </svg>

      </button>
      <Transition name="fade">
        <form v-if="isChange" class="flex flex-col items-center my-3 w-full" @submit.prevent="uploadImage">
          <div class="flex justify-center items-center w-full">
            <label
              for="files"
              class="flex w-full flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col justify-center items-center pt-5 pb-6">
                <svg
                  class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                  class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input
                id="files"
                ref="file" type="file" class="hidden" required/>
            </label>
          </div>
          <button
            class="bg-blue-400 ring-2 rounded-xl ease-in-out duration-300 text-white font-bold py-2 px-4 rounded my-2"
          >
            Subir imagen
          </button>
        </form>
      </Transition>
    </section>
    <section class="flex flex-col items-center justify-center w-full my-3">
      <h1 class="text-2xl font-bold text-center">
        {{ user.person.name }}
      </h1>
      <h1 class="font-bold">
        {{ user.person.lastname }}
      </h1>
    </section>
    <section>
      <div
        class="bg-blue-300 flex justify-center w-full rounded-2xl p-1 my-5"
      >
        <button
          type="button" :class="[active === 'profile' ? 'bg-blue-500 rounded-2xl' : '']"
          class="w-1/2 text-center px-5 py-3 text-white font-bold"
          @click="toggle = 'profile'"
        >Mis datos
        </button
        >
        <button
          type="button"
          class="w-1/2 text-center px-5 py-3 text-white font-bold"
          :class="[active === 'beneficiaries' ? 'bg-blue-500 rounded-2xl' : '']"
          @click="toggle = 'beneficiaries';isEdit=false"
        >Beneficiarios
        </button
        >
      </div>
    </section>
    <Transition name="bounce">
      <section v-if="toggle === 'beneficiaries'">
        <div class="bg-white p-5 w-full backdrop-blur backdrop-filter bg-opacity-50 rounded-xl">
          <div
            v-for="(beneficiary, i) in beneficiaries" :key="beneficiary.id"
            class="flex items-center justify-center flex-col">
            <span class="text-blue-500 font-semibold text-lg">{{ beneficiary.name }} {{ beneficiary.lastname }}</span>
            <hr
              v-if="i < beneficiaries.length - 1"
              class="my-2 bg-white border-gray-200 opacity-70 border-2 w-full rounded-lg">
          </div>
        </div>
        <button type="button"
                class="rounded-xl bg-blue-400 hover:bg-blue-500 ease-in-out duration-200 px-5 py-3 block my-3 mx-auto text-white font-semibold">
          Agregar beneficiario
        </button>
      </section>
    </Transition>
    <Transition name="bounce">
      <section v-if="toggle === 'profile'">
        <div class="bg-white p-5 w-full backdrop-blur backdrop-filter bg-opacity-50 rounded-xl">
          <div class="flex items-center">
            <label for="name" class="w-1/4 text-left">Nombres:</label>
            <input
              id="name"
              v-model="user.person.name"
              type="text"
              class="w-full border-0 bg-transparent font-semibold text-blue-500 outline-none"
              :disabled="disabled"
            />
          </div>
          <div class="flex items-center">
            <label for="name" class="w-1/4 text-left">Apellidos:</label>
            <input
              id="lastname"
              v-model="user.person.lastname"
              type="text"
              class="w-full border-0 bg-transparent font-semibold text-blue-500 outline-none"
              :disabled="disabled"
            />
          </div>
          <div class="flex items-center">
            <label for="email" class="w-1/4 text-left">Correo:</label>
            <input
              id="email"
              v-model="user.email"
              type="email"
              class="w-full border-0 bg-transparent font-semibold text-blue-500 outline-none"
              :disabled="disabled"
            />
          </div>
          <div class="flex items-center">
            <label for="phone" class="w-1/4 text-left">Telefono:</label>
            <input
              id="phone"
              v-model="user.person.phone"
              type="number"
              class="w-full border-0 bg-transparent font-semibold text-blue-500 outline-none"
              :disabled="disabled"
            />
          </div>
        </div>
        <button
          v-if="isEdit === false"
          class="block mt-5 mx-auto px-5 py-3 bg-blue-400 hover:bg-blue-500 rounded-xl ease-in-out duration-200 font-semibold text-white"
          type="button"
          @click="isEdit = !isEdit"
        >Editar perfil
        </button>
        <button
          v-else
          class="block mt-5 mx-auto px-5 py-3 bg-blue-400 hover:bg-blue-500 rounded-xl ease-in-out duration-200 font-semibold text-white"
          type="button" @click="onSubmit">Guardar Cambios
        </button>
      </section>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "SettingsView",
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
    image: null,
    isChange: false,
    isEdit: false,
    toggle: 'profile',
  }),
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    beneficiaries() {
      return this.$store.state.beneficiaries;
    },
    active() {
      switch (this.toggle) {
        case 'profile':
          return "profile";
        case 'beneficiaries':
          return "beneficiaries";
        default:
          return "profile";
      }
    },
    disabled() {
      return true;
    }
  },
  beforeCreate() {
    this.$store.dispatch("getBeneficiaries", this.$auth.user.id);
  },
  methods: {
    async uploadImage() {
      this.image = this.$refs.file.files.item(0);
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("user_id", this.user.id);
      await this.$axios
        .post("api/auth/save-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          location.reload();
        });
    },
    toggleChange() {
      this.isChange = !this.isChange;
    },
    onSubmit() {
      console.log('submit');
      this.isEdit = !this.isEdit;
    }
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
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
