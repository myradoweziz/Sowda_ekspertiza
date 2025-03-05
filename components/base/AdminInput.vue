<template>
  <div :class="['admin-form-control', { error: status === 'error', success: status === 'success' }]">
    <div class="admin-form-control__langs">
      <button @click="selectIndex(0)" :class="{ active: activeIndex === 0 }">TKM</button>
      <button @click="selectIndex(1)" :class="{ active: activeIndex === 1 }">RUS</button>
      <button @click="selectIndex(2)" :class="{ active: activeIndex === 2 }">ENG</button>
    </div>
    <div class="admin-form-control__title">Title</div>
    <div class="admin-form-control__text-field">
      <input
        v-if="activeIndex === 0"
        type="text"
        @input="(e) => updateTm(e.target.value)"
        :value="tm"
        :disabled="disabled"
      />
      <input
        v-if="activeIndex === 1"
        type="text"
        @input="(e) => updateRu(e.target.value)"
        :value="ru"
        :disabled="disabled"
      />
      <input
        v-if="activeIndex === 2"
        type="text"
        @input="(e) => updateEn(e.target.value)"
        :value="en"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    tm: { type: String, default: '' },
    ru: { type: String, default: '' },
    en: { type: String, default: '' },
    status: { type: String, default: '' }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    selectIndex(index) {
      this.activeIndex = index
    },
    updateTm(text) {
      this.$emit('update:tm', text)
    },
    updateRu(text) {
      this.$emit('update:ru', text)
    },
    updateEn(text) {
      this.$emit('update:en', text)
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: var(--error);
}

.admin-form-control {
  &__langs {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 5px;
    button {
      width: 80px;
      height: 30px;
      border-radius: 2px;
      padding: 6px 27px;
      padding: 10px;
      background-color: transparent;
      font-size: 12px;
      font-weight: 500;
      line-height: 14.16px;
      text-align: center;
      color: #969494;
      &.active,
      &:hover {
        background: #F4F4F4;
        color: #333333;
      }
    }
  }
  &__title {
    font-size: 12px;
    font-weight: 500;
    line-height: 14.16px;
    text-align: left;
    color: #333333;
    margin-bottom: 5px;
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
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
}
</style>
