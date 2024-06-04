<script>
import {defineComponent} from 'vue'
import Input from "~/pages/campaign/perfect-money/components/Input.vue";
import Button from "~/pages/campaign/perfect-money/components/Button.vue";
import {addCommas} from "@persian-tools/persian-tools";
import {
  copyText,
  httpSendAuthenticator,
  httpVoucherCreatePerfectMoney,
  redirectToPanel
} from "~/pages/campaign/perfect-money/helpers";
import OtpInput from "@bachdgvn/vue-otp-input";

let timerInterval = null;

export default defineComponent({
  name: "Response",
  components: {Input, Button, OtpInput},
  props: {
    type: {
      type: String,
    },
    toAmount: {
      type: String,
    },
    fromAmount: {
      type: String,
    },
    config: {
      type: Object,
      default: () => ({
        pmIrt: "",
        irtPm: "",
      })
    },
    account: {
      type: Object,
      default: () => ({
        referralCode: "",
        phoneNumber: "",
      })
    },
  },
  data() {
    return {
      panelUrl: 'https://panel.eterex.com',
      phoneNumber: "",
      phoneNumberValidate: false,
      otpCode: "",
      loading: false,
      otpSent: false,
      otpVerified: false,
      code: "",
      number: "",
      isTimerEnded: false,
      timerCount: 120,
    }
  },
  methods: {
    addCommas,
    gotoPanel() {
      window.location.href = 'https://panel.eterex.com/sign-enter-mobile?step=forgetPassword'
    },
    copyText(value) {
      copyText(value)
      this.$toast('کپی شد', {
        type: 'success',
        position: "top-center"
      });
    },
    onValidatePhoneNumber(error) {
      this.phoneNumberValidate = !error
    },
    resetPhoneNumberInput() {
      this.phoneNumber = "";
      this.phoneNumberValidate = false;
      this.otpCode = "";
      this.loading = false;
      this.otpSent = false;
      this.otpVerified = false;
    },
    handleOnCompleteOTP(value) {
      this.otpCode = value;
    },
    async getOtpCode() {
      this.loading = true;
      try {
        await httpSendAuthenticator();
        this.otpSent = true;
        this.startTimer(120);
        this.$toast('کد تایید برای موبایل شما ارسال شد.', {
          type: 'info',
          position: 'top-center'
        });
      } catch (e) {
        this.startTimer(e?.response?.data?.detail);
        this.handleErrorResponse(e);
      }
      this.loading = false;
    },
    async createVoucherPerfectMoney() {
      this.loading = true;
      try {
        const {amount, code, number} = (await httpVoucherCreatePerfectMoney(this.toAmount, this.otpCode))?.data;
        this.otpVerified = true;
        this.code = code;
        this.number = number;
      } catch (e) {
        this.handleErrorResponse(e);
      }
      this.loading = false;

    },
    handleErrorResponse(error) {
      const {status, title, detail} = error?.response?.data;

      switch (true) {
        case (status === 400 && title === 'ENTITY_ALREADY_EXISTS') : {
          redirectToPanel(this);
          break
        }
        case (status === 400 && title === 'INSUFFICIENT_VERIFIED_PROOF') : {
          this.$toast('مبلغ خرید بیشتر از حد مجاز بدون احراز هویت است. جهت تکمیل احراز هویت به پنل کاربری اتراکس مراجعه کنید.', {
            position: 'top-center',
            type: "warning"
          });
          break
        }
        case (status === 400 && title === 'INSUFFICIENT_CREDIT') : {
          this.$toast('موجودی ریالی کیف پول شما کافی نیست.', {
            position: 'top-center',
            type: "warning"
          });
          break
        }
        case (status === 429 && title === 'RATE_LIMITATION') : {
          this.$toast(`لطفا بعد از ${detail}  ثانیه دیگر تلاش کنید. `, {
            position: 'top-center',
            rtl: true,
            type: 'warning'
          });
          break;
        }
      }
    },
    startTimer(timerCount = 120) {
      this.isTimerEnded = false;
      this.timerCount = timerCount;
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        this.timerCount--;
        if (this.timerCount <= 0) {
          clearInterval(timerInterval);
          this.timerCount = 120;
          this.isTimerEnded = true;
        }
      }, 1000);
    }
  },
  computed: {
    getDateTime() {
      const date = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      const time = `${date.getHours()}:${date.getMinutes()}`
      return ` ${date.toLocaleDateString('fa-IR', options)} ساعت ${time}`;
    },
    getIrtAmount() {
      if (this.type === 'buy') {
        return addCommas(Number(this.fromAmount).toFixed(0));
      } else {
        return addCommas(Number(this.toAmount).toFixed(0));
      }
    },
    getCashBackAmount() {
      let irtAmount = 0;
      if (this.type === 'buy') {
        irtAmount = this.fromAmount;
      } else {
        irtAmount = this.toAmount;
      }
      return addCommas(Number(irtAmount * 0.01).toFixed(0))
    },
    getTimer() {
      const sec_num = parseInt(this.timerCount, 10); // don't forget the second param
      const hours = Math.floor(sec_num / 3600);
      let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      let seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ':' + seconds;
    }
  },
  mounted() {
    if (this.account?.phoneNumber) {
      this.phoneNumber = this.account?.phoneNumber;
      this.phoneNumberValidate = true;
      this.otpCode = "";
      this.loading = false;
      this.otpSent = true;
      this.otpVerified = false;
      if (this.type === 'buy') {
        this.code = "**************";
        this.number = "*******";
        this.getOtpCode();
      }
    }
  }
})
</script>

