<template>
  <div class="count">
    <div class="count__title">{{ title }}</div>
    <div class="count__input">
      <input type="number" @input="(e) => update(e.target.value)" :value="number" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    update(number) {
      this.$emit('update:number', Number(number))
    }
  }
}
</script>

<style lang="scss" scoped>
.count {
  &__title {
    width: fit-content;
    background: #f4f4f4;
    border-radius: 2px 2px 0px 0px;
    padding: 6px 14px;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #474747;
  }
  &__input {
    width: 100%;
    position: relative;
    input {
      width: 100%;
      padding: 20px;
      background: #f4f4f4;
      border-radius: 2px;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: inherit;
    }
  }
  &__arrows {
    position: absolute;
    top: 13px;
    right: 19px;
  }
  &__arrow {
    cursor: pointer;
  }
}
</style>
