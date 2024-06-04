<template>
  <div class="v-contact-us">
    <div class="v-contact-us__header"></div>
    <div class="container">
      <div class="v-contact-us__inner">
        <h2 class="v-contact-us__inner__title">تماس با ما</h2>

        <div class="card">
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="v-contact-us__inner__contact-item">
                <div class="icon clock"></div>
                <div class="text">
                  ساعت پاسخ‌گویی ما شنبه تا پنجشنبه ۱۰ صبح الی ۶ عصر
                </div>
              </div>
              <div class="v-contact-us__inner__contact-item">
                <div class="icon map-pin"></div>
                <div class="text">
                  تهران، یوسف آباد، خیابان اسدآبادی، پلاک ۴۴۹
                </div>
              </div>
              <div class="v-contact-us__inner__contact-item">
                <div class="icon mail"></div>
                <div class="text">info@eterex.com</div>
              </div>
              <div class="v-contact-us__inner__contact-item">
                <div class="icon phone"></div>
                <div class="text dir-ltr">
                  <a href="tel:02192002088"> +98 21 9200 2088 </a>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <client-only>
                <div class="map-container" id="map-container"></div>
              </client-only>
            </div>
          </div>

          <div class="row">
            <div
              v-for="(item, index) in socials"
              :key="index"
              class="col-6 col-lg-3 v-contact-us__inner__socials"
            >
              <a :href="item.link" class="v-contact-us__inner__socials__item">
                <div class="icon" :class="item.icon"></div>
                <span class="v-contact-us__inner__socials__item__name">{{
                    item.name
                  }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {generateMetaData, isSSR} from '@/utils/Helpers'

export default {
  name: 'ContactUs',

  data() {
    return {
      socials: [
        {
          id: 1,
          name: 'تلگرام',
          icon: 'telegram',
          link: 'https://t.me/eterexchange',
        },
        {
          id: 2,
          name: 'اینستاگرام',
          icon: 'instagram',
          link: 'https://instagram.com/eterexchange?utm_medium=copy_link',
        },
        {id: 3, name: 'لینکدین', icon: 'linkedin', link: '#'},
        {
          id: 4,
          name: 'توییتر',
          icon: 'twitter',
          link: 'https://twitter.com/eterexchange',
        },
      ],
    }
  },

  head: generateMetaData('تماس با ما'),


  mounted() {
    if (!isSSR()) {
      setTimeout(this.initMap, 500);
    }
  },
  methods: {
    initMap() {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
      });
      const map = L.map('map-container').setView([35.743013853585836, 51.40528296054533], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([35.743013853585836, 51.40528296054533]).addTo(map)

    }
  }
}
</script>

<style lang="scss">
@import "leaflet/dist/leaflet.css";
@import '@/assets/responsive.scss';

