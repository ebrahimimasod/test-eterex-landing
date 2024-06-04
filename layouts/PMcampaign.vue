<template>
<div class="l-default ">
    <Nuxt />
    <FooterDefault :is-show-application-banner="false"/>
  </div>
</template>

<script>
import FooterDefault from '../components/FooterDefault.vue';

export default {
  name: 'DefaultLayout',

  components: {
    FooterDefault,
  },
  scrollToTop: true,

}
</script>
