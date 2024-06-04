<script>
import {defineComponent} from 'vue'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
import Input from "~/pages/campaign/perfect-money/components/Input.vue";

export default defineComponent({
  name: "DatePicker",
  components: {
    Input,
    VuePersianDatetimePicker
  },
  props: {
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('update', value);
        this.$emit('change', value);
        this.$emit('input', value);
      }
    }
  }
})
</script>

<template>
  <div>
    <Input
      :disabled="disabled"
      v-model="model"
      label="تاریخ تولد"
      type="text"
      class="custom-input"
      placeholder="انتخاب تاریخ"
    />
    <VuePersianDatetimePicker
      v-if="!disabled"
      view="year"
      v-model="model"
      auto-submit
      max="1384/01/01"
      min="1330/01/01"
      display-format="jYYYY/jD/jD"
      format="jYYYY/jM/jD"
      custom-input=".custom-input"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
