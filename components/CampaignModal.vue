<template>
  <div v-if="modal" class="c-campaign-modal">
    <button class="c-campaign-modal__close" @click="closeModal">
      بستن
    </button>
    <div class="c-campaign-modal__cover"></div>
    <div class="c-campaign-modal__inner">
      <a
        href="https://panel.eterex.com"
        target="_blank"
        class="c-campaign-modal__inner__background"></a>
      <div class="c-campaign-modal__inner__content">
        <div class="c-campaign-modal__inner__content__header">
          <h1 class="c-campaign-modal__inner__content__header__title">
            شب
            <span style="color: #f24e44">
            یلدات
          </span>
            پرسود باشه!
          </h1>
          <b class="c-campaign-modal__inner__content__header__tamdid">
            (تمدید شد)
          </b>
          <div class="c-campaign-modal__inner__content__header__subtitle">
            به 33 نفری که بیشترین تراکنش (خرید،فروش،ترید)
            را در یلدا داشته باشند
          </div>
          <div class="c-campaign-modal__inner__content__header__subtitle">
            جوایز رمزارزی و تخفیفات فوق العاده تعلق می گیره!
          </div>
        </div>
        <div class="c-campaign-modal__inner__content__body">
          <div
            v-if="!isStartedCampaign"
            class="c-campaign-modal__inner__content__body__content">
            چند ساعت مانده تا شروع مسابقه:
          </div>
          <div
            v-else
            class="c-campaign-modal__inner__content__body__content">
            تا پایان مسابقه :
          </div>
          <div class="c-campaign-modal__inner__content__body__timer">
            <client-only>
              <FlipCountdown
                v-if="!isStartedCampaign"
                :labels="{
                    days: 'روز',
                    hours: 'ساعت',
                    minutes: 'دقیقه',
                    seconds: 'ثانیه',
              }"
                deadline="2022-12-21 00:00:00"
              />

              <FlipCountdown
                v-else
                :labels="{
                    days: 'روز',
                    hours: 'ساعت',
                    minutes: 'دقیقه',
                    seconds: 'ثانیه',
              }"
                deadline="2022-12-25 23:59:59"
              />
            </client-only>
          </div>


          <a
            v-if="isStartedCampaign"
            href="https://panel.eterex.com/"
            target="_blank"
            class="c-campaign-modal__inner__content__body__button">
            شروع مسابقه
          </a>

        </div>
        <div class="c-campaign-modal__inner__content__footer">
          <img
            class="c-campaign-modal__inner__content__footer__img"
            src="/assets/campaign/2.png" alt="">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {phoneNumberValidator} from '@persian-tools/persian-tools'
import FlipCountdown from 'vue2-flip-countdown'
import httpService from '~/httpservices/HttpService'
import ProgressIndicator from '~/components/base/ProgressIndicator'

let components = {
  ProgressIndicator,

}

if (process.client) {
  const {required, email} = require('vee-validate/dist/rules')
  const {
    ValidationProvider,
    extend,
    ValidationObserver,
  } = require('vee-validate')
  extend('required', {
    ...required,
    message: 'این فیلد جباری است.',
  })
  extend('email', {
    ...email,
    message: 'فرمت ایمیل درست نیست',
  })
  extend('mobile', {
    validate: (value) => phoneNumberValidator(value),
    message: 'فرمت شماره موبایل درست نیست',
  })
  components = {
    ...components,
    ValidationObserver,
    ValidationProvider,
    FlipCountdown,
  }
}

