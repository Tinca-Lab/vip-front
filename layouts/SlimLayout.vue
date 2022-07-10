<template>
  <div class="default">
    <div class="flex flex-col h-screen wrap relative">
      <header>
        <NavbarComponent class="pt-10" />
      </header>
      <main class="flex-grow bg-white lg:pt-32 relative">
        <Nuxt class="relative" />
      </main>
      <footer>
        <FooterComponent class="z-40" />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlimLayout",
};
</script>

<style scoped></style>
