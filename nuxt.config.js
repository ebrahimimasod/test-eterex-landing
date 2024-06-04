require('dotenv').config()
export default {

  target: 'server',

  ssr: true,



  server: {
    // host: "0.0.0.0",
    port: 3000, // default: 3000
  },

  // build: {
  //   analyze: {
  //     analyzerMode: 'static'
  //   }
  // },

  head: {
    htmlAttrs: {
      lang: 'fa-IR',
      dir: 'rtl',
    },
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: {
    color: 'blue',
    height: '6px',
  },

  css: ['~/assets/index.scss'],

  plugins: [
    { src: '~/plugins/pagination.js', ssr: false },
    { src: '~/plugins/toast.js', ssr: false },
    "~/plugins/errors.js",
  ],

  components: [{ path: '~/components/base', extensions: ['vue'] }],

  buildModules: [
    '@nuxtjs/router',
    'vue-ssr-carousel/nuxt',
    [
      '@nuxtjs/dotenv',
      {
        filename:
          process.env.NODE_ENV === 'development'
            ? '.env.development'
            : '.env.production',
      },
    ],
  ],

  modules: [ '@deepsource/nuxt-websocket',],

  serverMiddleware: ['~/server-middleware/sitemap-generator.js'],

  // pwa: {
  //   manifest: {
  //     lang: 'fa',
  //     name: 'صرافی انلاین اتراکس',
  //     short_name: 'صرافی انلاین اتراکس',
  //     description: 'پشتیبانی 24 ساعته و برگزاری جلسات مشاوره، بخشی از خدماتی است که صرافی اتراکس برای تمام مشتریانش فراهم کرده است',
  //   },
  // },

  build: {
    postcss: false,
    extractCSS: {
      splitChunks: true,
    },
  },

  websocket: {
    url: 'wss://stream.eterex.com',
    reconnectInterval: 1000
  }
}
