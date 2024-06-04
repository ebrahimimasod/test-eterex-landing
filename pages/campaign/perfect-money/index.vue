<script>
import { generateMetaData } from '@/utils/Helpers'
import {defineComponent, nextTick} from 'vue'
import BuyPerfectMoney from "~/pages/campaign/perfect-money/components/BuyPerfectMoney.vue";
import SellPerfectMoney from "~/pages/campaign/perfect-money/components/SellPerfectMoney.vue";
import Loading from "~/pages/campaign/perfect-money/components/Loading.vue";
import {
  httpBankCards,
  httpBuyPerfectMoney,
  httpGetAccount,
  httpGetConfig, httpUserVerifications,
} from "~/pages/campaign/perfect-money/helpers";
import Response from "~/pages/campaign/perfect-money/components/Response.vue";
import NumberTools from "~/utils/NumberTools";
import GiftCard from "~/pages/campaign/perfect-money/components/GiftCard.vue";

export default defineComponent({
  name: "index",
  layout: 'PMcampaign',
  components: {
    GiftCard,
    Response,
    Loading,
    BuyPerfectMoney,
    SellPerfectMoney
  },
  data() {
    return {
      tabActive: 1,
      config: {
        loading: true,
        data: {
          pmIrt: "",
          irtPm: ""
        }
      },
      response: {
        status: false,
        type: 'buy', // sell OR buy
        fromAmount: "",
        toAmount: "",
      },
      account: {
        loading: false,
        data: {
          referralCode: "",
          phoneNumber: "",
          nationalCode: "",
          birthDate: "",
        }
      },
      bankCards: {
        loading: false,
        cards: [],
      },
      userVerifications: {
        loading: false,
        mainNumberOwnership: false,
      }
    }
  },
  head: generateMetaData('خرید و فروش پرفکت مانی'),
  computed: {
    isLoading() {
      return !!(this.config.loading && this.account.loading);
    }
  },
  methods: {
    async fetchConfig() {
      this.config.loading = true;
      const {data} = await httpGetConfig();
      this.config.data = {
        pmIrt: data?.pmIrt,
        irtPm: data.irtPm
      };
      this.config.loading = false;
    },

    async fetchUserAccount() {
      this.account.loading = true;
      try {
        const {data} = await httpGetAccount();
        this.account.data = {
          ...this.account.data,
          referralCode: data?.referralCode,
          phoneNumber: "0" + data?.cellPhone?.number,
          nationalCode: data?.nationalCode,
          birthDate: data?.birthDate,
        };
      } catch (e) {
        console.log(e)
      }
      this.account.loading = false;
    },

    async fetchUserBankCards() {
      this.bankCards.cards = [];
      try {
        this.bankCards.loading = true;
        const {data} = await httpBankCards();
        this.bankCards.cards = data.filter(i => i.status === 'Approved').map(i => i.cardNumber);
      } catch (e) {
        console.log(e)
      }

      this.bankCards.loading = false;
    },

    async fetchUserVerification() {
      try {
        this.userVerifications.loading = true;
        this.userVerifications.mainNumberOwnership = false;
        const {data} = await httpUserVerifications();
        data.forEach(i => {
          if (i.step === 'MainNumberOwnership' && i.state === 'Approved') {
            this.userVerifications.mainNumberOwnership = true;
          }
        })
      } catch (e) {
        console.log(e)
      }
      this.userVerifications.loading = false;
    },

    async completeBuyPerfectMoney(irtAmount) {
      try {
        const {toAmount} = (await httpBuyPerfectMoney(irtAmount))?.data;
        this.response = {
          ...this.response,
          type: 'buy',
          status: true,
          code: "",
          number: "",
          fromAmount: irtAmount,
          toAmount: NumberTools.toFixed(toAmount, 2),
        }
      } catch (e) {
        const {status, title, detail} = e?.response?.data;
        switch (true) {
          case (status === 400 && title === 'INSUFFICIENT_CREDIT') : {
            this.$toast('موجودی ریالی کیف پول شما کافی نیست.', {
              position: 'top-center',
              type: "warning"
            });
            break
          }
        }
      }

    },

    onSuccessSellPerfectMoney({fromAmount, toAmount}) {
      this.response = {
        ...this.response,
        status: true,
        type: 'sell',
        fromAmount,
        toAmount
      }
    },

    onCreateVoucherPerfectMoney({code, number}) {
      console.log({code, number})
      this.response = {
        ...this.response,
        status: true,
        type: 'buy',
        number,
        code
      }
    }
  },
  mounted() {
    nextTick(async () => {
      if (localStorage.getItem('accessToken')) {
        await this.fetchUserAccount();
        this.fetchUserBankCards();
        this.fetchUserVerification();
      }
      this.fetchConfig();
      const amountFromGateway = this.$route?.query?.Amount;
      if (amountFromGateway) {
        this.completeBuyPerfectMoney(amountFromGateway);
      }
    });
  }
})
</script>

