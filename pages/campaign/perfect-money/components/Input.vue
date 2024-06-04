<script>
import {defineComponent} from 'vue'
import {phoneNumberValidator, verifyIranianNationalId, verifyCardNumber} from "@persian-tools/persian-tools";

export default defineComponent({
  name: "Input",
  props: {
    value: {
      type: [String, Number]
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dir: {
      type: String,
      default: 'rtl',
    },
    help: {
      type: String,
    },
    rules: {
      type: Array,
      default: () => ([]),
    },
    showOnly: {
      type: Boolean,
      default: false,
    }


  },
  data() {
    return {
      validationError: null,
    }
  },
  computed: {
    getClasses() {
      return {
        'c-input-container__box': true,
        'disabled': this.disabled,
      }
    },
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value);
        this.$emit('change', value);
      }
    },
    getSubText() {
      if (this.validationError) {
        return {
          type: 'error',
          text: this.validationError,
        }
      }
      return {
        type: 'help',
        text: this.help,
      }
    },
    readOnly() {
      if (this.showOnly) {
        return true;
      }
      return this.disabled;
    }
  },
  methods: {
    validateInput(value) {
      this.validationError = null;
      const schema = [
        {
          rule: 'number',
          checker: (value, param) => !isNaN(value),
          error: (value, param) => "لطفا مقدار عددی وارد کنید"
        },
        {
          rule: 'phone_number',
          checker: (value, param) =>{
            let val = value;
            if(val.includes('0923')){
              val = val.replace('0923','0922');
            }
            return phoneNumberValidator(val);
          },
          error: (value, param) => "فرمت شماره موبایل صحیح نیست."
        },
        {
          rule: 'min',
          checker: (value, param) => Number(value) <= param,
          error: (value, param) => `مقدار وارد شده باید کمتر ${param} باشد .`
        },
        {
          rule: 'max',
          checker: (value, param) => Number(value) >= param,
          error: (value, param) => `مقدار وارد شده باید بیشتر ${param} باشد .`
        },
        {
          rule: 'required',
          checker: (value) => !!value,
          error: (value, param) => `پر کردن این فیلد الزامی است`
        },
        {
          rule: 'national_code',
          checker: (value) => verifyIranianNationalId(value),
          error: (value, param) => `کد ملی صحیح نیست`
        },
        {
          rule: 'bank_card',
          checker: (value) => verifyCardNumber(value),
          error: (value, param) => `شماره کارت صحیح نیست`
        },
      ]
      const inputRules = this.rules.map(i => {
        const ruleItem = i.split(":") ?? [];
        return {
          name: ruleItem[0],
          param: ruleItem[1]
        };
      });
      if (inputRules.length === 0) {
        return
      }

      const inputRuleNames = inputRules.map(i => i.name);

      const validateRules = schema.filter(i => inputRuleNames.includes(i.rule))

      if (validateRules.length === 0) {
        return;
      }


      validateRules.forEach(i => {
        const {param} = inputRules.find(j => j.name === i.rule)
        if (!i.checker(value, param)) {
          this.validationError = i.error(value, param);
          return false;
        }
      })

      this.$emit('validate', this.validationError);

    }
  }
})
</script>

<template>
  <div class="c-input-container">
    <label
      class="c-input-container__label"
      v-if="label"
      for="">
      {{ label }}
    </label>
    <div :class="getClasses">
      <div v-if="$slots.prefix" class="c-input-container__box__prefix">
        <slot name="prefix"/>
      </div>

      <input
        @blur="validateInput($event.target.value)"
        @keyup="validateInput($event.target.value)"
        v-model="model"
        :dir="dir"
        :readonly="readOnly"
        :placeholder="placeholder"
        :type="type">
      <div v-if="$slots.suffix" class="c-input-container__box__suffix">
        <slot name="suffix"/>
      </div>

    </div>
    <span v-if="getSubText.text" :class="['c-input-container__sub-text',getSubText.type === 'error' && 'error']">
      {{ getSubText.text }}
    </span>
  </div>
</template>

<style scoped lang="scss">
@import "assets/responsive";

.c-input-container {
  width: 100%;

  &__label {
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    color: #6A8AA1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 6px;
    padding-right: 12px;
    @include respond(md) {
      font-size: 14px;
      margin-bottom: 12px;
      padding-right: 24px;
    }
  }

  &__box {
    border-radius: 12px;
    border: 1px solid #DDE4ED;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    @include respond(md) {
      height: 56px;
    }

    &.disabled {
      background-color: #EEF0F6;
    }

    //&.disabled::after {
    //  content: "";
    //  position: absolute;
    //  left: 0;
    //  right: 0;
    //  top: 0;
    //  bottom: 0;
    //  z-index: 9;
    //  cursor: not-allowed;
    //}

    input {
      background-color: transparent !important;
      border: none !important;
      outline: none !important;
      width: 100%;
      height: 100%;
      padding: 0 16px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;

      &::placeholder {
        font-size: 10px;
        @include respond(md) {
          font-size: 14px;
        }
      }
    }

    &__prefix {
      position: absolute;
      right: 8px;
      top: 0;
      bottom: 0;
      z-index: 2;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__suffix {
      position: absolute;
      left: 8px;
      top: 0;
      bottom: 0;
      z-index: 2;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__sub-text {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 10px;
    @include respond(md) {
      font-size: 12px;
    }


    &.error {
      color: red;
    }
  }
}
</style>
