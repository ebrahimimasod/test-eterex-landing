<template>
  <div class="c-homeCoins">
    <div
      v-if="!dashboardView"
      class="row mb-2"
    >
      <div class="col-5 col-md-3 order-0">
        <h3 class="c-homeCoins__title">ارز های دیجیتال</h3>
      </div>
      <div class="col-12 col-md-6 order-3 order-lg-2">
        <input
          v-model="searchText"
          class="c-homeCoins__search"
          placeholder="جستجو..."
          type="text"
        />
      </div>
      <div class="col-12 col-md-3 order-2 order-lg-3 ">
        <SwitchSwapBase
          style="height: 48px"
          :value="priceMode"
          :items="tabs"
          @update="updatePriceMode"
        />
      </div>
    </div>

    <div class="c-homeCoins__list">
      <div class="c-homeCoins__list__head">
        <div class="c-homeCoins__list__head__coin">
          <span>ارز</span>
        </div>
        <div class="c-homeCoins__list__head__price">
          <span>حجم معاملات({{ getPriceModeTitle }})</span>
        </div>
        <div class="c-homeCoins__list__head__trades">
          <span v-if="priceMode === 1">حجم بازار({{ getPriceModeTitle }})</span>
          <span v-else>فروش به ما (تومان)</span>
        </div>
        <div class="c-homeCoins__list__head__volume">
       <span v-if="priceMode === 2">
              خرید از ما (تومان)
            </span>
          <span v-else>ارزش دلاری</span>
        </div>
        <div class="c-homeCoins__list__head__price"></div>
      </div>

      <SkeletonListBase
        v-if="loading"
        :item-height="52"
        :line-count="10"
      />

      <li
        v-for="coin in getAssetListFilters"
        :key="coin.symbol"
        class="c-homeCoins__item"
      >
        <coin-block-base
          :symbol="coin.symbol"
          :name="coin.symbol"
          :usdt-price="priceMode === 1 ? coin.usdt.transactionVolume : coin.irt.transactionVolume"
          :percent="String(coin.change.value)"
          :arrow="coin.change.sign"
          :color="coin.change.color"
          :trades="priceMode === 1 ? coin.usdt.volume : coin.irt.irtUsdt"
          :asset-volume="priceMode === 1 ? coin.usdt.amount : coin.irt.usdtIrt"
          :coins-page="true"
        />
      </li>
    </div>
    <div
      v-if="dashboardView"
      class="text-center"
    >
      <LinkBase
        class="c-homeCoins__show-more-button"
        :to="{ name: 'markets' }"
      >
        نمایش بیشتر
      </LinkBase>
    </div>
  </div>
</template>

<script>
import Configs from '@/httpservices/Configs'
import Public from "@/httpservices/Public";
import NumberTools from "~/utils/NumberTools";
import {addCommas} from "@persian-tools/persian-tools";
import SwitchSwapBase from "@/components/base/SwitchSwapBase.vue";
import {getConfigPriceFromGroup} from "~/utils/Helpers.js";


