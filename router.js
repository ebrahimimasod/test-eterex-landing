import Vue from 'vue'
import Router from 'vue-router'
import {interopDefault} from './.nuxt/utils'

const index = () => interopDefault(import('./pages/Index.vue' /* webpackChunkName: "pages/index" */))
const AboutUs = () => interopDefault(import('./pages/AboutUs.vue' /* webpackChunkName: "pages/AboutUs" */))
const Blog = () => interopDefault(import('./pages/blog/Index.vue' /* webpackChunkName: "pages/blog/Blog" */))
const blogCategory = () => interopDefault(import('./pages/blog/Category.vue' /* webpackChunkName: "pages/blog/category" */))
const blogPost = () => interopDefault(import('./pages/blog/BlogPost.vue' /* webpackChunkName: "pages/blog/blogPost" */))
const Markets = () => interopDefault(import('./pages/Markets.vue' /* webpackChunkName: "pages/Markets" */))
const Coin = () => interopDefault(import('./pages/Coin.vue' /* webpackChunkName: "pages/Coin" */))
const PublicPage = () => interopDefault(import('./pages/PublicPage.vue' /* webpackChunkName: "pages/PublicPage" */))
const Faq = () => interopDefault(import('./pages/Faq.vue' /* webpackChunkName: "pages/Faq" */))
const ContactUs = () => interopDefault(import('./pages/ContactUs.vue' /* webpackChunkName: "pages/ContactUs" */))
const CampaignNewVersion = () => interopDefault(import('./pages/campaign/new-version/index.vue' /* webpackChunkName: "pages/CampaignNewVersion" */))
const CampaignNewVersion1 = () => interopDefault(import('./pages/campaign/new-version1/index.vue' /* webpackChunkName: "pages/CampaignNewVersion" */))
const CampaignNewVersionPush = () => interopDefault(import('./pages/campaign/new-version-push/index.vue' /* webpackChunkName: "pages/CampaignNewVersion" */))
const CampaignNewVersionPush2 = () => interopDefault(import('./pages/campaign/new-version-push2/index.vue' /* webpackChunkName: "pages/CampaignNewVersion" */))
const CampaignNewVersionPush3 = () => interopDefault(import('./pages/campaign/new-version-push3/index.vue' /* webpackChunkName: "pages/CampaignNewVersion" */))
const CampaignNewVersionPush4 = () => interopDefault(import('./pages/campaign/new-version-push4/index.vue' /* webpackChunkName: "pages/CampaignNewVersion" */))
const ApplicationPage = () => interopDefault(import('./pages/application/index.vue' /* webpackChunkName: "pages/application" */))
const PerfectMoneyCampaign = () => interopDefault(import('./pages/campaign/perfect-money/index.vue' /* webpackChunkName: "pages/application" */))
const signEnterMobile = () => interopDefault(import('./pages/campaign/sign-enter-mobile/index.vue' /* webpackChunkName: "pages/application" */))

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  props: true,
  scrollBehavior(to, from, savedPosition) {
    if (from.name === 'blog' && to.name === 'blog') {
      if (to.hash === '#app-download') {
        const appDownloadElement = document.getElementById("app-download");
        return {x: 0, y: Number(appDownloadElement.offsetTop) + 100}
      }
      return savedPosition
    } else if (to.hash === '#app-download') {
      const appDownloadElement = document.getElementById("app-download");
      return {x: 0, y: Number(appDownloadElement.offsetTop) + 100}
    } else {
      console.log('reset');
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: index,
      meta: {
        title: 'خانه',
        metaTags: [
          {
            name: 'description',
            content: 'The home page of our example app.'
          }
        ]
      },
    },
    {
      path: '/latest-version',
      name: 'new-version',
      component: CampaignNewVersion,
      meta: {
        layout: 'empty',
        title: 'نسخه جدید',
      },
    },
    {
      path: '/new-version1',
      name: 'new-version1',
      component: CampaignNewVersion1,
      meta: {
        layout: 'empty',
        title: 'نسخه جدید',
      },
    },
    {
      path: '/new-version-push',
      name: 'new-version-push',
      component: CampaignNewVersionPush,
      meta: {
        layout: 'empty',
        title: 'نسخه جدید',
      },
    },
    {
      path: '/new-version-push2',
      name: 'new-version-push2',
      component: CampaignNewVersionPush2,
      meta: {
        layout: 'empty',
        title: 'نسخه جدید',
      },
    },
    {
      path: '/new-version-push3',
      name: 'new-version-push3',
      component: CampaignNewVersionPush3,
      meta: {
        layout: 'empty',
        title: 'نسخه جدید',
      },
    },
    {
      path: '/new-version-push4',
      name: 'new-version-push4',
      component: CampaignNewVersionPush4,
      meta: {
        layout: 'empty',
        title: 'نسخه جدید',
      },
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs,
      meta: {title: 'درباره ما'},
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog,
      meta: {title: 'بلاگ'},
    },
    {
      path: '/blog/category/:slug',
      name: 'blog-category',
      component: blogCategory,
      meta: {title: 'بلاگ'},
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: blogPost,
      meta: {title: 'بلاگ'},
    },
    {
      path: '/markets',
      name: 'markets',
      component: Markets,
      meta: {title: 'بازارها'},
    },
    {
      path: '/coin/:symbol',
      name: 'coin',
      component: Coin,
      meta: {title: 'ارز'},
    },
    {
      path: '/page/:slug',
      name: 'page',
      component: PublicPage,
      meta: {title: 'صفحه'},
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq,
      meta: {title: 'سوالات متداول'},
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: ContactUs,
      meta: {title: 'تماس با ما'},
    },
    {
      path: '/application',
      name: 'application',
      component: ApplicationPage,
      meta: {title: 'اپلیکیشن اتراکس'},
    },
    {
      path: '/perfect-money-campaign',
      name: 'perfect-money-campaign',
      component: PerfectMoneyCampaign,
      meta: {title: 'خرید و فروش سریع پرفکت مانی'},
    },
    {
      path: '/sign-enter-mobile',
      name: 'sign-enter-mobile',
      component: signEnterMobile,
      meta: {title: 'اتراکس'},
    },

  ],
})

export function createRouter() {
  return router
}
