<template>
  <section class="c-blog-banner">
    <h2 class="c-blog-banner__title font-dana-bold">منتخب بلاگ</h2>

    <div class="row">
      <template v-if="loading">
        <div v-for="i in 6" :key="i" class="col-md-4 mb-4">
          <Skeleton height="224px"></Skeleton>
        </div>
      </template>

      <template v-else>
        <div
          v-for="(post, index) in posts"
          :key="index"
          class="col-12 col-md-6 col-xl-4"
        >
          <BlogPostItem
            :link="{ name: 'blog-post', params: { slug: post.slug } }"
            :src="post.src"
            :title="post.title"
            :categories="post.categories"
          />
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { Skeleton } from 'vue-loading-skeleton'
import Posts from '../../httpservices/Posts'
export default {
  name: 'BlogBanner',

  components: {
    Skeleton,
  },

  data() {
    return {
      navExpanded: false,
      posts: [],
      loading: true,
    }
  },

  async fetch() {
    this.loading = true
    await this.fetchPosts()
    this.loading = false
  },

  methods: {
    async fetchPosts() {
      try {
        const res = (await Posts.getPosts(6))?.data
        this.posts = res.map((element) => {
          return {
            id: element.id,
            title: element.title.rendered,
            slug: decodeURI(element.slug),
            alt: element.title.rendered,
            src:
              element.better_featured_image === null
                ? 'empty.png'
                : element.better_featured_image.source_url,
          }
        })
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.c-blog-banner {
  &__title {
    color: #12377b;
    font-weight: 900;
    font-size: 25px;
    line-height: 56px;
    margin-bottom: 8px;
    margin-top: 32px;

    @include respond(lg) {
      margin-top: 84px;
      font-size: 40px;
      margin-bottom: 40px;
    }
  }

  // &__sub-title {
  //   color: #000000;
  //   opacity: 0.75;
  //   font-weight: 400;
  //   font-size: 16px;
  //   line-height: 25px;
  //   margin-top: 0;
  //   margin-bottom: 24px;

  //   @include respond(lg) {
  //     margin-bottom: 40px;
  //   }
  // }
}
</style>
