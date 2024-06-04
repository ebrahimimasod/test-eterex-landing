<template>
  <div class="v-blog-post">
    <div
      v-if="post.loading"
      class="v-blog-post__loading-container"
    >
      <ProgressIndicator />
    </div>
    <template v-else>
      <div
        class="v-blog-post__header"
        :style="'background-image: url(' + post.src + ')'"
      ></div>
      <div class="container">
        <div class="v-blog-post__content">
          <div class="row">
            <div class="col-12 col-md-8">
              <h1 class="v-blog-post__content__title">{{ post.title }}</h1>
              <!-- <div class="v-blog-post__content__categories">
                <link-base
                  v-for="(categoryItem, index) in post.categories"
                  :key="index"
                  class="v-blog-post__content__categories__item"
                  :to="{
                    name: 'blog-category',
                    params: { slug: categoryItem.slug },
                  }"
                >
                  {{ categoryItem.name }}
                </link-base>
              </div> -->
              <div class="v-blog-post__content__social-bar">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="v-blog-post__content__social-bar__text">
                      این مطلب رو با دوستان خود به اشتراک بگذارید
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="v-blog-post__content__social-bar__links">
                      <link-base
                        v-for="socialItem in socials"
                        :key="socialItem.id"
                        class="v-blog-post__content__social-bar__links__item"
                        :class="socialItem.title"
                        :href="socialItem.link"
                      >
                      </link-base>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="post.src"
            class="v-blog-post__content__featured-img"
          >
            <div class="row">
              <div class="col-12 col-md-8">
                <ImgProvider
                  tag="img"
                  :src="post.src"
                  :alt="post.title"
                  width="953px"
                  height="auto"
                  lazy
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-8">
              <!-- eslint-disable vue/no-v-html -->
              <div
                class="v-blog-post__content__text"
                v-html="post.content"
              ></div>

              <div class="v-blog-post__content__related-posts">
                <h3 class="v-blog-post__content__related-posts__title">
                  مطالب مشابه
                </h3>

                <div
                  v-if="getRelatedPosts && getRelatedPosts.length !== 0"
                  class="row"
                >
                  <div
                    v-for="(relatedPostItem, index) in getRelatedPosts"
                    :key="index"
                    class="col-12 col-lg-6"
                  >
                    <BlogPostItem
                      is-slid-item
                      :link="{
                        name: 'blog-post',
                        params: { slug: relatedPostItem.slug },
                      }"
                      :src="relatedPostItem.img.src"
                      :title="relatedPostItem.title"
                      :categories="relatedPostItem.categories"
                      :summary="relatedPostItem.summary"
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="post.comment_status == 'open'"
                class="v-blog-post__content__comments"
              >
                <h3 class="v-blog-post__content__comments__title">نظرات</h3>

                <div class="row">
                  <div
                    v-for="(comment, index) in comments"
                    :key="index"
                    class="col-12 v-blog-post__content__comments__comment"
                  >
                    <div class="v-blog-post__content__comments__comment__img">
                      <img
                        :src="comment.author_avatar_urls[96]"
                        loading="lazy"
                        alt="author_avatar"
                      />
                    </div>
                    <div class="v-blog-post__content__comments__comment__info">
                      <h4 class="v-blog-post__content__comments__comment__name">
                        {{ comment.author_name }}
                      </h4>
                      <div class="v-blog-post__content__comments__comment__date">
                        {{
                          new Date(comment.date).toLocaleString('fa-ir', {
                            timeZone: 'Asia/Tehran',
                          })
                        }}
                      </div>

                      <!-- eslint-disable vue/no-v-html -->
                      <div
                        class="v-blog-post__content__comments__comment__message"
                        v-html="comment.content.rendered"
                      ></div>
                    </div>
                  </div>
                </div>

                <h3 class="v-blog-post__content__comments__title">
                  ارﺳﺎل ﻧﻈﺮ ﺟﺪﯾﺪ
                </h3>

                <AlertBase
                  v-if="commentMessage"
                  variant="success"
                  class="mb-4"
                >
                  {{ commentMessage }}
                </AlertBase>

                <div class="v-blog-post__content__comments__form">
                  <form @submit.prevent="submit">
                    <div class="row">
                      <div class="col-12 col-md-6 field">
                        <div class="label">نام و نام خانوادگی</div>
                        <input
                          v-model="newComment.authorName"
                          class="c-input c-input__field"
                          :class="{ error: errors.authorName !== '' }"
                          label="نام و نام خانوادگی"
                          placeholder="نام و نام خانوادگی"
                          type="text"
                          @blur="validate('authorName')"
                          @keypress="validate('authorName')"
                        />
                        <p
                          v-if="errors.authorName"
                          class="c-input__error"
                        >
                          {{ errors.authorName }}
                        </p>
                      </div>
                      <div class="col-12 col-md-6 field">
                        <div class="label">ایمیل شما</div>
                        <input
                          v-model="newComment.authorEmail"
                          class="c-input c-input__field"
                          :class="{ error: errors.authorEmail !== '' }"
                          label="ایمیل شما"
                          placeholder="ایمیل شما"
                          type="text"
                          @blur="validate('authorEmail')"
                          @keypress="validate('authorEmail')"
                        />
                        <p
                          v-if="errors.authorEmail"
                          class="c-input__error"
                        >
                          {{ errors.authorEmail }}
                        </p>
                      </div>
                      <div class="col-12 field">
                        <div class="label">متن پیام</div>
                        <input
                          v-model="newComment.contentData"
                          class="c-input c-input__field"
                          :class="{ error: errors.contentData !== '' }"
                          label="متن پیام"
                          placeholder="متن خود را بنویسید"
                          type="text"
                          :text-area="false"
                          @blur="validate('contentData')"
                          @keypress="validate('contentData')"
                        />
                        <p
                          v-if="errors.contentData"
                          class="c-input__error"
                        >
                          {{ errors.contentData }}
                        </p>
                      </div>
                    </div>

                    <div class="v-blog-post__content__comments__form__button-container">
                      <button-base
                        :loading="submitCommentLoading"
                        type="submit"
                        :disabled="hasError"
                        class="v-blog-post__content__comments__form__button-container__button"
                      >
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.3"
                            d="M2 9.772L14.728 22.5L22 2.5L2 9.772Z"
                            fill="white"
                          />
                          <path
                            d="M18.656 5.844L13.921 18.865L5.634 10.578L18.656 5.844ZM22 2.5L2 9.772L14.728 22.5L22 2.5Z"
                            fill="white"
                          />
                          <path
                            d="M7.59961 14.9708L9.52861 16.8998L15.6356 8.86377L7.59961 14.9708Z"
                            fill="white"
                          />
                        </svg>
                        <span>ارسال نظر</span>
                      </button-base>
                      <p
                        v-if="error"
                        class="c-input__error"
                      >
                        {{ error }}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { object, string } from 'yup'
