<template>
  <div class="c-collapse-item">
    <div class="c-collapse-item__wrap-collabsible">
      <input
        id="collapsible3"
        v-model="isExpanded"
        class="toggle"
        type="checkbox"
      />

      <button
        for="collapsible3"
        class="lbl-toggle"
        :class="{ isExpanded: isExpanded }"
        tabindex="0"
        @click="isExpanded = !isExpanded"
      >
        <div>
          <span class="lbl-toggle__index">{{ pkey }}.</span>{{ title }}
        </div>

        <div class="icon">
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L13 1"
              stroke="#3C3C3C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>

      <div class="collapsible-content">
        <div class="content-inner">
          <h6 class="content-inner__title">پاسخ:</h6>
          <!-- eslint-disable vue/no-v-html -->
          <p v-html="content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapseItem',

  props: {
    title: {
      type: String,
      default: '',
    },

    content: {
      type: String,
      default: '',
    },

    pkey: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      isExpanded: false,
    }
  },
}
</script>

<style lang="scss">
.c-collapse-item {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  margin-bottom: 16px;

  input[type='checkbox'] {
    display: none;
  }

  .rt-reading-time {
    display: none !important;
  }

  .lbl-toggle {
    width: 100%;
    display: block;
    text-align: right;
    padding: 20px;
    color: #ddd;
    background: #ffffff;
    cursor: pointer;
    transition: all 0.25s ease-out;
    color: #3c3c3c;
    border: 1px solid rgba(219, 219, 219, 0.4);
    border-radius: 16px;

    display: flex;
    justify-content: space-between;

    &__index {
      color: #ffb300;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      margin-left: 8px;
    }

    svg {
      margin-top: 10px;
    }

    &.isExpanded {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  .lbl-toggle:hover {
    color: #3c3c3c;
  }

  .collapsible-content {
    max-height: 0px;
    overflow: hidden;
    transition: max-height 0.25s ease-in-out;
  }

  .toggle:checked + .lbl-toggle + .collapsible-content {
    max-height: 350px;
  }

  .toggle:checked + .lbl-toggle {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;

    svg {
      transform: rotate(180deg);
    }
  }

  .collapsible-content .content-inner {
    background: #ffffff;
    border: 1px solid rgba(219, 219, 219, 0.4);
    padding: 16px 16px 16px 16px;

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 28px;
      text-align: right;
      color: #3c3c3c;
    }

    &__title {
      color: #ffb300;
      font-weight: 700;
      font-size: 14px;
      line-height: 28px;
      text-align: right;
      margin-bottom: 8px;
    }
  }

  .collapsible-content p {
    margin-bottom: 0;
  }
}
</style>
