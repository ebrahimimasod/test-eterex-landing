<template>
  <div class="slider3">
    <h2 class="slider3__title">
      رونمایی از لوگوی جدید اتراکس
    </h2>
    <a
      class="slider3__button"
      href="#feature"
    >
      مزایای اتراکس
    </a>
  </div>
</template>

<script>
export default {
  name: 'Slider3',
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';
.slider3 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  height: 100%;
  &__title {
    color: #fff;
    position: absolute;
    z-index: 999;
    top: 70%;
    font-size: 1.5rem;
    @include respond(md) {
      color: #fff;
      position: absolute;
      z-index: 999;
      top: 62%;
      font-size: 2.5rem;
    }
  }

  &__button {
    position: absolute;
    top: 79%;
    padding: 13px 29px;
    background-color: var(--color-21);
    color: #000;
    border-radius: 11px;
    cursor: pointer;
    font-weight: 700;
    font-size: 1.2rem;
  }
}
</style>
