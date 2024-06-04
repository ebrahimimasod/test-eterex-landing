<template>
  <div class="c-app-download-banner" id="app-download">
    <div class="row">
      <div class="col-12 col-lg-6 col-sm-4 text-right">
        <span class="c-app-download-banner__title font-dana-bold">
          با اپلیکیشن اِتراِکس، در لحظه خرید و فروش کنید!
        </span>
        <div class="c-app-download-banner__sub-title">
          دانلود اپلیکیشن اتراکس
        </div>
      </div>
      <div class="col-12 col-lg-6 col-sm-8 text-left c-app-download-banner__container">
        <div class="c-app-download-banner__buttons">
          <div class="c-app-download-banner__buttons__icon">
            <img
              style="width:30px"
              src="/assets/app-markets/android.svg"
              alt="android"
            >
          </div>
          <a class="c-app-download-banner__buttons__link" 
          href="http://cafebazaar.ir/app/?id=com.eterex&ref=share">
            <div style="width: 145px;height: 40px;">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/coffe-bazzar.svg"
                alt="cafebazaar"
              >
            </div>
          </a>
          <a class="c-app-download-banner__buttons__link" 
          href="https://play.google.com/store/apps/details?id=com.eterex">
            <div style="width: 145px;height: 40px;">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/google-play.svg"
                alt="google-play"
              >
            </div>
          </a>
          <a class="c-app-download-banner__buttons__link" 
           href="https://myket.ir/app/com.eterex">
            <div style="width: 145px;height: 40px;">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/myket.svg"
                alt="myket"
              >
            </div>
          </a>
          <a class="c-app-download-banner__buttons__link" 
           href="https://static-dl.eterex.com/eterex.apk">
            <div style="width: 125px;height:38px;border: 1.5px solid #cccccc8f;margin-right: 11px;">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/apk.png"
                alt="myket"
              >
            </div>
          </a>

        </div>

        <div class="c-app-download-banner__buttons">
          <div class="c-app-download-banner__buttons__icon">
            <img
              style="width:20px;margin-left: 5px;"
              src="/assets/app-markets/apple.svg"
              alt="apple"
            >
          </div>
          <a class="c-app-download-banner__buttons__link" 
          href="https://sibche.com/applications/eterax">
            <div style="width: 145px;height: 40px;">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/sibche.svg"
                alt="sibche"
              >
            </div>
          </a>
          <a class="c-app-download-banner__buttons__link" 
          href="https://sibapp.com/applications/Eterex_cryptocurrencyexchange?from=search">
            <div style="width: 145px;height: 40px;">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/sib-app.svg"
                alt="sibapp"
              >
            </div>
          </a>
          <a class="c-app-download-banner__buttons__link"      
          href="https://panel.eterex.com">
            <div style="width: 145px;height: 40px;">
              <img
                style="object-fit: contain;height: 100%;"
                src="/assets/app-markets/pwa.svg"
                alt="pwa"
              >
            </div>
          </a>
          <a class="c-app-download-banner__buttons__link"      
          href="https://sibirani.com/apps/eterex/">
            <div style="width: 137px;height: 40px;">
              <img
                style="object-fit: contain;height: 100%;border: 1.5px solid rgb(215 215 215);"
                src="/assets/app-markets/sibirani.png"
                alt="pwa"
              >
            </div>
          </a>
        </div>

        <!-- <div class="c-app-download-banner__buttons">
          <link-base class="c-app-download-banner__buttons__link bazar"
            href="http://cafebazaar.ir/app/?id=com.eterex&ref=share" />

          <link-base class="c-app-download-banner__buttons__link android"
            href="https://play.google.com/store/apps/details?id=com.eterex" target="_blank" />

          <link-base class="c-app-download-banner__buttons__link download" :href="panelUrl + '/sign-in'">
            <div class="download-icon icon"></div>
            ورود به پنل کاربری
          </link-base>
        </div> -->
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

.c-app-download-banner {
  padding-top: 64px;

  @include respond(lg) {
    padding-bottom: 16px;
    padding-top: 64px;
  }

  &__title {
    color: #3c3c3c;
    font-weight: 700;
    font-size: 20px;
    line-height: 31px;
    margin: 0;
  }

  &__sub-title {
    color: #898989;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    margin-bottom: 16px;
    margin-top: 4px;
  }

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    @include respond(md) {
      flex-direction: column;
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
