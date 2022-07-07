<template>
  <div>
    <LoadingComponent v-if="isLoading"/>
    <section v-else class="h-screen w-screen flex flex-col justify-center items-center background px-5">
      <div class="min-w-max">
        <div class="bg-white w-max flex flex-col items-center justify-center p-5 rounded-xl">
          <aside class="w-full block">
            <img class="block mx-auto" src="@/assets/logo.svg" alt="Logo de Tarjeta V.I.P">
          </aside>
          <form class="rounded-lg" @submit.prevent="onSubmit">
            <div class="my-4">
              <input
                v-model="email"
                type="email"
                class="rounded-lg ring-2 ring-blue-300 border-0 px-5 py-2 outline-none" placeholder="Correo Electronico"
                required="" autocomplete="email">
            </div>
            <div class="my-4">
              <input
                v-model="password"
                type="password"
                class="rounded-lg ring-2 ring-blue-300 border-0 px-5 py-2 outline-none" placeholder="Contraseña"
                required=""
                autocomplete="password">
            </div>
            <div class="flex items-center justify-center mb-4 w-full">
              <input
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 focus:bg-blue-400 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label
                for="default-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recuerdame</label>
            </div>
            <button
              :class="disabled ? 'ring-1 bg-blue-400 cursor-default' : 'ring-1 bg-blue-500 cursor-pointer'"
              class="block mx-auto rounded-xl px-5 py-2 mt-2 ease-in-out duration-200 transition-all hover:bg-blue-300 text-white font-bold"
              type="submit" :disabled="disabled">
              Iniciar Sesion
            </button>
            <div class="flex flex-col items-center justify-center">
              <nuxt-link class="text-blue-500 underline my-2" to="/forgot-password">¿Olvidaste tu contraseña?
              </nuxt-link>
              <nuxt-link class="text-blue-500 underline mb-2" to="/register">No tengo cuenta</nuxt-link>
            </div>
          </form>
        </div>
        <div class="bg-blue-200 flex justify-center w-full rounded-2xl p-1 mt-20">
          <nuxt-link class="w-1/2 text-center px-5 lg:px-10 py-3" to="/login">Iniciar Sesion</nuxt-link>
          <nuxt-link class="w-1/2 text-center px-5 lg:px-10 py-3" to="/register">Registrarse</nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    email: "",
    password: "",
    hasError: null,
    isLoading: false,
  }),
  computed: {
    disabled() {
      return !(this.email.length > 0 && this.password.length > 0);
    },
  },
  methods: {
    onClose() {
      this.hasError = null;
    },
    async onSubmit() {
      this.isLoading = true;
      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        }).then(async () => {
          await this.$router.push("/");
        })
      } catch (error) {
        this.hasError = error.response;
        this.isLoading = false;
      }
    },
  }
};
</script>

<style scoped>
div > section {
  background: url("@/assets/background.png") no-repeat center center;
  background-size: cover;
}

.bg-white {
  background: linear-gradient(136.5deg, rgba(255, 255, 255, 0.9) 2.09%, rgba(255, 255, 255, 0.51) 99.39%);
  backdrop-filter: blur(10px)
}

a.nuxt-link-exact-active {
  color: #fff;
  font-weight: bold;
  border-radius: 1rem;
  background: #479AFF;
}
</style>
