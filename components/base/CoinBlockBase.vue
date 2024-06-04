<template>
  <div class="c-coinBlock">
    <div
      class="c-coinBlock__head"
      :class="{ active: collapseOpen }"
      @click="collapseOpen = !collapseOpen"
    >
      <div class="c-coinBlock__info">
        <coin-info-base :symbol="symbol" :name="name"/>
      </div>

      <!-- wallet view -->
      <span v-if="!coinsPage" class="c-coinBlock__amount">
        {{ amountValue }}
      </span>
      <span v-if="!coinsPage" class="c-coinBlock__fiatPrice">
        {{ fiatPrice }}
      </span>
      <span v-if="!coinsPage" class="c-coinBlock__usdtPrice">
        ${{ usdtPrice }}
      </span>
      <!-- end wallet view -->

      <!-- coins page view -->
      <div
        v-if="coinsPage"
        class="c-coinBlock__numbers"
        :class="{ usdt: symbol.toLowerCase() === 'usdt' }"
      >
        <span class="c-coinBlock__numbers__price">{{
            addCommasMethod(usdtPrice)
          }}</span>
        <span v-if="Number(percent)" class="c-coinBlock__numbers__percent" :class="styleClass" :style="{color:color}">
          {{ percent }} {{ arrow }}
        </span>
      </div>

      <div v-if="coinsPage" class="c-coinBlock__trades">
        <span class="c-coinBlock__price">{{ addCommasMethod(trades) }}</span>
      </div>
      <div v-if="coinsPage" class="c-coinBlock__volume">
        <span class="c-coinBlock__price">{{
            addCommasMethod(assetVolume)
          }}</span>
      </div>

      <!-- end coins page view -->

      <link-base
        :disabled="symbol === 'USDT'"
        class="c-coinBlock__info-link"
        :to="{ name: 'coin', params: { symbol: symbol.toLowerCase() } }"
      >
        اطلاعات بیشتر
      </link-base>

      <link-base
        class="c-coinBlock__buy-link"
        :href="panelUrl + '/exchange/irt/' + symbol.toLowerCase()"
      >خرید
      </link-base>
    </div>
  </div>
</template>

<script>
// import IconArrowDown from '../icons/IconArrowDown.vue';
import PersianTools from '@/utils/PersianTools'
import NumberTools from '@/utils/NumberTools'

export default {
  name: 'CoinBlock',
  components: {
    // IconArrowDown,
  },

  props: {
    amount: {
      type: String,
      required: false,
      default: '',
    },

    fiatPrice: {
      type: String || Number,
      required: false,
      default: '',
    },

    usdtPrice: {
      type: String || Number,
      required: false,
      default: '',
    },

    symbol: {
      type: String,
      required: false,
      default: '',
    },

    name: {
      type: String,
      required: false,
      default: '',
    },

    coinsPage: {
      type: Boolean,
      required: false,
      default: false,
    },

    percent: {
      type: String,
      default: '',
    },

    trades: {
      type: String || Number,
      default: '',
    },

    assetVolume: {
      type: String || Number,
      default: '',
    },

    arrow: {
      type: String,
      default: '',
    },

    styleClass: {
      type: String,
      default: '',
    },

    color: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      collapseOpen: false,
      panelUrl: 'https://panel.eterex.com',
    }
  },

  computed: {
    amountValue() {
      if (
        this.symbol.toLowerCase() === 'irt' ||
        this.amount === '0' ||
        this.amount === 0
      ) {
        return parseInt(this.amount)
      } else if (
        parseFloat(this.amount) % 1 !== 0 &&
        this.amount.split('.')[1].length > 7
      ) {
        return this.toFixedNoRounding(this.amount, 7)
      } else {
        return this.amount
      }
    },
  },

  methods: {
    addCommasMethod(input) {
      return PersianTools.addCommasMethod(input)
    },

    toFixedNoRounding(input, fixed) {
      return NumberTools.toFixedNoRounding(input, fixed)
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';
@import '@/assets/_direction.scss';

$colorGain: #00d478;
$colorGainText: #57da9b;
$colorLoss: #ff3952;
$colorLossText: #ee5656;

.c-coinBlock {
  border-radius: var(--border-sm);
  border: solid 1px var(--color-14);
  margin-bottom: 8px;

  &__buy-link {
    background: rgba(42, 106, 227, 0.1);
    border-radius: 14px;
    color: #0934f3;
    font-weight: 700;
    font-size: 16px;
    line-height: 25px;
    padding: 8px 24px;
    // width: 42px;
    text-align: center;
    border: none;
    flex: 0 !important;
  }

  &__info-link {
    display: none !important;

    @include respond(md) {
      background: rgba(42, 106, 227, 0.1);
      color: #0934f3;
      border-radius: 14px;
      padding: 8px 24px;
      max-width: fit-content;
      margin-left: 12px;
      font-size: 16px;
      font-weight: 700;
      display: block !important;
    }
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 52px;
    padding: 0 8px;
    position: relative;
    z-index: 2;
    background-color: #ffffff;
    border-top-left-radius: var(--border-sm);
    border-top-right-radius: var(--border-sm);
    border-radius: var(--border-sm);

    // &:hover {
    //   background-color: var(--color-14);
    // }

    & > * {
      flex: 1;
    }

    .c-button {
      flex: 0;
      min-width: 32px;
      height: 32px;
    }

    .icon {
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  &__info {
    display: flex;
    align-items: center;

    .c-link {
      height: 20px !important;
      font-size: 12px !important;
      padding: 0 4px !important;
      border-radius: var(--border-xxxsm) !important;

      &:first-child {
        margin-bottom: 4px;

        @include respond(md) {
          margin-bottom: 0;
        }

        @include rtl {
          @include respond(md) {
            margin-left: 4px;
          }
        }

        @include ltr {
          @include respond(md) {
            margin-right: 4px;
          }
        }
      }
    }
  }

  &__amount,
  &__fiatPrice,
  &__usdtPrice,
  &__trades,
  &__volume {
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: #000000;

    @include respond(md) {
      font-weight: 500;
      font-size: 16px;
      line-height: 25px;
    }
  }

  

  &__fiatPrice,
  &__usdtPrice,
  &__trades {
    display: none;

    @include respond(lg) {
      display: block;
    }
  }
  

  &__numbers {
    display: none;
    flex-direction: column;
    font-size: 12px;
    @include respond(lg) {
      display: flex;
    }

    &__price {
      font-size: 16px;
      text-align: right;

      @include respond(md) {
        //  margin-left: 40px;
      }

      direction: ltr;
    }

    &__percent {
      letter-spacing: -0.02px;
      font-size: 11px;
      text-align: right;
      // margin-left: 16px;

      @include respond(md) {
        //  margin-left: 40px;
      }

      direction: ltr;
    }

    .gain {
      color: $colorGain;
      direction: ltr;
    }

    .loss {
      color: $colorLoss;
      direction: ltr;
    }
  }
}
</style>
