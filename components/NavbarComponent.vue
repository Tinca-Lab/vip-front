<template>
  <nav
    class="bg-white fixed z-50 w-full top-0 shadow-sm flex flex-col items-center py-5"
  >
    <div class="flex items-center justify-between w-full px-5">
      <div class="flex">
        <span>👋🏻</span>
        <p v-if="$auth.user" class="text-lg text-karla tracking-wide">
          Hola, {{ user }}
        </p>
      </div>
      <div class="relative">
        <button type="button" @click="toggleView">
          <img
            class="rounded-full border-8"
            src="@/assets/icons/default_profile.png"
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
            class="border-b-2 my-1 rounded text-karla"
          >
            <a :href="item.url">{{ item.name }}</a>
          </li>
          <li class="border-b-2 my-1 rounded text-karla">
            <button type="button" @click.prevent="onSubmit">
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
    <LoadingComponent v-if="isLoading" />
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
  },
  methods: {
    toggleView() {
      this.isOpen = !this.isOpen;
    },
    async onSubmit() {
      this.isLoading = true;
      await this.$auth.logout().then(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>

<style scoped></style>
