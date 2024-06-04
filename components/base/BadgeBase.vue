<template>
  <div class="badge" :class="variant">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.badge {
  text-align: center;
  border-radius: 8px;
  padding: 4px 8px;
  line-height: 1.58;
  letter-spacing: -0.02px;
  font-size: 12px;
  font-weight: 600;

  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;

  &.pill {
    border-radius: 25px;
    font-size: 9px !important;
  }

  &.danger {
    background-color: #ff3952;
    color: #fff;
  }
  &.success {
    background-color: var(--color-20);
    color: #fff;
  }

  &.warning {
    background-color: #f9cc60;
    color: #000;
  }
}
</style>
