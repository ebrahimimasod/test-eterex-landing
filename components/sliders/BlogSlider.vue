<template>
  <div class="c-blog-slider">
    <ssr-carousel
      v-if="post.loading"
      show-arrows
      :slides-per-page="3"
      :responsive="responsive"
    >
      <SkeletonPostBase
        v-for="i in 3"
        :key="i"
        :no-text="true"
        class="c-blog-slider__loading"
      />
    </ssr-carousel>

    <ssr-carousel
      v-else
      :key="'slider-' + post.items.length"
      show-arrows
      :slides-per-page="3"
      :responsive="responsive"
      loop
      :autoplay-delay="5"
     
    >
   
      <div v-for="(item, index) in post.items" :key="index" class="slide">
        <BlogPostItem
          is-slid-item
          :link="{ name: 'blog-post', params: { slug: item.slug } }"
          :src="item.src"
          :title="item.title"
          :summary="item.summary"
          :categories="item.categories"
        />
      </div>
    </ssr-carousel>
  </div>
</template>

<script>
import SsrCarousel from 'vue-ssr-carousel'
import 'vue-ssr-carousel/index.css'
import Posts from '@/httpservices/Posts'
import getCategoryNames from '@/mixins/getCategoryNames'

export default {
  components: {
    SsrCarousel,
  },

  mixins: [getCategoryNames],

  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      responsive: [
        {
          maxWidth: 1280,
          slidesPerPage: 3,
        },
        {
          maxWidth: 1024,
          slidesPerPage: 2,
        },
        {
          maxWidth: 767,
          slidesPerPage: 1,
        },
      ],
      post: {
        items: [],
        loading: true,
      },
    }
  },

  async fetch() {
    await this.fetchPosts()
  },

  methods: {
    async fetchPosts() {
      this.post.loading = true
      try {
        const res = (await Posts.getPosts(8))?.data || []
        this.post.items = res.map((element) => {
          return {
            id: element.id,
            title: element?.title?.rendered,
            summary:  element?.yoast_head_json?.description || element.title?.rendered,
            slug: decodeURI(element?.slug),
            categories: [],
            // categories: this.getCategoryNames(element?.categories, this.categories),
            alt: element.title?.rendered,
            src:
              element.jetpack_featured_media_url === ''
                ? 'empty.png'
                : element?.better_featured_image.source_url,
          }
        })
      } catch (e) {}

      this.post.loading = false
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.c-blog-slider {
  direction: ltr;

  &__loading {
    padding-right: 16px;
    padding-left: 16px;

    @include respond(lg) {
      padding-right: 0%;
      padding-left: 0%;
    }
  }

  &__icon {
    margin-bottom: 24px;
  }

  .ssr-carousel-next-icon {
    background-color: #0934f3;
    border-radius: 14px;
    font-size: 10px;
  }

  .ssr-carousel-back-icon {
    background-color: #0934f3;
    border-radius: 14px;
    font-size: 10px;
  }

  .ssr-carousel-slides {
    .ssr-carousel-slide {
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      overflow: hidden;
      transition: box-shadow 0.1s;
      padding: 12px;
      border-radius: 12px;
      color: #000000;
      font-weight: 700;
      font-size: 16px;
      line-height: 25px;
      height: 250px;

      @include respond(xxs) {
        height: 250px;
      }

      @include respond(xs) {
        height: 290px;
      }

      @include respond(sm) {
        height: 270px;
      }

      @include respond(lg) {
        height: 390px;
      }
    }

    .ssr-carousel-slide {
      margin-right: 0;
    }

    .c-blog-post-item__inner__image {
      height: 346px;
    }
  }
}
</style>
