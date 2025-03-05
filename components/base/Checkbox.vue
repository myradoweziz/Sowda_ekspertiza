<template>
  <div>
    <label @click="$emit('toggle', checked)">
      <BaseIcon :name="checked ? 'checked' : 'noneChecked'" />
      <span> {{ title }} </span>
    </label>
  </div>
</template>

<script>
  import BaseIcon from '@/components/BaseIcon.vue'
  export default {
    components: { BaseIcon },
    emits: ['toggle'],
    props: {
      checked: { type: Boolean, default: () => false },
      title: { type: String, default: () => '' }
    }
  }
</script>

<style lang="scss" scoped>
  label {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    :deep(span) {
      color: var(--button-back);
    }
    span {
      user-select: none;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: var(--text-link);
    }
  }
</style>
