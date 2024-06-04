<template>
  <div class="slider1-banner">
    <div class="row">
      <div class="col-12  text-right slider1-banner__container">
        <h2 class="slider1-banner__container__title">
          دانلود اپلیکیشن اتراکس
        </h2>
        <p class="slider1-banner__container__sub-title" >
            IOS نسخه اندروید و  
        </p>
        <div class="slider1-banner__buttons">
          <a
            class="slider1-banner__buttons__link"
            href="http://cafebazaar.ir/app/?id=com.eterex&ref=share"
          >
            <div class="slider1-banner__img-container">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/coffe-bazzar.svg"
                alt="cafebazaar"
              >
            </div>
          </a>
          <a
            class="slider1-banner__buttons__link"
            href="https://play.google.com/store/apps/details?id=com.eterex"
          >
            <div class="slider1-banner__img-container">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/google-play.svg"
                alt="google-play"
              >
            </div>
          </a>
          <a
            class="slider1-banner__buttons__link"
            href="https://myket.ir/app/com.eterex"
          >
            <div class="slider1-banner__img-container">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/myket.svg"
                alt="myket"
              >
            </div>
          </a>

        </div>

        <div class="slider1-banner__buttons">
          <a
            class="slider1-banner__buttons__link"
            href="https://sibche.com/applications/eterax"
          >
            <div class="slider1-banner__img-container">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/sibche.svg"
                alt="sibche"
              >
            </div>
          </a>
          <a
            class="slider1-banner__buttons__link"
            href="https://sibapp.com/applications/Eterex_cryptocurrencyexchange?from=search"
          >
            <div class="slider1-banner__img-container">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/sib-app.svg"
                alt="sibapp"
              >
            </div>
          </a>
          <a
            class="slider1-banner__buttons__link"
            href="https://panel.eterex.com"
          >
            <div class="slider1-banner__img-container">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/pwa.svg"
                alt="pwa"
              >
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppDownloadBanner',

  data() {
    return {
      panelUrl: 'https://panel.eterex.com',
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.slider1-banner {
  padding-top: 64px;

  @include respond(lg) {
    padding-bottom: 16px;
    padding-top: 64px;
  }

  &__img-container{
    width: 120px;
    height: 30px;
    @include respond(md) {
      width: 145px;
    height: 40px;  
    }
  }

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    @include respond(md) {
      flex-direction: column;
      position: absolute;
      bottom: 23vh;
      left: unset;
      right: -406px;
    }

    &__title {
      color: #fff;
      font-weight: 700;
      font-size:2.7rem;
      line-height: 31px;
      margin: 0;
      display: none;
      @include respond(md) {
        display: block
      }
    }

    &__sub-title {
      color: var(--color-21);
      text-align: right;
      font-weight: 400;
      font-size:1.7rem;
      line-height: 25px;
      margin-bottom: 30px;
      margin-top: 4px;
      display: none;
      @include respond(md) {
        display: block
      }
    }
  }

  &__buttons {
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    margin-bottom: 15px;

    &__link {
      margin-bottom: 15px;
      display: inline-flex;
    }

    &__icon {
      margin-bottom: 0;
      @include respond(md) {
        margin-bottom: 11px;
      }
    }

    @include respond(md) {
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: row;
      margin-bottom: 15px;
    }
  }
}
</style>
