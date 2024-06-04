<template>
  <section class="c-app-use-banner">
    <div class="c-app-use-banner__inner">
      <ImgProvider
        src="telephone-communication-call-man.png"
        alt="اِتراِکس، تجربه جذاب خرید و فروش لحظه ای رمزارزها"
        width="404px"
        height="440px"
        class="c-app-use-banner__inner__image"
      />

      <div class="c-app-use-banner__inner__info">
        <span style="display:block" class="c-app-use-banner__inner__info__title font-dana-bold">
          همه جا با اِتر اِکس
        </span>

        <p class="c-app-use-banner__inner__info__text">
          پلتفرم معاملاتی اِتراِکس این امکان را فراهم کرده است که در همه جای
          دنیا، به راحتی و فقط با دسترسی به اینترنت از تمام خدمات آن بهره‌مند
          شوید و لذت انجام معاملات رمزارز‌ها را تجربه کنید
        </p>

        <div class="c-app-use-banner__inner__info__buttons">
          <link-base
            class="c-app-use-banner__inner__info__buttons__link android"
            href="https://play.google.com/store/apps/details?id=com.eterex"
            target="_blank"
          >
            دانلود اپلیکیشن اندروید
          </link-base>

          <link-base
            class="c-app-use-banner__inner__info__buttons__link"
            :href="panelUrl + '/sign-in'"
          >
            ورود به پنل کاربری
          </link-base>
        </div>
      </div>
    </div>
  </section>
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

.c-app-use-banner {
  @include respond(lg) {
    margin-top: 64px;
    margin-bottom: 164px;
  }

  &__inner {
    background: rgba(255, 179, 0, 0.1);
    border-radius: 48px;
    padding: 24px;

    @include respond(xl) {
      display: flex;
      height: 308px;
    }

    &__image {
      display: none;

      @include respond(lg) {
        display: block;
      }

      position: absolute;
      width: 404px;
      height: 440px;
      margin-top: -60px;
    }

    &__info {
      @include respond(lg) {
        padding-right: 420px;
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
        display: grid;
        gap: 5px;

        @include respond(md) {
          grid-template-columns: repeat(2, 1fr);
          margin-top: 32px;
        }

        @include respond(lg) {
          grid-template-columns: repeat(2, 1fr);
          margin-top: 32px;
        }

        @include respond(xl) {
          grid-template-columns: repeat(3, 1fr);
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
          margin-bottom: 8px;
          margin-left: 16px;
          display: flex;
          align-items: center;
          justify-content: center;

          @include respond(lg) {
            width: 200px;
          }
        }

        .android {
          color: #ffffff;
          background: #0934f3;
        }

        .ios {
          color: #ffffff;
          background: #0934f3;
        }
      }
    }
  }
}
</style>
