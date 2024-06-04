<template>
  <div class="container">
    <div class="v-markets">
      <div class="v-markets__coin-list">
        <CoinsList />
      </div>
    </div>
  </div>
</template>

<script>
import CoinsList from '@/components/price/CoinsList.vue'
import { generateMetaData } from '@/utils/Helpers'

export default {
  name: 'MarketsPage',
  components: {
    CoinsList,
  },

  head: generateMetaData('قیمت ارزهای دیجیتال',
    {
      description: 'با اپلیکیشن اِتراِکس، قیمت انواع ارزهای دیجیتال را مشاهده و پس از تحلیل و بررسی های لازم در لحظه خرید و فروش کنید! اتراکس تجربه جذاب سرمایه گذاری در ارزهای دیجیتال',
    }),
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.v-markets {
  &__coin-list {
    padding-top: 132px;

    @include respond(lg) {
      padding-top: 152px;
    }
  }
}
</style>
