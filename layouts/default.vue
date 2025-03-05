<template>
  <div class="wrapper">
    <the-header></the-header>
    <main class="main">
      <Nuxt />
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
export default {
  watch: {
    $route() {
      document.querySelector('.wrapper').scrollTop = 0
    }
  },
  head() {
    return this.$nuxtI18nHead()
  }
}
</script>
