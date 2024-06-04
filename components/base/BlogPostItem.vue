<template>
  <div class="c-blog-post-item">
    <div class="c-blog-post-item__inner" :class="{ blogPage: blogPage }">
      <div class="c-blog-post-item__inner__link" >
        <router-link :to="link" style="display: block;width: 100%;">
        <ImgProvider
          v-if="!src || src === ''"
          width="100%"
          height="auto"
          tag="img"
          alt="empty"
          src="/empty.png"
          class="c-blog-post-item__inner__image"
          lazy
        />

        <ImgProvider
          v-else
          :src="src"
          :alt="title"
          class="c-blog-post-item__inner__image"
          tag="img"
          lazy
        />
        </router-link>
        <div class="c-blog-post-item__inner__title">
          <router-link :to="link" style="display: block;width: 100%;">
          <h2 class="c-blog-post-item__inner__title__text" style="font-size: 16px;">{{ title }}</h2>
          </router-link>
          <div class="c-blog-post-item__inner__title__categories">
            <link-base
              v-for="(category, index) in categories"
              :key="index"
              :to="{ name: 'blog-category', params: { slug: category.slug } }"
            >
              {{ category.name }}
            </link-base>
          </div>
          <div v-if="isSlidItem" class="c-blog-post-item__link__text">
            {{ summary }}
          </div>
        </div>
      </div>
    </div>
    <link-base v-if="blogPage" class="c-blog-post-item__link" :to="link">
      <h2 class="c-blog-post-item__link__title">{{ title }}</h2>
    </link-base>
    <div v-if="blogPage" class="c-blog-post-item__link__text">
        {{ summary }}
      </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPostItem',
  props: {
    link: {
      type: [String, Object],
      default: null,
    },

    src: {
      type: String,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },

    summary: {
      type: String,
      default: '',
    },

    categories: {
      type: Array,
      default: () => [],
    },

    blogPage: {
      type: Boolean,
      default: false,
    },

    isSlidItem: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    postLink() {
      if (typeof this.link === 'string') {
        return {
          href: this.link,
        }
      }
      return {
        to: {
          name: 'blog',
          slug: this.link,
        },
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.c-blog-post-item {
  position: relative;
  padding: 0;
  margin-bottom: 24px;

  &__inner {
    box-shadow: 0 0 6px 0 rgb(0 0 0 / 16%);
    border-radius: 30px;
    direction: ltr;

    * {
      box-sizing: border-box;
      border-radius: 30px;
    }

    &__link {
      width: 100%;
      display: flex !important;
    }

    position: relative;

    &__image {
      display: block;
      width: 100%;
      height: auto;
      height: 224px;
      object-fit: cover;
    }

    &__title {
      direction: rtl;
      position: absolute;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(30px);
      width: 100%;
      opacity: 1;
      color: #0934f3;
      padding: 9px 10px 10px 10px;
      text-align: right;
      border-radius: 0px 0px 30px 30px;
      font-weight: 700;
      font-size: 14px;
      line-height: 24px;
      height: 50%;

      @include respond(lg) {
        direction: rtl;
        position: absolute;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(30px);
        width: 100%;
        opacity: 1;
        color: #0934f3;
        padding: 16px 16px 16px 16px;
        text-align: right;
        border-radius: 0px 0px 30px 30px;
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
        height: 30%;
      }

      &__categories {
        display: flex;
        align-items: center;
        text-align: right;
        margin-top: 4px;

        a {
          margin-left: 4px;
          text-decoration: none;
          color: #0934f3;
          opacity: 0.75;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          padding: 8px 4px;
          width: fit-content;
        }

        a:hover {
          color: #fff;
          background-color: #0934f3;
        }
      }
    }
  }

  .blogPage {
    margin-bottom: 16px;

    .c-blog-post-item__inner__title {
      background: transparent;
      backdrop-filter: blur(0px);
      height: 35%;

      &__text {
        display: none;
      }

      &__categories {
        display: flex;
        align-items: center;
        text-align: right;
        margin-top: 4px;
        bottom: 24px;
        margin-top: auto;
        position: absolute;

        a {
          margin-left: 4px;
          text-decoration: none;
          color: #3c3c3c;
          opacity: 1;
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          padding: 8px 8px;
          width: fit-content;
          background: #f2f7ff;
          border-radius: 18px;
        }

        a:hover {
          color: #fff;
          background-color: #0934f3;
        }
      }
    }
  }

  &__link {
    display: block !important;

    &__title {
      color: #0934f3;
      text-align: right;
      font-weight: 700;
      font-size: 16px;
      line-height: 32px;
      margin-bottom: 8px;

      @include respond(lg) {
        font-size: 20px;
        line-height: 32px;
        margin-bottom: 8px;
      }
    }

    &__text {
      opacity: 0.75;
      color: #000000;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      text-align: right;

      @include respond(lg) {
        font-size: 14px;
      }
    }
  }
}
</style>
