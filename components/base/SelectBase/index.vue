<template>
  <div
    v-click-outside="
      () => {
        showOptions = false
      }
    "
    class="c-select-base"
  >
    <div class="c-select-base__selected" @click="showOptions = !showOptions">
      <div class="c-select-base__selected__inner">
        <slot
          v-if="isSelectedOption"
          name="selected"
          :option="selectedOption"
        />
        <span v-else>
          {{ placeholder }}
        </span>
      </div>
      <IconProvider
        class="c-select-base__selected__icon"
        :icon="!showOptions ? 'arrow-down' : 'arrow-up'"
        width="12px"
      />
    </div>
    <div v-if="showOptions" class="c-select-base__options-container">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="c-select-base__option_item"
        @click="selectOptionHandler(index)"
      >
        <slot :option="option" name="option" />
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import IconProvider from '~/components/base/IconProvider/IconProvider'

export default {
  name: 'SelectBase',
  components: { IconProvider },

  directives: {
    ClickOutside,
  },

  props: {
    options: {
      type: Array,
      default: () => [],
    },

    value: {
      type: [Object, String, Number],
      default: null,
    },

    placeholder: {
      type: String,
      default: 'انتخاب کنید',
    },
  },

  data() {
    return {
      showOptions: false,
    }
  },

  computed: {
    selectedOption() {
      return this.value || this.options.find((item) => item.selected) || {}
    },

    isSelectedOption() {
      return this.selectedOption && Object.keys(this.selectedOption).length
    },
  },

  methods: {
    selectOptionHandler(index) {
      const value = this.options[index]
      this.$emit('input', value)
      this.$emit('change', value)
      this.showOptions = false
    },
  },
}
</script>

<style scoped lang="scss">
.c-select-base {
  background: #deeaff;
  border-radius: 8px;
  width: 100%;
  height: 32px;
  position: relative;

  &__selected {
    height: 100%;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  &__selected__inner {
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__selected__icon {
    flex-grow: 0;
  }

  &__options-container {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px #00000017;
    z-index: 999;
  }

  &__option_item {
    border-bottom: 1px solid #eee;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 40px;
    cursor: pointer;
  }
}
</style>