<template>
  <div>
    <div class="c-res-buy-pm">
      <div class="c-res-buy-pm__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M15.75 25.5537L30.5688 10.7584C30.9013 10.4299 31.2951 10.2656 31.7502 10.2656C32.2054 10.2656 32.5972 10.4306 32.9257 10.7606C33.2542 11.0906 33.4185 11.4857 33.4185 11.9461C33.4185 12.4065 33.2542 12.8041 32.9257 13.1388L16.9312 29.1334C16.5969 29.4619 16.2018 29.6262 15.7457 29.6262C15.2896 29.6262 14.8973 29.4619 14.5688 29.1334L7.03258 21.5972C6.70408 21.2605 6.54284 20.8617 6.54887 20.4008C6.55492 19.9399 6.72294 19.5452 7.05291 19.2167C7.38288 18.8882 7.77805 18.724 8.23841 18.724C8.6988 18.724 9.09638 18.8882 9.43116 19.2167L15.75 25.5537Z"
            fill="white"/>
        </svg>
      </div>
      <div class="c-res-buy-pm__header">
        <h1 class="c-res-buy-pm__header__title">
          با موفقیت انجام شد!
        </h1>

        <h2 class="c-res-buy-pm__header__subtitle">
          {{ getDateTime }}
          -
          عملیات موفق
        </h2>

      </div>

      <div class="c-res-buy-pm__gift" v-if="type === 'buy'">
        <img class="c-res-buy-pm__gift__img" src="/assets/gift.png" alt="">
        <div class="c-res-buy-pm__gift__text">
          تبریک! شما {{ getCashBackAmount }} تومان پاداش از این تراکنش دریافت کردید! جهت برداشت آن، وارد پنل
          اترکس-کیف‌پول شوید.
        </div>
      </div>

      <div class="c-res-buy-pm__gift" v-if="type === 'sell'">
        <div class="c-res-buy-pm__gift__text">
          مبلغ {{ getIrtAmount }} تومان کیف پول شما شارژ شد. جهت برداشت موجودی کیف پول به پنل کاربری اتراکس مراجعه کنید
        </div>
      </div>

      <div class="c-res-buy-pm__result">
        <div class="row">
          <template v-if="type === 'buy'">

            <div class="col-6" style="margin: 12px 0">
              <Input
                show-only
                :disabled="!otpVerified"
                label="کد ووچر"
                readonly
                :value="number"
              >
                <template #suffix>
                  <div style="cursor: pointer" @click="copyText(number)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6.5 15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5"
                        stroke="#0C8CE9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path
                        d="M17.25 8.75H10.75C9.64543 8.75 8.75 9.64543 8.75 10.75V17.25C8.75 18.3546 9.64543 19.25 10.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V10.75C19.25 9.64543 18.3546 8.75 17.25 8.75Z"
                        stroke="#0C8CE9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </template>
              </Input>
            </div>
            <div class="col-6" style="margin: 12px 0">
              <Input
                show-only
                :disabled="!otpVerified"
                label="کد فعال سازی"
                readonly
                v-model="code"
              >
                <template #suffix>
                  <div style="cursor: pointer" @click="copyText(code)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6.5 15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5"
                        stroke="#0C8CE9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path
                        d="M17.25 8.75H10.75C9.64543 8.75 8.75 9.64543 8.75 10.75V17.25C8.75 18.3546 9.64543 19.25 10.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V10.75C19.25 9.64543 18.3546 8.75 17.25 8.75Z"
                        stroke="#0C8CE9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </template>
              </Input>
            </div>

            <template v-if="!otpVerified">
              <div style="margin-bottom: 12px" class="col-12">


                <div class="c-res-buy-pm__result__alert">
                  برای دریافت کد پرفکت مانی خود، نیاز است شماره موبایل خود را تایید کنید.
                </div>

                <Input
                  @validate="onValidatePhoneNumber"
                  :rules="['phone_number','required']"
                  type="tel"
                  v-model="phoneNumber"
                  label="شماره همراه شما"
                  show-only
                >
                  <template #suffix>
                    <span @click="getOtpCode" v-if="isTimerEnded" class="resend-btn">
                      ارسال مجدد
                    </span>
                    <span v-else>
                     {{ getTimer }}
                   </span>
                  </template>
                </Input>
              </div>
            </template>
            <template v-if="!otpVerified">
              <div class="col-12" style="margin: 12px 0" v-if="otpSent">
                <div class="c-res-buy-pm__result__otp">
                  <label class="c-res-buy-pm__result__otp__label">
                    کد پیامک شده به شماره بالا
                  </label>
                  <otp-input
                    ref="otpInput"
                    input-classes="c-res-buy-pm__result__otp__input"
                    separator=""
                    :num-inputs="6"
                    :should-auto-focus="true"
                    :is-input-num="true"
                    @on-complete="handleOnCompleteOTP"
                  />
                </div>
              </div>
              <div class="col-12" style="margin: 12px 0">
                <Button
                  v-if="otpSent"
                  :disabled="!otpCode || loading"
                  @click.native="createVoucherPerfectMoney"
                  :loading="loading"
                  variant="primary">
                  تایید
                </Button>
                <Button
                  v-else
                  :disabled="!phoneNumberValidate || loading"
                  @click.native="getOtpCode"
                  :loading="loading"
                  class="c-res-buy-pm__result__otp-btn"
                  variant="primary">
                  ارسال کد
                </Button>

              </div>
            </template>
          </template>

          <template v-if="type === 'buy'">
            <div class="col-12" style="margin: 12px 0">
              <Input class="c-res-buy-pm__result__input">
                <template #prefix>
                  مقدار تومان واریز شده
                </template>
                <template #suffix>
                  <div class="c-res-buy-pm__result__input__icon">
                <span style="margin-left: 8px">
                {{ getIrtAmount }}
              </span>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                      <path
                        d="M0 16C0 12.2801 0 10.4202 0.40889 8.89417C1.5185 4.75307 4.75307 1.5185 8.89417 0.40889C10.4202 0 12.2801 0 16 0C19.7199 0 21.5798 0 23.1058 0.40889C27.2469 1.5185 30.4815 4.75307 31.5911 8.89417C32 10.4202 32 12.2801 32 16C32 19.7199 32 21.5798 31.5911 23.1058C30.4815 27.2469 27.2469 30.4815 23.1058 31.5911C21.5798 32 19.7199 32 16 32C12.2801 32 10.4202 32 8.89417 31.5911C4.75307 30.4815 1.5185 27.2469 0.40889 23.1058C0 21.5798 0 19.7199 0 16Z"
                        fill="url(#pattern0)"/>
                      <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlink:href="#image0_6003_45591" transform="scale(0.00520833)"/>
                        </pattern>
                        <image id="image0_6003_45591" width="192" height="192"
                               xlink:href="data:image/png;base64,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"/>
                      </defs>
                    </svg>
                  </div>
                </template>
              </Input>
            </div>
            <div class="col-12" style="margin: 12px 0">
              <Input>
                <template #prefix>
                  مقدار پرفکت‌مانی دریافت شده
                </template>
                <template #suffix>
                  <div class="c-res-buy-pm__result__input__icon">
                <span style="margin-left: 8px">
                {{ toAmount }}
              </span>
                    <img src="/assets/perfect-money.svg" alt="">
                  </div>
                </template>
              </Input>
            </div>
          </template>

          <template v-if="type === 'sell'">
            <div class="col-12" style="margin: 12px 0">
              <Input>
                <template #prefix>
                  مقدار پرفکت‌مانی واریز شده
                </template>
                <template #suffix>
                  <div class="c-res-buy-pm__result__input__icon">
                <span style="margin-left: 8px">
                {{ fromAmount }}
              </span>
                    <img src="/assets/perfect-money.svg" alt="">
                  </div>
                </template>
              </Input>
            </div>
            <div class="col-12" style="margin: 12px 0">
              <Input class="c-res-buy-pm__result__input">
                <template #prefix>
                  مقدار تومان دریافت شده
                </template>
                <template #suffix>
                  <div class="c-res-buy-pm__result__input__icon">
                <span style="margin-left: 8px">
                {{ getIrtAmount }}
              </span>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                      <path
                        d="M0 16C0 12.2801 0 10.4202 0.40889 8.89417C1.5185 4.75307 4.75307 1.5185 8.89417 0.40889C10.4202 0 12.2801 0 16 0C19.7199 0 21.5798 0 23.1058 0.40889C27.2469 1.5185 30.4815 4.75307 31.5911 8.89417C32 10.4202 32 12.2801 32 16C32 19.7199 32 21.5798 31.5911 23.1058C30.4815 27.2469 27.2469 30.4815 23.1058 31.5911C21.5798 32 19.7199 32 16 32C12.2801 32 10.4202 32 8.89417 31.5911C4.75307 30.4815 1.5185 27.2469 0.40889 23.1058C0 21.5798 0 19.7199 0 16Z"
                        fill="url(#pattern0)"/>
                      <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlink:href="#image0_6003_45591" transform="scale(0.00520833)"/>
                        </pattern>
                        <image id="image0_6003_45591" width="192" height="192"
                               xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAtPSURBVHgB7d1NbBTnHcfxh2CwwbQ2L6qtHoqFpTiX4pxAyaE5BZ9K6IVeWnqqiBKlF6rcWhQfkXyp1AqaU4h7SHrg5VTopfbBCE7BveBItmglVJsE2VAT1tgknd+stx4vM7Mzs7v2zPy/H8mKItbj9fr5zTzvz47RkQffOcCoVxxgGAGAaQQAphEAmEYAYBoBgGkEAKYRAJhGAGAaAYBpBACmEQCYRgBgGgGAaQQAphEAmEYAYBoBgGkEAKYRAJhGAGAaAYBpBACmEQCYRgBgGgGAaQQAphEAmEYAYBoBgGkEAKYRAJhGAGAaAYBpBACmEQCYRgBgGgGAaQQAphEAmEYAYBoBgGkEAKYRAJhGAGAaAYBpBACmEQCY1uGQW13dO1zXvp3////K8gtXefqdQ+sQgAAVuJ6+Dtc3uMv19u30vjZ/PEsLa+5f08+9rxXXCrr+j47udv1HOvyC3uf/9xW3x/vq9N5LlBUvBIvza+7xwgs3P7fq5mdX3b+990Q40tsxOvKAT23d7/72w0SvU8H77KNHbmFuzaV1+GinG357r3vtza7YQp7FfS+c03//xt31vpAMAQhIGgCpLH/rPn7/K++p8CLR6/VEOXluvxeA3a7dFNAvvBBMjv/XIR6N4IxUVTl2qjvRa1X4z1w4tCWFX3q8n/fWL77nfvNJn/+zEY0ANOHwcLIC3Te42y+UW00/8wMvBMcTBtUiAtCEru5khVqN2+104t0eQhCBADShq8WN2HZSCLaqClYkBKAJagcUyTteI7yzQKHdCgTAELUJjv9sn8MGAmCM2gI8BTYwEpxTM1PP3L1bFX/UV2MO0rM+Oj3g1eU1oJaFqm0aiLtz9akDAcite7dWvFHdZ6H/NumqYThz4eBL0zWSGPJGoQlAFVWggtJo7+UPH/nzk9LqP7LLoYoAFJhCcH1syaWlahAjxFUEoOCyTMgTGsJVBKDg1EBOOiEvqGhjGO3CpwDTCEDBZa3P17pWrSMABTf0RpfLImvboWwIQIH1rs/7T+t+i5Z0lgEDYQWl0dyRd3sy9eawZHIDAcipgZCpy1os3+cNYjW7nlgL+1FFAHJKd3h9tdrE+BN/AA1VtAEM0bSJ21eYAxREAAzR3KEV9g7ahAAYcX1skapPCAJggAr/3Yip1dbRCC4x1fk/H110C7OrDuEIQEmpr//GxcfU+RugClRS270XUVEQgJLqH9ztjxQjHreJnNIW7PcDI7b9g7tST3zTQJrq/7dZ/xuJAOSUCn9wd2dNe/71Hw+lXgSvHeF0hgDTH8JRBSoIzd+/eemJy4Id4aIRgAKZmapkOp1GW6icPn/A4WUEoGCujS1l6tocONrpfpJh7UDZEYCC0XSG21eWXRZaPMMO0ZsRgAKa8BrHWTbEErUH2BNoAwEoqCwbYonaAz891+tQRQAKSt2aWfv31R7gxJgqAlBgGifIOtdH4wNMlyAAW2KpTfPwNTbwj0+zjQ0Ih2UQgE3aVVDbOSNT25xnPbme7VEIwCYztyquHVRA2xkCjQ2k7RVS4Z9mkQwBCFL/ejsKqqoqWfvuk9DYwF9HFxO/d4Ulay9S2RCAgOqhE19n7mOPo777yfHs9fVG5mdX3aX3HjZ873rK/fm9r1gfvG7H6MgDlgyF0Ihp3+Au19W9sfms7uQV7y6rQvZwbs0tzq+lfmJoUtrAcKe/wZXOGa5tU672R+Xpt37B1BTmZtojOgLp8I93u97+Dv9n6D3Pzz73u06ZFboZAYBpVIFgGgGAaQQAphEAmEYAYBoBgGkEAKYRAJhGAGAaAYBpBACmEQCYRgBgGgGAabnaFkDz7ofe3NOyjVxnpp65hbnWL25BeeQmACr8H3zS51pJi1o+/fCRA6Lkpgp0rA1bdPQf2eWAOLkJQDsKa225IRAlNyWkHQvR23FNlEtu2gDtaKzqqNB6WiR+eLjLP29LbYTgTsla4P6f2VW3MPvcP1h6YS7d+bq69qteI77/SId37U63v79jU4NeOzfomrp2cDMrvXbojc7Q79FRSXo/2gAryUJ5vYfhE93+ongt6t/jPQWD19PvqMX8eh/3piruy5R7IdWur0X9+vzCrt/MZ7jVcrMoXtWVV71CEOb1t/f6hSOMdjsI2yRWuyvU74CgrQC1R37SXib1IulYokYFT4VC19ZX0mvXzgBLs2d/o7N/da20h2Doc9KWLWE3iyAd0nfibE/q8wWSfobbpRC7Qpw81+ufeBhGO5w16ulRAdVmsFHXiFM9m+uxfzcLo4Jx+vcH/G3Ht4ICf9n7fetDoN/tZBPbnt++uuxuXgzft0jBPnH2+y4rheyzjx7lskvaRCvx9PmDmQq/6Ml08tz+0KeTqk9nLhzassIvOv/3rV++fJdXdacZx0/tC3166HNrpvBLz/rnlMeD+kofgFYdCxR2sspRr3Bsxx9VhbX+57ZipzedGVB/3aw3jnq6keRxN+pSbxCvAtuoTqwqlHZi0y5q2i8/6hxe/QF1rTR7ataure+tNrjjP27tDHf3ZrUurt3d4l6vEfPpQL39nlfXrrVv1Pul9o/OB1YVTuHQe9CdWAU6qstZr9G/3wm0qRo93fQzajvZDXi/Y1RbTRSw4NnHeVDqADS6e02MP/H+IBub1uqP/fPzB/wejqjrxTVCg9T4+3x0cdO1z/7pB5FPjPrXT/5lOfZgbPU0TQf+v1bPlrjtD+9ceeq3h6JOiElzftj1scVNbaNJ7+uYd90R7/phFDBdP08N4lJXgXSXjKK7c7DwiwqRCnicpFWCSl1IdO0vYnpa6l+vO/fMrej9+8MG+ZLu/ak7dprrRgkryHp6xN0gtrK9lESpnwBxRwBFdftVC9FK5KO8v4nGpgp1O19fo16vPq+xrPda24RXBa92B263Z9777uwuxkmUpQ1Aoz903F1Qd7bDEf+WtztYUK3N81oLZ9SWXWkD0NOgwRn3mM7roE0cjWy/89v9FPyUStsGWMlYfSgi3fnV8KTwp1faJ4C6FOPEFZaiTaNWY79R1Uxdo2qI6+mm1w7EdFdaUtoA6A+tak5UQVehWZgL75OOa+jGtR22i6o/UXQ22UTdecJq4A9cIABS6m5QzZuJ8nrEKK66OePupvf/mb+jRePeryaitfOEyqIrdQDi+tGr81MObuot0p00ahBHVI34cqpYZ+u2YhpImZV6HEB9/cdO7Y0eTfX6yrUOuXaHbNSIbOdRp83QuEVvxACdJqHNTFX8KQvVQ/l2et2kXQ5VpQ5AdSrzE3+6cpwkvSe6+9+5+o3LIx19GjdCrXlFQwkLfcVQ75mUfjao7n7Nns+rwn85x7tL6HcMrjBrRv0IednbD4UIQLMLKSbGlxvO8YlSW4ASNt047YBZ2uWBaV5/bWypqeWH6ja+cXHppc86riMhSh57yqIUIgC6K+ku1wxN0vrDrxYaLv2r0V1fBeLj97+OnGuv6chJryf6HdK+Pmy5Zxi9R50Af21s0a/vJ6WCr7aNvjesiqcu1LSbC9y49LgwGxIU6qBs9c93rk/s0qNZf/RmT2sP9gKp/rv0sHpSe5oT1fV+dJ3a+2p00nu7X1/7ntpkuPp5Ufo9FRKddj+f8G6ta+ma+uz0udcG1eKoB6prfdF80u/ZapwUD9PYOQqmEQCYRgBgGgGAaQQAphEAmEYAYBoBgGkEAKYRAJhGAGAaAYBpBACmEQCYRgBgGgGAaQQAphEAmEYAYBoBgGkEAKYRAJhGAGAaAYBpBACmEQCYRgBgGgGAaQQAphEAmEYAYBoBgGkEAKYRAJhGAGAaAYBpBACmEQCYRgBgGgGAaQQAphEAmEYAYBoBgGkEAKYRAJhGAGAaAYBpBACmEQCYRgBgGgGAaf8D90hdnuQPUk4AAAAASUVORK5CYII="/>
                      </defs>
                    </svg>
                  </div>
                </template>
              </Input>
            </div>

          </template>


          <div class="col-12" style="margin: 12px 0">
            <div class="c-res-buy-pm__result__ratio">
              <div class="c-res-buy-pm__result__ratio__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M11.25 4.75L8.75 7L11.25 9.25" stroke="#0C8CE9" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M12.75 19.25L15.25 17L12.75 14.75" stroke="#0C8CE9" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M9.75 7H13.25C16.5637 7 19.25 9.68629 19.25 13V13.25" stroke="#0C8CE9" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14.25 17H10.75C7.43629 17 4.75 14.3137 4.75 11V10.75" stroke="#0C8CE9" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>
              نرخ تبدیل:
          </span>
              </div>
              <div v-if="type === 'buy'" class="c-res-buy-pm__result__ratio__value">
                1 Perfect Money =
                {{ addCommas(config.irtPm) }}
                Toman
              </div>
              <div v-if="type === 'sell'" class="c-res-buy-pm__result__ratio__value">
                1 Perfect Money =
                {{ addCommas(config.pmIrt) }}
                Toman
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="c-res-reward" v-if="account.referralCode">
      <div class="row">
        <div class="col-12">
          <div class="c-res-reward__row">
            <span class="c-res-reward__row__item"> کد معرف شما برای دوستانتان: </span>
            <span class="c-res-reward__row__value" @click="copyText(account.referralCode)">
            {{ account.referralCode }}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.5 15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5"
                stroke="#0C8CE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path
                d="M17.25 8.75H10.75C9.64543 8.75 8.75 9.64543 8.75 10.75V17.25C8.75 18.3546 9.64543 19.25 10.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V10.75C19.25 9.64543 18.3546 8.75 17.25 8.75Z"
                stroke="#0C8CE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          </div>
        </div>

        <div class="col-12">
          <div class="c-res-reward__row">
            <span class="c-res-reward__row__item">  یا لینک صفحه را برای دوستان خود به اشتراک بگذارید:  </span>

            <span class="c-res-reward__row__value"
                  @click="copyText(`https://panel.eterex.com/sign-enter-mobile/${account.referralCode}`)">
            Share link
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V14.75"
              stroke="#0C8CE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.25 9.25V4.75H14.75" stroke="#0C8CE9" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M19 5L11.75 12.25" stroke="#0C8CE9" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
          </span>
          </div>
        </div>

        <div class="col-12">
          <p class="c-res-reward__text">
            با اولین خرید و فروش پرفکت مانی توسط دوستان شما با استفاده از کد معرف یا لینک دعوت بالا، مبلغ 25،000 تومان
            به
            شما و مبلغ 25،000 تومان به دوست شما تعلق می گیرد.
            <br/>
            همچنین با تکمیل احراز هویت خود در پنل کاربری، مبلغ 25،000 تومان به
            شما و مبلغ 25،000 تومان به معرف شما تعلق می گیرد.
          </p>
        </div>

        <div class="col-12">
          <Button variant="primary" rounded @click.native="gotoPanel">
            رفتن به پنل اتراکس
          </Button>
        </div>
      </div>
    </div>
    <div class="c-res-application">
      <div class="row">
        <div class="col-12 text-center">
        <span class="c-res-application__title font-dana-bold">
          با اپلیکیشن اِتراِکس، در لحظه خرید و فروش کنید!
        </span>
          <div class="c-res-application__sub-title">
            دانلود اپلیکیشن اتراکس
          </div>
        </div>
        <div class="col-12 text-center c-res-application__container">
          <div class="c-res-application__buttons">
            <div class="c-res-application__buttons__icon">
              <img
                style="width:35px;max-width:50px"
                src="/assets/app-markets/android.svg"
                alt="android"
              >
            </div>
            <a class="c-res-application__buttons__link"
               href="http://cafebazaar.ir/app/?id=com.eterex&ref=share">
              <div style="width: 145px;height: 40px;">
                <img
                  style="object-fit: contain;height: 100%;"
                  src="/assets/app-markets/coffe-bazzar.svg"
                  alt="cafebazaar"
                >
              </div>
            </a>
            <a class="c-res-application__buttons__link"
               href="https://play.google.com/store/apps/details?id=com.eterex">
              <div style="width: 145px;height: 40px;">
                <img
                  style="object-fit: contain;height: 100%;"
                  src="/assets/app-markets/google-play.svg"
                  alt="google-play"
                >
              </div>
            </a>
            <a class="c-res-application__buttons__link"
               href="https://myket.ir/app/com.eterex">
              <div style="width: 145px;height: 40px;">
                <img
                  style="object-fit: contain;height: 100%;"
                  src="/assets/app-markets/myket.svg"
                  alt="myket"
                >
              </div>
            </a>

          </div>

          <div class="c-res-application__buttons">
            <div class="c-res-application__buttons__icon">
              <img
                style="width:25px;max-width:50px;margin-left: 5px;"
                src="/assets/app-markets/apple.svg"
                alt="apple"
              >
            </div>
            <a class="c-res-application__buttons__link"
               href="https://sibche.com/applications/eterax">
              <div style="width: 145px;height: 40px;">
                <img
                  style="object-fit: contain;height: 100%;"
                  src="/assets/app-markets/sibche.svg"
                  alt="sibche"
                >
              </div>
            </a>
            <a class="c-res-application__buttons__link"
               href="https://sibapp.com/applications/Eterex_cryptocurrencyexchange?from=search">
              <div style="width: 145px;height: 40px;">
                <img
                  style="object-fit: contain;height: 100%;"
                  src="/assets/app-markets/sib-app.svg"
                  alt="sibapp"
                >
              </div>
            </a>
            <a class="c-res-application__buttons__link"
               href="https://panel.eterex.com">
              <div style="width: 145px;height: 40px;">
                <img
                  style="object-fit: contain;height: 100%;"
                  src="/assets/app-markets/pwa.svg"
                  alt="pwa"
                >
              </div>
            </a>
          </div>

          <!-- <div class="c-res-application__buttons">
            <link-base class="c-res-application__buttons__link bazar"
              href="http://cafebazaar.ir/app/?id=com.eterex&ref=share" />

            <link-base class="c-res-application__buttons__link android"
              href="https://play.google.com/store/apps/details?id=com.eterex" target="_blank" />

            <link-base class="c-res-application__buttons__link download" :href="panelUrl + '/sign-in'">
              <div class="download-icon icon"></div>
              ورود به پنل کاربری
            </link-base>
          </div> -->
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
@import "assets/responsive";

