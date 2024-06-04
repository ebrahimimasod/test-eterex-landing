<template>
  <div :class="['c-switch-swap']">
    <div class="switch-items">
      <div :class="['active-flag','active-'+value]"></div>
      <span
        v-for="(item,index) in items"
        :key="index"
        @click="update(index)"
        :class="['switch-item',item.id === value && 'active' ]"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwitchSwapBase",

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    small: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },



  methods: {
    update(indexItem) {
      if (this.disabled) return;
      const activeTab = this.items[indexItem]?.id;
      this.$emit("update", activeTab);
    },
  },
};
</script>

<style scoped>
.c-switch-swap {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: relative;
}


.switch-items {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #eee;
  border-radius: 30px;

}

.active-flag {
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: #007bec;
  z-index: 0;
  border-radius: 30px;
  transition: all 0.5s
}


.active-flag.active-1{
  right: 0;
  transition: all 0.5s
}

.active-flag.active-2 {
  right: 50%;
  transition: all 0.5s;
}



.switch-item {
  position: relative;
  cursor: pointer;
  z-index: 1;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
}


.switch-item.active {
  color: #fff;
  transition: all 0.5s;
}
</style>
