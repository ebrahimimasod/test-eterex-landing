<template>
  <div>
    <div id="new-version-push-campaign">
      <img
        src="./asset/image/lan2top.png"
        alt=""
      >
      <a
        class="shake-bottom"
        href="https://click.adtrace.io/donsa6h"
      >خرید بدون احراز</a>
      <ul>
        <li>واریز و برداشت بدون کف و سقف</li>
        <li> کف خرید 1 دلار و سقف بدون محدودیت</li>
        <li> کارمزد صفر خرید وفروش</li>
        <li> تبدیل مسقیم کوین به کوین</li>
        <li>قابلیت پشتیبانی اندروید و ios</li>
      </ul>

    </div>



  </div>
</template>

<script>

import { generateMetaData } from '@/utils/Helpers'

export default {
  layout: 'empty',
  data() {
    return {
      showModal: false,
    }
  },
  head: generateMetaData('بدون محدودیت معامله کن'),
}
</script>

<style lang="scss" scoped>

@import '@/assets/responsive.scss';


#new-version-push-campaign {
  max-width: 450px;
  margin: 0 auto;
  display: block;
  position: relative;
  font-family: 'YekanBakh';

  img {
    width: 100%;
    margin: 0 auto;
    display: block;
    height: 100vh;
    z-index: 1;
  }

  a {
    width: 40%;
    margin: 0 auto;
    display: flex;
    height: 45px;
    position: relative;
    margin-top: -53%;
    border-radius: 24px;
    background: linear-gradient(226deg, #fc0 0%, #ffea95 100%);
    box-shadow: 0px 0px 20px 0px #fc0;
    color: #000;
    text-align: center;
    font-size: 16px;
    line-height: 60px;
    font-family: YekanBakh;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    z-index: 100;
    text-decoration: none;
  }

  ul {
    width: 74%;
    margin: 0 auto;
    display: block;
    font-family: 'YekanBakh';
    color: #fff;
    text-align: right;
    font-size: 14px;
    direction: rtl;
    margin-top: 20px;
  }

  /** animation **/
  .vibrate-btn {
    -webkit-animation: vibrate-btn 0.3s ease-out infinite both;
    animation: vibrate-btn 0.3s ease-out infinite both;
  }

  @-webkit-keyframes vibrate-btn {
    0% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }

    20% {
      -webkit-transform: translate(2px, -2px);
      transform: translate(2px, -2px);
    }

    40% {
      -webkit-transform: translate(2px, 2px);
      transform: translate(2px, 2px);
    }

    60% {
      -webkit-transform: translate(-2px, 2px);
      transform: translate(-2px, 2px);
    }

    80% {
      -webkit-transform: translate(-2px, -2px);
      transform: translate(-2px, -2px);
    }

    100% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }

  @keyframes vibrate-btn {
    0% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }

    20% {
      -webkit-transform: translate(2px, -2px);
      transform: translate(2px, -2px);
    }

    40% {
      -webkit-transform: translate(2px, 2px);
      transform: translate(2px, 2px);
    }

    60% {
      -webkit-transform: translate(-2px, 2px);
      transform: translate(-2px, 2px);
    }

    80% {
      -webkit-transform: translate(-2px, -2px);
      transform: translate(-2px, -2px);
    }

    100% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }

  .shake-bottom {
    -webkit-animation: shake-bottom 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite both;
    animation: shake-bottom 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite both;
  }

  /**
 * ----------------------------------------
 * animation shake-bottom
 * ----------------------------------------
 */
  @-webkit-keyframes shake-bottom {
    0%,
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transform-origin: 50% 100%;
      transform-origin: 50% 100%;
    }

    10% {
      -webkit-transform: rotate(2deg);
      transform: rotate(2deg);
    }

    20%,
    40%,
    60% {
      -webkit-transform: rotate(-4deg);
      transform: rotate(-4deg);
    }

    30%,
    50%,
    70% {
      -webkit-transform: rotate(4deg);
      transform: rotate(4deg);
    }

    80% {
      -webkit-transform: rotate(-2deg);
      transform: rotate(-2deg);
    }

    90% {
      -webkit-transform: rotate(2deg);
      transform: rotate(2deg);
    }
  }

  @keyframes shake-bottom {
    0%,
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transform-origin: 50% 100%;
      transform-origin: 50% 100%;
    }

    10% {
      -webkit-transform: rotate(2deg);
      transform: rotate(2deg);
    }

    20%,
    40%,
    60% {
      -webkit-transform: rotate(-4deg);
      transform: rotate(-4deg);
    }

    30%,
    50%,
    70% {
      -webkit-transform: rotate(4deg);
      transform: rotate(4deg);
    }

    80% {
      -webkit-transform: rotate(-2deg);
      transform: rotate(-2deg);
    }

    90% {
      -webkit-transform: rotate(2deg);
      transform: rotate(2deg);
    }
  }
}

.modal-app-banner {
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 99999999999;
  background-color: #0000008f;
  transition: all 0.5s;

  &__inner {
    position: fixed;
    background: #fff;
    bottom: 0;
    width: 100%;
    top: auto;
    padding: 10px;
    z-index: 9999999999999;
    border-radius: 32px 32px 0px 0px;
  }
}

.c-app-download {
  padding-top: 20px;
  padding-bottom: 16px;

  &__title h2 {
    font-size: 20px;
    margin-bottom: 26px;
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
