<template>
  <div class="container">
    <section class="c-info-banner">
      <div class="c-info-banner__inner">
        <div class="c-info-banner__inner__info">
          <span class="c-info-banner__inner__info__title"  style="display:block">همه جا با اِتر اِکس</span>

          <p class="c-info-banner__inner__info__text">
            پلتفرم معاملاتی اِتراِکس این امکان را فراهم کرده است که در همه جای
            دنیا، به راحتی و فقط با دسترسی به اینترنت از تمام خدمات آن بهره‌مند
            شوید و لذت انجام معاملات رمزارز‌ها را تجربه کنید
          </p>

          <div class="c-info-banner__inner__info__buttons">
            <link-base
              class="c-info-banner__inner__info__buttons__link android"
              href="https://play.google.com/store/apps/details?id=com.eterex"
              target="_blank"
            >
              دانلود اپلیکیشن اندروید
            </link-base>
            <!-- <link-base class="c-info-banner__inner__info__buttons__link android" href="#">
              دانلود اپلیکیشن iOs
            </link-base> -->
            <link-base
              class="c-info-banner__inner__info__buttons__link"
              :href="panelUrl + '/sign-in'"
            >
              ورود به پنل کاربری
            </link-base>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AppUseBanner',
  data() {
    return {
      panelUrl: 'https://panel.eterex.com',
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.c-info-banner {
  @include respond(lg) {
    margin-top: 64px;
    margin-bottom: 56px;
  }

  &__inner {
    background: url('/assets/images/info-banner.png');
    background-size: cover;
    border-radius: 24px;
    padding: 24px;

    @include respond(xl) {
      display: flex;
    }

    &__info {
      @include respond(lg) {
        padding-right: 24px;
        padding-left: 24px;
      }

      &__title {
        font-weight: 900;
        font-size: 36px;
        line-height: 56px;
        text-align: center;
        color: #12377b;
        margin: 0;
        text-align: right;
        margin-bottom: 8px;
      }

      &__text {
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        text-align: right;
        color: #000000;
        opacity: 0.72;
        margin-bottom: 16px;
      }

      &__buttons {
        @include respond(lg) {
          display: flex;
          margin-top: 32px;
        }

        &__link {
          background: #ffffff;
          border-radius: 12px;
          color: #0934f3;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          padding: 12px 24px;
          text-align: center;
          width: 100%;
          display: block;
          margin-bottom: 8px;
          margin-left: 16px;

          @include respond(lg) {
            width: fit-content;
          }
        }

        .android {
          color: #ffffff;
          background: #0934f3;
        }
      }
    }
  }
}
</style>
