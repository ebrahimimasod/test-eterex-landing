<template>
  <section class="c-price-banner">
    <h2 class="c-price-banner__title font-dana-bold">قیمت رمزارز‌ها</h2>

    <p class="c-price-banner__sub-title">
      به راحتی تغییرات قیمت ارزهای خود را در سامانه اِتراِکس مشاهده کنید.
    </p>

    <CoinsList
      :dashboard-view="true"
      :irt-usdt-price="irtUsdtPrice"
      :usdt-irt-price="usdtIrtPrice"
    />
  </section>
</template>

<script>
import CoinsList from '@/components/price/CoinsList.vue'
import Configs from '@/httpservices/Configs'

export default {
  name: 'FeaturesBanner',
  components: {
    CoinsList,
  },

  data() {
    return {
      irtUsdtPrice: 0,
      usdtIrtPrice: 0,
    }
  },

  async fetch() {
    try {
      const response = await Configs.getConfigs()

      this.irtUsdtPrice = response.data.irtUsdt
      this.usdtIrtPrice = response.data.usdtIrt
    } catch (e) {}
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.c-price-banner {
  &__title {
    color: #12377b;
    font-weight: 900;
    font-size: 25px;
    line-height: 56px;
    margin-bottom: 8px;
    margin-top: 32px;
    @include respond(lg) {
      font-size: 40px;
    }
  }

  &__sub-title {
    color: #000000;
    opacity: 0.75;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    margin-top: 0;
    margin-bottom: 24px;

    @include respond(lg) {
      margin-bottom: 40px;
    }
  }
}
</style>
