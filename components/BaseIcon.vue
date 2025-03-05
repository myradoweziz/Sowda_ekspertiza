<template>
  <span class="base_icons" v-html="path" />
</template>

<script>
  import icons from '@/icons.js'
  export default {
    props: { name: { type: String, default: '' } },
    computed: {
      path() {
        return icons[this.name]
      }
    }
  }
</script>

<style>
  .base_icons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
