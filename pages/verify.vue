<template>
  <div>
    <LoadingComponent v-if="isLoading"/>
    <div class="flex items-center justify-center min-h-screen p-5 bg-indigo-100 min-w-screen text-karla">
      <div class="bg-white rounded-lg w-full h-full p-5 flex flex-col items-center justify-center">
        <div class="text-indigo-500 flex flex-col items-center justify-center my-5">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.1145 68.0106C41.6611 69.7931 38.3389 69.7931 35.8855 68.0106L14.6317 52.5689C12.1783 50.7864 11.1517 47.6268 12.0889 44.7426L20.2071 19.7574C21.1442 16.8732 23.8319 14.9205 26.8645 14.9205L53.1355 14.9205C56.1681 14.9205 58.8558 16.8732 59.7929 19.7573L67.9112 44.7426C68.8483 47.6268 67.8217 50.7864 65.3683 52.5689L44.1145 68.0106Z"
              fill="#5E47D2"/>
            <path
              d="M43.5267 76.2016C41.4238 77.7295 38.5762 77.7295 36.4733 76.2016L6.66001 54.541C4.55709 53.0132 3.67714 50.3049 4.4804 47.8328L15.8681 12.7852C16.6713 10.3131 18.975 8.63932 21.5744 8.63932L58.4256 8.63933C61.025 8.63933 63.3287 10.3131 64.132 12.7852L75.5196 47.8328C76.3229 50.305 75.4429 53.0132 73.34 54.541L43.5267 76.2016Z"
              stroke="#5E47D2" stroke-width="2"/>
            <path
              d="M50.5 32.25L35.375 47.375L28.5 40.5" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
          </svg>
          <h1 class="uppercase text-2xl font-bold text-black">Codigo de verificacion</h1>
          <span class="text-black">
          Ingresa el codigo de verificacion que te enviamos a tu correo electronico.
        </span>
        </div>
        <CodeInput type="text" :fields="4" :loading="false" class="input" @complete="onComplete"/>
        <span class="mt-3 cursor-pointer underline italic" @click="onResend">No me llego el codigo de verificacion, reenviar.</span>
        <button
          type="button" class="bg-indigo-400 ring-2 ring-indigo-700 px-3 py-2 rounded-xl text-lg text-white my-3"
          @click.prevent="onSubmit">
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CodeInput from 'vue-verification-code-input';

export default {
  name: "VerifyView",
  components: {
    CodeInput
  },
  middleware({store, redirect}) {
    if (store.state.auth.user.verified === 1) {
      redirect("/dashboard");
    }
  },
  data: () => ({
    code: '',
    isLoading: false
  }),
  async beforeCreate() {
    await this.$axios.post('api/auth/send-code', {
      email: this.$auth.user.email
    });
  },
  methods: {
    onComplete(value) {
      this.code = value;
    },
    async onSubmit() {
      this.isLoading = true;
      await this.$axios.post('api/auth/verify-code', {
        email: this.$auth.user.email,
        code: this.code
      });
      await this.$axios.post('api/auth/user').then(response => {
        this.$auth.setUser(response.data.user);
      });
      await this.$router.push('/dashboard').then(() => {
        this.isLoading = false;
      });
    },
    async onResend() {
      await this.$axios.post('api/auth/send-code', {
        email: this.$auth.user.email
      });
    }
  }
}
</script>

<style scoped>

</style>
