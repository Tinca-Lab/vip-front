<template>
  <div class="h-screen flex items-center justify-center background py-32 px-5">
    <Transition name="bounce">
      <div
        v-if="isShowing" :class="subscriptions.length === 0 ? 'justify-center' : ''"
        class="flex flex-col h-full items-center w-full ease-in-out duration-200">
        <div v-if="subscriptions.length > 0" class="w-full">
          <SubscriptionCardComponent
            v-for="subscription in subscriptions"
            :key="subscription.id" :subscription="subscription"
            @delete="deleteSubscription"/>
        </div>
        <span
          v-else
          class="bg-white bg-opacity-60 w-full backdrop-blur backdrop-filter rounded-3xl flex items-center justify-between py-5 px-5 mb-5">
            <span
              class="text-lg text-blue-500 font-semibold tracking-wide px-5 text-center"
            >Aun no has creado planes</span>
            <img class="w-20" src="@/assets/shortcuts/subscriptions.png" alt="Servicios"/>
          </span>
        <button
          class="bg-blue-400 rounded-xl px-5 py-3 text-white font-semibold ease-in-out duration-200 hover:bg-blue-400"
          type="button">
          Agregar plan
        </button>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "AdminSubscriptionsView",
  layout: "AdminLayout",
  middleware: "role",
  data: () => ({
    isShowing: false,
  }),
  computed: {
    subscriptions() {
      return this.$store.state.subscriptions;
    }
  },
  async created() {
    await this.$store.dispatch("getSubscriptions");
  },
  mounted() {
    setInterval(() => {
      this.isShowing = true;
    }, 200);
  },
  methods: {
    deleteSubscription(subscription) {
      this.$axios.delete(`/api/subscriptions/admin/${subscription.id}`).then(
        () => {
          this.$store.dispatch("getSubscriptions");
        });
    }
  }
}
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
