<template>
  <div class="c-coinInfo">
    <component :is="tagName" class="c-coinInfo__link"
               :href="symbol.toLowerCase() === 'usdt' ? '' : '/coin/' + symbol.toLowerCase()">
      <img :src="getAssetIconUrl(symbol)" :alt="symbol" class="c-coinInfo__icon" onerror="ImgError(this)" width="32"
           height="32"
           loading="lazy"/>
      <div v-if="!noTitle" class="c-coinInfo__block">
        <h4 v-if="!noSymbol" class="c-coinInfo__symbol">{{ symbol }}</h4>
        <!-- <h3 v-if="!noName" class="c-coinInfo__name">
          {{ name }}
        </h3> -->
      </div>
    </component>
  </div>
</template>

<script>
import {getAssetIconUrl} from "@/utils/Helpers.js"

export default {
  name: 'CoinInfo',
  props: {
    symbol: {
      type: String,
      default: '',
    },

    withoutLink: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      default: '',
    },

    noTitle: {
      type: Boolean,
      default: false,
    },

    noName: {
      type: Boolean,
      default: false,
    },

    noSymbol: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      imageUrl: '/assets/coins/svg/',
    }
  },

  computed: {
    tagName() {
      if (this.withoutLink) {
        return 'div';
      }
      return 'link-base'
    }
  },
  methods: {
    getAssetIconUrl
  }
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.c-coinInfo {
  display: flex;
  align-items: center;

  &__symbol {
    font-size: 16px;
    display: block;
    font-weight: 500;
    line-height: 25px;
    color: #000;
    font-weight: bold;
    margin: 0;
    line-height: 26px !important;
  }

  &__name {
    font-size: 10px;
    color: var(--color-13);
  }

  &__icon {
    margin: 0 8px;
    width: 32px;
    min-width: 32px;
    height: 32px;
    background-color: transparent;
  }

  &__block {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
