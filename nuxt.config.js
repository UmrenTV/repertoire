import firebaseConfig from "./firebaseConfig.js";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "repertoire",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      //{ rel: "stylesheet", type: "text/scss", href: "./assets/style/main.scss" }
    ]
  },
  ssr: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/style/main.scss", "~/assets/style/utilities.scss"],
  // css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/route"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      "@nuxtjs/firebase",
      {
        config: firebaseConfig,
        services: {
          auth: true,
          database: true
        }
      }
    ]
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
