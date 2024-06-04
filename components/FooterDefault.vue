<template>
  <div>
    <div class="container">
      <AppDownloadBanner v-if="showApplicationBanner"/>
    </div>

    <footer class="c-footer">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-12 col-lg-8 c-footer__section">
            <link-base class="c-footer__logo" :to="{ name: 'home' }">
              <img src="/assets/images/logo.png"/>
            </link-base>
            <p class="c-footer__section__text">
              برای حرکت به سوی اهداف و ماموریتمان، سه ارزش ساده را دنبال می
              کنیم: برای جامعه مفید باشیم، مشتری مدار باشیم، قهرمان باشیم.
            </p>

            <div class="c-footer__section__social-container">
              <link-base
                v-for="(item, index) in socials"
                :key="index"
                class="c-footer__section__social-container__item"
                :href="item.link"
                :class="item.icon"
              >
              </link-base>
            </div>
          </div>
          <div class="col-6 col-lg-2 c-footer__section">
            <span class="c-footer__section__header">درباره صرافی اِتراِکس</span>
            <div
              v-for="(link, index) in aboutLinks"
              :key="index"
              class="c-footer__section__linkItem"
            >
              <link-base :to="{ path: link.link }">
                <span class="c-footer__section__linkItem__text">
                  {{ link.label }}
                </span>
              </link-base>
            </div>
          </div>
          <div class="col-6 col-lg-2 c-footer__section">
            <span class="c-footer__section__header">راهنما و پشتیبانی</span>
            <div
              v-for="(link, index) in guidLinks"
              :key="index"
              class="c-footer__section__linkItem"
            >
              <link-base :to="{ path: link.link }">
                <span class="c-footer__section__linkItem__text">
                  {{ link.label }}
                </span>
              </link-base>
            </div>
          </div>
        </div>
      </div>
      <div class="c-footer__copyright">
        <p>تمامی حقوق این سایت محفوظ و متعلق به اِتراِکس می باشد</p>
      </div>
    </footer>
  </div>
</template>

<script>
import AppDownloadBanner from './AppDownloadBanner.vue'

export default {
  name: 'FooterDefault',
  components: {
    AppDownloadBanner,
  },
  props: {
    isShowApplicationBanner: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      navExpanded: false,
      aboutLinks: [
        {label: 'درباره ما', link: '/aboutus'},
        {label: 'تماس با ما', link: '/contact-us'},
        {label: 'امنیت مجموعه', link: '/page/security'},
        {label: 'قوانین و مقررات', link: '/page/rules'},
      ],

      guidLinks: [
        {label: 'سوالات متداول', link: '/faq'},
        {label: 'کارمزدها', link: '/page/fee'},
        {label: 'احراز هویت', link: '/page/authentication'},
        {label: 'راهنمای امنیت حساب', link: '/page/account-security'},
      ],

      socials: [
        {
          label: 'تلگرام',
          link: 'https://t.me/Eterex',
          icon: 'telegram-icon',
        },
        {
          label: 'اینستاگرام',
          link: 'https://instagram.com/eterexchange?utm_medium=copy_link',
          icon: 'instagram-icon',
        },
        {
          label: 'توییتر',
          link: 'https://twitter.com/eterexchange',
          icon: 'twitter-icon',
        },
      ],
    }
  },

  computed: {
    showApplicationBanner() {
      if (this.$route.name === 'application') {
        return false;
      }
      return this.isShowApplicationBanner;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.c-footer {
  background: #f2f7ff;

  * {
    z-index: 1;
  }

  .row {
    padding: 24px 16px 40px 16px;

    @include respond(lg) {
      padding: 60px var(--side--padding) 60px var(--side--padding);
    }
  }

  &__section {
    text-align: right;

    &__social-container {
      display: flex;
      margin-bottom: 16px;
      margin-top: 16px;

      &__item {
        width: 30px;
        height: 30px;
        margin-left: 16px;
      }
    }

    h3 {
      margin-top: 0;
    }

    &:first-of-type {
      @include respond(lg) {
        padding-left: 56px !important;
      }
    }

    &__text {
      color: #000000;
      font-size: 14px;
      font-weight: 400;
      @include respond(lg) {
        font-size: 16px;
      }
    }

    &__header {
      color: #0934f3;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 16px;
      @include respond(lg) {
        font-size: 18px;
      }
    }

    &__linkItem {
      margin-bottom: 20px;

      &__text {
        color: #000000;
        font-weight: 500;
        font-size: 14px;
        @include respond(lg) {
          font-size: 16px;
        }

        &:hover {
          color: #0934f3;
        }
      }
    }
  }

  &__logo {
    width: 150px;
    height: 70px;
    margin-bottom: 16px;
    // display: none !important;

    // @include respond(lg) {
    //   display: inline-flex !important;
    // }
  }

  &__copyright {
    background: #0934f3;
    border-radius: 32px 32px 0px 0px;

    p {
      color: #ffffff;
      text-align: center;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      margin: 0;
      padding: 20px;
    }
  }
}
</style>
