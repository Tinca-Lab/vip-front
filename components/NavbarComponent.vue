<template>
  <nav class="fixed z-30 w-full top-0 flex flex-col items-center">
    <div class="w-full flex justify-between px-5 my-2">
      <nuxt-link
        v-if="path !== 'dashboard'"
        to="/dashboard"
        class="self-start flex items-center text-blue-500 duration-200 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-arrow-left-short"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
          />
        </svg>
        <span class="font-semibold">Volver </span>
      </nuxt-link>
      <div v-else/>
      <button type="button" @click="onSubmit">
        <svg
          width="20"
          height="22"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 15V12H6V8H13V5L18 10L13 15ZM11 0C11.5304 0 12.0391 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2V4H11V2H2V18H11V16H13V18C13 18.5304 12.7893 19.0391 12.4142 19.4142C12.0391 19.7893 11.5304 20 11 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H11Z"
            fill="url(#paint0_linear_189_640)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_189_640"
              x1="9"
              y1="0"
              x2="9"
              y2="20"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#55C2FF"/>
              <stop offset="1" stop-color="#479AFF"/>
            </linearGradient>
          </defs>
        </svg>
      </button>
    </div>
    <div class="flex items-center justify-between w-full px-5">
      <div class="flex">
        <span>👋🏻</span>
        <p
          v-if="$auth.user"
          class="text-lg tracking-wide font-semibold text-blue-500"
        >
          Hola, {{ user }}
        </p>
      </div>
      <div v-if="!(path === 'settings')" class="relative">
        <nuxt-link to="/settings" type="button">
          <img
            v-if="image" class="w-12 h-12 p-1 rounded-2xl ring-gray-300 dark:ring-gray-500 object-cover"
            :src="image.path" :alt="image.path">
          <img
            v-else
            class="rounded-lg shadow-sm"
            src="@/assets/icons/default_icon.svg"
            alt="Mi perfil"
          />
        </nuxt-link>
      </div>
    </div>
    <LoadingComponent v-if="isLoading"/>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  data: () => ({
    isOpen: false,
    isLoading: false,
    menu: [
      {
        name: "Inicio",
        url: "/",
      },
      {
        name: "Configuración",
        url: "/settings",
      },
    ],
  }),
  computed: {
    image() {
      return this.$auth.user.image;
    },
    user() {
      return this.$auth.user.name.split(" ")[0];
    },
    path() {
      return this.$route.path.split("/")[1];
    },
  },
  methods: {
    toggleView() {
      this.isOpen = !this.isOpen;
    },
    async onSubmit() {
      this.isLoading = true;
      await this.$auth.logout();
      await this.$router.push("/login");
    },
  },
};
</script>

<style scoped></style>
