<template>
  <div
    v-if="modal"
    class="c-email-newsletter-modal"
  >

    <div class="c-email-newsletter-modal__cover"></div>
    <div class="c-email-newsletter-modal__inner">
      <button
        class="c-email-newsletter-modal__close"
        @click="closeModal"
      >
        بستن
      </button>
      <div class="c-email-newsletter-modal__inner__background"></div>
      <ValidationObserver
        v-slot="{ invalid }"
        class="c-email-newsletter-modal__inner__form"
      >
        <form @submit.prevent="submit">
          <div class="c-email-newsletter-modal__inner__form__text">
            پیشنهاد اتراکس به شما
          </div>

          <div class="c-email-newsletter-modal__inner__form__title">
            دانلود رایگان کتابچه راهنمای ارزهای دیجیتال
          </div>

          <validation-provider
            v-slot="{ errors }"
            rules="required|email"
            class="c-email-newsletter-modal__inner__form__input-container"
          >
            <label
              class="c-email-newsletter-modal__inner__form__input-container__label"
              for=""
            >
              پست الکترونیکی
            </label>
            <input
              v-model="email"
              class="c-email-newsletter-modal__inner__form__input-container__input"
              type="email"
              placeholder="پست الکترونیکی خود را وارد کنید..."
            />
            <span class="text-error">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            rules="required|mobile"
            class="c-email-newsletter-modal__inner__form__input-container"
          >
            <label
              class="c-email-newsletter-modal__inner__form__input-container__label"
              for=""
            >
              شماره تلفن
            </label>
            <input
              v-model="phoneNumber"
              class="c-email-newsletter-modal__inner__form__input-container__input"
              type="tel"
              placeholder="شماره تلفن خود را وارد کنید..."
            />
            <span class="text-error">{{ errors[0] }}</span>
          </validation-provider>

          <button
            :disabled="invalid"
            class="c-email-newsletter-modal__inner__form__btn"
            type="submit"
          >
            <ProgressIndicator
              v-if="loading"
              :size="30"
            />
            <span v-else> ارسال </span>
          </button>

          <button
            class="c-email-newsletter-modal__inner__form__cancel"
            type="button"
            @click="closeModal"
          >
            <span> بستن </span>
          </button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { phoneNumberValidator } from '@persian-tools/persian-tools'
import httpService from '~/httpservices/HttpService'
import ProgressIndicator from '~/components/base/ProgressIndicator'

let components = {
  ProgressIndicator,
}

if (process.client) {
  const { required, email } = require('vee-validate/dist/rules')
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
  }
}

export default {
  name: 'EmailNewsletterModal',
  components,

  data() {
    return {
      modal: false,
      key: 'show-modal-email',
      email: '',
      phoneNumber: '',
      loading: false,
      countDown: null,
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.countDown = setInterval(() => {
        const value = localStorage.getItem(this.key)
        if (!value || value === '0') {
          clearInterval(this.countDown)
          this.openModal()
        }
      }, 4000)
    })
  },

  methods: {
    closeModal() {
      localStorage.setItem(this.key, '1')
      this.modal = false
    },
    openModal() {
      this.modal = true
    },
    async submit() {
      const baseUrl = process.env.NOTIFICATION_BASE_URL
      this.loading = true
      try {
        await httpService.post(
          'pakat/email',
          {
            phone_number: this.phoneNumber,
            email_address: this.email,
            template_id: 5,
          },
          {
            baseURL: baseUrl,
          }
        )
        this.$toast.success('لینک کتابچه ارز های دیجیتال برای شما ارسال شد.')
        this.closeModal()
      } catch (e) {
        console.error({ e })
      }
      this.loading = false
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/responsive.scss';

.c-email-newsletter-modal {
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
    border-radius: 10px;
    z-index: 99;
    font-size: 17px;
    top: 20px;
    font-size: 16px;
    left: 20px;
    padding: 5px 16px;
    background-color: var(--color-3);
    border-radius: 38px;
    color: #fff;

    @include respond(lg) {
      top: 20px;
      font-size: 16px;
      left: 20px;
      padding: 5px 16px;
      background-color: var(--color-3);
      border-radius: 38px;
      color: #fff;
    }
  }

  &__cover {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #0000005e;
  }

  &__inner {
    width: 90vw;
    margin: auto;
    position: fixed;
    overflow: auto;
    top: 32px;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80vh;
    background-color: #fff;
    z-index: 99999;
    border-radius: 20px;

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
      width: 60vw;
      height: 70vh;
      display: flex;
    }

    &__background {
      height: 40%;
      background: #ffb300 url('/assets/popup-bg.png') no-repeat center;
      background-size: cover !important;

      @include respond(md) {
        width: 50%;
        height: 100%;
      }
    }

    &__form {
      height: 60%;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      overflow: hidden;

      @include respond(lg) {
        width: 50%;
        height: 100%;
        padding: 20px;
        align-items: flex-start;
        padding: 24px;
      }

      @include respond(xl) {
        width: 50%;
        height: 100%;
        padding: 24px;
        align-items: flex-start;
      }

      &__text {
        font-weight: 700;
        font-size: 12px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #0934f3;
        margin-bottom: 15px;

        @include respond(lg) {
          font-size: 14px;
        }
      }

      &__title {
        font-weight: 700;
        font-size: 18px;
        display: flex;
        align-items: center;
        text-align: right;
        letter-spacing: -0.02em;
        color: #000000;
        margin-bottom: 15px;

        @include respond(md) {
          font-size: 25px;
        }

        @include respond(lg) {
          font-size: 35px;
        }
      }

      &__input-container {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        margin-bottom: 16px;
        // width: 90%;

        &__label {
          font-weight: 400;
          font-size: 12px;
          line-height: 16px;
          display: flex;
          align-items: center;
          text-align: right;
          color: #666464;
          opacity: 0.68;

          @include respond(lg) {
            margin-bottom: 8px;
          }
        }

        &__input {
          background: #f2f7ff;
          border-radius: 8px;
          height: 48px;
          width: 100%;
          border: none;
          outline: none !important;
          padding: 5px 10px;
        }
      }

      &__btn {
        background: #0934f3;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        width: 100%;
        color: white;
        flex-shrink: 0;
        margin-top: 16px;

        @include respond(lg) {
          width: 170px;
        }
      }

      &__cancel {
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        width: 100%;
        flex-shrink: 0;

        @include respond(lg) {
          display: none;
        }
      }

      &__btn[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}

.text-error {
  color: red;
  font-size: 12px;
}
</style>
