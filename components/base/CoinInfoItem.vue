<template>
  <div class="c-coin-info-item">
    <coin-info-base :symbol="symbol" :name="name" />

    <div class="c-coin-info-item__price">
      <div class="price">{{ price }}</div>
      <div class="change" :class="styleClass">{{ change }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoinInfoItem',

  props: {
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

    price: {
      type: String,
      required: false,
      default: '',
    },

    change: {
      type: String,
      required: false,
      default: '',
    },

    styleClass: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.c-coin-info-item {
  $colorGain: #00d478;
  $colorGainText: #57da9b;
  $colorLoss: #ff3952;
  $colorLossText: #ee5656;

  padding: 16px;
  display: flex;
  align-content: space-between;

  &__price {
    flex: 1;
    text-align: left;

    .gain {
      color: $colorGain;
      direction: ltr;
    }

    .loss {
      color: $colorLoss;
      direction: ltr;
    }
  }

  .c-coinInfo {
    flex: 1;
    direction: rtl;
  }
}
</style>
