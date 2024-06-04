<template>
  <div v-if="status === 2" class="c-price-slider">
    <!-- <div v-if="status === 2" class="v-blog__info mt-4">
      <h2 class="v-blog__info__title">آخرین قیمت ارز ها</h2>
      <p class="v-blog__info__sub-title">
        با مقالات و نوشته‌های اتراکس، از آخرین اخبار و اطلاعات مفید دنیای کریپتو
        مطلع شوید.
      </p>
    </div> -->
    <ssr-carousel
      v-if="filtered"
      gutter="20"
      show-arrows
      :slides-per-page="8"
      :responsive="responsive"
      loop
      :autoplay-delay="2"
    >
      <div
        v-for="(item, index) in filtered"
        :key="index"
        class="slide"
        :index="index"
      >
        <CoinInfoItem
          :symbol="item.token"
          :price="item.price.toString()"
          :change="item.percent.toString()"
          :style-class="item.style"
        />
      </div>
    </ssr-carousel>
  </div>
</template>

<script>
import SsrCarousel from 'vue-ssr-carousel'
import 'vue-ssr-carousel/index.css'
import priceSocket from '@/mixins/priceSocket'

export default {
  components: {
    SsrCarousel,
  },

  mixins: [priceSocket],

  data() {
    return {
      responsive: [
        {
          maxWidth: 1280,
          slidesPerPage: 3,
        },
        {
          maxWidth: 1024,
          slidesPerPage: 4,
        },
        {
          maxWidth: 767,
          slidesPerPage: 3,
        },
        {
          maxWidth: 554,
          slidesPerPage: 2,
        },
        {
          maxWidth: 424,
          slidesPerPage: 2,
        },
        {
          maxWidth: 320,
          slidesPerPage: 1,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.c-price-slider {
  direction: ltr;
  margin-top: 16px;
  margin-bottom: 16px;

  .c-coin-info-item {
    direction: rtl;
    border: 1px solid #e9e9e9;
    border-radius: 16px;
  }

  &__icon {
    margin-bottom: 24px;
  }

  .ssr-carousel-next-icon {
    background-color: #0934f3;
    border-radius: 14px;
    font-size: 10px;
  }

  .ssr-carousel-back-icon {
    background-color: #0934f3;
    border-radius: 14px;
    font-size: 10px;
  }

  .ssr-carousel-slides {
    .ssr-carousel-slide {
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      overflow: hidden;
      transition: box-shadow 0.1s;
      //padding: 12px;
      border-radius: 12px;
      color: #000000;
      font-weight: 700;
      font-size: 16px;
      line-height: 25px;
    }

    .ssr-carousel-slide {
      //margin-right: 0;
    }

    .c-blog-post-item__inner__image {
      height: 346px;
    }
  }
}
</style>
