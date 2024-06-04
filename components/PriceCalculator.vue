<template>
  <div class="c-price-calculator">
    <h3 class="c-price-calculator__title">
      معامله
      {{ name }}
    </h3>

    <label class="c-price-calculator__input-label">پرداخت می‌کنم</label>
    <div class="c-price-calculator__input">
      <div class="row no-gutters">
        <div class="col-8">
          <input
            v-model="fromAmount"
            class="c-price-calculator__input__amount"
            label="مقدار پرداختی"
            placeholder="مقدار را وارد کنید"
            type="text"
            @input="changeAmount"
          />
        </div>
        <div class="col-4">
          <SelectBase
            v-model="selectedUnit"
            :options="coinsList"
            item-key="symbol"
          >
            <template #selected="{ option }">
              <IconProvider
                class="ml-2"
                :src="option.icon"
                width="20px"
                height="20px"
              />
              <div>
                {{ option.name }}
              </div>
            </template>

            <template #option="{ option }">
              <IconProvider class="ml-2" :src="option.icon" width="20px"/>
              <div>
                {{ option.name }}
              </div>
            </template>
          </SelectBase>
        </div>
      </div>
    </div>

    <label class="c-price-calculator__input-label">دریافت می‌کنم</label>
    <div class="c-price-calculator__input">
      <div class="row no-gutters">
        <div class="col-8">
          <input
            v-model="toAmount"
            class="c-price-calculator__input__amount"
            label="مقدار دریافتی"
            placeholder="مقدار را وارد کنید"
            type="text"
            @input="changeToAmount"
          />
        </div>
        <div class="col-4">
          <div class="c-price-calculator__input__label">
            <IconProvider
              v-if="getCoin.icon"
              class="ml-2"
              width="20px"
              height="20px"
              :src="getCoin.icon"
            />
            <div>
              {{ getCoin.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">قیمت 1 {{ name }}</div>
      <div class="col-6 text-left">
        {{ getUnitPriceFiat }}
        تومان
      </div>
    </div>

    <link-base class="c-price-calculator__button" :href="getBuyCoinLink">
      همین الان خرید میکنم
    </link-base>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css'
import {removeCommas} from '@persian-tools/persian-tools'
import Vue from 'vue'
import PersianTools from '~/utils/PersianTools'
import NumberTools from '~/utils/NumberTools'
import SelectBase from '~/components/base/SelectBase'
import IconProvider from '~/components/base/IconProvider/IconProvider'
import {getAssetIconUrl} from "~/utils/Helpers";


export default {
  name: 'PriceCalculator',

  components: {IconProvider, SelectBase},

  props: {
    name: {
      type: String,
      default: '',
    },

    symbol: {
      type: String,
      default: '',
    },

    usdPrice: {
      type: [String, Number],
      default: '0',
    },

    fiatToCryptoPrice: {
      type: [String, Number],
      default: '0',
    },

    cryptoToFiatPrice: {
      type: [String, Number],
      default: '0',
    },
  },

  data() {
    return {
      coinsList: [
        {
          name: 'تومان',
          symbol: 'IRT',
          icon: getAssetIconUrl('IRT'),
          selected: true,
        },
      ],
      selectedUnit: {
        name: 'تومان',
        symbol: 'IRT',
        icon: getAssetIconUrl('IRT'),
        selected: true,
      },
      fromAmount: 0,
      toAmount: 1,
    }
  },

  computed: {
    getCoin() {
      if (this.selectedUnit) {
        return (
          this.coinsList.find(
            (item) => item.symbol !== this.selectedUnit.symbol
          ) || {}
        )
      }
      return {}
    },
    getBuyCoinLink() {
      return `https://panel.eterex.com/exchange/${this.selectedUnit.symbol}/${this.getCoin.symbol}`
    },
    getUnitPriceFiat() {
      return this.addCommasMethod(parseInt(this.usdPrice * this.cryptoToFiatPrice));
    }
  },

  watch: {
    selectedUnit() {
      this.changeAmount()
      this.changeToAmount()
    },
    fromAmount(value) {
      if (this.selectedUnit.symbol === 'IRT') {
        const result = String(value)
          .replace(/\D/g, '')
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        // eslint-disable-next-line import/no-named-as-default-member,no-return-assign
        Vue.nextTick(() => (this.fromAmount = result))
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.coinsList.push({
        name: this.name,
        symbol: this.symbol,
        icon: '/assets/coins/svg/' + this.symbol.toLowerCase() + '_.svg',
      })
    })
    this.fromAmount = this.addCommasMethod(parseInt(this.usdPrice * this.cryptoToFiatPrice))
  },

  methods: {
    changeAmount() {
      if (this.fromAmount === '') {
        this.toAmount = ''
      }
      if (this.selectedUnit.symbol === 'IRT') {
        this.toAmount = parseFloat(
          removeCommas(String(this.fromAmount)) /
          (this.usdPrice * this.cryptoToFiatPrice)
        )
      } else {
        this.toAmount = this.addCommasMethod(
          parseFloat(
            removeCommas(String(this.fromAmount)) *
            (this.usdPrice * this.fiatToCryptoPrice)
          )
        )
      }
    },

    changeToAmount() {
      if (this.toAmount === '') {
        this.fromAmount = ''
      }
      if (this.selectedUnit.symbol === 'IRT') {
        this.fromAmount = parseFloat(
          removeCommas(String(this.toAmount)) *
          (this.usdPrice * this.cryptoToFiatPrice)
        )
      } else {
        this.fromAmount = this.addCommasMethod(
          parseFloat(
            removeCommas(String(this.toAmount)) /
            (this.usdPrice * this.fiatToCryptoPrice)
          )
        )
      }
    },

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
.c-price-calculator {
  text-align: right;

  &__input-label {
    color: #666464;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    opacity: 0.68;
    text-align: right;
  }

  &__title {
    color: #123e92;
    font-weight: 900;
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 16px;
  }

  &__input {
    padding: 8px;
    background: #f2f7ff;
    border-radius: 8px;
    margin-top: 8px;
    margin-bottom: 16px;
    height: 48px;

    input {
      height: 100%;
    }

    &__amount {
      border: none;
      width: 100%;
      background: #f2f7ff;
    }

    &__label {
      padding: 6px 4px;
      background: #deeaff;
      border-radius: 8px;
      height: 32px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .c-coinInfo__icon {
        width: 20px;
        height: 20px;
        min-width: 20px;
      }
    }

    .vs__dropdown-toggle {
      border: none;
    }

    .vs__search {
      display: none;
    }

    .vs__selected {
      width: 100%;
      padding: 0;
      margin: 0;
    }

    .vs5__combobox {
      padding: 0;
    }

    .vs__dropdown-toggle {
      padding: 0;
    }

    .v-select[dir='rtl'] .vs__actions {
      padding: 0;
    }

    .vs__dropdown-menu {
      background: #deeaff;
    }

    .vs__dropdown-option--highlight {
      color: #000000;

      &:hover {
        color: #fff;
      }
    }
  }

  &__button {
    display: block;
    width: 100%;
    background: #0934f3;
    border-radius: 12px;
    text-align: center;
    padding: 12px 24px;
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
  }
}
</style>
