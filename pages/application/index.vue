<template>
  <div class="p-application">
    <div class="p-application__header">
      <div class="container">
        <div class="p-application__header__container">
          <h1 class="p-application__header__title">
            دانلود اپلیکیشن اتراکس
          </h1>
          <p class="p-application__header__text">
            تجربه متفاوت از خرید و فروش رمزارز ها
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="p-application__body">
        <div class="row">

          <div class="col-12 col-md-3">
            <div class="p-application__body__box">
              <div>
                <div class="p-application__body__box__icon">
                  <img
                    src="./icons/android.svg"
                    alt=""
                  >
                </div>

                <span class="p-application__body__box__title">
                  دانلود نسخه اندروید
                </span>
              </div>

              <div class="p-application__body__box__links">
                <a
                  href="https://play.google.com/store/apps/details?id=com.eterex"
                  class="p-application__body__box__link"
                >
                  <img
                    class="p-application__body__box__link__img"
                    src="./icons/googleplay.svg"
                  >
                </a>

                <a
                  href="http://cafebazaar.ir/app/?id=com.eterex&ref=share"
                  class="p-application__body__box__link"
                >
                  <img
                    class="p-application__body__box__link__img"
                    src="./icons/bazar.svg"
                  >
                </a>
                <a
                  href="https://myket.ir/app/com.eterex"
                  class="p-application__body__box__link"
                >
                  <img
                    class="p-application__body__box__link__img"
                    src="./icons/myket.svg"
                  >
                </a>

                <a
                  :href="getAkpLink"
                  class="p-application__body__box__link"
                >
                  <img
                    class="p-application__body__box__link__img"
                    src="./icons/apk.png"
                  >
                </a>

              </div>

            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="p-application__body__box">
              <div>
                <div class="p-application__body__box__icon">
                  <img
                    src="./icons/apple.svg"
                    alt=""
                  >
                </div>

                <span class="p-application__body__box__title">
                  دانلود نسخه IOS
                </span>
              </div>

              <div class="p-application__body__box__links">
                <a
                  href="https://sibapp.com/applications/Eterex_cryptocurrencyexchange?from=search"
                  class="p-application__body__box__link"
                >
                  <img
                    class="p-application__body__box__link__img"
                    src="./icons/sibapp.svg"
                  >
                </a>
                <a
                  href="https://sibche.com/applications/eterax"
                  class="p-application__body__box__link"
                >
                  <img
                    class="p-application__body__box__link__img"
                    src="./icons/sibche.svg"
                  >
                </a>
                <a
                  href="https://iapps.ir/app/%D8%A7%D8%AA%D8%B1%D8%A7%DA%A9%D8%B3-%D8%B5%D8%B1%D8%A7%D9%81%DB%8C-%D8%B1%D9%85%D8%B2%D8%A7%D8%B1%D8%B2%D9%87%D8%A7/594739716"
                  class="p-application__body__box__link"
                >
                  <img
                    class="p-application__body__box__link__img"
                    src="./icons/iapps.png"
                  >
                </a>

                <a
                  href="https://panel.eterex.com/"
                  class="p-application__body__box__link"
                >
                  <img
                    class="p-application__body__box__link__img"
                    src="./icons/pwa.png"
                  >
                </a>

                <a
                  href="https://sibirani.com/apps/eterex/"
                  class="p-application__body__box__link"
                >
                  <img
                    class="p-application__body__box__link__img"
                    src="./icons/sibirani.svg"
                  >
                </a>

              </div>

            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="p-application__body__video-container">
              <video
                width="100%"
                height="100%"
                loop
                autoplay
                muted
              >
                <source
                  src="/assets/video.m4v"
                  type="video/mp4"
                >

              </video>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script>
import { generateMetaData } from '@/utils/Helpers'

export default {
  name: 'Application',

  data() {
    return {}
  },

  computed: {
    getAkpLink() {
      return `${process.env.STATIC_SRC}eterex.apk`
    },
  },

  head: generateMetaData('اپلیکیشن اتراکس', {
    description: 'دانلود اپلیکیشن اتراکس'
  }),
}
</script>
  
<style lang="scss">
@import '@/assets/responsive.scss';

.p-application {
  padding-top: 170px;

  @include respond(md) {
    padding-bottom: 170px;
  }

  &__header {

    &__container {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
    }

    &__title {
      font-size: 24px;
      margin-bottom: 20px;
      font-weight: bold;
    }

    &__text {
      font-size: 16px;
      color: var(--color-6);
    }
  }

  &__body {
    margin-top: 40px;

    &__box {
      border-radius: 16px;
      border: 1.5px solid var(--color-14);
      display: inline-flex;
      padding: 40px 42px;
      flex-direction: column;
      align-items: center;
      gap: 40px;
      width: 100%;
      min-height: 200px;

      &__title {
        font-size: 19px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin-top: 12px;
        display: flex;
      }

      &__link {
        margin-bottom: 27px;
        display: flex;
        border-radius: 10px;
        background: #000;
        height: 55px;
        padding: 13.5px 22.932px;
        justify-content: center;
        align-items: center;
      }
    }

    &__video-container {
      display: flex;
      align-content: center;
      justify-content: center;
      min-height: 200px;
      width: 100%;
      border-radius: 16px;
      position: relative;
      height: 553px;
      overflow: hidden;

      video {
        transform: scale(1.09);
        position: absolute;
        border-radius: 16px;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
      }
    }
  }
}</style>
  