<template>
  <div class="py-28 px-5 text-karla">
    <h1 class="text-2xl text-center mb-5">¡Estamos a un solo boton!</h1>
    <div class="w-full md:w-96 md:max-w-full mx-auto">
      <div class="p-6 border border-gray-300 rounded-lg">
        <form @submit.prevent="onSubmit">
          <label class="block mb-6">
            <span class="text-gray-700">Mensaje</span>
            <textarea
              name="message"
              class="block w-full mt-1 p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
              placeholder="Cuentanos en que podemos ayudarte, y nos contactaremos contigo."
            ></textarea>
          </label>
          <div class="mb-6">
            <button
              type="submit"
              class="h-10 px-5 text-indigo-100 bg-indigo-500 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SupportView",
  layout: "SlimLayout",
  middleware({store, redirect}) {
    if (store.state.auth.user.role === 1) {
      redirect("/admin/dashboard");
    }
    if (store.state.auth.user.verified === false) {
      redirect("/not-verified");
    }
  },
};
</script>

<style scoped></style>
