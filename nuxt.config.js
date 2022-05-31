export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "vip",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    // https://google-fonts.nuxtjs.org/setup
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    families: {
      "Playfair+Display": true,
      Karla: true,
      Roboto: true,
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://auth.nuxtjs.org/guide/setup
    "@nuxtjs/auth-next",
  ],

  router: {
    middleware: ["auth"],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "http://localhost:8000",
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
        },
        user: {
          property: "user",
          autoFetch: true,
        },
        endpoints: {
          login: { url: "/api/auth/login", method: "post" },
          logout: { url: "/api/auth/logout", method: "post" },
          user: { url: "/api/auth/user", method: "post" },
        },
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "es",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
