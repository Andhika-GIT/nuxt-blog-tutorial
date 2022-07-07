import axios from "axios";

const bodyParser = require("body-parser"); // import body-parser node js middleware
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  mode: "universal",
  head: {
    title: "project-2",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,700;1,800&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/styles/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // import plugin from plugins folder (this is still not working)
    // "@/plugins/core-components.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/composition-api/module"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    // set the default url, if there's none, then use the firebase url as a default
    baseUrl:
      process.env.BASE_URL ||
      "https://nuxt-blog-755f4-default-rtdb.asia-southeast1.firebasedatabase.app",
    // check project setting, look for web api key in firebase console
    fbAPIKey: "AIzaSyA3OTjnZXAcbYxyDfbnHxbh8kX-hOydPaA",
  },

  transition: {
    // transition between page,
    name: "fade",
    mode: "out-in",
    // make global css file in assets, then use class name 'fade'
  },
  serverMiddleware: [
    // to executed node-js / server middleware
    bodyParser.json(), // parse incoming json body and send it into api/index as a req.body.data
    "~api", // folder location for the middleware we wanna add (in this is the api folder)
  ],
  generate: {
    // this will create dynamic routes for id post, because dynamic id is not working as default in static app
    routes: function () {
      // run axios to retrieve the posts data
      return axios
        .get(
          "https://nuxt-blog-755f4-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"
        )
        .then((res) => {
          const routes = [];
          for (const key in res.data) {
            // insert the dynamic data into posts folder inside dist directory (dist/posts/)
            routes.push(`/posts/${key}`);
          }
          // run npm run generate to insert posts data into posts folder inside dist directory
          return routes;
        });
    },
  },
};
