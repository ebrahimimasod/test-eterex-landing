<template>
  <section class="c-benefits-banner">
    <h2 class="c-features-banner__title font-dana-bold">
      چرا اِتر اِکس را انتخاب میکنید؟!
    </h2>

    <div class="row">
      <div class="col-12 col-lg-4 c-benefits-banner__item">
        <ImgProvider
          width="248px"
          height="auto"
          alt="پنجره خرید و فروش آنی رمزارز"
          src="multi-tasking-tasking-woman.png"
          lazy
        />

        <h3 class="c-benefits-banner__item__title font-dana-bold">
          رابط کاربری آسان و مدرن
        </h3>
        <p class="c-benefits-banner__item__text">
          (ثبت نام و احراز هویت سریع، آسان و خودکار)
        </p>
      </div>
      <div class="col-12 col-lg-4 c-benefits-banner__item">
        <ImgProvider
          width="248px"
          height="auto"
          alt="قابل دسترسی در همه نقاط جهان"
          src="paint-money-finance-man.png"
          lazy
        />

        <h3 class="c-benefits-banner__item__title font-dana-bold">
          قابل دسترسی در همه نقاط جهان
        </h3>
        <p class="c-benefits-banner__item__text">
          امکان معامله انواع رمزارز‌ها در هر کجا که به اینترنت متصل باشید
        </p>
      </div>
      <div class="col-12 col-lg-4 c-benefits-banner__item">
        <ImgProvider
          width="248px"
          height="auto"
          alt="پنجره خرید و فروش آنی رمزارز"
          src="calculator-calculation-man-math-accounting.png"
          lazy
        />
        <h3 class="c-benefits-banner__item__title font-dana-bold">
          دقیق و رقابتی
        </h3>
        <p class="c-benefits-banner__item__text">
          انجام معاملات به صورت لحظه‌ای و با کمترین کارمزد
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BenefitsBanner',
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.c-benefits-banner {
  &__title {
    color: #12377b;
    font-weight: 900;
    font-size: 40px;
    line-height: 56px;
    text-align: center;
  }

  // &__sub-title {
  //   font-weight: 400;
  //   font-size: 16px;
  //   line-height: 25px;
  //   text-align: center;
  //   color: #000000;
  //   opacity: 0.75;
  // }

  &__item {
    &__title {
      font-weight: 700;
      font-size: 24px;
      line-height: 37px;
      text-align: center;
      color: #000000;
    }

    &__text {
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      text-align: center;
      color: #636366;
    }
  }

  .img {
    width: 100%;
  }
}
</style>
