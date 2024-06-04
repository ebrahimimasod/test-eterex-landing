<template>
    <div class="l-error">
        <NavbarDefault />
        <nuxt />
        <FooterDefault />
    </div>
</template>

<script>
import NavbarDefault from '../components/Navbar.vue'
import FooterDefault from '../components/FooterDefault.vue';

export default {
    name: "ErrorLayout",
    components: { NavbarDefault, FooterDefault },
};
</script>