<template>
  <div class="z-50 px-5">
    <div
      class="bg-white p-5 w-full backdrop-blur backdrop-filter bg-opacity-50 rounded-xl transition-all ease-out duration-200"
    >
      <div
        class="flex items-center transition-all ease-out duration-200 my-3"
      >
        <label for="name" class="w-1/4 text-left">Nombres:</label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="w-full border-0 bg-white disabled:font-semibold disabled:text-blue-500 outline-none disabled:bg-transparent rounded-xl ml-2 transition-all ease-out duration-200"
        />
      </div>
      <div
        class="flex items-center transition-all ease-out duration-200 my-3"
      >
        <label for="name" class="w-1/4 text-left">Apellidos:</label>
        <input
          id="lastname"
          v-model="lastname"
          type="text"
          class="w-full border-0 bg-white disabled:font-semibold disabled:text-blue-500 outline-none disabled:bg-transparent rounded-xl ml-2 transition-all ease-out duration-200"
        />
      </div>
      <div
        class="flex items-center transition-all ease-out duration-200 my-3"
      >
        <label for="nit" class="w-1/4 text-left">Nit:</label>
        <input
          id="nit"
          v-model="nit"
          type="number"
          class="w-full border-0 bg-white disabled:font-semibold disabled:text-blue-500 outline-none disabled:bg-transparent rounded-xl ml-2 transition-all ease-out duration-200"
        />
      </div>
      <div
        class="flex items-center transition-all ease-out duration-200 my-3"
      >
        <label for="phone" class="w-1/4 text-left">Telefono:</label>
        <input
          id="phone"
          v-model="phone"
          type="number"
          class="w-full border-0 bg-white disabled:font-semibold disabled:text-blue-500 outline-none disabled:bg-transparent rounded-xl ml-2 transition-all ease-out duration-200"
        />
      </div>
    </div>
    <div class="w-full flex items-center justify-around">
      <button
        class="block mr-1 w-1/2 mt-5 mx-auto px-5 py-3 bg-blue-400 hover:bg-blue-500 rounded-xl ease-in-out duration-200 font-semibold text-white"
        type="button"
        @click="cancel"
      >
        Cancelar
      </button>
      <button
        class="w-1/2 ml-1 block mt-5 mx-auto px-5 py-3 bg-blue-400 hover:bg-blue-500 rounded-xl ease-in-out duration-200 font-semibold text-white"
        type="button"
        @click="onSubmit"
      >
        Guardar Cambios
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddBeneficiaryPopUp",
  data: () => ({
    name: "",
    lastname: "",
    phone: "",
    nit: "",
  }),
  methods: {
    async onSubmit() {
      try {
        await this.$axios.post('/api/beneficiary/customer', {
          name: this.name,
          lastname: this.lastname,
          phone: this.phone,
          nit: this.nit,
          person_id: this.$auth.user.id
        }).then(() => {
          const {beneficiaries} = this.$axios.get('/api/beneficiary/customer').then(() => {
            this.$store.commit('setBeneficiaries', beneficiaries);
          });
        });
      } catch (error) {
        this.$emit('error', error.response.data?.error)
      }
      this.$emit('close');
    },
    cancel() {
      this.$emit("cancel");
    }
  }
}
</script>

<style scoped>
</style>
