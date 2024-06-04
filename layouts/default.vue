<template>
<div class="l-default ">
    <div class="navbar ">
      <NavbarDefault/>
    </div>
    <Nuxt />
    <FooterDefault/>
  </div>
</template>

<script>
import NavbarDefault from '../components/Navbar.vue'
import FooterDefault from '../components/FooterDefault.vue';

export default {
  name: 'DefaultLayout',

  components: {
    NavbarDefault,
    FooterDefault,
  },
  scrollToTop: true,

}
</script>

<style lang="scss">
@import '@/assets/_responsive.scss';

.l-default {
  .navbar {
    position: sticky !important;
    //padding: 0px 16px;
    top: 16px;
    z-index: 10;
    margin: auto;

    @include respond(lg) {
      //padding: 0px var(--side--padding);
      top: 24px;
    }
  }
}
</style>
