<template>
  <div class="c-pagination-base">
    <nav class="c-pagination-base__items">
      <button
        v-if="totalPageCount"
        :class="['c-pagination-base__items__link',value === 1 && 'disabled']"
        @click="gotoPrevPage"
      >
        <img :src="prevIcon" alt="">
      </button>
      <nuxt-link
        v-for="(page,index) in getPagination"
        :class="['c-pagination-base__items__link',!page.link && 'disabled' ,page.number ===  value && 'active-link']"
        active-class="active"
        :key="index"
        :to="`${page.link ?? '#'}`">
        {{ page.name }}
      </nuxt-link>

      <button
        v-if="totalPageCount"
        :class="['c-pagination-base__items__link',value === totalPageCount && 'disabled']"
        @click="gotoNextPage"
      >
        <img :src="nextIcon" alt="">
      </button>


    </nav>
  </div>
</template>

<script>
export default {
  name: 'PaginationBase',

  props: {
    value: {
      type: [Number, String],
      default: 1,
    },
    totalPageCount: {
      type: Number,
      default: 0,
    },
    currentRoute: {
      type: String,
      default: "/"
    },
  },

  data() {
    return {
      prevIcon: require('~/assets/icons/arrow-left.svg'),
      nextIcon: require('~/assets/icons/arrow-right.svg'),
    }
  },

  computed: {

    getPagination() {
      let pages = [];
      if (this.totalPageCount === 0) {
        return pages;
      }
      pages = this.addPage(pages, this.value - 2);
      pages = this.addPage(pages, this.value - 1);
      pages = this.addPage(pages, this.value);
      pages = this.addPage(pages, this.value + 1);
      pages = this.addPage(pages, this.value + 2);
      return pages;
    }

  },

  watch: {
    '$route.query.page'(page) {
      this.changePageHandler(page);
    }
  },

  methods: {

    changePageHandler(pageIndex) {
      this.$emit('onChange', pageIndex)
      this.$emit('input', pageIndex)
    },

    addPage(pages = [], page = null) {


      if (page !== null && (page < 1 || page > this.totalPageCount)) {
        return pages;
      }
      pages.push({
        name: page ?? '...',
        number: page || 0,
        link: page
          ? `${this.currentRoute}?page=${page}`
          : null
      });
      return pages;
    },

    gotoNextPage() {
      if (this.value === this.totalPageCount) return;
      const page = this.value + 1;
      this.$emit('onChange',page )
      this.$emit('input', page)
      this.$router.push({
        query: {
          page: page
        }
      });
    },
    gotoPrevPage() {
      if (this.value === 1) return;
      const page = this.value - 1;
      this.$emit('onChange',page )
      this.$emit('input', page)
      this.$router.push({
        query: {
          page: page
        }
      });
    },
  },

}

</script>

<style lang="scss">
.c-pagination-base {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
  direction: ltr;

  &__items {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style-type: none;

    &__link {
      width: 44px;
      height: 44px;
      background: #f2f7ff;
      border-radius: 8px;
      margin: 0 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__link.disabled {
      opacity: 0.4;
      cursor: not-allowed !important;
    }

    &__link.active-link {
      background: #0934f3;
      color: #fff;
    }
  }
}

</style>

