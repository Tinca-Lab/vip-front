<template>
  <div class="px-5 my-28">
    <section class="flex flex-col items-center w-full justify-center">
      <h1 class="text-2xl text-karla">Mi foto de perfil</h1>
      <img
        v-if="user.image !== null"
        :src="user.image.path"
        alt="Imagen de perfil"
        class="w-36 h-36 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover rounded-full"
      />
      <div
        v-else
        class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
      >
        <svg
          class="absolute w-12 h-12 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <form class="flex flex-col items-center" @submit.prevent="uploadImage">
        <label
          class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300 text-karla"
          for="files"
          >Cambiar foto de perfil</label
        >
        <input
          id="files"
          ref="file"
          class="block text-karla w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          type="file"
        />
        <p
          id="file_input_help"
          class="mt-1 text-sm text-gray-500 dark:text-gray-300 text-karla"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>

        <button
          class="bg-indigo-300 ring-indigo-400 ring-2 rounded-lg hover:bg-indigo-400 ease-in-out duration-300 text-white font-bold py-2 px-4 rounded my-2"
        >
          Subir
        </button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "SettingsView",
  layout: "SlimLayout",
  middleware({ store, redirect }) {
    if (store.state.auth.user.role === 1) {
      redirect("/admin/dashboard");
    }
    if (store.state.auth.user.verified === false) {
      redirect("/not-verified");
    }
  },
  data: () => ({
    image: null,
  }),
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
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
  },
};
</script>

<style scoped></style>