.v-contact-us {
  &__header {
    background: #f2f7ff;
    height: 368px;

    @include respond(lg) {
      height: 326px;
    }

    z-index: 1;
    top: 0px;
    left: 0px;
  }

  .dir-ltr {
    direction: ltr !important;
  }

  .iframe {
    width: 100%;
    height: 168px;
    border: none;
    border-radius: 16px;
    border: 1px solid #e9e9e9;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
  }

  &__inner {
    padding-top: 132px;
    margin-top: -436px;
    text-align: right;

    .card {
      background: #fff;
      padding: 16px;
      border-radius: 25px;

      @include respond(lg) {
        padding: 24px;
      }
    }

    @include respond(lg) {
      padding: 0px 15%;
      padding-top: 152px;
      margin-top: -350px;
    }

    &__title {
      color: #12377b;
      font-weight: 900;
      font-size: 32px;
      line-height: 40px;
      text-align: right;
      margin-bottom: 16px;

      @include respond(lg) {
        font-size: 40px;
        line-height: 56px;
        margin-bottom: 24px;
      }
    }

    &__contact-item {
      text-align: right;
      display: flex;
      margin-top: 24px;
      margin-bottom: 24px;
      justify-content: flex-start;

      .icon {
        width: 21px;
        height: 21px;
        margin-left: 10px;
        background-position: center;
        background-repeat: no-repeat;
      }

      .clock {
        background-image: url("data:image/svg+xml,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.5 5.25V10.5L14 12.25' stroke='%23FFB300' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10.5 19.2501C15.3325 19.2501 19.25 15.3326 19.25 10.5001C19.25 5.66763 15.3325 1.75012 10.5 1.75012C5.66751 1.75012 1.75 5.66763 1.75 10.5001C1.75 15.3326 5.66751 19.2501 10.5 19.2501Z' stroke='%232A6AE3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      }

      .mail {
        background-image: url("data:image/svg+xml,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.25 5.25L10.5 11.375L1.75 5.25' stroke='%23FFB300' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M3.5 3.49988H17.5C18.4625 3.49988 19.25 4.28738 19.25 5.24988V15.7499C19.25 16.7124 18.4625 17.4999 17.5 17.4999H3.5C2.5375 17.4999 1.75 16.7124 1.75 15.7499V5.24988C1.75 4.28738 2.5375 3.49988 3.5 3.49988Z' stroke='%232A6AE3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      }

      .map-pin {
        background-image: url("data:image/svg+xml,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_481_3222)'%3E%3Cpath d='M10.5 11.3749C11.9497 11.3749 13.125 10.1996 13.125 8.74988C13.125 7.30013 11.9497 6.12488 10.5 6.12488C9.05025 6.12488 7.875 7.30013 7.875 8.74988C7.875 10.1996 9.05025 11.3749 10.5 11.3749Z' stroke='%23FFB300' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18.375 8.74988C18.375 14.8749 10.5 20.1249 10.5 20.1249C10.5 20.1249 2.625 14.8749 2.625 8.74988C2.625 6.6613 3.45469 4.65826 4.93153 3.18141C6.40838 1.70456 8.41142 0.874878 10.5 0.874878C12.5886 0.874878 14.5916 1.70456 16.0685 3.18141C17.5453 4.65826 18.375 6.6613 18.375 8.74988Z' stroke='%232A6AE3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_481_3222'%3E%3Crect width='21' height='21' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
      }

      .phone {
        background-image: url("data:image/svg+xml,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_481_3232)'%3E%3Cpath d='M19.2498 14.805V17.43C19.2507 17.6736 19.2008 17.9149 19.1032 18.1381C19.0056 18.3614 18.8624 18.5619 18.6828 18.7266C18.5033 18.8913 18.2913 19.0168 18.0604 19.0948C17.8296 19.1729 17.585 19.2019 17.3423 19.18C14.6497 18.8874 12.0634 17.9673 9.79101 16.4937C7.67686 15.1503 5.88443 13.3579 4.54101 11.2437C3.06224 8.96102 2.14197 6.36208 1.85476 3.65746C1.83289 3.4155 1.86165 3.17163 1.9392 2.94138C2.01674 2.71114 2.14138 2.49957 2.30518 2.32013C2.46897 2.1407 2.66834 1.99733 2.89058 1.89917C3.11281 1.80101 3.35306 1.75019 3.59601 1.74996H6.22101C6.64565 1.74578 7.05733 1.89616 7.3793 2.17305C7.70127 2.44995 7.91158 2.83448 7.97101 3.25496C8.0818 4.09502 8.28728 4.91985 8.58351 5.71371C8.70123 6.0269 8.72671 6.36726 8.65693 6.69448C8.58714 7.0217 8.42501 7.32206 8.18976 7.55996L7.07851 8.67121C8.32412 10.8618 10.1379 12.6756 12.3285 13.9212L13.4398 12.81C13.6777 12.5747 13.978 12.4126 14.3052 12.3428C14.6325 12.273 14.9728 12.2985 15.286 12.4162C16.0799 12.7124 16.9047 12.9179 17.7448 13.0287C18.1698 13.0887 18.558 13.3028 18.8355 13.6303C19.113 13.9578 19.2604 14.3758 19.2498 14.805Z' stroke='%232A6AE3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M13.1685 4.375C14.0231 4.54174 14.8085 4.95972 15.4243 5.57544C16.04 6.19116 16.458 6.97661 16.6247 7.83125M13.1685 0.875C14.9441 1.07226 16.5998 1.8674 17.8639 3.12988C19.128 4.39236 19.9252 6.04713 20.1247 7.8225' stroke='%23FFB300' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_481_3232'%3E%3Crect width='21' height='21' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
      }

      .text {
        color: #656565;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        text-align: right;
      }
    }

    &__text {
      color: #0e0e0e;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      text-align: right;
      margin: 0;
      margin-top: 8px;
    }

    &__icon {
      left: 0;
      margin-right: 75%;
      margin-bottom: -24px;

      @include respond(lg) {
        margin-right: 90%;
      }
    }

    &__socials {
      margin-top: 24px;

      &__item {
        background: #ffffff;
        border: 1px solid #e9e9e9;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
        border-radius: 12px;
        padding: 16px;
        display: flex;

        &__name {
          color: #666464;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
        }

        .icon {
          width: 24px;
          height: 24px;
          background-repeat: no-repeat;
          margin-left: 12px;
        }

        .telegram {
          background-image: url("data:image/svg+xml,%3Csvg width='24' height='21' viewBox='0 0 24 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.4174 13.5961L9.0204 19.2499C9.58841 19.2499 9.83441 19.0028 10.1294 18.7062L12.7925 16.1294L18.3106 20.2209C19.3226 20.7919 20.0357 20.4912 20.3087 19.2782L23.9308 2.09416L23.9318 2.09315C24.2528 0.578459 23.3907 -0.0138506 22.4047 0.357735L1.1142 8.61058C-0.33883 9.18163 -0.31683 10.0017 0.867199 10.3733L6.31033 12.0875L18.9536 4.07764C19.5486 3.67872 20.0897 3.89944 19.6446 4.29837L9.4174 13.5961Z' fill='%230088CC'/%3E%3C/svg%3E%0A");
        }

        .instagram {
          background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M23.8951 7.06894C23.8361 5.79681 23.6328 4.92467 23.3377 4.16402C23.0295 3.37713 22.6229 2.70828 21.9606 2.04599C21.2984 1.38369 20.6295 0.970576 19.8426 0.668937C19.082 0.373855 18.2098 0.170576 16.9377 0.11156C15.659 0.0525435 15.2525 0.0394287 12.0066 0.0394287C8.7541 0.0394287 8.34754 0.0525435 7.07541 0.11156C5.80328 0.170576 4.93114 0.373855 4.17049 0.668937C3.3836 0.977134 2.71475 1.38369 2.05246 2.04599C1.39016 2.70828 0.977046 3.37713 0.675407 4.16402C0.380325 4.92467 0.177046 5.79681 0.11803 7.06894C0.0590132 8.34762 0.0458984 8.75418 0.0458984 12.0001C0.0458984 15.2525 0.0590132 15.6591 0.11803 16.9312C0.177046 18.2034 0.380325 19.0755 0.675407 19.8361C0.983603 20.623 1.39016 21.2919 2.05246 21.9542C2.71475 22.6165 3.3836 23.0296 4.17049 23.3312C4.93114 23.6263 5.80328 23.8296 7.07541 23.8886C8.35409 23.9476 8.76065 23.9607 12.0066 23.9607C15.259 23.9607 15.6656 23.9476 16.9377 23.8886C18.2098 23.8296 19.082 23.6263 19.8426 23.3312C20.6295 23.023 21.2984 22.6165 21.9606 21.9542C22.6229 21.2919 23.0361 20.623 23.3377 19.8361C23.6328 19.0755 23.8361 18.2034 23.8951 16.9312C23.9541 15.6525 23.9672 15.246 23.9672 12.0001C23.9672 8.75418 23.9541 8.34107 23.8951 7.06894ZM21.7443 16.8329C21.6918 18.0001 21.4951 18.6361 21.3311 19.0558C21.1147 19.6132 20.8525 20.0132 20.4328 20.4329C20.0131 20.8525 19.6131 21.1083 19.0557 21.3312C18.6361 21.4952 18 21.6919 16.8328 21.7443C15.5738 21.8034 15.1934 21.8165 12 21.8165C8.80655 21.8165 8.42623 21.8034 7.16721 21.7443C6 21.6919 5.36393 21.4952 4.94426 21.3312C4.38688 21.1148 3.98688 20.8525 3.56721 20.4329C3.14754 20.0132 2.8918 19.6132 2.66885 19.0558C2.50491 18.6361 2.30819 18.0001 2.25573 16.8329C2.19672 15.5739 2.1836 15.1935 2.1836 12.0001C2.1836 8.80664 2.19672 8.42631 2.25573 7.1673C2.30819 6.00008 2.50491 5.36402 2.66885 4.94435C2.88524 4.38697 3.14754 3.98697 3.56721 3.5673C3.98688 3.14763 4.38688 2.89189 4.94426 2.66894C5.36393 2.505 6 2.30828 7.16721 2.25582C8.42623 2.19681 8.80655 2.18369 12 2.18369C15.1934 2.18369 15.5738 2.19681 16.8328 2.25582C18 2.30828 18.6361 2.505 19.0557 2.66894C19.6131 2.88533 20.0131 3.14763 20.4328 3.5673C20.8525 3.98697 21.1082 4.38697 21.3311 4.94435C21.4951 5.36402 21.6918 6.00008 21.7443 7.1673C21.8033 8.42631 21.8164 8.80664 21.8164 12.0001C21.8164 15.1935 21.7967 15.5739 21.7443 16.8329Z' fill='url(%23paint0_linear_481_3244)'/%3E%3Cpath d='M11.9997 5.85571C8.60301 5.85571 5.85547 8.60981 5.85547 12C5.85547 15.3967 8.60957 18.1442 11.9997 18.1442C15.3899 18.1442 18.144 15.3901 18.144 12C18.144 8.60325 15.3965 5.85571 11.9997 5.85571ZM11.9997 15.9869C9.79645 15.9869 8.01285 14.2033 8.01285 12C8.01285 9.7967 9.79645 8.01309 11.9997 8.01309C14.203 8.01309 15.9866 9.7967 15.9866 12C15.9866 14.2033 14.203 15.9869 11.9997 15.9869Z' fill='url(%23paint1_linear_481_3244)'/%3E%3Cpath d='M18.3872 7.049C19.1803 7.049 19.8232 6.40608 19.8232 5.613C19.8232 4.81992 19.1803 4.177 18.3872 4.177C17.5941 4.177 16.9512 4.81992 16.9512 5.613C16.9512 6.40608 17.5941 7.049 18.3872 7.049Z' fill='%23BC30A0'/%3E%3Cpath d='M0.0327148 12.0001C0.0327148 15.2525 0.0458296 15.6591 0.104846 16.9312C0.163862 18.2034 0.367141 19.0755 0.662223 19.8361C0.97042 20.623 1.37698 21.2919 2.03927 21.9542C2.70157 22.6165 3.37042 23.0296 4.15731 23.3312C4.91796 23.6263 5.79009 23.8296 7.06222 23.8886C8.34091 23.9476 8.74747 23.9607 11.9934 23.9607C15.2458 23.9607 15.6524 23.9476 16.9245 23.8886C18.1967 23.8296 19.0688 23.6263 19.8294 23.3312C20.6163 23.023 21.2852 22.6165 21.9475 21.9542C22.6098 21.2919 23.0229 20.623 23.3245 19.8361C23.6196 19.0755 23.8229 18.2034 23.8819 16.9312C23.9409 15.6525 23.954 15.246 23.954 12.0001C23.954 8.74763 23.9409 8.34107 23.8819 7.06894C23.8229 5.79681 23.6196 4.92467 23.3245 4.16402C23.0163 3.37713 22.6098 2.70828 21.9475 2.04599C21.2852 1.38369 20.6163 0.970576 19.8294 0.668937C19.0688 0.373855 18.1967 0.170576 16.9245 0.11156C15.6458 0.0525435 15.2393 0.0394287 11.9934 0.0394287C8.74091 0.0394287 8.33436 0.0525435 7.06222 0.11156C5.79009 0.170576 4.91796 0.373855 4.15731 0.668937C3.37042 0.977134 2.70157 1.38369 2.03927 2.04599C1.37698 2.70828 0.963862 3.37713 0.662223 4.16402C0.367141 4.92467 0.163862 5.79681 0.104846 7.06894C0.0458296 8.34107 0.0327148 8.74763 0.0327148 12.0001ZM2.19009 12.0001C2.19009 8.80664 2.20321 8.42631 2.26222 7.1673C2.31468 6.00008 2.5114 5.36402 2.67534 4.94435C2.89173 4.38697 3.15403 3.98697 3.5737 3.5673C3.99337 3.14763 4.39337 2.89189 4.95075 2.66894C5.37042 2.505 6.00649 2.30828 7.1737 2.25582C8.43272 2.19681 8.81304 2.18369 12.0065 2.18369C15.1999 2.18369 15.5803 2.19681 16.8393 2.25582C18.0065 2.30828 18.6426 2.505 19.0622 2.66894C19.6196 2.88533 20.0196 3.14763 20.4393 3.5673C20.8589 3.98697 21.1147 4.38697 21.3376 4.94435C21.5016 5.36402 21.6983 6.00008 21.7507 7.1673C21.8098 8.42631 21.8229 8.80664 21.8229 12.0001C21.8229 15.1935 21.8098 15.5739 21.7507 16.8329C21.6983 18.0001 21.5016 18.6361 21.3376 19.0558C21.1212 19.6132 20.8589 20.0132 20.4393 20.4329C20.0196 20.8525 19.6196 21.1083 19.0622 21.3312C18.6426 21.4952 18.0065 21.6919 16.8393 21.7443C15.5803 21.8034 15.1999 21.8165 12.0065 21.8165C8.81304 21.8165 8.43272 21.8034 7.1737 21.7443C6.00649 21.6919 5.37042 21.4952 4.95075 21.3312C4.39337 21.1148 3.99337 20.8525 3.5737 20.4329C3.15403 20.0132 2.89829 19.6132 2.67534 19.0558C2.5114 18.6361 2.31468 18.0001 2.26222 16.8329C2.20321 15.5739 2.19009 15.1935 2.19009 12.0001Z' fill='url(%23paint2_linear_481_3244)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_481_3244' x1='7.85118' y1='-1.8793' x2='15.6895' y2='24.3425' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%234367DC'/%3E%3Cstop offset='0.04289' stop-color='%234C62D6'/%3E%3Cstop offset='0.1142' stop-color='%236654C7'/%3E%3Cstop offset='0.2045' stop-color='%238F3DAE'/%3E%3Cstop offset='0.2341' stop-color='%239E35A5'/%3E%3Cstop offset='0.4512' stop-color='%23D42F7F'/%3E%3Cstop offset='0.8242' stop-color='%23D73578'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_481_3244' x1='14.9315' y1='7.07068' x2='8.64779' y2='17.6357' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.3304' stop-color='%23D42F7F'/%3E%3Cstop offset='1' stop-color='%23F7772E'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_481_3244' x1='14.9479' y1='4.96889' x2='7.24093' y2='23.3507' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%239E35A5' stop-opacity='0'/%3E%3Cstop offset='0.4512' stop-color='%23D42F7F' stop-opacity='0.5'/%3E%3Cstop offset='0.7524' stop-color='%23F7772E'/%3E%3Cstop offset='1' stop-color='%23FEF780'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
        }

        .linkedin {
          background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24 23.0909H18.6957V14.9735C18.6957 12.8488 17.866 11.3983 16.0414 11.3983C14.6458 11.3983 13.8697 12.3772 13.5085 13.3205C13.373 13.6591 13.3942 14.1307 13.3942 14.6024V23.0909H8.13924C8.13924 23.0909 8.20697 8.71177 8.13924 7.40471H13.3942V9.86654C13.7046 8.79014 15.3838 7.25389 18.0635 7.25389C21.388 7.25389 24 9.51021 24 14.3688V23.0909ZM2.82502 5.44264H2.79116C1.09784 5.44264 0 4.24351 0 2.72353C0 1.17398 1.13029 0 2.85748 0C4.58325 0 5.6444 1.17104 5.67827 2.71911C5.67827 4.23908 4.58325 5.44264 2.82502 5.44264ZM0.605347 7.40471H5.28316V23.0909H0.605347V7.40471Z' fill='%23007EBB'/%3E%3C/svg%3E%0A");
        }

        .twitter {
          background-image: url("data:image/svg+xml,%3Csvg width='26' height='21' viewBox='0 0 26 21' fill='%23C0D3F7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='0.3' d='M25.5 0.998779C24.525 1.57753 22.5688 2.36628 21.4188 2.59378C21.385 2.60253 21.3575 2.61378 21.325 2.62253C20.3088 1.62003 18.9163 0.998779 17.375 0.998779C14.2688 0.998779 11.75 3.51753 11.75 6.62378C11.75 6.78753 11.7362 7.08878 11.75 7.24878C7.55875 7.24878 4.36875 5.05378 2.08125 2.24878C1.8325 2.87378 1.72375 3.86128 1.72375 4.78878C1.72375 6.54003 3.0925 8.26003 5.22375 9.32628C4.83125 9.42753 4.39875 9.50003 3.94875 9.50003C3.2225 9.50003 2.45375 9.30878 1.75 8.72878C1.75 8.75003 1.75 8.77003 1.75 8.79253C1.75 11.24 4.3475 12.9063 6.6575 13.37C6.18875 13.6463 5.24375 13.6738 4.7825 13.6738C4.4575 13.6738 3.3075 13.525 3 13.4675C3.6425 15.4738 5.96 16.6013 8.16875 16.6413C6.44125 17.9963 5.2425 18.4988 1.705 18.4988H0.5C2.735 19.9313 5.58125 21 8.43375 21C17.7213 21 23 13.9213 23 7.24878C23 7.14128 22.9975 6.91628 22.9938 6.69003C22.9938 6.66753 23 6.64628 23 6.62378C23 6.59003 22.99 6.55753 22.99 6.52378C22.9862 6.35378 22.9825 6.19503 22.9788 6.11253C23.9662 5.40003 24.8225 4.51128 25.5 3.49878C24.5938 3.90128 23.6213 4.17128 22.6 4.29378C23.6425 3.66878 25.1238 2.17878 25.5 0.998779Z' fill='%232A6AE3'/%3E%3C/svg%3E%0A");
        }
      }
    }
  }

  &__text {
    color: #0e0e0e;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    text-align: right;
    margin: 0;
    margin-top: 8px;
  }

  &__title {
    color: #12377b;
    font-weight: 6300;
    font-size: 24px;
    line-height: 37px;
    text-align: center;
    margin: 0;
    margin-top: 48px;
    margin-bottom: 8px;
  }

  &__sub-title {
    color: #000000;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    margin-bottom: 40px;
  }
}

#map-container {
  width: 100%;
  height: 230px;
}
</style>
