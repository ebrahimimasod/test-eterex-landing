<template>
  <div class="v-public-page">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8">
          <img
            v-if="pageData.src"
            :src="pageData.src"
            :alt="pageData.alt"
            width="845"
            height="527"
            class="v-public-page__img"
          />
          <h1 class="v-public-page__title">{{ pageData.title }}</h1>
          <!-- eslint-disable vue/no-v-html -->
          <div class="v-public-page__content" v-html="pageData.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pages from '@/httpservices/Pages'
import {generateMetaData} from '@/utils/Helpers'

export default {
  name: 'PublicPage',

  async asyncData({params}) {
    try {
      const response = await Pages.getPage('faqs')

      const pageData = {
        title: response.data[0].title.rendered,
        description: response.data[0].yoast_head_json.description,
        slug: response.data[0].slug,
        content: response.data[0].content.rendered,
        summery: response.data[0].excerpt.rendered,
        src:
          response.data[0].better_featured_image !== null
            ? response.data[0].better_featured_image.source_url
            : '',
        alt:
          response.data[0].better_featured_image !== null
            ? response.data[0].better_featured_image.alt_text
            : '',
      }
      return {pageData}
    } catch (e) {
    }
  },

  data() {
    return {
      pageData: {},
    }
  },

  head() {
    return generateMetaData(this.pageData.title, 
    {
      'description':this.pageData.description
    })
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.v-public-page {
  padding-top: 132px;

  .row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rt-reading-time {
    display: none !important;
  }

  @include respond(lg) {
    padding-top: 152px;
  }

  &__title {
    text-align: right;
    font-weight: 900;
    font-size: 40px;
    line-height: 56px;
    color: #123e92;
  }

  &__img {
    border-radius: 8px;
  }

  &__content {
    color: #666464;
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
    text-align: right;
    margin-top: 24px;

    p {
      line-height: 32px !important;
    }

    .text-red {
      color: red;
    }
  }
}
</style>
