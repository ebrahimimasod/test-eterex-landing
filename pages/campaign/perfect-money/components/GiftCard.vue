<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GiftCard"
})
</script>

<template>
  <div class="c-gift-card">
    با وارد کردن کد معرف برای اولین خرید و فروش پرفکت مانی ، 25،000 تومان به شما و 25،000 تومان به معرف شما تعلق می گیرد.
  </div>
</template>

<style scoped lang="scss">
@import "assets/responsive";

.c-gift-card {
  border-radius: 20px;
  background: #F6F8FE;
  box-shadow: 0px 40px 160px 0px rgba(126, 158, 181, 0.24);
  width: 95%;
  min-height: 95px;
  margin: 24px 0;
  overflow: hidden;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 31px;
  line-height: 31px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  opacity: 0.8;

  @include respond(md) {
    width: 680px;
  }


}
</style>
