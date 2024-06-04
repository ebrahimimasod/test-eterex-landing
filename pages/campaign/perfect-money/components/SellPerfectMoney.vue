<script>
import {defineComponent} from 'vue'
import Input from "~/pages/campaign/perfect-money/components/Input.vue";
import Button from "~/pages/campaign/perfect-money/components/Button.vue";
import {
  httpAuthRegister, httpCompletedRegister,
  httpSellPerfectMoney,
  httpVerifyOtp,
  redirectToPanel
} from "~/pages/campaign/perfect-money/helpers";
import NumberTools from "~/utils/NumberTools";
import {addCommas} from "@persian-tools/persian-tools";
import OtpInput from "@bachdgvn/vue-otp-input";

export default defineComponent({
  name: "SellPerfectMoney",
  components: {Button, Input, OtpInput},
  props: {
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
        phoneNumber: "",
      })
    },
  },
  data() {
    return {
      userFrom: {
        phoneNumber: "",
        referralCode: "",
        otpCode: "",
        loading: false,
        otpSent: false,
        otpVerified: false,
        validate: false,
      },
      fromAssetAmount: "",
      toAssetAmount: "",
      code: "",
      number: "",
      loading: false
    }
  },
  methods: {
    onValidatePhoneNumber(error) {
      this.userFrom.validate = !error
    },
    resetPhoneNumberInput() {
      this.userFrom = {
        ...this.userFrom,
        phoneNumber: "",
        referralCode: "",
        otpCode: "",
        loading: false,
        otpSent: false,
        otpVerified: false,
        validate: false,
      }
    },
    handleErrorResponse(error) {
      const {status, title, detail} = error?.response?.data ?? {};
      console.log({status, title, detail})
      switch (true) {
        case (status === 400 && title === 'ENTITY_ALREADY_EXISTS') : {
          redirectToPanel(this);
          break
        }
        case (status === 400 && detail === 'number or code is invalid!') : {
          this.$toast("کد های وارد شده صحیح نیستند.", {
            position: 'top-center',
            rtl: true,
            type: 'error'
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
    handleOnCompleteOTP(value) {
      this.userFrom.otpCode = value;
    },
    onUpdateFromAssetAmount(value) {
      this.fromAssetAmount = value;
      this.toAssetAmount = NumberTools.toFixed(value * this.config?.irtPm, 2)
    },
    onUpdateToAssetAmount(value) {
      this.toAssetAmount = value;
      this.fromAssetAmount = NumberTools.toFixed(value / this.config?.irtPm, 2)
    },
    async registerCompleted(temporaryPassword) {
      try {
        localStorage.removeItem('accessToken')
        const {data} = await httpCompletedRegister({
          temporaryPassword,
          referralCode: this.userFrom.referralCode,
        });
        localStorage.setItem('accessToken', data?.accessToken)
        return true;
      } catch (e) {
        const {status, title, detail} = e?.response?.data ?? {};
        if (status === 400 && title === 'INVALID_DATA') {
          this.$toast('کد معرف اشتباه وارد شده است.', {
            position: "top-center",
            type: 'error',
          });
        }
      }
      return false;
    },
    async verifyOtp() {
      this.userFrom.loading = true;
      try {
        const res = (await httpVerifyOtp(this.userFrom.phoneNumber, this.userFrom.otpCode))?.data
        const isUserRegistered = (await this.registerCompleted(res?.temporaryPassword));
        if (isUserRegistered) {
          this.userFrom.otpVerified = true;
        }else{
          this.userFrom.otpVerified = false;
          this.userFrom.otpSent = false;
          this.userFrom.otpCode = "";
        }
      } catch (e) {
        this.handleErrorResponse(e);
      }
      this.userFrom.loading = false;
    },
    async getOtpCode() {
      this.userFrom.loading = true;
      try {
        await httpAuthRegister(this.userFrom.phoneNumber)
        this.userFrom.otpSent = true;
      } catch (e) {
        this.handleErrorResponse(e);
      }
      this.userFrom.loading = false;
    },

    async submitSellPerfectMoney() {
      this.loading = true;
      try {
        const {fromAmount, toAmount} = (await httpSellPerfectMoney(this.code, this.number))?.data;
        this.$emit('onSuccess', {
          fromAmount,
          toAmount
        });
      } catch (e) {
        this.handleErrorResponse(e)
      }
      this.loading = false;
    }

  },
  computed: {
    isOtpVerified() {
      return this.userFrom.otpVerified
    },

    isOtpSent() {
      return this.userFrom.otpSent
    },

    getRatio() {
      return `1 Perfect Money = ${addCommas(this.config?.pmIrt)} Toman`;
    },

    formattedToAssetAmount() {
      if (this.toAssetAmount) {
        return addCommas(this.toAssetAmount) + " تومان ";
      }
      return null;
    },

    isButtonActive() {
      return !!(this.code && this.number && this.isOtpVerified && !this.loading);
    }
  },
  mounted() {
    if (this.account?.phoneNumber) {
      this.userFrom.phoneNumber = this.account?.phoneNumber;
      this.userFrom.otpCode = "";
      this.userFrom.loading = false;
      this.userFrom.otpSent = true;
      this.userFrom.otpVerified = true;
      this.userFrom.validate = true;
    }
  }
})
</script>

<template>
  <div class="sell-perfect-money">
    <div class="row">
      <div class="col-6" style="margin: 12px 0">
        <Input
          @validate="onValidatePhoneNumber"
          :rules="['phone_number','required']"
          type="tel"
          v-model="userFrom.phoneNumber"
          label="شماره همراه (به نام خودتان)"
          :disabled="isOtpVerified"
        >
          <template #suffix>
            <div @click="resetPhoneNumberInput" style="cursor: pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4.75 19.2499L9 18.2499L18.2929 8.95696C18.6834 8.56643 18.6834 7.93327 18.2929 7.54274L16.4571 5.70696C16.0666 5.31643 15.4334 5.31643 15.0429 5.70696L5.75 14.9999L4.75 19.2499Z"
                  stroke="#0C8CE9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19.25 19.25H13.75" stroke="#0C8CE9" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>
          </template>
        </Input>
      </div>
      <div class="col-6" style="margin: 12px 0">
        <Input
          :disabled="isOtpVerified"
          v-model="userFrom.referralCode"
          label="کد معرف (اختیاری)"
        />
      </div>
      <template v-if="!isOtpVerified">
        <div class="col-12" style="margin: 12px 0" v-if="this.isOtpSent">
          <div class="sell-perfect-money__otp">
            <label class="sell-perfect-money__otp__label">
              کد پیامک شده به شماره بالا
            </label>
            <otp-input
              ref="otpInput"
              input-classes="sell-perfect-money__otp__input"
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
            v-if="this.isOtpSent"
            :disabled="!userFrom.otpCode || userFrom.loading"
            @click.native="verifyOtp"
            :loading="userFrom.loading"
            variant="primary">
            تایید
          </Button>
          <Button
            v-else
            :disabled="!userFrom.validate || userFrom.loading"
            @click.native="getOtpCode"
            :loading="userFrom.loading"
            class="sell-perfect-money__otp-btn"
            variant="primary">
            ارسال کد
          </Button>
        </div>
      </template>

      <div class="col-6" style="margin:12px 0">
        <Input

          dir="ltr"
          type="number"
          label="مقدار پرفکت‌مانی واریزی"
          :value="fromAssetAmount"
          @input="onUpdateFromAssetAmount"
        >
          <template #prefix>
            <img src="/assets/perfect-money.svg" alt="">
          </template>
        </Input>
      </div>
      <div class="col-6" style="margin:12px 0">
        <Input
          dir="ltr"
          type="number"
          label="مقدار تومان دریافتی"
          :value="toAssetAmount"
          @input="onUpdateToAssetAmount"
          :help="formattedToAssetAmount"
        >
          <template #prefix>
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

          </template>
        </Input>
      </div>

      <div class="col-12">
        <div class="sell-perfect-money__ratio">
         <span class="sell-perfect-money__ratio__icon">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
           <path d="M12 12.5V15.5" stroke="#6A8AA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
           <path
             d="M12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10Z"
             fill="#6A8AA1"/>
           <path
             d="M12 19.25C16.0041 19.25 19.25 16.0041 19.25 12C19.25 7.99594 16.0041 4.75 12 4.75C7.99594 4.75 4.75 7.99594 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25Z"
             stroke="#6A8AA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
       </span>
          <span class="sell-perfect-money__ratio__title">
          نرخ تبدیل:
        </span>
          <span class="sell-perfect-money__ratio__value" style="margin-right: 5px" dir="ltr">
         {{ getRatio }}
        </span>
        </div>
      </div>

      <div class="col-12">
        <div class="sell-perfect-money__hr"></div>
      </div>

      <div class="col-6" style="margin: 12px 0">
        <Input
          :disabled="!isOtpVerified"
          type="number"
          v-model="number"
          label="کد ووچر"
          placeholder="کد 10 رقمی"
        >
        </Input>
      </div>
      <div class="col-6" style="margin: 12px 0">
        <Input
          :disabled="!isOtpVerified"
          v-model="code"
          type="number"
          label="کد فعال سازی"
          placeholder="کد 16 رقمی"
        />
      </div>

      <div class="col-12" style="margin: 12px 0">
        <Button
          @click.native="submitSellPerfectMoney"
          :loading="loading"
          :disabled="!isButtonActive"
          variant="danger"
          rounded>
          ثبت سفارش فروش
        </Button>
      </div>


    </div>
  </div>
</template>

<style lang="scss">
@import "/assets/responsive";

.sell-perfect-money {
  &__hr {
    height: 1px;
    border-bottom: 1px dashed #DDE4ED;
    margin: 6px 0;
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
        width: 76px;
        font-size: 22px;
      }
    }
  }

  &__ratio {
    color: #6A8AA1;
    text-align: right;
    leading-trim: both;
    text-edge: cap;
    font-kerning: none;
    font-feature-settings: 'rclt' off, 'calt' off;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &__icon {
      margin-top: 5px;
      position: relative;
    }
  }
}
</style>
