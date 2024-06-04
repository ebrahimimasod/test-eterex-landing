<template>
  <div :class="$style['c-icon']" :style="getStyles" @click="$emit('click')">
    <img
      v-if="getIconSrc"
      :class="$style['c-icon__img']"
      :src="getIconSrc"
      alt="icon"
    />
  </div>
</template>

<script>
export default {
  name: 'IconProvider',

  props: {
    tag: {
      type: String,
      default: 'div',
    },

    icon: {
      type: String,
      default: '',
    },

    height: {
      type: String,
      default: '50px',
    },

    width: {
      type: String,
      default: '50px',
    },

    src: {
      type: String, // url,
      default: null,
    },
  },

  computed: {
    getStyles() {
      return {
        width: this.width,
        height: this.height,
      }
    },

    getIconSrc() {
      if (this.src) {
        return this.src
      }
      if (this.icon) {
        return require(`~/assets/icons/${this.icon}.svg`)
      }
      return ''
    },
  },
}
</script>

<style lang="scss" module>
.c-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.c-icon__img {
  max-width: 100%;
  max-height: 100%;
}
</style>
