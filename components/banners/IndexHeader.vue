<template>
  <header class="c-header">
    <client-only>
      <ssr-carousel
        :slides-per-page='1'
        :autoplay-delay='5'
        show-arrows
        show-dots
        center
        style="height: 100%;"
        class="header-slider"
      >
        <div
          v-for="(slider,index) in sliders"
          :key="index"
          style="height:100%;position: relative;"
        >
          <div
            class="header-slider__item"
            :style="`background: url(${getSliderImgSrc(slider)});${index === 1  && 'z-index:99999'}`"
          >
            <video
              v-if="getSliderVideSrc(slider)"
              width="100%"
              :poster="getSliderImgSrc(slider)"
              class="header-slider__item__video"
              height="100%"
              preload="auto"
              autoplay
              loop
              :src="getSliderVideSrc(slider)"
              type="video/m4v"
              muted
            >
            </video>

            <component
              v-if="slider.component"
              :is="slider.component"
            />
          </div>

        </div>
      </ssr-carousel>
    </client-only>
  </header>
</template>

<script>
import Slider1 from './SliderComponents/Slider1.vue'
import Slider2 from './SliderComponents/Slider2.vue'
import Slider3 from './SliderComponents/Slider3.vue'
export default {
  name: 'IndexHeader',
  data() {
    return {
      panelUrl: 'https://panel.eterex.com',
      sliders: [
        {
          desktop_img: '/sliders/desktop/1.jpg',
          mobile_img: '/sliders/mobile/1.jpg',
          component: Slider1,
        },
        {
          desktop_img: '/sliders/desktop/2.jpg',
          mobile_img: '/sliders/mobile/2.jpg',
          component: Slider2,
        },
        {
          desktop_img: '/sliders/desktop/3.jpg',
          mobile_img: '/sliders/mobile/3.jpg',
          video_url_desktop: '/sliders/desktop/3.m4v',
          video_url_mobile: '/sliders/mobile/3.m4v',
          component: Slider3,
        },
        {
          desktop_img: '/sliders/desktop/4.jpg',
          mobile_img: '/sliders/mobile/4.jpg',
        },
        {
          desktop_img: '/sliders/desktop/5.jpg',
          mobile_img: '/sliders/mobile/5.jpg',
        },
      ],
    }
  },

  methods: {
    getSliderImgSrc(slider) {
      if (process.browser) {
        if (window.innerWidth >= 786) {
          return slider.desktop_img
        }
        return slider.mobile_img
      }
      return slider.desktop_img
    },
    getSliderVideSrc(slider) {
      if (process.browser) {
        if (window.innerWidth >= 786) {
          return slider.video_url_desktop
        }
        return slider.video_url_mobile
      }
      return slider.video_url_desktop
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';
.header-slider {
  .ssr-carousel-slides {
    height: 100%;
  }
  direction: ltr;
  &__item {
    position: relative;
    height: 70vh;
    width: 100%;
    background-position: center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    @include respond(md) {
      height: 80vh;
      background-size: cover !important;
    }

    &__video {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      transform: scale(1.1);
      @include respond(md) {
        transform: scale(1.3);
      }
    }
  }
}
.c-header {
  height: 70vh;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
  @include respond(lg) {
    height: 80vh;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
  }

  &__login-link {
    background: #ffffff;
    border-radius: 12px;
    padding: 12px 24px;
    font-weight: 700;
    border: none;
    color: #0934f3;
    margin-top: 32px;

    .i-addPerson {
      margin-left: 4px;
    }

    @include respond(lg) {
      font-size: 24px;
    }
  }

  .title {
    font-weight: 999;
    font-size: 32px;
    line-height: 72px;
    color: #ffffff;

    @include respond(lg) {
      font-size: 56px;
    }
  }

  .sub-title {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #ffffff;
    margin: 0;
  }

  img {
    width: 100%;
  }
}

.ssr-carousel-dot-icon {
  border: 2px solid rgb(255 255 255 / 70%);
}

[disabled] > .ssr-carousel-dot-icon {
  background: rgb(255 255 255);
  z-index: 99;
  position: relative;
}

.ssr-carousel-dots {
  margin-top: -25px;
}
</style>
