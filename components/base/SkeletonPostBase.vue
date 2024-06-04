<template>
  <div class="c-sekeletonListBase">
    <div v-if="!noImage" class="c-sekeletonListBase__photo">
      <Skeleton height="224px"></Skeleton>
    </div>
    <div v-if="!noText" class="c-sekeletonListBase__meta">
      <div class="c-sekeletonListBase__info">
        <Skeleton></Skeleton>
      </div>
      <div class="c-sekeletonListBase__info">
        <Skeleton></Skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import { Skeleton } from 'vue-loading-skeleton'

export default {
  name: 'SkeletonPostBase',
  components: { Skeleton },

  props: {
    itemHeight: {
      type: Number,
      default: 24,
    },

    noImage: {
      type: Boolean,
      default: false,
    },

    noText: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.c-sekeletonListBase {
  margin-bottom: 14px;

  &__photo {
    margin-bottom: 8px;
  }

  &__info {
    margin-bottom: 8px;
  }

  .pu-skeleton {
    border-radius: 16px;
  }
}
</style>
