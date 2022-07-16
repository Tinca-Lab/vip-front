<template>
  <div class="px-5 py-32 h-full background">
    <Transition name="bounce">
      <div v-if="isShowing" class="grid grid-rows-4 grid-flow-col gap-4">
        <nuxt-link
          to="/admin/schedule"
          class="bg-white bg-opacity-60 backdrop-blur backdrop-filter rounded-3xl flex items-center justify-between py-5 px-5"
        >
          <p class="text-lg font-semibold text-blue-500 tracking-wide px-5">
            Citas médicas
          </p>
          <img src="@/assets/shortcuts/schedule.svg" alt="Citas Medicas"/>
        </nuxt-link>
        <nuxt-link
          to="/admin/services"
          class="bg-white bg-opacity-60 backdrop-blur backdrop-filter rounded-3xl flex items-center justify-between py-5 px-5"
        >
          <p class="text-lg font-semibold text-blue-500 tracking-wide px-5">
            Servicios
          </p>
          <img src="@/assets/shortcuts/service.svg" alt="Servicios"/>
        </nuxt-link>
        <nuxt-link
          to="/admin/staff"
          class="bg-white bg-opacity-60 backdrop-blur backdrop-filter rounded-3xl flex items-center justify-between py-5 px-5"
        >
          <p class="text-lg font-semibold text-blue-500 tracking-wide px-5">
            Personal
            <br>
            <span class="text-gray-400 font-semibold text-xs">
            Doctores, auxiliares, etc.
          </span>
          </p>
          <img src="@/assets/shortcuts/settings.svg" alt="Personal"/>
        </nuxt-link>
        <nuxt-link
          to="/admin/subscriptions"
          class="bg-white bg-opacity-60 backdrop-blur backdrop-filter rounded-3xl flex items-center justify-between py-5 px-5"
        >
          <p class="text-lg font-semibold text-blue-500 tracking-wide px-5">
            Planes
          </p>
          <img class="w-20" src="@/assets/shortcuts/subscriptions.png" alt="Planes"/>
        </nuxt-link>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "AdminDashboardView",
  layout: "AdminLayout",
  middleware: "role",
  data: () => ({
    isShowing: false,
  }),
  mounted() {
    setInterval(() => {
      this.isShowing = true;
    }, 200);
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: translateY(-50px);
  }
  25% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
