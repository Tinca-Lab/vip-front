<template>
  <div class="bg-indigo-50 shadow-sm rounded-lg my-5 p-5 text-karla cursor-pointer">
    {{ service.name }}
  </div>
</template>

<script>
export default {
  name: "ServicePopUpComponent",
  props: {
    isClick: {
      type: Boolean,
      default: false
    },
    service: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
