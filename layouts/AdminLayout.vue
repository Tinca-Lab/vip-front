<template>
  <div class="admin">
    <div class="flex flex-col h-screen wrap relative">
      <header>
        <nav class="fixed z-50 w-full top-0 flex flex-col items-center pt-10">
          <nuxt-link
            v-if="path !== 'dashboard'"
            to="/admin/dashboard"
            class="self-start flex items-center px-5 text-blue-500"
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
            <span class="font-semibold"> Volver </span>
          </nuxt-link>
          <div class="flex items-center justify-between w-full px-5">
            <div class="flex">
              <span>👋🏻</span>
              <p
                v-if="$auth.user"
                class="text-lg tracking-wide text-blue-500 font-semibold"
              >
                Hola, {{ user }}
              </p>
            </div>
            <div class="relative">
              <nuxt-link to="admin/settings">
                <img
                  class="rounded-xl"
                  src="@/assets/icons/default_icon.svg"
                  alt="Mi perfil"
                />
              </nuxt-link>
            </div>
          </div>
        </nav>
      </header>
      <main class="flex-grow bg-white lg:pt-32 relative">
        <Nuxt class="relative" />
      </main>
      <footer>
        <div
          class="bg-white bg-opacity-60 w-11/12 rounded-2xl fixed bottom-10 left-4 flex items-center justify-around p-5 backdrop-blur backdrop-blur-2xl"
        >
          <nuxt-link to="/admin/dashboard">
            <span class="text-blue-300">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5556 0.5V9.5H28V0.5M15.5556 27.5H28V12.5H15.5556M0 27.5H12.4444V18.5H0M0 15.5H12.4444V0.5H0V15.5Z"
                />
              </svg>
            </span>
          </nuxt-link>
          <nuxt-link to="/admin/schedule">
            <span class="text-blue-300">
              <svg
                width="28"
                height="32"
                viewBox="0 0 28 32"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.1111 20.65H6.22222V23.75H17.1111M24.8889 28.4H3.11111V11.35H24.8889M24.8889 3.6H23.3333V0.5H20.2222V3.6H7.77778V0.5H4.66667V3.6H3.11111C1.38444 3.6 0 4.995 0 6.7V28.4C0 29.2222 0.327777 30.0107 0.911223 30.592C1.49467 31.1734 2.28599 31.5 3.11111 31.5H24.8889C25.714 31.5 26.5053 31.1734 27.0888 30.592C27.6722 30.0107 28 29.2222 28 28.4V6.7C28 5.87783 27.6722 5.08933 27.0888 4.50797C26.5053 3.92661 25.714 3.6 24.8889 3.6ZM21.7778 14.45H6.22222V17.55H21.7778V14.45Z"
                />
              </svg>
            </span>
          </nuxt-link>
          <nuxt-link to="/admin/services">
            <span class="text-blue-300">
              <svg
                width="34"
                height="26"
                viewBox="0 0 34 26"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.6364 16.125C17.4636 16.125 9.27273 18.1562 9.27273 22.375V25.5H34V22.375C34 18.1562 25.8091 16.125 21.6364 16.125ZM21.6364 13C23.2759 13 24.8483 12.3415 26.0076 11.1694C27.1669 9.99732 27.8182 8.4076 27.8182 6.75C27.8182 5.0924 27.1669 3.50268 26.0076 2.33058C24.8483 1.15848 23.2759 0.5 21.6364 0.5C19.9968 0.5 18.4245 1.15848 17.2652 2.33058C16.1058 3.50268 15.4545 5.0924 15.4545 6.75C15.4545 8.4076 16.1058 9.99732 17.2652 11.1694C18.4245 12.3415 19.9968 13 21.6364 13ZM6.18182 17.6875L5.25455 16.9062C2.16364 13.9375 0 12.0625 0 9.71875C0 7.84375 1.54545 6.28125 3.4 6.28125C4.48182 6.28125 5.56364 6.75 6.18182 7.53125C6.8 6.75 7.88182 6.28125 8.96364 6.28125C10.8182 6.28125 12.3636 7.6875 12.3636 9.71875C12.3636 12.0625 10.2 13.9375 7.10909 16.9062L6.18182 17.6875Z"
                />
              </svg>
            </span>
          </nuxt-link>
          <nuxt-link to="/admin/staff">
            <span class="text-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
  <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
</svg>
            </span>
          </nuxt-link>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminLayout",
  data: () => ({
    isOpen: false,
  }),
  computed: {
    user() {
      return this.$auth.user.person.name.split(" ")[0];
    },
    path() {
      const parent = this.$route.path.split("/")[1];
      const child = this.$route.path.split("/")[2];
      if (child) {
        return child;
      } else {
        return parent;
      }
    },
  },
  methods: {
    toggleView() {
      this.isOpen = !this.isOpen;
    },
    async onSubmit() {
      await this.$auth.logout();
    },
  },
};
</script>

<style scoped>
a.nuxt-link-active > span {
  color: #479aff;
}
</style>
