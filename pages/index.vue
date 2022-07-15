<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold tracking-widest">Sitio en construccion</h1>
    <div class="my-5">
      <client-only>
        <clip-loader :loading="true" color="black" size="100px"></clip-loader>
      </client-only>
    </div>
  </div>
</template>

<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

export default {
  name: "IndexPage",
  auth: false,
  components: {
    ClipLoader,
  },
  middleware({ redirect }) {
    return redirect("/dashboard");
  },
};
</script>
