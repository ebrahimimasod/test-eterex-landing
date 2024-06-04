<template>
  <div class="slider2">
    <div class="container">
      <div class="slider2__title">
        <h1>
          صرافی ارزدیجیتال اتراکس
        </h1>

        <p>
          ثبت نام سریع بدون احراز هویت
        </p>
      </div>
      <div class="slider2__buttons">
        <a
          class="button  register"
          href="https://panel.eterex.com/sign-enter-mobile"
          target="_blank"
        >
          ثبت نام
        </a>
        <a
          class="button  login"
          href="https://panel.eterex.com/sign-in"
          target="_blank"
        >
          ورود
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider2',
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';
.slider2 {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
      padding-top: 150px;
    @include respond(md) {
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      flex-direction: column;
      padding-bottom: 0;
    }
  }

  &__title h1 {
    font-size: 2.6rem;
    width: 100%;
    text-align: center;
    color: #fff;
    font-weight: 900;

    @include respond(md) {
      font-size: 4.5rem;
      width: 100%;
      text-align: right;
      color: #fff;
      font-weight: 900;
    }
  }

  &__title p {
    width: 100%;
    text-align: center;
    font-size: 1.15rem;
    color: #fff;
    font-weight: 700;
    @include respond(md) {
      width: 100%;
      text-align: right;
      font-size: 2rem;
      color: #fff;
      font-weight: 700;
    }
  }

  &__buttons {
    margin-top: 20px;
    width: 300px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 8px;
    font-size: 1.1rem;
    padding: 14px;

    @include respond(md) {
      margin-top: 20px;
      width: 400px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-radius: 8px;
      font-size: 1.3rem;
      padding: 0;
    }
    .button {
      margin-left: 15px;
      padding: 10px 30px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      @include respond(md) {
        font-size: 1.2rem;
      }
    }

    .register {
      background-color: orange;
      color: #000;
    }
    .login {
      background-color: var(--color-3);
      color: #fff;
    }
  }
}
</style>
