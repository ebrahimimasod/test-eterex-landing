<template>
  <div class="c-coinOverview">
    <div class="c-coinOverview__info">
      <div class="c-coinOverview__info__buttons">
        <LinkBase
          class="btn secondary"
          :to="{
            name: 'Exchange',
            params: { symbol: 'irt', toSymbol: symbol.toLowerCase() },
          }"
        >
          خرید
        </LinkBase>
        <LinkBase
          class="btn tertiary"
          :to="{
            name: 'Exchange',
            params: { symbol: symbol.toLowerCase(), toSymbol: 'irt' },
          }"
        >
          فروش
        </LinkBase>
      </div>
      <coin-info-base :symbol="symbol" :name="name" />
    </div>
    <!-- <div class="c-coinOverview__statics"></div> -->
    <div class="c-coinOverview__numbers">
      <span class="c-coinOverview__price text-left">{{ price }} $</span>
      <span class="c-coinOverview__percent text-left" :class="styleClass">
        {{ percent }} {{ arrow }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoinOverview',
  props: {
    symbol: {
      type: String,
      default: '',
    },

    name: {
      type: String,
      default: '',
    },

    price: {
      type: String || Number,
      default: '',
    },

    // volume: {
    //   type: String,
    //   default: 'btc',
    // },

    percent: {
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
  },
}
</script>

<style lang="scss" scoped>
$colorGain: #00d478;
$colorGainText: #57da9b;
$colorLoss: #ff3952;
$colorLossText: #ee5656;

.c-coinOverview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  background-color: #fff;
  border-radius: var(--border-sm);
  border: solid 1px var(--color-14);
  padding: 0 8px;
  margin-bottom: 8px;

  &__info {
    display: flex;
    align-items: center;

    &__buttons {
      display: flex;
      flex-direction: column;
      border-left: 1px solid var(--color-8);
      padding-left: 8px;

      .c-link {
        max-width: 32px;

        &:first-of-type {
          margin-bottom: 4px;
        }
      }
    }
  }

  &__statics {
    width: 54px;
    height: 26px;
    background-color: darkcyan;
  }

  &__numbers {
    display: flex;
    flex-direction: column;
    font-size: 12px;

    &__price {
      color: #000;
      letter-spacing: -0.02px;
      font-size: 12px;
      font-weight: 600;
      text-align: left;
    }

    &__percent {
      letter-spacing: -0.02px;
      font-size: 10px;
      text-align: left;
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

  .c-link.btn {
    padding: 0 6px;
    font-size: 12px;
    height: 20px;
    border-radius: 4px;
  }
}
</style>
