d
<template>
  <div class="px-5 py-32 h-full background">

    <Transition name="bounce">
      <div v-if="services.length === 0 && isShowing" class="h-full justify-center flex items-center">
        <span
          class="bg-white bg-opacity-60 backdrop-blur backdrop-filter rounded-3xl flex items-center justify-between py-5 px-5"
        >
        <span
          class="text-lg text-blue-500 font-semibold tracking-wide px-5 text-center"
        >No hay servicios disponibles</span
        >
        <img src="@/assets/shortcuts/service.svg" alt="Citas medicas"/>
      </span>
      </div>
    </Transition>
    <Transition name="bounce">
      <div v-if="isShowing">
        <div v-for="(service, i) in services" :key="i" @click="onClick(service)">
          <ServicePopUpComponent :service="service"/>
        </div>
        <Transition name="fade">
          <div v-if="isClick">
            <div
              class="bg-white h-screen w-screen fixed top-0 left-0 py-32 px-10 flex items-center"
            >
              <div class="bg-white p-5 shadow rounded-lg block mx-auto w-full">
                <div class="flex justify-between">
                  <p class="text-2xl tracking-widest font-bold">
                    {{ isService.name }}
                  </p>
                  <button type="button" @click="onClick(null)">
                <span
                  class="hover:text-gray-300 ease-in-out duration-75 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                    />
                  </svg>
                </span>
                  </button>
                </div>
                <span class="text-lg">{{ isService.description }}</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "ServicesView",
  layout: "SlimLayout",
  middleware({store, redirect}) {
    if (store.state.auth.user.role === 1) {
      redirect("/admin/dashboard");
    }
    if (store.state.auth.user.verified === false) {
      redirect("/not-verified");
    }
  },
  data: () => ({
    isClick: false,
    isService: null,
    isShowing: false,
  }),
  computed: {
    services() {
      return this.$store.state.services;
    },
  },
  beforeCreate() {
    this.$store.dispatch("getServices");
  },
  mounted() {
    setTimeout(() => {
      this.isShowing = true;
    }, 200);
  },
  methods: {
    onClick(service) {
      if (service !== null) {
        this.isClick = true;
        this.isService = service;
      } else {
        this.isClick = false;
        this.isService = null;
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
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
