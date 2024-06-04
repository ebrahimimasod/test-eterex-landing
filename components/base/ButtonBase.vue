<template>
  <button :disabled="disabled" class="c-button">
    <div v-if="loading" class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <slot v-if="!loading" class="c-btn__content" />
    <span v-if="!loading && text" class="c-button__txt">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'ButtonBase',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.c-button {
  height: 48px;
  padding: 0 32px;
  min-width: 80px;
  font-size: 15px;
  font-weight: 500;
  border-radius: var(--border-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  font-family: 'YekanBakh-Regular' !important;

  &.icon {
    height: auto;
    padding: 0;
    min-width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:disabled {
    background-color: #9da1a9 !important;
    cursor: default;
  }

  &.block {
    width: 100%;
  }

  &.primary {
    color: #fff;
    background-color: #0934f3;
  }

  &.outline-primary {
    border: solid 1px #0934f3;
    color: #0934f3;
  }

  &.danger {
    color: #fff;
    background-color: #ff3952;
  }

  &.info {
    color: #fff;
    background-color: #6c757d;
  }

  &.transparent {
    background-color: transparent;
  }

  &.colorPrimary {
    color: #0934f3;
  }

  &.colorRed {
    color: #ff3952;
  }
}

// loader
.lds-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%) scale(0.5);
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #dfc;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #dfc transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
