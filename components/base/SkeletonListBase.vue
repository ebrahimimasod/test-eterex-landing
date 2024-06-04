<template>
  <section>
    <Skeleton
      class="c-sekeletonListBase"
      :count="lineCount"
      :style="'height: ' + itemHeight + 'px'"
    />
  </section>
</template>

<script>
import { Skeleton } from 'vue-loading-skeleton'

export default {
  name: 'SkeletonListBase',
  components: { Skeleton },

  props: {
    itemHeight: {
      type: Number,
      default: 24,
    },

    lineCount: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style lang="scss">
.c-sekeletonListBase {
  .pu-skeleton {
    margin-bottom: 14px;
  }
}
</style>
