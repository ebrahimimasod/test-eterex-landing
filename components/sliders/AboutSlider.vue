<template>
  <div class="c-slider">
    <ssr-carousel show-arrows :slides-per-page="4" :responsive="responsive">
      <div v-for="(item, index) in items" :key="index" :index="index">
        <div>
          <ImgProvider
            :src="item.icon"
            class="c-slider__icon"
            :alt="item.title"
            width="119px"
            height="137px"
            lazy
          />
        </div>
        <div>
          {{ item.title }}
        </div>
      </div>
    </ssr-carousel>
  </div>
</template>

<script>
import SsrCarousel from 'vue-ssr-carousel'
import 'vue-ssr-carousel/index.css'

export default {
  components: {
    SsrCarousel,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      responsive: [
        {
          maxWidth: 1280,
          slidesPerPage: 3,
        },
        {
          maxWidth: 1024,
          slidesPerPage: 2,
        },
        {
          maxWidth: 767,
          slidesPerPage: 1,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.c-slider {
  direction: ltr;

  &__icon {
    margin-bottom: 24px;
  }

  .ssr-carousel-next-icon {
    background-color: #ffb300;
  }

  .ssr-carousel-back-icon {
    background-color: #ffb300;
  }

  .ssr-carousel-slides {
    .ssr-carousel-slide {
      border-radius: 8px;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      overflow: hidden;
      transition: box-shadow 0.1s;
      padding: 24px;
      border-radius: 12px;
      color: #000000;
      font-weight: 700;
      font-size: 16px;
      line-height: 25px;
      height: 297px;
    }
  }
}
</style>
