<template>
  <div class="container">
    <div class="v-about-us">
      <div class="inner">
        <div class="v-about-us__header-img">
          <ImgProvider
            tag="img"
            src="eterex-world.png"
            alt="پنجره خرید و فروش آنی رمزارز"
            width="434px"
            height="auto"
            lazy
          />
        </div>

        <h2 class="v-about-us__title">ارزش های سه گانه اِتراِکس</h2>

        <p class="v-about-us__sub-title">
          با استفاده از کریپتو می‌توانید ارز های خود را به سراسر دنیا انتقال
          دهید
        </p>

        <div class="row v-about-us__row">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="col-12 v-about-us__item"
            :class="item.class"
          >
            <div class="v-about-us__item__inner">
              <ImgProvider
                tag="img"
                :src="item.icon"
                :alt="item.title"
                width="96px"
                height="auto"
                :class="['v-about-us__item__inner__icon', item.iconClass]"
                lazy
              />
              <h5 class="v-about-us__item__inner__title">
                {{ item.title }}
              </h5>

              <p class="v-about-us__item__inner__text">
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>

        <h2 class="v-about-us__title pb-4">مزایا و قابلیت های رقابتی اتراکس</h2>
      </div>

      <AboutSlider
        :items="features"
        class="mt-4"
      />
    </div>
  </div>
</template>

<script>
import AboutSlider from '../components/sliders/AboutSlider.vue'
import { generateMetaData } from '@/utils/Helpers'

export default {
  name: 'AboutUs',

  components: {
    AboutSlider,
  },

  data() {
    return {
      items: [
        {
          title: 'قهرمان باشیم ',
          text: 'تیم حرفه ای اتراکس، شبانه روز و قهرمانانه تمام تلاش خود را می کند تا بهترین خدمات را به کاربرانش ارائه دهد. اتراکس به دنبال تبدیل غیرممکن ها به واقعیت هایی است که زندگی میلیون ها هم وطن را تحت تاثیر قرار دهد.',
          icon: 'about-astronaut.png',
          class: 'col-md-6 col-lg-4 bg-white',
        },
        {
          title: 'برای جامعه مفید باشیم',
          text: 'در تصمیم گیری های اتراکس، جامعه اولویت اول است. ما به دنبال ارائه خدماتی به خانواده ها هستیم که آنها را به سمت استقلال مالی هدایت کند و اینگونه مسئولیت اجتماعی خود را ادا می کنیم.',
          icon: 'about-gardner.png',
          class: 'col-md-6 col-lg-4',
        },
        {
          title: 'مشتری مدار باشیم',
          text: 'برای تبدیل شدن به بهترین پلتفرم معاملاتی، بازخوردهای مشتریان حرف اول را می زند. به همین خاطر، همیشه با کاربران صحبت می کنیم تا بهترین محصول که شایسته آنهاست را ارائه کنیم.',
          icon: 'about-customer.png',
          class: 'col-md-6 col-lg-4',
        },

        {
          // وبسایت اتراکس به نشانی eterx.com  متعلق به شرکت زنجیزه بلوک اریترین به شماره ثبت 3404 می باشد.
          title: 'پایه گذاری اِتراِکس ',
          text: 'وبسایت اتراکس به نشانی eterex.com  متعلق به شرکت زنجیره بلوک اریترین به شماره ثبت 3404 می باشد . صرافی اتراکس در سال 1397 با نام تجاری پرفکت کریپتو (Perfect crypto) فعالیت خود را با هدف پاسخگویی به نیازهای تجارت الکترونیک و پرداخت های بین المللی در قالب خرید و فروش ارزهای دیجیتال آغاز کرد. این مجموعه با ارائه خدمات مختلفی از جمله خرید و فروش ارزهای گوناگون به صورت خودکار و پرداخت از طریق درگاه بانکی به فعالیت خود ادامه داد. در ادامه، با توجه به رشد روزافزون تعداد کاربران عزیز و همیشه همراه و همچنین با توجه به تغییر نیازهای آنها، تصمیم بر گسترش فعالیت های خود با نامی جدید و رویکردی نو گرفته شد. از این رو با همت و تلاش شبانه روزی تیم با تجربه اتراکس، محصولی جدید با امکانات بیشتر برای خدمت رسانی به کاربران، ارائه شد. ',
          icon: 'about-shovel-man.png',
          class: 'col-md-12 col-lg-12',
        },

        {
          title: 'اتراکس یعنی چی؟',
          text: 'نام اتراکس از دو کلمه انگلیسی اترنیتی (Eternity) به معنای جاودانگی و اکسچنج (Exchange) به معنای صرافی گرفته شده است که به مهم خدمتگزاری همیشگی خانواده اتراکس به مشتریانش است. ',
          icon: 'logo.png',
          class: 'col-md-6 col-lg-6',
          iconClass: 'eterex-icon',
        },
      ],

      features: [
        {
          title: 'احراز هویت هوشمند، سریع و خودکار',
          icon: 'about-document-scan.png',
          class: 'col-md-6 col-lg-6',
        },
        {
          title: 'تایید و انجام سفارشات در کوتاه ترین زمان',
          icon: 'about-choose-survey.png',
          class: 'col-md-6 col-lg-6',
        },
        {
          title: 'روش های دسترسی متنوع (وبسایت، اپلیکیشن و غیره)',
          icon: 'about-women-sitting.png',
          class: 'col-md-6 col-lg-6',
        },
        {
          title: 'تضمین امنیت و کیفیت خدمات',
          icon: 'about-document-scan.png',
          class: 'col-md-6 col-lg-6',
        },
        {
          title: 'ارائه محتواهای آموزش به منظور افزایش اطلاعات کاربران',
          icon: 'about-document-scan.png',
          class: 'col-md-6 col-lg-6',
        },
      ],
    }
  },

  head: generateMetaData('درباره ما',
    {
      description: 'صرافی اتراکس در سال 1397 با نام تجاری پرفکت کریپتو فعالیت خود را با هدف پاسخگویی به نیازهای تجارت الکترونیک و پرداخت های بین المللی در قالب خرید و فروش ارزهای دیجیتال آغاز کرد.',
    }),
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.v-about-us {
  .inner {
    padding-top: 170px;
    padding-left: 16px;
    padding-right: 16px;

    @include respond(lg) {
      padding-top: 170px;
      padding-left: var(--side--padding);
      padding-right: var(--side--padding);
    }
  }

  &__item {
    &__inner {
      @include respond(lg) {
        padding: 32px;
      }

      &__title {
        color: #12377b;
        font-weight: 700;
        font-size: 18px;
        line-height: 28px;
        text-align: right;
        margin: 0;
      }

      &__text {
        color: #0e0e0e;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        text-align: justify;
        margin: 0;
        margin-top: 8px;
      }

      &__icon {
        left: 0;
        margin-right: 75%;
        margin-bottom: -24px;

        @include respond(lg) {
          margin-right: 90%;
        }
      }
    }
  }

  &__text {
    color: #0e0e0e;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    text-align: right;
    margin: 0;
    margin-top: 8px;
  }

  &__header-img {
    text-align: center;
  }

  &__title {
    color: #12377b;
    font-weight: 6300;
    font-size: 24px;
    line-height: 37px;
    text-align: center;
    margin: 0;
    margin-top: 48px;
    margin-bottom: 8px;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.eterex-icon {
  width: 150px;
  margin: auto !important;
}</style>