<template>
  <div class="cpm__container">
    <template v-if="isLoading">
      <div class="cpm__container__loading">
        <Loading :size="60"/>
      </div>
    </template>
    <template v-else>
      <Response
        v-if="response.status"
        :type="response.type"
        :to-amount="response.toAmount"
        :from-amount="response.fromAmount"
        :config="config.data"
        :account="account.data"
        @onCreateVoucherPerfectMoney="onCreateVoucherPerfectMoney"
      />
      <template v-else>

        <GiftCard/>

        <div class="cpm__container__card">
          <div class="cpm__container__card__header">
            <div
              @click="tabActive = 1"
              :class="['cpm__container__card__header__text',tabActive === 1 && 'active']">خرید پرفکت مانی
            </div>
            <div
              @click="tabActive = 2"
              :class="['cpm__container__card__header__text',tabActive === 2 && 'active']">فروش پرفکت مانی
            </div>
          </div>
          <div class="cpm__container__card__body">
            <BuyPerfectMoney
              v-if="tabActive === 1"
              :account="account.data"
              :config="config.data"
              :bank-cards="bankCards.cards"
              :verifications="userVerifications"
            />
            <SellPerfectMoney
              v-if="tabActive===2"
              @onSuccess="onSuccessSellPerfectMoney"
              :account="account.data"
              :config="config.data"

            />
          </div>
        </div>
      </template>

    </template>
  </div>
</template>

<style scoped lang="scss">
@import "assets/responsive";

.cpm__container {
  background: url("/assets/bg-cover.jpg") no-repeat center;
  background-size: cover !important;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;

  &::before {
    width: 100%;
    border-radius: 24px 24px 0px 0px;
    background: rgba(246, 248, 254, 0.8);
    backdrop-filter: blur(25px);
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 70%;
    z-index: 0;
    @include respond(md) {
      height: 78%;
    }
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 200px 0;
  }

  &__card {
    border-radius: 40px;
    background: #F6F8FE;
    box-shadow: 0px 40px 160px 0px rgba(126, 158, 181, 0.24);
    width: 95%;
    min-height: 350px;
    margin-bottom: 100px;
    overflow: hidden;
    position: relative;
    z-index: 1;

    @include respond(md) {
      width: 680px;
    }

    &__header {
      height: 55px;
      background-color: #EEF0F6;
      border-bottom: 1px solid #DDE4ED;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      @include respond(md) {
        height: 72px;
      }


      &__text {
        color: #7E9EB5;
        font-size: 14px;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        cursor: pointer;
        user-select: none;

        @include respond(md) {
          font-size: 18px;
        }

        &.active {
          color: #000000;
          background-color: #F6F8FE;
        }
      }

    }

    &__body {
      padding: 25px 5px;

      @include respond(md) {
        padding: 56px;
      }
    }
  }

}
</style>
