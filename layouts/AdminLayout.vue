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
              <nuxt-link to="/settings">
                <img
                  class="rounded-3xl"
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
          <nuxt-link to="/admin/support">
            <span class="text-blue-300">
              <svg
                width="31"
                height="32"
                viewBox="0 0 31 32"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.2585 14.8375L18.8635 16.2635C17.7475 17.3795 17.05 18.325 17.05 20.65H13.95V19.875C13.95 18.1545 14.6475 16.6045 15.7635 15.4885L17.6855 13.5355C18.259 12.9775 18.6 12.2025 18.6 11.35C18.6 9.6295 17.205 8.25 15.5 8.25C14.6778 8.25 13.8893 8.57661 13.308 9.15797C12.7266 9.73933 12.4 10.5278 12.4 11.35H9.3C9.3 9.70566 9.95321 8.12866 11.1159 6.96594C12.2787 5.80321 13.8557 5.15 15.5 5.15C17.1443 5.15 18.7213 5.80321 19.8841 6.96594C21.0468 8.12866 21.7 9.70566 21.7 11.35C21.7 12.714 21.142 13.9385 20.2585 14.8375ZM17.05 26.85H13.95V23.75H17.05M15.5 0.5C13.4645 0.5 11.449 0.900919 9.56841 1.67987C7.68786 2.45882 5.97915 3.60054 4.53984 5.03984C1.63303 7.94666 0 11.8891 0 16C0 20.1109 1.63303 24.0533 4.53984 26.9602C5.97915 28.3995 7.68786 29.5412 9.56841 30.3201C11.449 31.0991 13.4645 31.5 15.5 31.5C19.6109 31.5 23.5533 29.867 26.4602 26.9602C29.367 24.0533 31 20.1109 31 16C31 7.4285 24.025 0.5 15.5 0.5Z"
                />
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
