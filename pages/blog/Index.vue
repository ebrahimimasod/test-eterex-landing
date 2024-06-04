<template>
  <div class="v-blog">
    <div class="v-blog__header">
      <BlogSlider :categories="categories" />
    </div>

    <PriceSlider />

    <div class="container">
      <AppUseBanner />
    </div>

    <div
      ref="v-blog__info"
      class="v-blog__info"
    >
      <div class="container">
        <h3 class="v-blog__info__title">آخرین مقالات</h3>
      </div>
    </div>

    <div class="container">
      <div
        ref="v-blog__posts"
        class="v-blog__posts"
      >
        <div class="v-blog__posts__categories">
          <link-base
            v-for="(categoryItem, index) in parentCategories"
            :key="index"
            class="v-blog__posts__categories__item"
            :to="categoryItem.link"
          >
            {{ categoryItem.name }}
          </link-base>
        </div>

        <div
          v-if="post.loading"
          class="row"
        >
          <div
            v-for="n in 9"
            :key="n"
            class="col-lg-4"
          >
            <SkeletonPostBase />
          </div>
        </div>

        <div v-else>
          <div
            v-if="post.totalPostsCount !== 0"
            class="row"
          >
            <div
              v-for="(item, index) in post.items"
              :key="index"
              class="col-12 col-md-6 col-lg-4"
            >
              <BlogPostItem
                :link="{ name: 'blog-post', params: { slug: item.slug } }"
                :src="item.src"
                :title="item.title"
                :categories="item.categories"
                :summary="item.summery"
                :blog-page="true"
              />
            </div>
          </div>
          <div
            v-else
            class="row"
          >
            <div class="col-lg-12">
              <AlertBase
                variant="warning"
                class="text-center"
              >
                موردی یافت نشد
              </AlertBase>
            </div>
          </div>
        </div>

        <PaginationBase
          current-route="/blog"
          :total-page-count="Math.ceil(post.totalPostsCount / filters.perPage)"
          :value="filters.pageIndex"
          @onChange="onPageChange"
        />
      </div>
    </div>

    <InfoBanner />
  </div>
</template>

<script>
import Posts from '@/httpservices/Posts'
import BlogSlider from '@/components/sliders/BlogSlider.vue'
import PriceSlider from '@/components/sliders/PriceSlider.vue'
import AppUseBanner from '@/components/banners/AppUseBanner.vue'
import InfoBanner from '@/components/banners/InfoBanner.vue'
import { generateMetaData } from '@/utils/Helpers'

export default {
  name: 'BlogPage',

  components: {
    BlogSlider,
    PriceSlider,
    AppUseBanner,
    InfoBanner,
  },

  data() {
    return {
      post: {
        loading: true,
        items: [],
        totalPagesCount: 0,
        totalPostsCount: 0,
      },

      filters: {
        perPage: 9,
        pageIndex: 1,
        categoryId: null,
      },

      sliderPosts: [],
      categories: [],
    }
  },

  head: generateMetaData('بلاگ',
    {
      description: "افزایش مستمر آگاهی در مورد صنعت ارزهای دیجیتال در موفقیت سرمایه گذاری این حوزه نقش بسزایی ایفا می کند. بلاگ اتراکس تلاش می کند مهمترین مفاهیم و اصطلاحات کاربردی این حوزه را در بلاگ توضیح و آموزش دهد.",
    }),


  async fetch() {
    this.filters = {
      ...this.filters,
      pageIndex: parseInt(this.$route.query.page || 1),
    }
    await this.fetchCategories()
    await this.fetchPosts()
  },

  computed: {
    parentCategories() {
      return this.categories
        .filter((category) => category.parent === 0)
        .map((item) => {
          return {
            ...item,
            link:
              item.id !== 'all'
                ? { name: 'blog-category', params: { slug: item.slug } }
                : { name: 'blog' },
          }
        })
    },
  },

  methods: {
    onPageChange(page) {
      this.fetchPosts({
        pageIndex: parseInt(page),
      })
    },

    async fetchPosts(filters = {}) {
      this.filters = {
        ...this.filters,
        ...filters,
      }

      this.post.loading = true
      try {
        const res = await Posts.getPosts(
          this.filters.perPage,
          this.filters.pageIndex,
          this.filters.categoryId
        )
        console.log({ masoud: res.headers })
        this.post.totalPagesCount = parseInt(res.headers['x-wp-totalpages'])
        this.post.totalPostsCount = parseInt(res.headers['x-wp-total'])
        this.post.items = res.data.map((element) => {
          return {
            id: element.id,
            title: element.title?.rendered,
            summery:
              element?.yoast_head_json?.description || element.title?.rendered,
            slug: decodeURI(element.slug),
            // categories: this.getCategoryNames(element.categories, this.categories),
            alt: element.title?.rendered,
            src:
              element.jetpack_featured_media_url === ''
                ? '/empty.png'
                : element?.better_featured_image.source_url,
          }
        })
      } catch (e) {
      }

      this.post.loading = false
      Number(this.filters.pageIndex) !== 1 && this.scrollToPosts()
    },

    async fetchCategories() {
      try {
        const res = (await Posts.getCategories())?.data || []
        this.categories = [
          {
            id: 'all',
            name: 'همه',
            parent: 0,
          },
        ]
        this.categories.push(
          ...res.map((element) => {
            return {
              id: element.id,
              name: element.name,
              parent: element.parent,
              slug: decodeURI(element.slug),
            }
          })
        )
      } catch (e) {
      }
    },

    scrollToPosts() {
      if (this.$refs['v-blog__info']) {
        const offsetTop = this.$refs['v-blog__info'].offsetTop
        window &&
          window.scrollTo({
            top: offsetTop - 150,
          })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.v-blog {
  &__loading {
    padding-right: 16px;
    padding-left: 16px;
    margin-top: 132px;

    @include respond(lg) {
      margin-top: 152px;
      padding-right: 20%;
      padding-left: 20%;
    }
  }

  &__posts {
    margin-bottom: 16px;

    @include respond(lg) {
      // padding-top: 64px;
    }

    &__categories {
      display: flex;
      flex-wrap: wrap;
      flex-grow: 2;
      margin-bottom: 16px;

      &__item {
        background: #deeaff;
        border-radius: 8px;
        color: #0934f3;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        padding: 6px 12px;
        margin-left: 8px;
        max-width: max-content;
        cursor: pointer;
        margin-bottom: 8px;

        @include respond(lg) {
          border-radius: 16px;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          padding: 12px 20px;
          margin-left: 12px;
          max-width: max-content;
          cursor: pointer;
          margin-bottom: 16px;
        }

        &.active {
          background: #0934f3;
          color: #ffffff;
        }

        &:hover {
          background: #0934f3;
          color: #ffffff;
        }
      }
    }
  }

  &__header {
    background: #f2f7ff;
    padding-top: 100px;

    @include respond(lg) {
      padding-top: 144px;
      // padding-bottom: 144px;
    }

    .c-blog-post-item__inner {
      margin-bottom: 0;
    }

    &__popular-posts {
      padding-right: 16px;
      padding-left: 16px;

      @include respond(lg) {
        padding-left: var(--side--padding);
        padding-right: var(--side--padding);

        &__item {
          padding: 16px !important;
        }
      }
    }
  }

  &__info {
    &__title {
      color: #123e92;
      font-weight: 900;
      font-size: 20px;
      line-height: 56px;
      text-align: right;
      margin: 0;
      margin-top: 24px;
      margin-bottom: 8px;

      @include respond(lg) {
        font-size: 40px !important;
      }
    }
  }
}</style>
