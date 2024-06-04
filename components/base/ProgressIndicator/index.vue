<template>
  <div :class="['c-progress-indicator-container', overly && 'overly']">
    <div :style="getStyles" class="c-progress-indicator"></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressIndicator',
  props: {
    size: {
      type: Number,
      default: 60,
    },

    overly: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getStyles() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      }
    },

    getClasses() {
      return {
        'c-progress-indicator': true,
        overly: this.overly,
      }
    },
  },
}
</script>

<style lang="scss">
.c-progress-indicator-container.overly {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 50%);
}

.c-progress-indicator {
  width: 60px;
  height: 60px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #0934f3;
  border-radius: 0.5;
  -webkit-animation: spin 2s linear infinite;
  /* Safari */
  animation: spin 2s linear infinite;
  border-radius: 50%;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
