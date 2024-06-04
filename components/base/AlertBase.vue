<template>
  <div class="c-alert-base" :class="'c-alert-base__' + variant">
    <IconDanger v-if="icon" class="c-alert-base__icon" />
    <span class="c-alert-base__text">
      <slot />
    </span>
  </div>
</template>

<script>
import IconDanger from '../icons/IconDanger.vue'
export default {
  name: 'AlertBase',

  components: {
    IconDanger,
  },

  props: {
    icon: {
      type: Boolean,
      default: false,
    },

    variant: {
      type: String,
      default: 'info',
      validator(value) {
        // The value must match one of these strings
        return ['success', 'warning', 'danger'].includes(value)
      },
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/_direction.scss';

.c-alert-base {
  display: flex;
  align-items: center;

  @include rtl {
    justify-content: right;
  }

  @include ltr {
    justify-content: left;
  }

  border-radius: 16px;
  padding: 16px 8px;

  &__icon {
    width: 16px;
    height: 16px;
    margin: 0 16px;
  }

  &__text {
    font-size: 12px;
    line-height: 1.92;
    letter-spacing: 0.12px;

    @include rtl {
      text-align: right;
    }

    @include ltr {
      text-align: left;
    }
  }

  &__info {
    border: solid 1px var(--color-14);
    background-color: var(--color-10);
    color: var(--color-2);
  }

  &__danger {
    border: solid 1px var(--color-16);
    background-color: var(--color-17);
    color: var(--color-16);
  }

  &__warning {
    border: solid 1px var(--color-21);
    background-color: var(--color-22);
    color: var(--color-2);
  }

  &__success {
    border: solid 1px var(--color-20);
    background-color: var(--color-23);
    color: var(--color-2);
  }
}
</style>
