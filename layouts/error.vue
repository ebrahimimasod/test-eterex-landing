<template>
    <div class="p-error">
        <div v-if="error.statusCode === 404">
            <h1 class="p-error__title">
                صفحه مورد نظر پیدا نشد.
            </h1>
            <!-- <img class="p-error__img" src="/404.svg" /> -->
        </div>
        <nuxt-link to="/">
            برگشت به خانه
        </nuxt-link>
    </div>
</template>

<script>
export default {
    name: "ErrorPage",
    layout: "error-layout",
    
    props: {
        error: {
            type: Object,
            default: null
        }
    }
};
</script>

<style lang="scss">
.p-error {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width: 100%;
    text-align: center;
}
</style>

