<template>
  <div class="px-5 py-28 overflow-y-scroll h-screen">
    <div class="grid grid-rows-3 grid-flow-col gap-4">
      <nuxt-link
        to="/schedule"
        class="bg-indigo-50 rounded flex items-center justify-between py-2 px-5"
      >
        <p class="text-karla text-2xl tracking-wide">Citas Medicas</p>
        <img src="@/assets/icons/schedule.svg" alt="Citas medicas" />
      </nuxt-link>
      <nuxt-link
        to="/services"
        class="bg-indigo-50 rounded flex items-center justify-between py-2 px-5"
      >
        <p class="text-karla text-2xl tracking-wide">Servicios</p>
        <img src="@/assets/icons/services.svg" alt="Servicios" />
      </nuxt-link>
      <nuxt-link
        to="/support"
        class="bg-indigo-50 rounded flex items-center justify-between py-2 px-5"
      >
        <p class="text-karla text-2xl tracking-wide">Soporte</p>
        <img src="@/assets/icons/support.svg" alt="Soporte" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
  layout: "SlimLayout",
  middleware({ store, redirect }) {
    if (store.state.auth.user.role === 1) {
      redirect("/admin/dashboard");
    }
  },
};
</script>
