<template>
  <div class="admin-form-control">
    <div class="admin-form-control__langs">
      <button
        v-for="lang in langs"
        :key="lang.id"
        @click="selectIndex(lang.key)"
        :class="{ active: activeKey === lang.key }"
      >
        {{ lang.name }}
      </button>
    </div>
    <div class="admin-form-control__title">Text</div>
    <div class="admin-form-control__text-field">
      <editor v-if="activeKey === 'tm'" v-model="content.text_tm" @input="updateTm"></editor>
      <editor v-if="activeKey === 'ru'" v-model="content.text_ru" @input="updateRu"></editor>
      <editor v-if="activeKey === 'en'" v-model="content.text_en" @input="updateEn"></editor>
    </div>
  </div>
</template>

<script>
import Editor from '../Editor.vue'
export default {
  components: { Editor },
  props: {
    content: { type: Object, default: () => {} }
  },
  data() {
    return {
      activeKey: 'tm',
      langs: [
        {
          id: 1,
          name: 'TKM',
          key: 'tm'
        },
        {
          id: 2,
          name: 'RUS',
          key: 'ru'
        },
        {
          id: 3,
          name: 'ENG',
          key: 'en'
        }
      ]
    }
  },
  methods: {
    selectIndex(key) {
      this.activeKey = key
    },
    updateTm(text) {
      this.$emit('content', text)
    },
    updateRu(text) {
      this.$emit('content', text)
    },
    updateEn(text) {
      this.$emit('content', text)
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-form-control {
  &__langs {
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
    textarea,
    .editor {
    }
  }
}
</style>