import Posts from '@/httpservices/Posts'
import { generateMetaData, strLimit } from '@/utils/Helpers'
import ProgressIndicator from '@/components/base/ProgressIndicator'

const loginFormSchema = object().shape({
  authorEmail: string()
    .required('ایمیل اجباری است')
    .email('قالب ایمیل مورد قبول نیست'),
  authorName: string()
    .required('نام اجباری است')
    .min(3, 'نام باید حداقل 3 کاراکتر باشد'),
  contentData: string()
    .required('محتوای پیام الزامی است')
    .min(3, 'محتوای پیام باید حداقل 3 کاراکتر باشد'),
})

export default {
  name: 'BlogPost',
  components: { ProgressIndicator },
  data() {
    return {
      post: {
        loading: true,
        id: null,
        title: null,
        src: null,
        slug: null,
        date: null,
        relatedPosts: [],
        content: null,
        comment_status: null,
        seoHeaders: null,
        yoast_head_json: {},
      },
      socials: [],
      comments: [],
      newComment: {
        postID: '',
        authorName: '',
        authorEmail: '',
        contentData: '',
      },
      errors: {
        authorEmail: '',
        authorName: '',
        contentData: '',
      },
      commentMessage: '',
      commentSubmitDisable: true,
      error: '',
      submitCommentLoading: false,
    }
  },

  async fetch() {
    // await this.fetchCategories()
    await this.fetchPosts()
    if (this.post.comment_status === 'open') {
      this.newComment.postID = this.post.id
      this.getComments()
    }
  },

  head() {
    const meta = this.post?.seoHeaders;
    console.log({meta});
    return generateMetaData(meta?.title,
      {
        withoutDefaultMeta: true,
        withoutAppName: true,
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'robots', content: 'index, follow' },
          { name: 'article_published_time', content: meta?.article_published_time || '', },
          { name: 'mobile-web-app-capable', content: "yes" },
          { name: 'apple-mobile-web-app-title', content: "صرافی انلاین اتراکس" },
          { name: 'og:locale', content: meta?.og_locale },
          { name: 'og:title', content: meta?.og_title },
          { name: 'og:type', property: 'og:type', content: meta?.og_type },
          { name: 'og:site_name', property: 'og:site_name', content: "صرافی انلاین اتراکس" },
          { name: 'description', content: meta?.description, },
          { name: 'og:description', content: meta?.og_description },
          { name: 'og:url', content: meta?.og_url },
          { name: 'og:image', content: meta?.og_image[0]?.url ?? "" },
        ],
      })
  },

  computed: {
    hasError() {
      return (
        this.newComment.authorName === '' ||
        this.newComment.authorEmail === '' ||
        this.newComment.contentData === '' ||
        !(
          this.errors.authorEmail === '' &&
          this.errors.authorName === '' &&
          this.errors.contentData === ''
        )
      )
    },

    getRelatedPosts() {
      return this.post?.relatedPosts?.map((item) => {
        return {
          ...item,
          summary: strLimit(item.excerpt, 50),
        }
      })
    },
  },

  watch: {
    post() {
      this.setSocials()
    },
  },

  watchQuery: true,

  mounted() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.setSocials()
  },

  methods: {
    setSocials() {
      this.socials = [
        {
          id: 0,
          title: 'whatsapp',
          link: `https://api.whatsapp.com/send?text=${window.location.href}`,
        },
        {
          id: 1,
          title: 'telegram',
          link: `https://telegram.me/share/url?url=${window.location.href}&text=${this.post.title}`,
        },
        // { id: 2, title: "email", link: `https://telegram.me/share/url?url=${window.location.href}&text=${this.post.title}` },
        {
          id: 3,
          title: 'twitter',
          link: `http://twitter.com/share?text=${this.post.title}&url=${window.location.href}`,
        },
        {
          id: 5,
          title: 'facebook',
          link: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
        },
        {
          id: 6,
          title: 'linkedin',
          link: `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&summary=${this.post.title}`,
        },
        // { id: 7, title: "link", link: `${window.location.href}` },
      ]
    },

    validate(field) {
      loginFormSchema
        .validateAt(field, this.newComment)
        .then(() => {
          this.errors[field] = ''
        })
        .catch((err) => {
          this.errors[field] = err.message
        })
    },

    async submit() {
      try {
        if (!this.hasError) {
          this.submitCommentLoading = true
          await Posts.postComments(this.newComment)
          this.commentMessage =
            'نظر شما با موفقیت ثبت شد و بعد از تایید نمایش داده می‌شود'
          this.newComment = {
            ...this.newComment,
            authorName: '',
            authorEmail: '',
            contentData: '',
          }
        } else {
          this.error = 'لطفا تمامی فیلد های لازم را پر کنید'
        }
      } catch (error) {
        console.error({ error })
      }
      this.submitCommentLoading = false
    },

    getComments() {
      Posts.getComments(this.post.id).then((response) => {
        this.comments = response.data
      })
    },

    async fetchCategories() {
      try {
        const categoriesRes = (await Posts.getCategories())?.data || []
        this.post.categories = categoriesRes.map((item) => {
          return {
            id: item.id,
            name: item.name,
            slug: `${decodeURI(item.slug)}`,
          }
        })
      } catch (e) { }
    },

    async fetchPosts() {
      this.post.loading = true
      try {
        const postRes =
          (
            await Posts.getPostBySlug({
              slug: this.$route.params.slug,
              id: this.$route.query.id,
            })
          )?.data?.pop() || {}

        console.log(postRes?.content?.rendered)

        this.post = {
          ...this.post,
          id: postRes?.id,
          title: postRes?.title?.rendered,
          src: postRes.better_featured_image?.source_url,
          slug: postRes?.slug,
          date: postRes?.date,
          relatedPosts: postRes['jetpack-related-posts'],
          content: postRes?.content?.rendered,
          comment_status: postRes?.comment_status,
          seoHeaders: postRes?.yoast_head_json,
          yoast_head_json: postRes?.yoast_head_json,
        }
      } catch (e) {
        console.log({ e })
      }

      this.post.loading = false
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/responsive.scss';

.v-blog-post {
  .c-input__field {
    box-shadow: none;
    outline: none;
    height: 48px;
    display: flex;
    align-items: center;
    border: 1px solid #0934f3;
    border-radius: 10px;
    background-color: #fff;
    color: #65687e;
    width: 100%;
    position: relative;
    font-size: 14px;
    padding: 0 5px;
  }

  .c-input__error {
    color: #ff3952;
    font-size: 12px;
    margin-top: 8px;
    padding-right: 16px;
  }

  &__loading {}

  .first {
    margin-top: 132px;

    @include respond(lg) {
      margin-top: 152px;
    }
  }

  &__header {
    height: 528px;
    margin-top: 0;

    @include respond(lg) {
      margin-top: 0;
    }

    background-size: cover !important;
    background-repeat: no-repeat !important;
    background: rgba(255, 255, 255, 0.9);
    opacity: 0.1;
    z-index: -1;
    position: static;
    background-position: center !important;
  }

  &__content {
    z-index: 2;
    margin-top: -524px;

    @include respond(lg) {
      margin-top: -400px;
    }

    opacity: 1;
    position: relative;

    .row {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__title {
      color: #12377b;
      font-weight: 900;
      font-size: 18px;
      line-height: 37px;
      padding-right: 0;
      padding-left: 0;
      margin-top: 128px;
      text-align: center;

      @include respond(lg) {
        margin-top: 0;
        font-size: 36px;
        line-height: 56px;
        font-weight: 900;
        padding-right: 45px;
        padding-left: 45px;
        text-align: center;
      }
    }

    &__categories {
      display: flex;
      flex-wrap: wrap;
      flex-grow: 2;
      justify-content: center;
      margin-top: 13px;
      margin-bottom: 0px;

      @include respond(lg) {
        display: flex;
        flex-wrap: wrap;
        flex-grow: 2;
        justify-content: center;
        margin-top: 24px;
        margin-bottom: 16px;
      }

      &__item {
        background-color: #f2f7ff;
        color: #0934f3;
        border-radius: 8px;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        padding: 6px 12px;
        margin-left: 8px;
        max-width: max-content;
        cursor: pointer;
        margin-bottom: 8px;

        @include respond(lg) {
          background-color: #f2f7ff;
          color: #0934f3;
          border-radius: 16px;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          padding: 8px 16px;
          margin-left: 8px;
          max-width: max-content;
          cursor: pointer;
          margin-bottom: 8px;
        }

        &:hover {
          background: #0934f3;
          color: #ffffff;
        }
      }
    }

    &__social-bar {
      background: #f2f7ff;
      border-radius: 20px;
      padding: 12px;
      z-index: 3;

      &__text {
        text-align: center;
        margin-bottom: 16px;

        @include respond(lg) {
          text-align: right;
          margin-bottom: 0px;
        }
      }

      &__links {
        direction: ltr;
        display: flex;
        justify-content: center;

        @include respond(lg) {
          justify-content: flex-start;
        }

        &__item {
          width: 32px;
          height: 32px;
          background: #0934f3;
          border-radius: 10px;
          margin-right: 16px;
        }

        .facebook {
          background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' rx='10' fill='%232A6AE3'/%3E%3Cpath d='M19.0891 6.3999C15.485 6.3999 13.3712 8.3036 13.3712 12.641V15.457C13.3712 16.0093 12.9235 16.457 12.3712 16.457H9.79981C9.24752 16.457 8.7998 16.9048 8.7998 17.457V20.0285C8.7998 20.5808 9.24752 21.0285 9.7998 21.0285H12.3712C12.9235 21.0285 13.3712 21.4762 13.3712 22.0285V30.9999C13.3712 31.5522 13.8189 31.9999 14.3712 31.9999H16.9427C17.4949 31.9999 17.9427 31.5522 17.9427 30.9999V22.0285C17.9427 21.4762 18.3904 21.0285 18.9427 21.0285H20.78C21.2567 21.0285 21.6671 20.692 21.7606 20.2246L22.2749 17.6532C22.3986 17.0344 21.9253 16.457 21.2943 16.457H18.9427C18.3904 16.457 17.9427 16.0093 17.9427 15.457V13.4142C17.9427 11.7804 18.4755 10.9713 20.0087 10.9713H21.5141C22.0664 10.9713 22.5141 10.5236 22.5141 9.97133V7.46146C22.5141 6.96088 22.1441 6.53859 21.6452 6.49821C21.0202 6.44764 20.1409 6.3999 19.0891 6.3999Z' fill='white'/%3E%3C/svg%3E%0A");
        }

        .linkedin {
          background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' rx='10' fill='%232A6AE3'/%3E%3Cpath d='M9.22489 7.08814C10.3974 7.08909 11.3644 8.05752 11.3619 9.23587C11.3591 10.4697 10.3352 11.3997 9.21046 11.3729C8.06969 11.396 7.06716 10.4431 7.06738 9.22772C7.06738 8.04893 8.03817 7.08724 9.22489 7.08814Z' fill='white'/%3E%3Cpath d='M10.4706 24.9095H7.95849C7.63246 24.9095 7.36816 24.6452 7.36816 24.3192V13.6023C7.36816 13.2763 7.63246 13.012 7.95849 13.012H10.4706C10.7967 13.012 11.0609 13.2763 11.0609 13.6023V24.3193C11.0609 24.6452 10.7967 24.9095 10.4706 24.9095Z' fill='white'/%3E%3Cpath d='M24.9329 16.7763C24.9329 14.5296 23.1116 12.7083 20.8649 12.7083H20.2206C18.9914 12.7083 17.9054 13.3216 17.2522 14.259C17.181 14.3612 17.1151 14.4673 17.0545 14.5768C17.0335 14.5737 17.0211 14.572 17.0209 14.5726V13.2571C17.0209 13.1218 16.9111 13.012 16.7758 13.012H13.6416C13.5062 13.012 13.3965 13.1217 13.3965 13.2571V24.6647C13.3965 24.8 13.5061 24.9097 13.6415 24.9097L16.844 24.9105C16.9793 24.9106 17.0891 24.8008 17.0891 24.6655V18.075C17.0891 16.9358 17.9977 15.9899 19.1369 15.977C19.7184 15.9705 20.2455 16.2035 20.6255 16.5837C21.0005 16.9584 21.2323 17.4765 21.2323 18.0486V24.6663C21.2323 24.8016 21.342 24.9113 21.4773 24.9114L24.6877 24.9122C24.8231 24.9122 24.9328 24.8025 24.9328 24.6671V16.7763H24.9329Z' fill='white'/%3E%3C/svg%3E%0A");
        }

        .whatsapp {
          background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' rx='10' fill='%232A6AE3'/%3E%3Cpath d='M7.04785 24.9623L8.30181 20.5086C7.49544 19.1387 7.07088 17.5801 7.07088 15.9789C7.07088 11.0489 11.0818 7.03796 16.0118 7.03796C20.9419 7.03796 24.9528 11.0489 24.9528 15.9789C24.9528 20.909 20.9419 24.9199 16.0118 24.9199C14.4757 24.9199 12.9715 24.5267 11.6408 23.78L7.04785 24.9623ZM11.8756 22.1534L12.1492 22.3205C13.3095 23.0288 14.6451 23.4032 16.0118 23.4032C20.1056 23.4032 23.4361 20.0727 23.4361 15.9789C23.4361 11.8852 20.1056 8.55465 16.0118 8.55465C11.9181 8.55465 8.58757 11.8852 8.58757 15.9789C8.58757 17.4053 8.99297 18.7905 9.75985 19.9847L9.94416 20.2717L9.22205 22.8365L11.8756 22.1534Z' fill='white'/%3E%3Cpath d='M13.501 11.8175L12.9208 11.7858C12.7386 11.7759 12.5599 11.8368 12.4221 11.9564C12.1409 12.2007 11.6912 12.6729 11.553 13.2882C11.347 14.2057 11.6654 15.3292 12.4893 16.4526C13.3132 17.5761 14.8486 19.3736 17.5636 20.1414C18.4385 20.3888 19.1267 20.222 19.6577 19.8823C20.0783 19.6133 20.3682 19.1815 20.4727 18.6933L20.5653 18.2607C20.5948 18.1232 20.5249 17.9836 20.3972 17.9248L18.4365 17.021C18.3092 16.9623 18.1582 16.9994 18.0726 17.1104L17.3029 18.1082C17.2447 18.1836 17.1452 18.2135 17.0553 18.1819C16.5282 17.9967 14.7624 17.2571 13.7936 15.3908C13.7515 15.3099 13.762 15.2116 13.8216 15.1426L14.5572 14.2916C14.6324 14.2047 14.6514 14.0825 14.6062 13.9769L13.761 11.9995C13.716 11.8943 13.6152 11.8237 13.501 11.8175Z' fill='white'/%3E%3C/svg%3E%0A");
        }

        .telegram {
          background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' rx='10' fill='%232A6AE3'/%3E%3Cpath d='M24.2649 8.06871L5.24165 15.5143C4.62548 15.7555 4.66281 16.6436 5.29708 16.8317L10.1311 18.2654L11.9352 24.0149C12.1236 24.6154 12.8813 24.7975 13.32 24.3477L15.8193 21.7846L20.7232 25.3999C21.3233 25.8423 22.178 25.5136 22.3303 24.7818L25.5782 9.18574C25.7373 8.4218 24.989 7.78532 24.2649 8.06871ZM21.8799 11.5299L13.0437 19.3779C12.9556 19.4561 12.8996 19.5644 12.8865 19.6818L12.5463 22.7192C12.5352 22.8183 12.3971 22.8314 12.3677 22.7362L10.968 18.2063C10.9039 17.9989 10.9875 17.7742 11.1712 17.6598L21.6058 11.1598C21.8458 11.0102 22.0915 11.342 21.8799 11.5299Z' fill='white'/%3E%3C/svg%3E%0A");
        }

        .twitter {
          background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' rx='10' fill='%232A6AE3'/%3E%3Cpath d='M6.59091 22.1767C8.29465 23.2572 10.3157 23.8825 12.4821 23.8825C18.5684 23.8825 23.5022 18.9482 23.5022 12.8624C23.5022 12.7105 23.499 12.5596 23.4932 12.4093C23.7133 12.236 25.0749 11.1447 25.4086 10.4432C25.4086 10.4432 24.3029 10.9027 23.2208 11.0109C23.2187 11.0109 23.216 11.0114 23.2139 11.0114C23.2139 11.0114 23.216 11.0104 23.2197 11.0077C23.3194 10.9411 24.7134 9.99217 24.9022 8.86151C24.9022 8.86151 24.1201 9.27894 23.0251 9.64412C22.8439 9.70434 22.6541 9.76355 22.4585 9.81843C21.7526 9.06514 20.7494 8.59497 19.6357 8.59497C17.4996 8.59497 15.7687 10.3254 15.7687 12.4599C15.7687 12.7611 15.8034 13.0542 15.8689 13.3357C15.5704 13.3235 11.0247 13.0686 7.93222 9.32365C7.93222 9.32365 6.084 11.8468 9.03362 14.4413C9.03362 14.4413 8.13697 14.4056 7.36341 13.9434C7.36341 13.9434 7.07928 17.0002 10.4196 17.7817C10.4196 17.7817 9.76235 18.0307 8.71376 17.8531C8.71376 17.8531 9.30016 20.323 12.2679 20.5538C12.2679 20.5538 9.92116 22.6738 6.58984 22.1764L6.59091 22.1767Z' fill='white'/%3E%3C/svg%3E%0A");
        }
      }
    }

    &__featured-img {
      img {
        margin-top: 24px;
        width: 100%;
        border-radius: 24px;
      }

      .row {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &__text {
      margin-top: 24px;
      font-weight: 400;
      font-size: 16px;
      line-height: 32px;
      color: #666464;
      text-align: right;

      p {
        line-height: 30px !important;
      }

      h2 {
        margin-top: 24px;
        margin-bottom: 8px;
      }

      h3 {
        margin-top: 8px;
        margin-bottom: 4px;
      }
    }

    &__related-posts {
      &__title {
        font-weight: 700;
        font-size: 24px;
        line-height: 37px;
        text-align: right;
        color: #12377b;
        margin-bottom: 16px;
        margin-top: 32px;
      }
    }

    &__comments {
      &__title {
        font-weight: 700;
        font-size: 24px;
        line-height: 37px;
        text-align: right;
        color: #12377b;
        margin-bottom: 16px;
        margin-top: 32px;
      }

      &__comment {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 16px;

        &__img {
          img {
            width: 72px;
            height: 72px;
            border-radius: 25px;
            margin-left: 16px;
          }
        }

        &__name {
          color: #12377b;
          letter-spacing: -0.05em;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          text-align: right;
        }

        &__date {
          color: #666464;
          opacity: 0.6;
          text-align: right;
          letter-spacing: -0.05em;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
        }

        &__message {
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          color: #666464;
          text-align: right;
        }
      }

      &__form {
        .error {
          border-color: var(--color-7);
        }

        .label {
          text-align: right;
          margin-bottom: 8px;
          color: #666464;
          opacity: 0.68;
          font-weight: 400;
          font-size: 13px;
          line-height: 16px;
        }

        .field {
          margin-bottom: 16px;
          text-align: right;

          .c-input {
            margin-bottom: 8px;
          }
        }

        &__button-container {
          text-align: right;

          &__button {
            background: #0934f3;
            border-radius: 16px;
            padding: 12px 20px;
            color: #ffffff;
            font-weight: 700;
            font-size: 16px;
            line-height: 25px;

            span {
              margin-right: 8px;
            }
          }
        }
      }
    }
  }

  &__loading-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
