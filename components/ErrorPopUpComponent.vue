<template>
  <div class="modal h-screen w-screen fixed top-0 z-50 flex items-center px-14">
    <div class="bg-white w-auto h-auto rounded-lg shadow-lg p-5">
      <div class="flex justify-between">
        <h3 class="tracking-widest font-semibold">Error</h3>
        <button type="button" @click="onClose">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
            />
          </svg>
        </button>
      </div>
      <div class="modal-content text-lg my-3">
        <p>
          {{ hasErrorComputed }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPopUpComponent",
  props: {
    hasError: {
      type: String,
      default: "",
    },
  },
  computed: {
    hasErrorComputed() {
      if (this.hasError.includes("Unauthorized")) {
        return "Usuario o contraseña incorrectos";
      }
      if (this.hasError.includes("The email has already been taken.")) {
        return "El correo electrónico ya está en uso.";
      }
      if (this.hasError.includes("The password confirmation does not match.")) {
        return "La contraseña no coinciden.";
      } else {
        return "Error desconocido";
      }
    },
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}
</style>
