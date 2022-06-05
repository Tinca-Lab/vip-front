<template>
  <div
    class="bg-indigo-50 shadow-sm rounded-lg my-5 p-5 text-karla text-2xl cursor-pointer"
  >
    {{ service.name }}
    <span
      v-for="(date, i) in dates"
      :key="i"
      class="block bg-green-200 p-2 my-1 rounded-lg uppercase text-sm"
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
      return this.service.date.map((item) => {
        return moment(item.date).format("MMMM D YYYY, h:mm:ss a");
      });
    },
  },
};
</script>

<style scoped></style>
