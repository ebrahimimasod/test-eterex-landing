<template>
  <section class="c-how-to-use-banner">
    <div class="container">
      <div class="row c-how-to-use-banner__row">
        <div class="col-12 col-lg-6 col-xl-6">
          <div class="c-how-to-use-banner__info-box">
            <h4 class="c-how-to-use-banner__info-box__title font-dana-bold">
              روشهای استفاده از امکانات پلتفرم معاملاتی اِتراِکس ساده است!
            </h4>
            <p class="c-how-to-use-banner__info-box__text">
              شما به راحتی و با چند کلیک می‌توانید در صرافی اِتراِکس ثبت نام و
              از پنل حرفهای معاملاتی آن برای خرید و فروش رمزارز‌ها استفاده کنید
            </p>

            <div class="row c-how-to-use-banner__info-box__item">
              <div class="col-0 col-md-3">
                <div
                  class="c-how-to-use-banner__info-box__item__icon-container"
                >
                  <div class="transaction_icon icon"></div>
                </div>
              </div>
              <div class="col-12 col-md-9">
                <h5
                  class="c-how-to-use-banner__info-box__item__title font-dana-bold"
                >
                  دسترسی آسان به رمزارز‌ها
                </h5>
                <p class="c-how-to-use-banner__info-box__item__text">
                  می‌توانید از روشهای مختلف مانند موبایل، تبلت و دسکتاپ به
                  امکانات پلتفرم معاملاتی اِتراِکس دسترسی داشته باشید
                </p>
              </div>
            </div>

            <div class="row c-how-to-use-banner__info-box__item">
              <div class="col-0 col-md-3">
                <div
                  class="c-how-to-use-banner__info-box__item__icon-container"
                >
                  <div class="candleStick_icon icon"></div>
                </div>
              </div>
              <div class="col-12 col-md-9">
                <h5
                  class="c-how-to-use-banner__info-box__item__title font-dana-bold"
                >
                  مدیریت آسان دارایی
                </h5>
                <p class="c-how-to-use-banner__info-box__item__text">
                  امکان نگهداری همزمان ریالی و رمزارزی داراییها در پلتفرم
                  معاملاتی اِتراِکس وجود دارد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HowToUseBanner',
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.c-how-to-use-banner {
  text-align: right;
  margin-top: 34px;

  @include respond(md) {
    text-align: right;
  }

  @include respond(lg) {
    text-align: right;
    padding: 0 0 60px;
    background-position: right !important;
    background-repeat: no-repeat !important;
    background-image: url('/assets/images/device.png');
    background-size: 50%;
  }

  @include respond(xl) {
    text-align: right;
    padding: 0 0 60px;
    background-position: right !important;
    background-image: url('/assets/images/device.png');
    background-repeat: no-repeat !important;
    background-size: inherit;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__info-box {
    background: #f2f7ff;
    border-radius: 25px;
    padding: 32px;

    &__item {
      margin-bottom: 16px;

      &__icon-container {
        display: none;

        @include respond(md) {
          display: block;
        }

        background: #ffffff;
        border-radius: 22px;
        text-align: center;

        width: 72px;
        height: 72px;
        padding: 0px;

        @include respond(xl) {
          width: 108px;
          height: 108px;
          padding: 24px;
        }

        .icon {
          margin: auto;
        }
      }

      &__title {
        color: #12377b;
        font-weight: 600;
        font-size: 20px;
        line-height: 31px;
        text-align: right;
        letter-spacing: 0.02em;
        margin: 0;
      }

      &__text {
        color: #636366;
        font-weight: 400;
        font-size: 14px;
        line-height: 23px;
        text-align: right;
      }
    }

    &__title {
      color: #12377b;
      text-align: right;
      letter-spacing: 0.02em;
      font-weight: 600;
      font-size: 28px;
      line-height: 40px;
      margin: 0;
    }

    &__text {
      color: #48484a;
      font-weight: 400;
      font-size: 14px;
      line-height: 23px;
      display: flex;
      align-items: center;
      text-align: right;
      margin-bottom: 32px;
    }
  }
}
</style>
