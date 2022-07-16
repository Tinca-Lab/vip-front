<template>
  <div class="px-5 py-32 overflow-y-scroll h-screen background">
    <Transition name="bounce">
      <div v-if="isShowing" class="h-full flex flex-col items-center justify-center">
        <span
          class="bg-white bg-opacity-60 w-full backdrop-blur backdrop-filter rounded-3xl flex items-center justify-between py-5 px-5"
        >
      <span
        class="text-lg text-blue-500 font-semibold tracking-wide px-5 text-center"
      >No hay citas programadas</span
      >
      <img src="@/assets/shortcuts/schedule.svg" alt="Citas Medicas"/>
    </span>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "AdminScheduleView",
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