.c-res-buy-pm {
  border-radius: 40px;
  background: #F6F8FE;
  box-shadow: 0px 40px 160px 0px rgba(126, 158, 181, 0.24);
  width: 95%;
  min-height: 350px;
  margin-top: 100px;
  margin-inline: auto;
  position: relative;
  z-index: 1;
  padding: 60px 20px;
  @include respond(md) {
    padding: 72px 116px;
    width: 680px;
  }

  &__icon {
    width: 60px;
    height: 60px;
    transform: rotate(45deg);
    flex-shrink: 0;
    border-radius: 24px 0px;
    background: #5496DB;
    position: absolute;
    top: -30px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    margin: auto;

    svg {
      transform: rotate(-45deg);
      width: 40px;
      height: 40px;
      flex-shrink: 0;
    }
  }

  &__header {
    &__title {
      color: #469AD8;
      text-align: center;
      leading-trim: both;
      text-edge: cap;
      font-kerning: none;
      font-feature-settings: 'salt' on;
      font-size: 23px;
      font-style: normal;
      font-weight: 700;
      line-height: 16px; /* 69.565% */
      margin-bottom: 32px;
    }

    &__subtitle {
      color: #6A8AA1;
      text-align: center;
      font-feature-settings: 'clig' off, 'liga' off;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px; /* 100% */
    }
  }

  &__gift {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    border-radius: 16px;
    background: linear-gradient(45deg, #469AD8 0%, #BF71EF 100%);
    height: 105px;
    padding: 16px;

    &__text {
      color: var(--user-pannel-original-white, #FFF);
      text-align: right;
      font-feature-settings: 'clig' off, 'liga' off;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 200%; /* 30px */
      @include respond(md) {
        font-size: 15px;
      }
    }

    &__img {
      width: 48px;
      height: 48px;
    }
  }

  &__result {
    margin-top: 40px;

    &__input {
      &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &__ratio {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 14px;
      @include respond(md) {
        font-size: 16px;
      }

      &__icon {
        display: inline-flex;
        margin-left: 8px;
      }

      &__value {
        direction: ltr;
      }
    }

    &__alert {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 14px;
      background-color: orange;
      padding: 12px 5px;
      border-radius: 8px;
      color: #fff;
      font-weight: bold;
      margin-bottom: 20px;
    }

    &__otp {
      direction: ltr;

      &__label {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 12px;
        color: #6A8AA1;
        text-align: right;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        font-variant: small-caps;
      }

      & > div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &__input {
        border-radius: 16px;
        border: 1px solid #DDE4ED;
        height: 45px;
        width: 45px;
        background-color: transparent;
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        color: #0C8CE9;
        @include respond(md) {
          height: 56px;
          width: 60px;
          font-size: 22px;
        }
      }
    }
  }


}

.c-res-reward {
  border-radius: 40px;
  background: #F6F8FE;
  box-shadow: 0px 40px 160px 0px rgba(126, 158, 181, 0.24);
  width: 95%;
  min-height: 350px;
  margin-top: 24px;
  position: relative;
  margin-inline: auto;
  z-index: 1;
  padding: 60px 20px;

  @include respond(md) {
    padding: 72px 116px;
    width: 680px;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 30px;

    &__item {
      color: #000;
      text-align: right;
      font-kerning: none;
      font-feature-settings: 'rclt' off, 'calt' off;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    &__value {
      color: #0C8CE9;
      font-kerning: none;
      font-feature-settings: 'rclt' off, 'calt' off;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  &__text {
    border-top: 1px solid #DDE4ED;
    color: #000;
    text-align: justify;
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    padding: 15px 0;
    line-height: 30px !important;
    margin-bottom: 40px;
  }
}

.c-res-application {
  margin-bottom: 100px;
  margin-inline: auto;
  border-radius: 40px;
  background: #F6F8FE;
  box-shadow: 0px 40px 160px 0px rgba(126, 158, 181, 0.24);
  width: 95%;
  min-height: 350px;
  margin-top: 24px;
  position: relative;
  z-index: 1;
  padding: 60px 20px;
  margin-bottom: 100px;
  @include respond(md) {
    padding: 72px 116px;
    width: 680px;
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

.resend-btn {
  font-size: 12px;
  color: #6494d5;
  font-weight: bold;
}
</style>
