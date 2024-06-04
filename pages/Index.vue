<template>
  <div class="v-index">
    <IndexHeader />

    <div class="container">
      <FeaturesBanner id="feature" />
      <PriceBanner />
      <BenefitsBanner />
      <BlogBanner />
      <AppUseBanner />
    </div>
    <HowToUseBanner />
    <client-only>
      <EmailNewsletterModal />
      <!--      <CampaignModal/>-->
    </client-only>
  </div>
</template>

<script>
import IndexHeader from '../components/banners/IndexHeader.vue'
import FeaturesBanner from '../components/banners/FeaturesBanner.vue'
import PriceBanner from '../components/banners/PriceBanner.vue'
import BenefitsBanner from '../components/banners/BenefitsBanner.vue'
import BlogBanner from '../components/banners/BlogBanner.vue'
import AppUseBanner from '../components/banners/AppUseBanner.vue'
import HowToUseBanner from '../components/banners/HowToUseBanner.vue'
import EmailNewsletterModal from '../components/EmailNewsletterModal'
// import CampaignModal from '../components/CampaignModal'
import { generateMetaData } from '@/utils/Helpers'

export default {
  name: 'IndexPage',
  components: {
    IndexHeader,
    FeaturesBanner,
    PriceBanner,
    BenefitsBanner,
    BlogBanner,
    AppUseBanner,
    HowToUseBanner,
    EmailNewsletterModal,
    // CampaignModal,
  },


  head: generateMetaData('صرافی آنلاین ارز دیجیتال و رمز ارز در ایران ',
    {
      description: "اِتِرِاکس، بستری مطمئن و کارآمد برای خرید و فروش انواع ارزهای دیجیتال و رمز ارز در ایران. با اتِرِاکس، سرعت و امنیت معاملات رمز ارزی خود را تضمین کنید. پشتیبانی 24 ساعته و نرخ های رقابتی منتظر شما هستند.",
    }),
}
</script>
