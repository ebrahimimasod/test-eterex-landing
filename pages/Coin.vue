<template>
  <div class="v-coin">
    <div class="v-coin__header"></div>
    <div class="container">

      <div class="v-coin__inner">
        <div v-show="isLoading">
          <div
            style="display: flex;align-items: center;justify-content: center;height: 50vh;width: 100%;background-color: #fff">
            <ProgressIndicator/>
          </div>
        </div>
        <div v-show="!isLoading">
          <div class="row">
            <div class="col-6 col-lg-6">
              <div v-if="coin" class="v-coin__inner__info">
                <div class="v-coin__inner__info__image">
                  <img :src="coin.src" :alt="coin.name" width="48" height="48" loading="lazy"/>
                </div>
                <div class="v-coin__inner__info__description">
                  <div class="v-coin__inner__info__description__symbol">
                    {{ getCoinSymbol }}

                  </div>
                  <div class="v-coin__inner__info__description__name">
                    {{ coin.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-6">
              <div class="v-coin__inner__price">
                ${{ getUsdtPrice }}

              </div>
              <div class="v-coin__inner__fiat">
                تومان
                {{ getIrtPrice }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8 col-12">
              <div class="v-coin__inner__chart">
                <client-only>
                  <TradingViewChart v-if="getCoinSymbol" :symbol="getCoinSymbol"/>
                </client-only>
              </div>
              <div v-if="coin.content" class="v-coin__inner__content">
                <h1 class="v-coin__inner__content__title">
                  درباره {{ coin.name }}
                </h1>
                <!-- eslint-disable vue/no-v-html -->
                <p v-html="coin.content"></p>
              </div>
            </div>
            <div class="col-lg-4 col-12">
              <div class="v-coin__inner__calculator">
                <client-only>
                  <PriceCalculator
                    v-if="coin.symbol"
                    :symbol="coin.symbol"
                    :name="coin.symbol"
                    :usd-price="getUsdtPrice"
                    :fiat-to-crypto-price="getIrtUsdt(coin.symbol)"
                    :crypto-to-fiat-price="getUsdtIrt(coin.symbol)"
                    :history="[]"/>
                </client-only>
              </div>

              <!--            <div class="v-coin__inner__calculator__price-list">-->
              <!--              <div-->
              <!--                v-for="(item, index) in coinsList.slice(0, 9)"-->
              <!--                :key="index"-->
              <!--                :index="index"-->
              <!--              >-->
              <!--                <CoinInfoItem-->
              <!--                  v-if="item.token.toUpperCase() !== getCoinSymbol"-->
              <!--                  :symbol="item.token"-->
              <!--                  :price="item.price.toString()"-->
              <!--                  :change="item.percent.toString()"-->
              <!--                  :style-class="item.style"-->
              <!--                />-->
              <!--              </div>-->
              <!--            </div>-->
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Pages from '@/httpservices/Pages'
import priceSocket from '@/mixins/priceSocket'
import TradingViewChart from '@/components/TradingViewChart'
import PriceCalculator from '@/components/PriceCalculator'
import PersianTools from '@/utils/PersianTools'
import NumberTools from '@/utils/NumberTools'
import {generateMetaData, getAssetIconUrl, getConfigPriceFromGroup} from '@/utils/Helpers'
import ProgressIndicator from '~/components/base/ProgressIndicator'
import Public from '~/httpservices/Public'
import Configs from '~/httpservices/Configs'
import {addCommas} from '@persian-tools/persian-tools'

export default {
  name: 'CoinPage',

  components: {
    ProgressIndicator,
    TradingViewChart,
    PriceCalculator,
  },

  data() {
    return {
      loading: true,
      assetPriceLoading: true,
      title: '',
      data: '',
      coin: {
        src: '',
        name: '',
        symbol: '',
        content: '',
        yoast_head_json: {},
      },
      assetPrice: null,
      config: {
        data: {},
        loading: true,
      },
    }
  },

  async fetch() {

    console.log('fetch  start....');

    await this.fetchCoinData()
    await this.fetchAssetPrice()
    await this.fetchConfig()

    console.log('fetch  end....');

  },

  head() {
    return generateMetaData(
      this.coin?.yoast_head_json?.title,
      {
        withoutAppName: true,
        description: this.coin?.yoast_head_json?.description,
      }
    )
  },

  computed: {

    isLoading() {
      return !!(this.config.loading || this.loading || this.assetPriceLoading);
    },

    getCoinSymbol() {
      return String(this.$route.params?.symbol?.toUpperCase())
    },

    getUsdtPrice() {
      if (this.assetPrice) {
        return NumberTools.toFixed(this.assetPrice, 8)
      }
      return 1
    },

    getIrtPrice() {
      if (this.assetPrice && !this.config.loading) {
        return addCommas(
          NumberTools.toFixed(this.assetPrice * this.getUsdtIrt(this.$route.params.symbol.toUpperCase()), 8)
        )
      }
      return 1
    },
  },

  methods: {
    async fetchCoinData() {
      this.loading = true
      try {
        const res =
          (await Pages.getPage(this.$route.params.symbol))?.data[0] || {}
        if (res?.id) {
          this.coin = {
            name: res?.title?.rendered,
            symbol: res?.slug,
            content: res?.content?.rendered,
            summery: res?.excerpt?.rendered,
            src: getAssetIconUrl(this.$route.params?.symbol),
            relatedPosts: res['jetpack-related-posts'],
            yoast_head_json: res.yoast_head_json,
          }
        } else {
          this.coin = {
            name: this.$route.params?.symbol?.toUpperCase(),
            symbol: this.$route.params?.symbol,
            content: '',
            summery: '',
            src: getAssetIconUrl(this.$route.params?.symbol),
            relatedPosts: [],
            yoast_head_json: {
              title: this.$route.params?.symbol?.toUpperCase(),
            },
          }
        }
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },

    async fetchAssetPrice() {
      this.assetPriceLoading = true;
      try {
        const res = (
          await Public.fetchPriceList(this.$route.params.symbol.toUpperCase())
        ).data
        this.assetPrice = res[0]?.price || 1
      } catch (e) {
        console.log(e);
      }

      this.assetPriceLoading = false;
    },

    async fetchConfig() {
      try {
        this.config.loading = true
        this.config.data = (await Configs.getConfigs())?.data
      } catch (e) {
        console.log('fetchConfig error');
        console.log(e)
      }
      this.config.loading = false
    },

    getUsdtIrt(symbol) {
      return getConfigPriceFromGroup(symbol, this.config.data?.priceGroups)?.usdtIrt;
    },

    getIrtUsdt(symbol) {
      return getConfigPriceFromGroup(symbol, this.config.data?.priceGroups)?.irtUsdt;
    },

  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.v-coin {
  &__header {
    background: #f2f7ff;
    height: 368px;

    @include respond(lg) {
      height: 326px;
    }

    z-index: 1;
    top: 0px;
    left: 0px;
  }

  &__inner {
    padding: 32px 0;
    padding-top: 132px;
    margin-top: -400px;

    @include respond(lg) {
      padding-top: 152px;
      margin-top: -350px;
    }

    &__loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80vh;
    }

    .row {
      margin-bottom: 36px;
    }

    &__info {
      display: flex;

      &__image {
        img {
          width: 64px;
          height: 64px;
          border-radius: 24px;

          @include respond(lg) {
            width: 48px;
            height: 48px;
          }
        }

        padding-left: 12px;

        @include respond(lg) {
          padding-left: 24px;
        }
      }

      &__description {
        &__symbol {
          font-weight: 400;
          background: rgba(42, 106, 227, 0.16);
          border-radius: 4px;
          padding: 4px;
          color: #0934f3;
          width: fit-content;
          font-size: 12px;

          @include respond(lg) {
            font-size: 16px;
          }
        }

        &__name {
          color: #123e92;
          font-weight: 900;
          line-height: 40px;
          font-size: 24px;

          @include respond(lg) {
            font-size: 40px;
          }
        }
      }
    }

    &__content {
      text-align: right;
      padding: 24px;
      margin-top: 24px;
      background: #ffffff;
      border-radius: 16px;
      line-height: 24px;
      color: #3c3c3c;

      &__title {
        color: #123e92;
        font-weight: 900;
        font-size: 1.5rem;
        line-height: 56px;
        text-align: right;

        @include respond(lg) {
          font-size: 2rem;
        }
      }

      h2 {
        color: #0934f3;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        margin-top: 16px;
        margin-bottom: 8px;
      }

      .rt-reading-time {
        display: none !important;
      }
    }

    &__related-posts {
      &__title {
        font-weight: 700;
        font-size: 24px;
        line-height: 37px;
        text-align: right;
        color: #12377b;
        margin-bottom: 16px;
        margin-top: 32px;
      }
    }

    &__price {
      text-align: left;
      color: #123e92;
      font-weight: 700;
      line-height: 40px;
      font-size: 24px;

      @include respond(lg) {
        font-size: 40px;
      }
    }

    &__fiat {
      text-align: left;
      color: #656565;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;

      @include respond(lg) {
        font-size: 24px;
      }
    }

    &__chart {
      background: #ffffff;
      border-radius: 16px;
      padding: 16px;
    }

    &__calculator {
      background: #ffffff;
      border-radius: 16px;
      padding: 16px;
    }

    &__price-list {
      background: #ffffff;
      border-radius: 16px;
      padding: 16px;
    }
  }

  .c-coin-info-item {
    border-bottom: 1px solid #e9e9e9;
  }
}
</style>
