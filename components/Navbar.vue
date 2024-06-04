<template>
  <div class="container">
    <div class="position-sticky z-index-sticky top-0 p-0 m-0">
      <nav class="c-navbar" :class="{ active: navExpanded }">
        <div @click="changeNavStatus">
          <IconHamburger class="hamburger-icon" />
        </div>

        <link-base class="c-navbar__logo" :to="{ name: 'home' }">
          <img title="صرافی ارزدیجیتال اتراکس" alt="صرافی ارزدیجیتال اتراکس" src="/assets/images/logo.png" />
        </link-base>

        <ul class="c-navbar__list" :class="{ active: navExpanded }">
          <li v-for="(route, index) in getActiveLinks" :key="index"
            :class="['c-navbar__list__item links', route?.payload?.class, isActive(route.name) && 'active']">
            <link-base v-if="route.type === 'internal'" :to="getRouterLink(route)">
              <span class="c-navbar__list__item__text">{{ route.txt }}</span>


              <IconProvider v-if="route.children" class="c-navbar__list__item__icon" width="12px" height="12px"
                :icon="route.isOpen ? 'arrow-up' : 'arrow-down'" @click.native.prevent="toggleExpandedSubMneu(index)" />

              <IconProvider v-if="route?.payload?.icon" class="c-navbar__list__item__icon" width="12px" height="12px"
                :icon="route?.payload?.icon" />
            </link-base>

            <link-base v-else :href="route.name">
              <span class="c-navbar__list__item__text">{{ route.txt }}</span>
            </link-base>

            <div v-if="route.children" :class="[
              'c-navbar__list__item__children',
              route.isOpen && 'isOpen',
            ]">
              <div v-for="(child, childIndex) in route.children" :key="childIndex">
                <link-base v-if="child.type === 'internal'" class="c-navbar__list__item__children__item" :to="child.name">
                  {{ child.txt }}
                </link-base>

                <link-base v-else class="c-navbar__list__item__children__item" :href="route.name">
                  <span>{{ route.txt }}</span>
                </link-base>
              </div>
            </div>
          </li>
        </ul>

        <li class="c-navbar__action" :class="{ active: navExpanded }">
          <link-base :href="panelUrl + '/sign-enter-mobile'">
            <span class="c-navbar__list__item__text signup">ثبت نام</span>
          </link-base>
          <link-base :href="panelUrl + '/sign-in'">
            <span class="c-navbar__list__item__text login">ورود</span>
          </link-base>
        </li>
      </nav>

      <div id="dark-backdrop-menu" class="dark-backdrop" :class="{ active: navExpanded }" @click="changeNavStatus"></div>
    </div>
  </div>
</template>

<script>
import IconHamburger from './icons/IconHamburger.vue'

