<template>
  <div class="px-5 py-32 h-full background">
    <nuxt-link
      to="/admin/services"
      class="bg-white bg-opacity-60 backdrop-blur backdrop-filter rounded-3xl flex items-center justify-between py-5 px-5"
    >
      <p class="text-lg font-semibold text-blue-500 tracking-wide px-5">
        Servicios
      </p>
      <img src="@/assets/shortcuts/service.svg" alt="Servicios" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "AdminDashboardView",
  layout: "AdminLayout",
  middleware: "role",
};
</script>

<style scoped></style>
