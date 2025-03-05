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
    <div class="admin-form-control__text-field">
      <editor v-if="activeKey === 'tm'" v-model="content.address_tm" @input="updateTm"></editor>
      <editor v-if="activeKey === 'ru'" v-model="content.address_ru" @input="updateRu"></editor>
      <editor v-if="activeKey === 'en'" v-model="content.address_en" @input="updateEn"></editor>
    </div>
  </div>
</template>

<script>
export default {
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
    button {
      padding: 6px 27px;
      background-color: transparent;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: var(--text-3);
      &:first-child {
        border-top-left-radius: 2px;
      }
      &:last-child {
        border-top-right-radius: 2px;
      }
      &.active,
      &:hover {
        background: var(--input-back);
        color: var(--text-2);
      }
    }
  }
  &__text-field {
    width: 100%;
    textarea,
    .editor {
    }
  }
}
</style>
