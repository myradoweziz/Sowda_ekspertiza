<template>
  <div class="cars">
    <div class="cars__container __container">
      <div class="cars__content">
        <div class="cars__checkboxs">
          <label @click="checkedFirst" class="cars__item">
            <div class="cars__icon">
              <checkbox @toogle="checkedFirst" :checked="activeCheck" />
            </div>
            <div class="cars__title">{{ title }}</div>
          </label>
          <label @click="checkedSecond" class="cars__item">
            <div class="cars__icon">
              <checkbox @toogle="checkedSecond" :checked="isActive" />
            </div>
            <div class="cars__title">{{ label }}</div>
          </label>
        </div>
        <div class="cars__btn">
          <div class="cars__button">
            <Button @onClick="send" text="Ugratmak" appendIcon="send" primary border10 />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseIcon from '@/components/BaseIcon.vue'
  import Button from '@/components/base/Button.vue'
  import Checkbox from '~/components/base/Checkbox.vue'

  export default {
    layout: 'default',
    components: { BaseIcon, Button, Checkbox },
    props: {
      title: { type: String, default: () => '' },
      label: { type: String, default: () => '' },
      isActive: { type: Boolean, default: () => false },
      activeCheck: { type: Boolean, default: () => false },
      item: { type: Object, default: () => {} }
    },
    emits: ['sendOrder', 'chechedFirst', 'chechedSecond'],
    methods: {
      send() {
        this.$emit('sendOrder')
      },
      checkedFirst() {
        this.$emit('chechedFirst', this.activeCheck)
      },
      checkedSecond() {
        this.$emit('chechedSecond', this.isActive)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cars {
    padding: 60px 0px;
    @media (max-width: 768px) {
      padding: 40px 0px;
    }
    @media (max-width: 425px) {
      padding: 10px 0px;
    }

    &__container {
    }
    &__content {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    &__checkboxs {
      display: flex;
      gap: 30px;
      width: 100%;
      @media (max-width: 425px) {
        flex-wrap: wrap;
      }
    }
    &__item {
      background: #f5fbf7;
      border-radius: 10px;
      width: 100%;
      display: flex;
      align-items: center;
      user-select: none;
      cursor: pointer;
      gap: 12px;
      padding: 20px;
    }
    &__icon {
      :deep(span) {
        color: var(--button-back);
      }
    }
    &__title {
    }
    &__btn {
      display: flex;
      width: 100%;
      justify-content: flex-end;
    }
    &__button {
      width: 138px;
      height: 46px;
      button {
        @media (max-width: 425px) {
          font-size: 14px;
        }
      }
    }
  }
</style>
