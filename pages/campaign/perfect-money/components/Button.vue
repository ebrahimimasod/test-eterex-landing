<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Button",
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'primary'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    getClasses() {
      return {
        "c-btn": true,
        "primary": this.variant === 'primary',
        "success": this.variant === 'success',
        "danger": this.variant === 'danger',
        "rounded": this.rounded,
        "disabled": this.disabled,
      }
    }
  }
})
</script>

<template>
  <component :is="tag" :class="getClasses" :disabled="disabled">
    <div v-if="loading">
      لطفا منتظر بمانید...
    </div>
    <slot v-else/>
  </component>
</template>

<style scoped lang="scss">
@import "assets/responsive";

.c-btn {
  display: flex;
  height: 46px;
  padding: 16px 0px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  width: 100%;
  font-size: 14px;
  font-weight: 700;

  @include respond(md){
    height: 56px;
    font-size: 16px;
  }

  &.primary {
    background: #0C8CE9;
    color: #ffffff;
  }

  &.success {
    background: #00B383;
    color: #ffffff;
  }

  &.danger {
    background: #F65354;
    color: #ffffff;
  }

  &.rounded {
    border-radius: 40px;
  }

  &.disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}
</style>
