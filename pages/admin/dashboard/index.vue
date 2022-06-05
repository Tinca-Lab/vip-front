<template>
  <div class="px-5 py-32">
    <nuxt-link
      to="/admin/services"
      class="bg-indigo-50 rounded flex items-center justify-between py-2 px-5"
    >
      <p class="text-karla text-2xl tracking-wide">Servicios</p>
      <img src="@/assets/icons/services.svg" alt="Servicios" />
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
