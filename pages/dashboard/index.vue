<template>
  <div class="px-5 py-32 overflow-y-scroll h-screen background">
    <Transition name="bounce">
      <div v-if="isShowing" class="grid grid-rows-3 grid-flow-col gap-4">
        <nuxt-link
          to="/schedule"
          class="bg-white bg-opacity-60 backdrop-blur backdrop-filter rounded-3xl flex items-center justify-between py-5 px-5"
        >
          <p class="text-lg text-blue-500 font-semibold tracking-wide px-5">
            Citas médicas
          </p>
          <img src="@/assets/shortcuts/schedule.svg" alt="Citas medicas" />
        </nuxt-link>
        <nuxt-link
          to="/services"
          class="bg-white bg-opacity-60 backdrop-filter backdrop-blur rounded-3xl flex items-center justify-between py-5 px-5"
        >
          <p class="text-lg text-blue-500 font-semibold tracking-wide px-5">
            Servicios
          </p>
          <img src="@/assets/shortcuts/service.svg" alt="Servicios" />
        </nuxt-link>
        <nuxt-link
          to="/support"
          class="bg-white bg-opacity-60 backdrop-filter backdrop-blur rounded-3xl flex items-center justify-between py-2 px-5"
        >
          <p class="text-lg text-blue-500 font-semibold tracking-wide px-5">
            Soporte
          </p>
          <img src="@/assets/shortcuts/support.svg" alt="Soporte" />
        </nuxt-link>
      </div>
    </Transition>
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
    if (store.state.auth.user.verified === 0) {
      redirect("/not-verified");
    }
  },
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
