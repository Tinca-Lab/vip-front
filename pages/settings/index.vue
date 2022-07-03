<template>
  <div>Settings</div>
</template>

<script>
export default {
  name: "SettingsView",
  layout: "SlimLayout",
  middleware({store, redirect}) {
    if (store.state.auth.user.role === 1) {
      redirect("/admin/dashboard");
    }
    if (store.state.auth.user.verified === false) {
      redirect("/not-verified");
    }
  },
};
</script>

<style scoped></style>
