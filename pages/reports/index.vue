<template>
  <div>Reports</div>
</template>

<script>
export default {
  name: "ReportsView",
  layout: "SlimLayout",
  middleware({ store, redirect }) {
    if (store.state.auth.user.role === 1) {
      redirect("/admin/dashboard");
    }
  },
};
</script>

<style scoped></style>
