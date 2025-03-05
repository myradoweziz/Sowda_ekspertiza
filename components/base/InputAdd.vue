<template>
  <div class="add">
    <div class="add__title">{{ title }} wagty</div>
    <div class="add__content">
      <div class="add__items">
        <div v-for="(item, index) in times" :key="index" class="add__item">
          <span>{{ item }}</span>
          <div @click="close(index)" v-if="activeInput" class="add__item-icon">
            <BaseIcon name="closeMini" />
          </div>
        </div>
        <input type="text" @keyup.enter="addTime" v-model="time" placeholder="wagt..." />
      </div>
      <div @click="addTime" class="add__icon">
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseIcon from '@/components/BaseIcon.vue'
  export default {
    components: { BaseIcon },
    props: {
      title: { type: String, default: () => '' },
      times: { type: Array, default: () => [] },
      activeInput: { type: Boolean, default: () => true }
    },
    data() {
      return {
        time: ''
      }
    },
    methods: {
      close(id) {
        this.$emit('close', id)
      },
      addTime() {
        if (this.time) this.$emit('addTime', this.time)
        setTimeout(() => {
          this.time = ''
        }, 0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .add {
    width: 100%;
    // .add__title

    &__title {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: var(--text-2);
      padding: 6px 14px;
      background-color: #f4f4f4;
      border-radius: 2px 2px 0px 0px;
      width: fit-content;
    }

    // .add__content

    &__content {
      width: 100%;
      background-color: var(--input-back);
      border-radius: 2px 2px 0px 0px;
      padding: 20px;
      overflow: auto;
      display: flex;
      gap: 20px;
      border-radius: 0px 2px 2px 2px;
      height: 110px;
    }

    // .add__items

    &__items {
      display: flex;
      column-gap: 6px;
      row-gap: 10px;
      flex-wrap: wrap;
      align-items: center;
      width: calc(100% - 30px);
      input {
        background: transparent;
        width: 70px;
        border-radius: 10px;
        padding: 6px 10px;
        color: var(--text);
        border: 1px solid #e4e4e4;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: var(--text);
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }

    // .add__item

    &__item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 10px;
      padding-left: 16px;
      border-radius: 10px;
      border: 1px solid #e4e4e4;
      span {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: var(--text);
      }
    }

    // .add__item-icon

    &__item-icon {
      cursor: pointer;
    }

    // .add__icon

    &__icon {
      width: 30px;
      height: 30px;
      background-color: #cecdcd;
      border-radius: 2px;
      position: relative;
      cursor: pointer;
      transition: 0.3s;
      border: 1px solid transparent;
      &:hover {
        border: 1px solid rgba(41, 45, 50, 1);
        transition: 0.3s;
      }
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        background-color: rgba(41, 45, 50, 1);
        border-radius: 20px;
        height: 2px;
      }
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2px;
        background-color: rgba(41, 45, 50, 1);
        border-radius: 20px;
        height: 10px;
      }
    }
  }
</style>
