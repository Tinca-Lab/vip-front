<template>
  <nav
    class="fixed z-50 w-full top-0 flex flex-col items-center"
  >
    <nuxt-link v-if="path !== 'dashboard'" to="/dashboard" class="self-start flex items-center px-5 text-blue-500">
      <svg
        xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left-short"
        viewBox="0 0 16 16">
        <path
          fill-rule="evenodd"
          d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
      </svg>
      <span class="font-semibold">
        Volver
      </span>
    </nuxt-link>
    <div class="flex items-center justify-between w-full px-5">
      <div class="flex">
        <span>👋🏻</span>
        <p v-if="$auth.user" class="text-lg tracking-wide font-semibold text-blue-500">
          Hola, {{ user }}
        </p>
      </div>
      <div class="relative">
        <button type="button" @click="toggleView">
          <img
            class="rounded-lg shadow-sm"
            src="@/assets/icons/default_icon.svg"
            alt="Mi perfil"
          />
        </button>
        <ul
          v-show="isOpen"
          class="bg-white absolute rounded-lg shadow-sm top-15 right-0 z-50 text-right bg-gray-50 p-3"
        >
          <li
            v-for="(item, i) in menu"
            :key="i"
            class="border-b-2 my-1 rounded"
          >
            <a :href="item.url">{{ item.name }}</a>
          </li>
          <li class="border-b-2 my-1 rounded">
            <button type="button" @click.prevent="onSubmit">
              Cerrar sesión
            </button>
          </li>
        </ul>
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
    user() {
      return this.$auth.user.person.name.split(" ")[0];
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
      this.$router.push("/login").then(r => {
        this.isLoading = false;
      });
    },
  },
};
</script>

<style scoped></style>
