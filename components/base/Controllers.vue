<template>
  <div class="controller">
    <div class="controller__body">
      <div
        v-for="item in items"
        :key="item.title"
        @click="$emit('onClick', item.id)"
        :class="['controller__item ', { active: activeId === item.id }]"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['onClick'],
  props: {
    items: { type: Array, default: () => [] },
    activeId: { type: Number, default: () => 0 },
  },
}
</script>

<style lang="scss" scoped>
.controller {
  // .controller__body

  &__body {
    display: flex;
    align-items: center;
    background: transparent;
    gap: 2px;
  }

  // .controller__item

  &__item {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: var(--text-2);
    padding: 6px 27px;
    background: var(--white);
    border-radius: 2px 2px 0px 0px;
    cursor: pointer;
    transition: 0.3s;
    &.active,
    &:hover {
      background-color: var(--input-back);
      transition: 0.3s;
    }
  }
}
</style>
