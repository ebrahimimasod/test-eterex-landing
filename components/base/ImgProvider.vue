<template>
  <img
    v-if="tag === 'img'"
    :style="getImgStyles"
    :class="$style['c-image-provider']"
    :src="getImgSrc"
    :alt="alt"
    :loading="lazy === true ? 'lazy' : 'eager'"
  />

  <picture v-else :class="$style['c-picture-provider']" :style="getImgStyles">
    <source :data-srcset="getWebpSrc" type="image/webp" :srcset="getWebpSrc" />
    <img
      :style="getImgStyles"
      :data-src="getImgSrc"
      class="c-picture-provider__img"
      :alt="alt"
    />
  </picture>
</template>

<script>
export default {
  name: 'ImgProvider',

  props: {
    height: {
      type: String,
      default: null,
    },

    width: {
      type: String,
      default: null,
    },

    tag: {
      type: String,
      default: 'picture',
    },

    src: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      required: true,
    },

    imgClass: {
      type: [Array, String],
      default: () => [],
    },

    path: {
      type: String,
      default: '/assets',
    },

    lazy: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getImgClasses() {
      return typeof this.imgClass === 'object'
        ? this.imgClass.toString(' ')
        : this.imgClass
    },

    getImgSrc() {
      if (this.src.includes('http')) {
        return this.src
      }

      return `${this.path}/images/${this.src}`
    },

    getWebpSrc() {
      if (this.src.includes('http')) {
        return this.src
      }
      return `${this.path}/webps/${this.src.split('.')[0]}.webp`
    },

    getImgStyles() {
      return {
        width: this.width && this.width,
        height: this.height && this.height,
      }
    },
  },
}
</script>

<style module lang="scss">
.c-image-provider {
  max-width: 100%;
}

.c-picture-provider {
  max-width: 100%;
  max-height: 100%;

  &__img {
    width: 100%;
    height: auto;
  }
}

@media only screen and (max-width: 768px) {
  .c-image-provider {
    height: auto !important;
  }
}
</style>
