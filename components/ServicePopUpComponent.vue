<template>
  <div
    class="bg-white bg-opacity-50 backdrop-blur rounded-xl my-5 p-5 text-2xl cursor-pointer w-full"
  >
    {{ service.name }}
    <span
      v-for="(date, i) in dates"
      :key="i"
      class="block bg-blue-200 hover:bg-blue-400 hover:text-white font-semibold ease-out duration-200 p-2 my-1 rounded-lg uppercase text-sm"
    >
      {{ date }}
    </span>
  </div>
</template>

<script>
import moment from "moment";

moment.locale("es");

export default {
  name: "ServicePopUpComponent",
  props: {
    isClick: {
      type: Boolean,
      default: false,
    },
    service: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dates() {
      return this.service.available.map((item) => {
        return moment(item.date).format("MMMM D YYYY, h:mm:ss a");
      });
    },
  },
};
</script>

<style scoped></style>