export default {
  name: 'NavbarDefault',
  components: {
    IconHamburger,
  },

  data() {
    return {
      navExpanded: false,
      panelUrl: 'https://panel.eterex.com',

      routes: [
        {
          txt: 'خانه',
          name: 'home',
          icon: 'IconDashboard',
          type: 'internal',
          parent: 'home',
        },
        {
          txt: 'خرید رمزارز',
          name: 'https://panel.eterex.com/exchange/irt',
          icon: 'IconWallet',
          type: 'external',
          parent: 'Wallets',
        },
        {
          txt: 'بازارها',
          name: 'markets',
          icon: 'IconExchange',
          type: 'internal',
          parent: 'markets',
        },
        {
          txt: 'تبدیل رمزارز',
          name: 'https://panel.eterex.com/exchange',
          icon: 'IconTerms',
          type: 'external',
          parent: 'Coins',
        },
        {
          txt: 'ارتباط با ما',
          name: 'contact-us',
          icon: 'IconDashboard',
          type: 'internal',
          parent: 'index',
        },
        {
          txt: 'بلاگ',
          name: 'blog',
          icon: 'IconTerms',
          type: 'internal',
          parent: 'Coins',
        },
        {
          txt: 'دانلود اپلیکیشن',
          icon: 'IconTerms',
          type: 'internal',
          parent: 'Coins',
          name:'application',
          payload: {
            class: 'app-download-btn'
          }
        },
        // {
        //   txt: 'دانلود اپلیکیشن',
        //   icon: 'IconTerms',
        //   type: 'external',
        //   parent: 'Coins',
        //   children: [
        //   {
        //       txt:"دریافت از گوگل پلی",
        //       name: "https://play.google.com/store/apps/details?id=com.eterex",
        //       icon: 'IconTerms',
        //       type: 'external',
        //       parent: 'Coins',
        //     },
        // {
        //   txt:"دریافت از بازار",
        //   link:"http://cafebazaar.ir/app/?id=com.eterex&ref=share"
        // },
        // {
        //   name:"دریافت از مایکت",
        //   link:"https://myket.ir/app/com.eterex"
        // },
        // {
        //   name:"نسخه وب اپلیکیشن",
        //   link:"https://panel.eterex.com/"
        // },
        // {
        //   name:"دریافت از سیب اپ",
        //   link:"https://sibapp.com/applications/Eterex_cryptocurrencyexchange?from=search"
        // },
        // {
        //   name:"دریافت از سیبچه",
        //   link:"https://sibche.com/applications/eterax"
        // },
        // ],
        // },    
      ],

      blogRoutes: [
        {
          txt: 'خانه',
          name: 'blog',
          icon: 'IconDashboard',
          type: 'internal',
          parent: 'home',
        },
        {
          txt: 'آموزش',
          name: { name: 'blog-category', params: { slug: 'training' } },
          icon: 'IconDashboard',
          type: 'internal',
          parent: 'home',
          isOpen: false,
          children: [
            {
              txt: 'مفاهیم پایه',
              name: {
                name: 'blog-category',
                params: { slug: 'basic_concepts' },
              },
              icon: 'IconTerms',
              type: 'internal',
              parent: 'Coins',
            },
            {
              txt: 'بلاکچین',
              name: { name: 'blog-category', params: { slug: 'blockchain' } },
              icon: 'IconTerms',
              type: 'internal',
              parent: 'Coins',
            },
            {
              txt: 'کیف پول',
              name: { name: 'blog-category', params: { slug: 'wallet' } },
              icon: 'IconTerms',
              type: 'internal',
              parent: 'Coins',
            },
            {
              txt: 'وثیقه گذاری',
              name: { name: 'blog-category', params: { slug: 'staking' } },
              icon: 'IconTerms',
              type: 'internal',
              parent: 'Coins',
            },
            {
              txt: 'متاورس',
              name: { name: 'blog-category', params: { slug: 'metaverse' } },
              icon: 'IconTerms',
              type: 'internal',
              parent: 'Coins',
            },
            {
              txt: 'NFT',
              name: { name: 'blog-category', params: { slug: 'nft' } },
              icon: 'IconTerms',
              type: 'internal',
              parent: 'Coins',
            },
          ],
        },

        {
          txt: 'رمزارزها',
          name: { name: 'blog-category', params: { slug: 'cryptocurrencies' } },
          icon: 'IconDashboard',
          type: 'internal',
          parent: 'home',
          isOpen: false,
          children: [
            {
              txt: 'بیت کوین',
              name: { name: 'blog-category', params: { slug: 'bitcoin' } },
              icon: 'IconTerms',
              type: 'internal',
              parent: 'Coins',
            },
            {
              txt: 'آلت کوین',
              name: { name: 'blog-category', params: { slug: 'altcoins' } },
              icon: 'IconTerms',
              type: 'internal',
              parent: 'Coins',
            },
          ],
        },

        {
          txt: 'تحلیل',
          name: { name: 'blog-category', params: { slug: 'analysis' } },
          icon: 'IconDashboard',
          type: 'internal',
          parent: 'home',
          isOpen: false,
          children: [
            {
              txt: 'تکنیکال',
              name: {
                name: 'blog-category',
                params: { slug: 'technical-analysis' },
              },
              icon: 'IconTerms',
              type: 'internal',
              parent: 'Coins',
            },
            {
              txt: 'بنیادی',
              name: {
                name: 'blog-category',
                params: { slug: 'fundamental-analysis' },
              },
              icon: 'IconTerms',
              type: 'internal',
              parent: 'Coins',
            },
          ],
        },

        {
          txt: 'ماینینگ',
          name: { name: 'blog-category', params: { slug: 'mining' } },
          icon: 'IconDashboard',
          type: 'internal',
          parent: 'home',
          children: [
            {
              txt: 'ابزار های استخراج',
              name: { name: 'blog-category', params: { slug: 'miningtools' } },
              icon: 'IconTerms',
              type: 'internal',
              parent: 'Coins',
            },
            {
              txt: 'دانشنامه استخراج',
              name: { name: 'blog-category', params: { slug: 'encyclopedia' } },
              icon: 'IconTerms',
              type: 'internal',
              parent: 'Coins',
            },
          ],
        },
        {
          txt: 'اخبار',
          name: { name: 'blog-category', params: { slug: 'news' } },
          icon: 'IconTerms',
          type: 'internal',
          parent: 'Coins',
        },
        // {
        //   txt: 'محصولات',
        //   name: { name: 'blog-category', params: { slug: 'products' } },
        //   icon: 'IconTerms',
        //   type: 'internal',
        //   parent: 'Coins',
        // },
        {
          txt: 'ویدئو',
          name: { name: 'blog-category', params: { slug: 'video' } },
          icon: 'IconTerms',
          type: 'internal',
          parent: 'Coins',
        },
        {
          txt: 'دانلود اپلیکیشن',
          icon: 'IconTerms',
          type: 'internal',
          parent: 'Coins',
          name: 'application',
          payload: {
            class: 'app-download-btn'
          }
        },
      ],
    }
  },

  computed: {
    getActiveLinks() {
      if (this.$route.path.includes('blog')) {
        return this.blogRoutes
      }
      return this.routes
    },
  },

  watch: {
    $route(to, from) {
      this.navExpanded = false

    },
  },

  methods: {


    getRouterLink(route) {
      switch (typeof route.name) {
        case 'string':
          return { name: route.name };
        case 'object':
          return route.name;
      }
    },

    toggleExpandedSubMneu(index) {
      this.blogRoutes = this.blogRoutes.map((item, indexItem) => {
        return {
          ...item,
          isOpen: index === indexItem ? !item.isOpen : false,
        }
      })
    },
    isActive(page) {
      if (this.$route && this.$route.name) {
        return Boolean(this.$route.name === page)
      }
    },

    changeNavStatus() {
      if (window.innerWidth <= 992) {
        this.navExpanded = !this.navExpanded
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.dark-backdrop {
  display: none;
  height: 0%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(141, 141, 141, 0.7);
  height: 100%;
  width: 100%;
  object-fit: contain;
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  z-index: 10;

  &.active {
    display: block;
  }
}

.c-navbar {
  background-color: #fff;
  position: absolute;
  width: 100%;
  border-radius: 16px;
  padding: 16px;
  z-index: 11;
  height: 64px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

  &.active {
    height: fit-content;
  }

  backdrop-filter: saturate(100%) blur(10px);
  background-color: hsla(0, 0%, 100%, 0.88) !important;

  @include respond(lg) {
    padding: 24px;
    display: flex;
    height: 80px;
  }

  .hamburger-icon {
    float: right;
  }

  &__logo {
    @include respond(lg) {
      margin-left: 16px;
    }

    width: 75px;
    height: 32px;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__list {
    list-style: none;
    margin: 0;
    display: none;
    padding: 0;
    flex: 2;

    &.active {
      padding-top: 16px;
      display: block;
    }

    @include respond(lg) {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      flex: 1;
    }

    &__item {
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
      border-radius: 18px;
      margin-left: 4px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-weight: 300;

      @include respond(lg) {
        display: inline-block;
      }

      &__children {
        display: flex;
        height: 0;
        overflow: hidden;
        background-color: #f9f9f9;
        z-index: 1;
        border-radius: 8px;
        text-align: right;
        padding-right: 15px;

        &.isOpen {
          display: block;
          height: auto;
          width: 100%;
        }

        @include respond(lg) {
          padding: 0;
          display: none;
          position: absolute;
          right: 0;
          height: auto;
          min-width: max-content;
          padding: 5px;
        }

        &__item {
          color: black;
          text-decoration: none;
          display: block;
          text-align: right;
          font-weight: 300;

          &:hover {
            background-color: #f1f1f1;
          }
        }
      }

      .c-link {
        padding: 12px 16px;
        width: 100%;
        text-align: center;
        justify-content: flex-start;
      }

      @include respond(lg) {
        .c-link {
          padding: 4px 16px;
        }
      }

      @include respond(xl) {
        .c-link {
          padding: 4px 24px;
        }
      }

      &__text {
        color: #000000;
        font-weight: 400;
      }

      &__icon {
        position: absolute;
        left: 30px;
      }

      @include respond(lg) {
        &__icon {
          position: relative;
          left: -8px;
        }
      }

      &:hover {
        background: rgba(42, 106, 227, 0.1);
        cursor: pointer;
        color: #000000;

        .c-navbar__list__item__children {
          display: block;
        }
      }

      &.active {
        background: rgba(42, 106, 227, 0.1);
        color: #000000;
      }
    }
  }

  &__action {
    list-style: none;
    border-top: 1px solid #cccccc;
    padding-top: 16px;
    margin-top: 16px;
    display: none;
    max-width: 100%;

    &.active {
      display: flex;
    }

    @include respond(lg) {
      max-width: 25%;
      display: flex;
      justify-content: flex-end;
      flex: 1;
      border-top: none;
      margin-top: 0;
      padding-top: 0;
    }

    .c-link {
      width: 100%;

      @include respond(lg) {
        width: fit-content;
      }
    }

    .signup {
      background: #0934f3;
      border-radius: 14px;
      color: #ffffff;
      padding: 8px 24px;
      margin-left: 8px;
      width: 100%;

      @include respond(lg) {
        padding: 4px 24px;
      }
    }

    .login {
      padding: 8px 24px;
      color: #000000;
      width: 100%;

      @include respond(lg) {
        padding: 4px 24px;
      }
    }
  }
}

.app-download-btn {
  background-color: var(--color-24);
  border-radius: 50px;
  width:160px
}
</style>
