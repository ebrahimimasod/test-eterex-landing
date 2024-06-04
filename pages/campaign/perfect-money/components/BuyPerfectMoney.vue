<script>
import {defineComponent} from 'vue'
import Input from "~/pages/campaign/perfect-money/components/Input.vue";
import Button from "~/pages/campaign/perfect-money/components/Button.vue";
import OtpInput from "@bachdgvn/vue-otp-input";
import {
  httpAuthRegister, httpBuyPerfectMoney,
  httpCompletedRegister, httpDepositRequest, httpGetConfig,
  httpMatchCardNumber, httpMatchNationalCode,
  httpVerifyOtp, httpVoucherCreatePerfectMoney, redirectToPanel
} from "~/pages/campaign/perfect-money/helpers.js";
import {addCommas} from "@persian-tools/persian-tools";
import NumberTools from "~/utils/NumberTools";
import {isSSR} from "~/utils/Helpers";


const MAX_IRT_LIMIT = 2000000;
const MIN_IRT_LIMIT = 50000;
export default defineComponent({

  name: "BuyPerfectMoney",

  components: {
    Input,
    OtpInput,
    Button,
    DatePicker: () => {
      if (!isSSR()) {
        return import("../components/DatePicker.vue")
      }

    }
  },

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
        referralCode: "",
        phoneNumber: "",
      })
    },
    bankCards: {
      type: Array,
      default: () => ([]),
    },
    verifications: {
      type: Object,
      default: () => ({mainNumberOwnership: false}),
    },
  },

  data() {
    return {
      userFrom: {
        step1: {
          phoneNumber: "",
          referralCode: "",
          otpCode: "",
          loading: false,
          otpSent: false,
          otpVerified: false,
          validate: false,
        },
        step2: {
          nationalCode: "",
          birthDate: "",
          cardNumber: "",
          nationalCodeValidate: false,
          cardNumberValidate: false,
        }
      },
      fromAssetAmount: "",
      toAssetAmount: "",
      loading: false,
    }
  },

  computed: {
    isOtpSent() {
      return this.userFrom.step1.otpSent
    },

    isOtpVerified() {
      return this.userFrom.step1.otpVerified
    },

    getRatio() {
      return `1 Perfect Money = ${addCommas(this.config?.irtPm)} Toman`;
    },

    formattedFromAssetAmount() {
      if (this.fromAssetAmount) {
        return addCommas(this.fromAssetAmount) + " تومان ";
      }
      return null;
    },

    isValidateUserFormStep2() {
      console.log({
        isOtpVerified: this.isOtpVerified,
        cardNumberValidate: this.userFrom.step2.cardNumberValidate,
        nationalCodeValidate: this.userFrom.step2.nationalCodeValidate,
        birthDate: this.userFrom.step2.birthDate,
        fromAssetAmount: this.fromAssetAmount,
        toAssetAmount: this.toAssetAmount,
      })
      return !!(
        this.isOtpVerified &&
        this.userFrom.step2.cardNumberValidate &&
        this.userFrom.step2.nationalCodeValidate &&
        this.userFrom.step2.birthDate &&
        this.fromAssetAmount &&
        this.toAssetAmount
      );
    }

  },

  methods: {
    handleOnCompleteOTP(value) {
      this.userFrom.step1.otpCode = value;
    },

    resetPhoneNumberInput() {
      this.userFrom = {
        step1: {
          phoneNumber: "",
          referralCode: "",
          otpCode: "",
          loading: false,
          otpSent: false,
          otpVerified: false,
          validate: false,
        },
        step2: {
          nationalCode: "",
          birthDate: "",
          cardNumber: ""
        }
      }
    },

    onUpdateFromAssetAmount(value) {
      if (Number(value) > MAX_IRT_LIMIT) {
        this.$toast(`حداکثر مقدار واریز ${addCommas(MAX_IRT_LIMIT)}تومان است. `, {
          type: 'warning',
          position: 'top-center'
        });
      }
      this.fromAssetAmount = value;
      this.toAssetAmount = NumberTools.toFixed(value / this.config?.irtPm, 2)
    },

    onUpdateToAssetAmount(value) {
      if (Number(value * this.config?.irtPm) > MAX_IRT_LIMIT) {
        this.$toast(`حداکثر مقدار واریز ${addCommas(MAX_IRT_LIMIT)}تومان است. `, {
          type: 'warning',
          position: 'top-center'
        });
      }
      this.toAssetAmount = value;
      this.fromAssetAmount = value * this.config?.irtPm
    },

    onValidatePhoneNumber(error) {
      this.userFrom.step1.validate = !error
    },

    onValidateNationalCode(error) {
      this.userFrom.step2.nationalCodeValidate = !error
    },

    onValidateBankCard(error) {
      this.userFrom.step2.cardNumberValidate = !error
    },

    async getOtpCode() {
      this.userFrom.step1.loading = true;
      try {
        await httpAuthRegister(this.userFrom.step1.phoneNumber)
        this.userFrom.step1.otpSent = true;
      } catch (e) {
        this.handleErrorResponse(e);
      }
      this.userFrom.step1.loading = false;
    },

    async verifyOtp() {

      this.userFrom.step1.loading = true;
      try {
        const res = (await httpVerifyOtp(this.userFrom.step1.phoneNumber, this.userFrom.step1.otpCode))?.data
        const isUserRegistered = (await this.registerCompleted(res?.temporaryPassword));
        if (isUserRegistered) {
          this.userFrom.step1.otpVerified = true;
        } else {
          this.userFrom.step1.otpVerified = false;
          this.userFrom.step1.otpCode = "";
          this.userFrom.step1.otpSent = false;
        }

      } catch (e) {
        this.handleErrorResponse(e);
      }
      this.userFrom.step1.loading = false;
    },

    handleErrorResponse(error) {
      const {status, title, detail} = error?.response?.data;
      console.log({status, title, detail})

      switch (true) {
        case (status === 400 && title === 'ENTITY_ALREADY_EXISTS') : {
          redirectToPanel(this);
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

    async registerCompleted(temporaryPassword) {
      try {
        localStorage.removeItem('accessToken')
        const {data} = await httpCompletedRegister({
          temporaryPassword,
          referralCode: this.userFrom.step1.referralCode,
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

    async matchNationalCode() {
      try {
        await httpMatchNationalCode({
          nationalCode: this.userFrom.step2.nationalCode,
          birthDate: this.userFrom.step2.birthDate,
          countryCode: "98",
          number: this.userFrom.step1.phoneNumber,
        });
        return true;
      } catch (e) {
        console.log(e)
      }
      return false;
    },

    async matchCardNumber() {
      try {
        await httpMatchCardNumber({
          cardNumber: this.userFrom.step2.cardNumber,
        });
        return true;
      } catch (e) {
        const {status, title} = e?.response?.data ?? {};

        if (status === 429 && title === 'MAX_RETRY') {
          redirectToPanel(this, "تعداد دفعات مجاز استعلام شماره کارت تمام شده است . لطفا جهت تایید کارت خود به پنل کاربری رفته و با پشتیبانی تماس بگیرید");
        }

        if (status === 400 && title === 'ENTITY_ALREADY_EXISTS' && localStorage.getItem('accessToken')) {
          redirectToPanel(this);
        }
        console.log(e)
      }

      return false;
    },

    async depositRequest() {

      // check min amount
      if (this.fromAssetAmount < MIN_IRT_LIMIT) {
        this.$toast(`حداقل مقدار واریز ${addCommas(MIN_IRT_LIMIT)}تومان است. `, {
          type: 'warning',
          position: 'top-center'
        });
        return
      }

      // check max amount
      if (this.fromAssetAmount > MAX_IRT_LIMIT) {
        this.$toast(`حداکثر مقدار واریز ${addCommas(MAX_IRT_LIMIT)}تومان است. `, {
          type: 'warning',
          position: 'top-center'
        });
        return
      }


      this.loading = true;

      let nationalCodeStatus = true;
      let cardNumberStatus = true;
      let isMatching = true;


      if (this.verifications.mainNumberOwnership) {
        const accountNationalCode = this.account.nationalCode === this.userFrom.step2.nationalCode;
        const accountBirthDate = this.account.birthDate === this.userFrom.step2.birthDate;
        const accountBankCard = this.bankCards.includes(this.userFrom.step2.cardNumber);

        isMatching = !(accountNationalCode && accountBirthDate && accountBankCard);
      }


      if (isMatching) {
        nationalCodeStatus = await this.matchNationalCode()
        cardNumberStatus = await this.matchCardNumber()
      }


      if (!nationalCodeStatus) {
        this.$toast('شماره موبایل باید متعلق به خودتان باشد. ', {
          type: 'warning',
          position: 'top-center'
        });
        this.loading = false;
        return;
      }
      if (!cardNumberStatus) {
        this.$toast('کارت بانکی باید متعلق به خودتان باشد.', {
          type: 'warning',
          position: 'top-center'
        });
        this.loading = false;
        return;
      }

      try {

        const {data} = await httpDepositRequest({
          amount: this.fromAssetAmount,
          asset: 'IRT'
        })
        this.$toast('در حال رفتن به درگاه بانکی...', {
          type: 'info',
          position: 'top-center'
        });

        setTimeout(() => {
          window.location.href = data?.payLink;
        }, 4000);
      } catch (e) {
        console.log(e)
      }

      this.loading = false;
    },

  },

  mounted() {
    if (this.account?.phoneNumber) {
      this.userFrom.step1.phoneNumber = this.account?.phoneNumber;
      this.userFrom.step1.otpCode = "";
      this.userFrom.step1.loading = false;
      this.userFrom.step1.otpSent = true;
      this.userFrom.step1.otpVerified = true;
      this.userFrom.step1.validate = true;
    }
  }

})
</script>

<template>
  <div class="buy-perfect-money">
    <div class="row">
      <div style="margin-bottom: 12px" class="col-6">
        <Input
          @validate="onValidatePhoneNumber"
          :rules="['phone_number','required']"
          type="tel"
          v-model="userFrom.step1.phoneNumber"
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
      <div class="col-6" style="margin-bottom: 12px">
        <Input
          :disabled="isOtpVerified"
          v-model="userFrom.step1.referralCode"
          label="کد معرف (اختیاری)"
        >
        </Input>
      </div>
      <template v-if="!isOtpVerified">
        <div class="col-12" style="margin: 12px 0" v-if="this.isOtpSent">
          <div class="buy-perfect-money__otp">
            <label class="buy-perfect-money__otp__label">
              کد پیامک شده به شماره بالا
            </label>
            <otp-input
              ref="otpInput"
              input-classes="buy-perfect-money__otp__input"
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
            :disabled="!userFrom.step1.otpCode || userFrom.step1.loading"
            @click.native="verifyOtp"
            :loading="userFrom.step1.loading"
            variant="primary">
            تایید
          </Button>
          <Button
            v-else
            :disabled="!userFrom.step1.validate || userFrom.step1.loading"
            @click.native="getOtpCode"
            :loading="userFrom.step1.loading"
            class="buy-perfect-money__otp-btn"
            variant="primary">
            ارسال کد
          </Button>

        </div>
      </template>
      <div class="col-6" style="margin: 12px 0">
        <Input
          @validate="onValidateNationalCode"
          :rules="['national_code']"
          :disabled="!isOtpVerified"
          v-model="userFrom.step2.nationalCode"
          label="کد ملی"
        >
        </Input>
      </div>
      <div class="col-6" style="margin: 12px 0">
        <client-only>
          <DatePicker
            :disabled="!isOtpVerified"
            v-model="userFrom.step2.birthDate"
            label="تاریخ تولد"
          >
          </DatePicker>
        </client-only>
      </div>
    </div>
    <div class="col-12" style="margin:12px 0">
      <Input
        :rules="['bank_card']"
        :disabled="!isOtpVerified"
        v-model="userFrom.step2.cardNumber"
        label="شماره کارت 16 رقمی (به نام خودتان)"
        @validate="onValidateBankCard"
      />
    </div>
    <div class="col-6" style="margin:12px 0">
      <Input
        :disabled="config.loading"
        dir="ltr"
        type="number"
        label="مقدار تومان پرداختی"
        :value="fromAssetAmount"
        @input="onUpdateFromAssetAmount"
        :help="formattedFromAssetAmount"
      >
        <template #prefix>
          <img src="/assets/irt.svg" alt="">
        </template>
      </Input>
    </div>
    <div class="col-6" style="margin:12px 0">
      <Input
        :disabled="config.loading"
        dir="ltr"
        type="number"
        label="مقدار پرفکت‌مانی دریافتی"
        :value="toAssetAmount"
        @input="onUpdateToAssetAmount"
      >
        <template #prefix>
          <img src="/assets/perfect-money.svg" alt="">
        </template>
      </Input>
    </div>
    <div class="col-12" style="margin:12px 0">
      <div class="buy-perfect-money__ratio">
         <span class="buy-perfect-money__ratio__icon">
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
        <span class="buy-perfect-money__ratio__title">
          نرخ تبدیل:
        </span>
        <span class="buy-perfect-money__ratio__value" style="margin-right: 5px" dir="ltr">
         {{ getRatio }}
        </span>
      </div>
    </div>
    <div class="col-12" style="margin:12px 0">
      <Button variant="success"
              rounded
              :loading="loading"
              :disabled="!isValidateUserFormStep2"
              @click.native="depositRequest">
        ثبت سفارش خرید
      </Button>
    </div>
  </div>
  </div>
</template>

<style lang="scss">
@import "assets/responsive";

.buy-perfect-money {
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