let updateAssetTimer = null;
export default {
  name: 'CoinsList',

  props: {
    dashboardView: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: true,
      searchText: '',
      tabs: [
        {
          id: 1,
          name: "دلار",
        },
        {
          id: 2,
          name: "تومان",
        },
      ],
      assets: [],
      priceMode: 1,
      config: {
        data: {},
        loading: true,
      }
    }
  },

  components: {
    SwitchSwapBase
  },

  methods: {

    async fetchConfig() {
      try {
        this.config.loading = true;
        this.config.data = (await Configs.getConfigs()).data
      } catch (e) {
        console.log(e)
      }
      this.config.loading = false;
    },

    async fetchAssets(init = true) {
      try {
        this.loading = init;
        const data = (await Public.fetchPriceList())?.data;
        const getAssetName = asset => asset.replace('USDT', '')
        const priority = (symbol) => {
          switch (symbol) {
            case 'USDT':
              return 2;
            case 'BTC':
              return 3;
            case 'ETH':
              return 4;
            case 'BNB':
              return 5;
            case 'DOT':
              return 6;
            case 'LTC':
              return 7;
            case 'DOGE':
              return 8;
            case 'XRP':
              return 9;
            case 'ADA':
              return 10;
            case 'LUNA':
              return 11;
            default:
              return 100;
          }
        }
        this.assets = data.map(i => {
          return {
            symbol: getAssetName(i.symbol),
            change: {
              sign: i.price_change_percentage > 0 ? "▲" : "▼",
              value: i.price_change_percentage,
              color: i.price_change_percentage > 0 ? 'green' : 'red'
            },
            usdt: {
              volume: i.volume ? NumberTools.toFixed(i.volume, 2) : '-',
              transactionVolume: i.quote_volume ? NumberTools.toFixed(i.quote_volume, 2) : '-',
              amount: `${NumberTools.toFixed(i.price, 8)}$`
            },
            irt: {
              transactionVolume: i.quote_volume
                ? addCommas(NumberTools.toFixed(i.quote_volume * this.getIrtUsdt(getAssetName(i.symbol)), 8))
                : '-',
              usdtIrt: addCommas(NumberTools.toFixed(i.price * this.getIrtUsdt(getAssetName(i.symbol), 8))),
              irtUsdt: addCommas(NumberTools.toFixed(i.price * this.getUsdtIrt(getAssetName(i.symbol), 8))),
            },
            isOpen: false,
          }
        })
          .sort((a, b) => priority(a.symbol) > priority(b.symbol) ? 1 : -1)
          .slice(0, this.dashboardView ? 4 : 100000);
        this.assets.unshift({
          symbol: 'USDT',
          change: {
            sign: "",
            value: "",
            color: ""
          },
          usdt: {
            volume: "-",
            transactionVolume: "-",
            amount: "1$"
          },
          irt: {
            transactionVolume: "-",
            usdtIrt: addCommas(this.getIrtUsdt('USDT')),
            irtUsdt: addCommas(this.getUsdtIrt('USDT')),
          },
        })

      } catch (e) {
        console.log({e})
      }
      this.loading = false;
    },

    updatePriceMode(value) {
      this.priceMode = value;
    },

    updateAssetList() {
      updateAssetTimer && clearInterval(updateAssetTimer);
      updateAssetTimer = setInterval(() => {
        updateAssetTimer && clearInterval(updateAssetTimer);
        this.fetchAssets(false);
        this.updateAssetList();
      }, 10000);
    },

    getUsdtIrt(symbol) {
      return getConfigPriceFromGroup(symbol, this.config.data?.priceGroups)?.usdtIrt;
    },

    getIrtUsdt(symbol) {
      return getConfigPriceFromGroup(symbol, this.config.data?.priceGroups)?.irtUsdt;
    },

  },

  computed: {
    getPriceModeTitle() {
      return this.priceMode === 1
        ? 'دلاری'
        : 'تومانی'
    },
    getAssetListFilters() {
      return this.assets.filter((coin) => {
        return coin.symbol.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())
      })
    }
  },

  unmounted() {
    updateAssetTimer && clearInterval(updateAssetTimer);
  },

  mounted() {
    this.$nextTick(async () => {
      await this.fetchConfig();
      this.fetchAssets();
      if (!this.dashboardView) {
        this.updateAssetList();
      }
    });
  },

}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.c-homeCoins {
  background: #f2f7ff;
  border-radius: 24px;
  padding: 16px;

  @include respond(lg) {
    padding: 32px;
  }

  &__search {
    box-shadow: none;
    outline: none;
    height: 48px;
    display: flex;
    align-items: center;
    border: 1px solid #0934f3;
    background-color: #fff;
    color: #65687e;
    width: 100%;
    position: relative;
    font-size: 14px;
    border-radius: 25px;
    padding: 0 32px 0 16px;
  }

  &__item {
    background: #ffffff;
    border-radius: 16px;
  }

  &__price-tab {
    display: flex;
    align-content: center;
    text-align: center;
    border-radius: 8px;
    margin: 16px 0px;
    border: 1px solid #407bff;

    @include respond(lg) {
      margin: 0;
    }

    &__tab {
      text-align: center;
      width: 100%;
      align-items: center;
      padding: 12px;
      font-size: 12px;
      line-height: 1.5;
      letter-spacing: -0.02px;
      font-weight: 600;
      cursor: pointer;
      border-radius: 8px;

      &.active {
        border-radius: 8px;
        background: #407bff;
        color: #fff;
      }
    }
  }

  &__title {
    line-height: 1.5;
    letter-spacing: -0.03px;
    text-align: right;
    color: var(--color-2);
    font-size: 14px;
    font-weight: 700;
    padding: 16px 0;
  }

  &__show-more-button {
    color: #0934f3;
    font-size: 16px;
    line-height: 28px;
    border: none;
    background: transparent;
    cursor: pointer;
    margin-top: 16px;
    font-family: 'YekanBakh-Regular', sans-serif !important;
  }

  &__list {
    list-style: none;
    padding: 0;

    &__head {
      display: none;

      &__trades,
      &__volume {
        display: none;
      }

      @include respond(lg) {
        &__trades,
        &__volume {
          display: flex;
        }
      }

      @include respond(lg) {
        margin-bottom: 16px;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        display: flex;

        &__coin,
        &__price,
        &__trades,
        &__volume,
        &__price {
          text-align: right;
          font-size: 12px;
          color: #9da1a9;
          width: 100%;
          display: flex;
        }

        &__trades,
        &__volume {
          text-align: center;
        }

        &__trades span,
        &__volume span {
          padding-right: 88px;
        }

        &__coin span {
          padding-right: 55px;
        }
      }
    }
  }
}
</style>
