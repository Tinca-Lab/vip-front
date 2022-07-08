<template>
  <div>
    <LoadingComponent v-if="isLoading"/>
    <section
      v-else
      class="h-screen w-screen flex flex-col justify-center items-center background px-5"
    >
      <div class="min-w-max">
        <div
          class="bg-white w-max flex flex-col items-center justify-center p-5 rounded-xl"
        >
          <aside class="w-full block">
            <img
              class="block mx-auto"
              src="@/assets/logo.svg"
              alt="Logo de Tarjeta V.I.P"
            />
          </aside>
          <form class="rounded-lg" @submit.prevent="onSubmit">
            <div class="my-4 w-max relative">
              <input
                v-model="email"
                type="email"
                :class="
                  email.length > 0
                    ? 'ring-2 ring-blue-300 ease-in-out transition-all duration-200'
                    : ''
                "
                class="rounded-lg focus:shadow-none border-0 focus:outline-none outline-none ease-in-out transition-all duration-200 px-5 py-2"
                placeholder="Correo Electronico"
                required=""
                autocomplete="email"
              />
              <button
                v-if="email.length > 0"
                class="absolute top-3 right-2"
                @click="email = ''"
              >
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5 17.5656C13.1944 17.5656 17 13.7599 17 9.06561C17 4.37128 13.1944 0.565613 8.5 0.565613C3.80557 0.565613 0 4.37128 0 9.06561C0 13.7599 3.80557 17.5656 8.5 17.5656ZM12.2657 5.29999C12.5781 5.61224 12.5781 6.11884 12.2657 6.43134L9.63138 9.06561L12.2657 11.6999C12.5781 12.0124 12.5781 12.519 12.2657 12.8312C11.9533 13.1437 11.4467 13.1437 11.1343 12.8312L8.5 10.197L5.86569 12.8312C5.55328 13.1437 5.04675 13.1437 4.73431 12.8312C4.42191 12.519 4.42191 12.0124 4.73431 11.6999L7.36862 9.06561L4.73431 6.43134C4.42191 6.11884 4.42191 5.61224 4.73431 5.29999C5.04672 4.98749 5.55325 4.98749 5.86569 5.29999L8.5 7.93427L11.1343 5.29999C11.4467 4.98749 11.9533 4.98749 12.2657 5.29999Z"
                    fill="#479AFF"
                  />
                </svg>
              </button>
            </div>
            <div class="my-4 w-max relative">
              <input
                v-model="password"
                type="password"
                :class="
                  password.length > 0
                    ? 'ring-2 ring-blue-300 ease-in-out transition-all duration-200'
                    : ''
                "
                class="rounded-lg focus:shadow-none border-0 focus:outline-none outline-none ease-in-out transition-all duration-200 px-5 py-2"
                placeholder="Contraseña"
                required=""
                autocomplete="password"
              />
              <button
                v-if="password.length > 0"
                class="absolute top-3 right-2"
                @click="password = ''"
              >
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5 17.5656C13.1944 17.5656 17 13.7599 17 9.06561C17 4.37128 13.1944 0.565613 8.5 0.565613C3.80557 0.565613 0 4.37128 0 9.06561C0 13.7599 3.80557 17.5656 8.5 17.5656ZM12.2657 5.29999C12.5781 5.61224 12.5781 6.11884 12.2657 6.43134L9.63138 9.06561L12.2657 11.6999C12.5781 12.0124 12.5781 12.519 12.2657 12.8312C11.9533 13.1437 11.4467 13.1437 11.1343 12.8312L8.5 10.197L5.86569 12.8312C5.55328 13.1437 5.04675 13.1437 4.73431 12.8312C4.42191 12.519 4.42191 12.0124 4.73431 11.6999L7.36862 9.06561L4.73431 6.43134C4.42191 6.11884 4.42191 5.61224 4.73431 5.29999C5.04672 4.98749 5.55325 4.98749 5.86569 5.29999L8.5 7.93427L11.1343 5.29999C11.4467 4.98749 11.9533 4.98749 12.2657 5.29999Z"
                    fill="#479AFF"
                  />
                </svg>
              </button>
            </div>
            <div class="my-4 w-max relative">
              <input
                v-model="passwordConfirmation"
                type="password"
                :class="
                  passwordConfirmation.length > 0
                    ? 'ring-2 ring-blue-300 ease-in-out transition-all duration-200'
                    : ''
                "
                class="rounded-lg focus:shadow-none border-0 focus:outline-none outline-none ease-in-out transition-all duration-200 px-5 py-2"
                placeholder="Confirme su contraseña"
                required=""
                autocomplete="password"
              />
              <button
                v-if="passwordConfirmation.length > 0"
                class="absolute top-3 right-2"
                @click="passwordConfirmation = ''"
              >
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5 17.5656C13.1944 17.5656 17 13.7599 17 9.06561C17 4.37128 13.1944 0.565613 8.5 0.565613C3.80557 0.565613 0 4.37128 0 9.06561C0 13.7599 3.80557 17.5656 8.5 17.5656ZM12.2657 5.29999C12.5781 5.61224 12.5781 6.11884 12.2657 6.43134L9.63138 9.06561L12.2657 11.6999C12.5781 12.0124 12.5781 12.519 12.2657 12.8312C11.9533 13.1437 11.4467 13.1437 11.1343 12.8312L8.5 10.197L5.86569 12.8312C5.55328 13.1437 5.04675 13.1437 4.73431 12.8312C4.42191 12.519 4.42191 12.0124 4.73431 11.6999L7.36862 9.06561L4.73431 6.43134C4.42191 6.11884 4.42191 5.61224 4.73431 5.29999C5.04672 4.98749 5.55325 4.98749 5.86569 5.29999L8.5 7.93427L11.1343 5.29999C11.4467 4.98749 11.9533 4.98749 12.2657 5.29999Z"
                    fill="#479AFF"
                  />
                </svg>
              </button>
            </div>
            <div class="my-4 w-max relative">
              <input
                v-model="name"
                type="text"
                :class="
                  name.length > 0
                    ? 'ring-2 ring-blue-300 ease-in-out transition-all duration-200'
                    : ''
                "
                class="rounded-lg focus:shadow-none border-0 focus:outline-none outline-none ease-in-out transition-all duration-200 px-5 py-2"
                placeholder="Nombres"
                required=""
              />
              <button
                v-if="name.length > 0"
                class="absolute top-3 right-2"
                @click="name = ''"
              >
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5 17.5656C13.1944 17.5656 17 13.7599 17 9.06561C17 4.37128 13.1944 0.565613 8.5 0.565613C3.80557 0.565613 0 4.37128 0 9.06561C0 13.7599 3.80557 17.5656 8.5 17.5656ZM12.2657 5.29999C12.5781 5.61224 12.5781 6.11884 12.2657 6.43134L9.63138 9.06561L12.2657 11.6999C12.5781 12.0124 12.5781 12.519 12.2657 12.8312C11.9533 13.1437 11.4467 13.1437 11.1343 12.8312L8.5 10.197L5.86569 12.8312C5.55328 13.1437 5.04675 13.1437 4.73431 12.8312C4.42191 12.519 4.42191 12.0124 4.73431 11.6999L7.36862 9.06561L4.73431 6.43134C4.42191 6.11884 4.42191 5.61224 4.73431 5.29999C5.04672 4.98749 5.55325 4.98749 5.86569 5.29999L8.5 7.93427L11.1343 5.29999C11.4467 4.98749 11.9533 4.98749 12.2657 5.29999Z"
                    fill="#479AFF"
                  />
                </svg>
              </button>
            </div>
            <div class="my-4 w-max relative">
              <input
                v-model="lastname"
                type="text"
                :class="
                  lastname.length > 0
                    ? 'ring-2 ring-blue-300 ease-in-out transition-all duration-200'
                    : ''
                "
                class="rounded-lg focus:shadow-none border-0 focus:outline-none outline-none ease-in-out transition-all duration-200 px-5 py-2"
                placeholder="Apellidos"
                required=""
              />
              <button
                v-if="lastname.length > 0"
                class="absolute top-3 right-2"
                @click="lastname = ''"
              >
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5 17.5656C13.1944 17.5656 17 13.7599 17 9.06561C17 4.37128 13.1944 0.565613 8.5 0.565613C3.80557 0.565613 0 4.37128 0 9.06561C0 13.7599 3.80557 17.5656 8.5 17.5656ZM12.2657 5.29999C12.5781 5.61224 12.5781 6.11884 12.2657 6.43134L9.63138 9.06561L12.2657 11.6999C12.5781 12.0124 12.5781 12.519 12.2657 12.8312C11.9533 13.1437 11.4467 13.1437 11.1343 12.8312L8.5 10.197L5.86569 12.8312C5.55328 13.1437 5.04675 13.1437 4.73431 12.8312C4.42191 12.519 4.42191 12.0124 4.73431 11.6999L7.36862 9.06561L4.73431 6.43134C4.42191 6.11884 4.42191 5.61224 4.73431 5.29999C5.04672 4.98749 5.55325 4.98749 5.86569 5.29999L8.5 7.93427L11.1343 5.29999C11.4467 4.98749 11.9533 4.98749 12.2657 5.29999Z"
                    fill="#479AFF"
                  />
                </svg>
              </button>
            </div>
            <div class="my-4 w-max relative">
              <input
                v-model="nit"
                type="number"
                :class="
                  nit.length > 0
                    ? 'ring-2 ring-blue-300 ease-in-out transition-all duration-200'
                    : ''
                "
                class="rounded-lg focus:shadow-none border-0 focus:outline-none outline-none ease-in-out transition-all duration-200 px-5 py-2"
                placeholder="Cedula de ciudadania o NIT"
                required=""
              />
              <button
                v-if="nit.length > 0"
                class="absolute top-3 right-2"
                @click="nit = ''"
              >
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5 17.5656C13.1944 17.5656 17 13.7599 17 9.06561C17 4.37128 13.1944 0.565613 8.5 0.565613C3.80557 0.565613 0 4.37128 0 9.06561C0 13.7599 3.80557 17.5656 8.5 17.5656ZM12.2657 5.29999C12.5781 5.61224 12.5781 6.11884 12.2657 6.43134L9.63138 9.06561L12.2657 11.6999C12.5781 12.0124 12.5781 12.519 12.2657 12.8312C11.9533 13.1437 11.4467 13.1437 11.1343 12.8312L8.5 10.197L5.86569 12.8312C5.55328 13.1437 5.04675 13.1437 4.73431 12.8312C4.42191 12.519 4.42191 12.0124 4.73431 11.6999L7.36862 9.06561L4.73431 6.43134C4.42191 6.11884 4.42191 5.61224 4.73431 5.29999C5.04672 4.98749 5.55325 4.98749 5.86569 5.29999L8.5 7.93427L11.1343 5.29999C11.4467 4.98749 11.9533 4.98749 12.2657 5.29999Z"
                    fill="#479AFF"
                  />
                </svg>
              </button>
            </div>
            <div class="my-4 w-max relative">
              <input
                v-model="phone"
                type="number"
                :class="
                  phone.length > 0
                    ? 'ring-2 ring-blue-300 ease-in-out transition-all duration-200'
                    : ''
                "
                class="rounded-lg focus:shadow-none border-0 focus:outline-none outline-none ease-in-out transition-all duration-200 px-5 py-2"
                placeholder="Telefono"
                required=""
              />
              <button
                v-if="phone.length > 0"
                class="absolute top-3 right-2"
                @click="phone = ''"
              >
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5 17.5656C13.1944 17.5656 17 13.7599 17 9.06561C17 4.37128 13.1944 0.565613 8.5 0.565613C3.80557 0.565613 0 4.37128 0 9.06561C0 13.7599 3.80557 17.5656 8.5 17.5656ZM12.2657 5.29999C12.5781 5.61224 12.5781 6.11884 12.2657 6.43134L9.63138 9.06561L12.2657 11.6999C12.5781 12.0124 12.5781 12.519 12.2657 12.8312C11.9533 13.1437 11.4467 13.1437 11.1343 12.8312L8.5 10.197L5.86569 12.8312C5.55328 13.1437 5.04675 13.1437 4.73431 12.8312C4.42191 12.519 4.42191 12.0124 4.73431 11.6999L7.36862 9.06561L4.73431 6.43134C4.42191 6.11884 4.42191 5.61224 4.73431 5.29999C5.04672 4.98749 5.55325 4.98749 5.86569 5.29999L8.5 7.93427L11.1343 5.29999C11.4467 4.98749 11.9533 4.98749 12.2657 5.29999Z"
                    fill="#479AFF"
                  />
                </svg>
              </button>
            </div>
            <button
              :class="
                disabled
                  ? 'ring-1 bg-blue-400 cursor-default'
                  : 'ring-1 bg-blue-500 cursor-pointer'
              "
              class="block mx-auto rounded-xl px-5 py-2 mt-2 ease-in-out duration-200 transition-all hover:bg-blue-300 text-white font-bold"
              type="submit"
              :disabled="disabled"
            >
              Registrarse
            </button>
            <div class="flex flex-col items-center justify-center">
              <nuxt-link class="text-blue-500 underline mt-2" to="/login"
              >Ya tengo cuenta
              </nuxt-link
              >
            </div>
          </form>
        </div>
        <div
          class="bg-blue-200 flex justify-center w-full rounded-2xl p-1 mt-20"
        >
          <nuxt-link class="w-1/2 text-center px-5 py-3 font-bold text-white" to="/login"
          >Iniciar Sesion
          </nuxt-link
          >
          <nuxt-link class="w-1/2 text-center px-5 py-3 font-bold text-white" to="/register"
          >Registrarse
          </nuxt-link
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  auth: false,
  data: () => ({
    name: "",
    lastname: "",
    nit: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    isLoading: false,
  }),
  computed: {
    disabled() {
      return !(this.email.length > 0 && this.password.length > 0);
    },
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;
      try {
        await this.$axios
          .post("http://localhost:8000/api/auth/register", {
            name: this.name,
            lastname: this.lastname,
            nit: this.nit,
            phone: this.phone,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation,
          })
          .then(() => {
            this.$router.push("/login");
          });
      } catch (error) {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
div > section {
  background: url("@/assets/background.png") no-repeat center center;
  background-size: cover;
}

.bg-white {
  background: linear-gradient(
    136.5deg,
    rgba(255, 255, 255, 0.9) 2.09%,
    rgba(255, 255, 255, 0.51) 99.39%
  );
  backdrop-filter: blur(10px);
}

a.nuxt-link-exact-active {
  color: #fff;
  font-weight: bold;
  border-radius: 1rem;
  background: #479aff;
}
</style>
