<template>
  <div class="admin-form-control">
    <div class="admin-form-control__dates">
      <button>{{ label }}</button>
    </div>
    <div class="admin-form-control__text-field">
      <input :type="type" @input="(e) => update(e.target.value)" :value="value" :disabled="disabled" />
    </div>
  </div>
</template>

<script>
export default {
  emits: ['update'],
  props: {
    disabled: Boolean,
    value: { type: String | Number, default: () => '' | 1 },
    type: { type: String, default: () => '' },
    label: { type: String, default: () => '' }
  },
  methods: {
    update(text) {
      this.$emit('update:value', text)
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-form-control {
  &__dates {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
    button {
      width: 80px;
      height: 30px;
      border-radius: 2px;
      padding: 10px;
      background-color: transparent;
      font-size: 12px;
      font-weight: 500;
      line-height: 14.16px;
      text-align: center;
      background: #F4F4F4;
      color: #333333;
    }
  }
  &__text-field {
    width: 100%;
    input {
      width: 100%;
      padding: 20px;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      background-color: var(--input-back);
      border-radius: 2px;
      border-top-left-radius: 0;
    }
  }
}
</style>
