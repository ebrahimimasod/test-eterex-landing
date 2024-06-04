<template>
  <div class="i-hamburger">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </div>
</template>

<script>
export default {
  name: 'IconHamburger',
}
</script>

<style lang="scss" scoped>
@import '@/assets/responsive.scss';

.i-hamburger {
  display: inline-block;
  cursor: pointer;
  width: 24px;

  @include respond(lg) {
    display: none;
  }

  .bar1,
  .bar2,
  .bar3 {
    width: 24px;
    height: 2px;
    background-color: var(--color-2);
    margin: 6px 0;
    transition: 0.4s;
  }
}
</style>
