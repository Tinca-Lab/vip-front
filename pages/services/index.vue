<template>
  <div class="px-5 py-32">
    <div
      v-for="(service, i) in services" :key="i"
      @click="onClick(service)">
      <ServicePopUpComponent :service="service"/>
    </div>
    <Transition name="fade">
      <div v-if="isClick">
        <div class="bg-white h-screen w-screen fixed top-0 left-0 py-32 px-10 flex items-center">
          <div class="bg-white p-5 shadow rounded block mx-auto w-full" @click="onClick(null)">
            <p class="text-karla text-2xl tracking-widest font-bold">{{ isService.name }}</p>
            <span class="text-karla text-lg">{{ isService.description }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "ServicesView",
  layout: "SlimLayout",
  data: () => ({
    isClick: false,
    isService: null,
  }),
  computed: {
    services() {
      return this.$store.state.services;
    }
  },
  beforeCreate() {
    this.$store.dispatch("getServices");
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
.bg-white {
  background-color: rgba(255, 255, 255, 0.70);
  backdrop-filter: blur(10px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .10s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
