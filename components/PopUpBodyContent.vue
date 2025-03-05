<template>
  <div class="content" @click.stop>
    <div class="content__wrapper">
      <div class="content__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  &__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    overflow: hidden;
    gap: 10px;
  }
  &__close {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__body {
    width: 100%;
  }
}
</style>