export default {
  name: 'CampaignModal',
  components,

  data() {
    return {
      modal: false,
      key: 'show-modal-campaign-yalda',
      countDown: null,
    }
  },

  mounted() {

    this.$nextTick(() => {
      this.countDown = setInterval(() => {
        const value = sessionStorage.getItem(this.key)
        if (!value || value === '0') {
          clearInterval(this.countDown)
          this.openModal()
        }
      }, 4000)
    })
  },

  computed: {
    isStartedCampaign() {
      const startTimeStamp = (new Date('December 21, 2022 00:00:00')).getTime();
      const nowTimeStamp = Date.now();
      return Boolean(startTimeStamp < nowTimeStamp)
    }
  },

  methods: {
    closeModal() {
      sessionStorage.setItem(this.key, '1')
      this.modal = false
    },
    openModal() {
      this.modal = true
    },

  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.c-campaign-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 8px;
  right: 0;
  bottom: 0;

  @include respond(lg) {
    flex-direction: row;
  }

  &__close {
    position: absolute;
    top: 0px;
    background: #fff;
    color: #000;
    padding: 5px 10px;
    border-radius: 10px;
    z-index: 99;
    font-size: 17px;

    @include respond(lg) {
      top: 15px;
      font-size: 20px;
    }
  }

  &__cover {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #000000d1;
  }

  &__inner {
    width: 95vw;
    margin: auto;
    position: fixed;
    overflow: auto;
    top: 49px;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80vh;
    background-color: #fff;
    z-index: 9999999999999999;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column-reverse;

    @include respond(md) {
      width: 90vw;
      height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row-reverse;
    }

    @include respond(lg) {
      width: 70vw;
      height: 80vh;
      display: flex;
    }

    @include respond(xl) {
      width: 62vw;
      height: 84vh;
      display: flex;
    }

    &__background {
      cursor: pointer;
      background: #01162b url('/assets/campaign/1.jpg') no-repeat center;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 0;
      background-size: 100% !important;

      @include respond(md) {
        width: 50%;
        height: 100%;
      }
    }

    &__content {
      height: 100%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      overflow: hidden;

      @include respond(lg) {
        width: 50%;
        height: 100%;
        padding: 20px;
      }

      @include respond(xl) {
        width: 50%;
        height: 100%;
        padding: 24px;
      }

      &__header {
        &__title {
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          @include respond(lg) {
            font-size: 2.5rem;
          }
        }

        &__subtitle {
          text-align: center;
          font-size: 0.89em;
          line-height: 22px;
          font-weight: bold;
          padding: 0 15px;
          @include respond(lg) {
            font-size: 1rem;
            line-height: 25px;
          }
        }

        &__tamdid{
          color: #f24e44;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 5px 0;
          @include respond(lg) {
            font-size: 1.8rem;
          }
        }

      }

      &__body {
        width: 100%;

        &__content {
          font-size: 1rem;
          font-weight: bold;
          text-align: center;
          @include respond(lg) {
            font-size: 1rem;
            font-weight: bold;
            margin-top: 15px;
          }
        }

        &__timer {
          .flip-clock {
            display: flex;
            align-items: center;
            justify-content: center;
            //transform: scale(0.9);
            margin: 10px 0;

            .flip-card {
              font-size: 30px !important;
              @include respond(md) {
                font-size: 28px !important;
              }
              @include respond(lg) {
                font-size: 28px !important;
              }
              @include respond(xl) {
                font-size: 35px !important;
              }
            }

          }

          .flip-card__top,
          .flip-card__bottom,
          .flip-card__back-bottom,
          .flip-card__back::before,
          .flip-card__back::after {
            color: #f24e44;
          }


          .flip-card__top-4digits,
          .flip-card__bottom-4digits,
          .flip-card__back-bottom-4digits,
          .flip-card__back-4digits::before,
          .flip-card__back-4digits::after {
            color: #f24e44;
          }


          .flip-card__bottom,
          .flip-card__back-bottom,
          .flip-card__bottom-4digits,
          .flip-card__back-bottom-4digits {
            color: #f24e44;
          }

        }

        &__button {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          background-color: #65ba38;
          color: #fff;
          padding: 10px 0;
          border-radius: 8px;
          box-shadow: 0px 2px 7px 0px #00000040;
          @include respond(md) {
            display: none;
          }
          @include respond(lg) {
            display: none;
          }
        }
      }

      &__footer {
        display: flex;
        width: 100%;

        &__img {
          width: 100%;
          margin: auto;
          border-radius: 5px;
          @include respond(lg) {
            height: 250px;
            width: max-content;
          }
        }
      }


    }
  }
}

.text-error {
  color: red;
  font-size: 12px;
}
</style>
