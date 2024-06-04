<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Loading",
  props: {
    size: {
      type: Number,
      default: 50,
    },

    borderWidth: {
      type: Number,
      default: 3,
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
        borderWidth: `${this.borderWidth}px`,
      };
    },

    getClasses() {
      return {
        'c-loading-base': true,
        overly: this.overly,
      };
    },
  },
})
</script>

<template>
  <div :class="['c-loading-base-container', overly && 'overly']">
    <div :style="getStyles" class="c-loading-base"></div>
  </div>
</template>


<style scoped>
.c-loading-base-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.c-loading-base-container.overly {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
}

.c-loading-base {
  border: 5px solid #ccc;
  border-radius: 50%;
  border-top: 5px solid #0f34f4;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 2s linear infinite;
  /* Safari */
  animation: spin 2s linear infinite;
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
