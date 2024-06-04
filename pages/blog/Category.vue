<template>
  <div>
    <div class="v-blog-category">
      <div class="v-blog-category__header">
        <div class="container">
          <h1
            v-if="getActiveCategory.name"
            class="v-blog-category__info__title"
          >
            مقالات " {{ getActiveCategory.name }} "
          </h1>
        </div>
      </div>

      <div class="container">
        <div class="v-blog-category__posts">
          <div v-if="posts.loading" class="row">
            <div v-for="n in 9" :key="n" class="col-lg-4">
              <SkeletonPostBase/>
            </div>
          </div>

          <div v-else>
            <div v-if="posts.items.length !== 0" class="row">
              <div
                v-for="(post, index) in posts.items"
                :key="index"
                class="col-lg-4"
              >
                <BlogPostItem
                  :link="{ name: 'blog-post', params: { slug: post.slug } }"
                  :src="post.src"
                  :title="post.title"
                  :categories="post.categories"
                  :summary="post.summery"
                  :blog-page="true"
                />
              </div>
            </div>
            <div v-else class="row">
              <div class="col-lg-12">
                <AlertBase variant="warning" class="text-center">
                  موردی یافت نشد
                </AlertBase>
              </div>
            </div>
          </div>
          <PaginationBase
            :total-page-count="Math.ceil(filters.totalPosts / filters.perPage)"
            :current-route="`/blog/category/${getActiveCategory.slug}`"
            :value="filters.currentPage"
            @onChange="onPageChange"
          />
        </div>
      </div>
    </div>

    <InfoBanner/>
  </div>
</template>

<script>
import Posts from '@/httpservices/Posts'
import InfoBanner from '@/components/banners/InfoBanner.vue'
import {generateMetaData} from '@/utils/Helpers'

export default {
  name: 'BlogPage',

  components: {
    InfoBanner,
  },

  data() {
    return {
      posts: {
        loading: true,
        items: [],
      },

      filters: {
        perPage: 9,
        currentPage: 1,
        totalPages: 0,
        totalPosts: 0,
        categoryId: null,
      },

      categories: [],
    }
  },

  async fetch() {
    await this.fetchCategories()
    await this.fetchPosts({
      categoryId: this.getActiveCategory?.id,
      currentPage: Number(this.$route.query?.page || 1),
    })
  },

  head() {
    return generateMetaData(` مقالات ${this.getActiveCategory.name}`,{
       description: "افزایش مستمر آگاهی در مورد صنعت ارزهای دیجیتال در موفقیت سرمایه گذاری این حوزه نقش بسزایی ایفا می کند. بلاگ اتراکس تلاش می کند مهمترین مفاهیم و اصطلاحات کاربردی این حوزه را در بلاگ توضیح و آموزش دهد.",
      meta:[ {
        name: 'canonical',
        href: `https://eterex.com/category/${this.getActiveCategory.slug}`,
      },]
    })
  },

  computed: {
    getActiveCategory() {
      return this.categories.find((item) => item.active) || {}
    },
  },

  methods: {
    async fetchPosts(filters = {}, resetFilters = false) {
      if (resetFilters) {
        this.filters = {
          ...this.filters,
          perPage: 9,
          currentPage: 1,
          totalPages: 0,
          totalPosts: 0,
          categoryId: null,
        }
      }

      this.filters = {
        ...this.filters,
        ...filters,
      }

      this.posts.loading = true
      this.posts.items = []

      try {
        const res = await Posts.getPosts(
          this.filters.perPage,
          this.filters.currentPage,
          this.filters.categoryId
        )
        this.filters.totalPages = parseInt(res.headers['x-wp-totalpages'])
        this.filters.totalPosts = parseInt(res.headers['x-wp-total'])
        this.posts.items = res.data.map((element) => {
          return {
            id: element.id,
            title: element.title.rendered,
            summery:
              element?.yoast_head_json?.description || element.title?.rendered,
            slug: decodeURIComponent(element.slug),
            categories: [],
            alt: element.title.rendered,
            src:
              element.jetpack_featured_media_url === ''
                ? '/empty.png'
                : element?.better_featured_image.source_url,
          }
        })
        this.posts.loading = false
      } catch (e) {
      }
    },

    async fetchCategories() {
      const res = (await Posts.getCategories())?.data || []
      this.categories = res.map((item) => {
        return {
          id: item.id,
          name: item.name,
          slug: decodeURI(item.slug),
          active: decodeURI(item.slug) === this.$route?.params?.slug,
        }
      })
    },

    onPageChange(page) {
      this.filters.currentPage = Number(page)
      this.fetchPosts()
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.v-blog-category {
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
  }

  &__header {
    background: #f2f7ff;
    padding-top: 100px;

    @include respond(lg) {
      padding-top: 144px;
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
    padding-left: 16px;
    padding-right: 16px;

    @include respond(lg) {
      padding-left: var(--side--padding);
      padding-right: var(--side--padding);
    }

    &__title {
      color: #123e92;
      font-weight: 900;
      font-size: 16px;
      line-height: 56px;
      text-align: right;
      margin: 0;
      margin-bottom: 8px;

      @include respond(lg) {
        font-size: 40px;
      }
    }

    &__sub-title {
      color: #000000;
      opacity: 0.75;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      text-align: right;
      margin-bottom: 32px;
    }
  }
}
</style>
