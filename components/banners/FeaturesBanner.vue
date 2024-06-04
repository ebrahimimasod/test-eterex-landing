<template>
  <section class="c-features-banner">
    <h2 class="c-features-banner__title font-dana-bold">امکانات پلتفرم معاملاتی اِتر اِکس</h2>
    <div class="row">
      <div
        v-for="(item, index) in features"
        :key="index"
        class="col-12 c-features-banner__feature"
        :class="item.class"
      >
        <div class="inner">
          <div class="c-features-banner__feature__img">
            <img :src="item.icon" />
          </div>

          <h5 class="c-features-banner__feature__title font-dana-bold">
            {{ item.title }}
          </h5>

          <p class="c-features-banner__feature__text">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesBanner',
  data() {
    return {
      navExpanded: false,
      features: [
        {
          title: 'بیش از 350 رمزارز',
          text: 'ما در اتراکس بیش از 350 رمزارز برای خرید و فروش در اختیار شما گذاشته ایم.',
          icon: '/assets/features/1.png',
          class: 'col-md-6 col-lg-4',
        },
        {
          title: 'واریز و برداشت نامحدود',
          text: 'شما در اتراکس می توانید واریز و برداشت از یک دلار  تا بالای 25 میلیون تومان انجام دهید.',
          icon: '/assets/features/2.png',
          class: 'col-md-6 col-lg-4',
        },
        {
          title: 'احراز هویت آنی',
          text: 'با وارد کردن شماره موبایل خود میتوانید خیلی سریع ثبت نام خود را در اتراکس انجام دهید.',
          icon: '/assets/features/3.png',
          class: 'col-md-6 col-lg-4',
        },
        {
          title: 'پشتیبانی  24 ساعته',
          text: 'پشتیبانی در اتراکس 24 ساعت و 7 روز هفته و 365 روز سال می باشد.',
          icon: '/assets/features/4.png',
          class: 'col-md-6 col-lg-4',
        },
        {
          title: 'خرید حتی یک دلار',
          text: 'در اتراکس می توانید خرید حتی 1 دلار داشته باشید.',
          icon: '/assets/features/5.png',
          class: 'col-md-6 col-lg-4',
        },
        {
          title: 'کارمزد بسیار کم',
          text: 'کارمزد ریالی در اتراکس صفر و  کارمزد و کارمزد کریپتو فقط 0.1 درصد است.',
          icon: '/assets/features/6.png',
          class: 'col-md-6 col-lg-4',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.c-features-banner {
  .bg-white {
    * {
      background-color: #fff !important;
    }
  }

  &__title {
    color: #12377b;
    font-weight: 900;
    font-size: 25px;
    line-height: 56px;
    margin-bottom: 8px;
    margin-top: 32px;

    @include respond(lg) {
      font-size: 40px;
      line-height: 56px;
      margin-top: 84px;
      margin-bottom: 40px;
    }
  }

  &__feature {
    padding: 10px 25px;

    .inner {
      background: #fff;
      border-radius: 40px;
      margin-bottom: 16px;
      padding: 24px;
      height: 253px;
      box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    }

    &__icon {
      margin-bottom: 16px;
    }

    &__title {
      color: #12377b;
      font-weight: 900;
      font-size: 24px;
      line-height: 37px;
      text-align: center;
      margin: 0;
      padding-top: 20px;
    }

    &__img {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        max-width: 100px;
        // filter: drop-shadow(5px 5px 5px #0934f38c);
      }
    }

    &__text {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #6c6c6c;
      margin: 0;
      padding-top: 5px;
    }
  }
}
</style>
