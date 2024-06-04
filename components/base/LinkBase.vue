<template>
  <a
    v-if="isExternal"
    :href="getHref"
    target="_blank"
    v-bind="$attrs"
    :class="getClasses"
  >
    <slot />
  </a>

  <NuxtLink v-else :to="routerLinkTo" v-bind="$attrs" :class="getClasses">
    <slot />
  </NuxtLink>

  <!--
  <span v-else class="c-link active">
    <slot />
  </span> -->
</template>

<script>
export default {
  name: 'LinkBase',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    href: {
      type: String,
      default: '',
    },

    allowInsecure: {
      type: Boolean,
      default: false,
    },

    to: {
      type: Object,
      default: null,
    },

    name: {
      type: String,
      default: '',
    },

    params: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    routerLinkTo({ name, params }) {
      if (this.disabled) {
        return '#'
      }
      return {
        name,
        params,
        ...(this.to || {}),
      }
    },

    isExternal({ to, href }) {
      if (href && href !== '') {
        return true
      } else {
        return false
      }
    },

    getHref() {
      return this.disabled ? '#' : this.href
    },

    getClasses() {
      return {
        'c-link': true,
        disabled: this.disabled,
      }
    },
  },
}
</script>

<style lang="scss">
.c-link {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  text-decoration: none;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: #3d3c3c !important;
  }

  &.btn {
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    font-size: 15px;
    font-weight: 500;
    border-radius: var(--border-md);
  }

  &.inline {
    width: auto;
    padding: 0 16px;
  }

  &.colorPrimary {
    color: #0934f3;
  }

  &.borderPrimary {
    border: 1px solid #0934f3;
  }

  &.primary {
    color: #fff;
    background-color: #0934f3;
  }

  &.secondary {
    color: #fff;
    background-color: #00d478;
  }

  &.tertiary {
    color: #fff;
    background-color: #ff3952;
  }
}
</style>
