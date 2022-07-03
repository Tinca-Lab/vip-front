<template>
  <div>
    <LoadingComponent v-if="isLoading" />
    <div v-else class="background h-screen relative">
      <Transition name="fade">
        <h1 v-if="isViewing" class="text-white text-center text-3xl pt-12">
          Centro de Servicios Integrales V.I.P
        </h1>
      </Transition>
      <div class="h-auto">
        <div
          class="pop-up bg-white w-full p-5 fixed bottom-0 flex flex-col items-center"
        >
          <div
            class="h-2 w-20 bg-white rounded mx-auto absolute -top-5"
            @click="toggleView"
          />
          <div class="flex flex-col self-start">
            <h1 class="text-3xl font-semibold tracking-widest">
              Iniciar sesión
            </h1>
            <span v-if="!isViewing" class="text-karla text-gray-400"
              >Ingresa en tu cuenta</span
            >
          </div>
          <div v-if="!isViewing">
            <form class="relative my-12" @submit.prevent="onSubmit">
              <div class="my-3">
                <label
                  class="text-gray-400 text-karla font uppercase tracking-wide"
                  for="email"
                  >Correo electronico</label
                >
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  class="bg-gray-100 w-full px-2 py-3 focus:outline-none text-karla"
                  placeholder="johndoe@domain.com"
                  autocomplete="on"
                  autofocus
                  required=""
                />
              </div>
              <div class="my-3">
                <label
                  class="text-gray-400 text-karla font uppercase tracking-wide"
                  for="email"
                  >Contraseña</label
                >
                <div class="relative">
                  <input
                    v-if="!isShowing"
                    id="password"
                    v-model="password"
                    type="password"
                    class="bg-gray-100 w-full px-2 py-3 focus:outline-none text-karla"
                    placeholder="********"
                    autocomplete="on"
                    autofocus
                    required
                  />
                  <input
                    v-else
                    id="password"
                    v-model="password"
                    type="text"
                    class="bg-gray-100 w-full px-2 py-3 focus:outline-none text-karla"
                    placeholder="********"
                    autocomplete="on"
                    autofocus
                    required
                  />
                  <span
                    class="absolute top-2.5 right-0 mr-5"
                    @click="isShowing = !isShowing"
                  >
                    <template v-if="isShowing">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.882 19.297C16.1232 20.4126 14.0828 21.0033 12 21C6.60803 21 2.12203 17.12 1.18103 12C1.61106 9.67072 2.78266 7.5429 4.52103 5.93401L1.39203 2.80801L2.80703 1.39301L22.606 21.193L21.191 22.607L17.881 19.297H17.882ZM5.93503 7.35001C4.57604 8.5856 3.62935 10.2088 3.22303 12C3.53532 13.3665 4.16229 14.6411 5.05403 15.7226C5.94577 16.804 7.07766 17.6624 8.35958 18.2293C9.64151 18.7962 11.0381 19.0561 12.4381 18.9881C13.8382 18.9202 15.203 18.5264 16.424 17.838L14.396 15.81C13.5327 16.3538 12.5102 16.5881 11.4963 16.4744C10.4823 16.3608 9.53707 15.9059 8.8156 15.1844C8.09413 14.463 7.63926 13.5177 7.52559 12.5038C7.41193 11.4898 7.64621 10.4673 8.19003 9.60401L5.93503 7.35001ZM12.914 14.328L9.67203 11.086C9.49409 11.5389 9.45222 12.034 9.55154 12.5104C9.65085 12.9867 9.88705 13.4238 10.2311 13.7679C10.5752 14.112 11.0123 14.3482 11.4887 14.4475C11.9651 14.5468 12.4601 14.5049 12.913 14.327L12.914 14.328ZM20.807 16.592L19.376 15.162C20.0445 14.2093 20.5204 13.1352 20.777 12C20.5053 10.8097 19.9943 9.68715 19.2752 8.7005C18.5561 7.71385 17.6438 6.88373 16.5939 6.26061C15.544 5.63749 14.3783 5.23437 13.1678 5.07577C11.9572 4.91717 10.727 5.00638 9.55203 5.33801L7.97403 3.76001C9.22103 3.27001 10.58 3.00001 12 3.00001C17.392 3.00001 21.878 6.88001 22.819 12C22.5126 13.6657 21.8239 15.2376 20.807 16.592ZM11.723 7.50801C12.3595 7.46867 12.9971 7.56507 13.5936 7.79082C14.19 8.01657 14.7316 8.36652 15.1826 8.81746C15.6335 9.2684 15.9835 9.81003 16.2092 10.4065C16.435 11.0029 16.5314 11.6405 16.492 12.277L11.722 7.50801H11.723Z"
                          fill="#1A1E1E"
                        />
                      </svg>
                    </template>
                    <template v-else>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 3C17.392 3 21.878 6.88 22.819 12C21.879 17.12 17.392 21 12 21C6.60803 21 2.12203 17.12 1.18103 12C2.12103 6.88 6.60803 3 12 3ZM12 19C14.0395 18.9996 16.0184 18.3068 17.6129 17.0352C19.2074 15.7635 20.3229 13.9883 20.777 12C20.3213 10.0133 19.205 8.24 17.6107 6.97003C16.0163 5.70005 14.0383 5.00853 12 5.00853C9.96173 5.00853 7.98372 5.70005 6.38941 6.97003C4.79509 8.24 3.6788 10.0133 3.22303 12C3.67713 13.9883 4.7927 15.7635 6.38717 17.0352C7.98164 18.3068 9.96056 18.9996 12 19ZM12 16.5C10.8066 16.5 9.66196 16.0259 8.81805 15.182C7.97414 14.3381 7.50003 13.1935 7.50003 12C7.50003 10.8065 7.97414 9.66193 8.81805 8.81802C9.66196 7.97411 10.8066 7.5 12 7.5C13.1935 7.5 14.3381 7.97411 15.182 8.81802C16.0259 9.66193 16.5 10.8065 16.5 12C16.5 13.1935 16.0259 14.3381 15.182 15.182C14.3381 16.0259 13.1935 16.5 12 16.5ZM12 14.5C12.6631 14.5 13.299 14.2366 13.7678 13.7678C14.2366 13.2989 14.5 12.663 14.5 12C14.5 11.337 14.2366 10.7011 13.7678 10.2322C13.299 9.76339 12.6631 9.5 12 9.5C11.337 9.5 10.7011 9.76339 10.2323 10.2322C9.76342 10.7011 9.50003 11.337 9.50003 12C9.50003 12.663 9.76342 13.2989 10.2323 13.7678C10.7011 14.2366 11.337 14.5 12 14.5Z"
                          fill="#1A1E1E"
                        />
                      </svg>
                    </template>
                  </span>
                </div>
              </div>
              <a
                class="text-karla font-semibold tracking-wide mt-5"
                href="/forgot-password"
                >Olvidaste tu contraseña?</a
              >
              <div class="w-full fixed left-0 flex justify-center">
                <a
                  href="/register"
                  class="text-center text-karla font-semibold mt-12"
                  >No tengo cuenta</a
                >
                <button
                  type="submit"
                  class="bg-green-400 py-4 fixed w-full bottom-0"
                >
                  <span
                    class="text-center text-white text-lg text-karla font-semibold"
                    >Enviar</span
                  >
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Transition name="bounce">
        <ErrorPopUpComponent
          v-if="hasError !== null"
          :has-error="hasError"
          @close="onClose"
        />
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    email: "",
    password: "",
    hasError: null,
    isShowing: false,
    isViewing: false,
    isLoading: false,
  }),
  methods: {
    toggleView() {
      this.isViewing = !this.isViewing;
      const popUp = document.querySelector(".pop-up");
      if (this.isViewing) {
        popUp.style.height = "auto";
      } else {
        popUp.style.height = "70%";
      }
    },
    onClose() {
      this.hasError = null;
    },
    async onSubmit() {
      this.isLoading = true;
      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        await this.$router.push("/dashboard").then(() =>{
          this.isLoading = false;
        });
      } catch (error) {
        this.isLoading = false;
        this.hasError = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped>
.pop-up {
  height: 70%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.4s;
}

.bounce-leave-active {
  animation: bounce-in 0.4s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
