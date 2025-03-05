<template>
  <div class="law-item">
    <div class="law-item__box">
      <div class="law-item__content">
        <div class="law-item__title" v-html="normalizeTextByLang(item, 'title')[$i18n.locale]" />
        <div class="law-item__text" v-html="normalizeTextByLang(item, 'text')[$i18n.locale]" />
      </div>
      <div class="law-item__infos">
        <div class="law-item__date">{{ new Date(item.date).toLocaleDateString() }}</div>
        <div class="law-item__btn">
          <a :href="`${imgURL}/uploads/documents/${item.img_path}`">
            <Button :text="$t('download')" appendIcon="west" primary />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Button from '@/components/base/Button.vue'

  import { mapGetters } from 'vuex'

  export default {
    components: { Button },
    computed: { ...mapGetters(['imgURL']) },
    props: { item: { type: Object, default: () => {} } },
    methods: {
      normalizeTextByLang(dontNormalItem, prefix = 'title') {
        return {
          tm: dontNormalItem[`${prefix}_tm`],
          ru: dontNormalItem[`${prefix}_ru`],
          en: dontNormalItem[`${prefix}_en`]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .law-item {
    width: 100%;
    height: 150px;
    padding: 10px;
    border-radius: 16px;
    border: 1px solid var(--black);

    // .law-item__box

    &__box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__content {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    // .law-item__title

    &__title {
      font-size: 18px;
      font-weight: 700;
      line-height: 21.6px;
      text-align: left;
      color: var(--black);
      @media (max-width: 425px) {
        font-size: 10px;
        font-weight: 700;
        line-height: 12px;
        text-align: left;
      }
    }

    // .law-item__text

    &__text {
      font-size: 12px;
      font-weight: 400;
      line-height: 14.4px;
      text-align: left;
      color: var(--black);
      @media (max-width: 425px) {
        font-family: Inter;
        font-size: 10px;
        font-weight: 400;
        line-height: 12px;
        text-align: left;
      }
    }

    // .law-item__infos

    &__infos {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    // .law-item__date

    &__date {
      font-size: 11px;
      font-style: italic;
      font-weight: 400;
      line-height: 13.2px;
      text-align: left;
      color: var(--black);
      @media (max-width: 425px) {
        font-size: 7.08px;
        font-style: italic;
        font-weight: 400;
        line-height: 8.49px;
        text-align: left;
      }
    }

    // .law-item__btn

    &__btn {
      width: 140px;
      @media (max-width: 425px) {
        width: 89.44px;
        height: 21.88px;
      }
    }
  }
</style>
