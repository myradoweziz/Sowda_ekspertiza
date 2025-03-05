<template>
  <div class="admin-main">
    <div class="admin-main__sidebar">
      <TheSidebar />
    </div>
    <div class="admin-main__body">
      <nuxt />
    </div>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue'
export default {
  components: { TheSidebar }
}
</script>

<style lang="scss" scoped>
.admin-main {
  // .admin-main__sidebar
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  &__sidebar {
    width: 260px;
    max-width: 260px;
  }

  // .admin-main__body

  &__body {
    width: calc(100vw - 260px);
    height: 100vh;
    overflow-y: auto;
    background: var(--background);
  }
}
</style>
