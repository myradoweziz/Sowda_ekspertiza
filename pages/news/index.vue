<template>
  <div class="news-page">
    <div class="news-page__container __container">
      <div class="news-page__head">
        <div class="news-page__title">{{ $t('news') }}</div>
        <user-pagination v-if="pageLength > 1" :model-value="page" :page-count="pageLength" @clickPage="updatePage" />
      </div>
      <div class="news-page__body">
        <div class="news-page__items">
          <news-item
            v-for="item in news"
            :key="item.uuid"
            :item="item"
            :page="page"
            :limit="limit"
            @open="openNewPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NewsItem from '@/components/ui/NewsItem.vue'
  import UserPagination from '~/components/base/UserPagination.vue'

  import { getNews } from '@/api/user.api'

  export default {
    components: { NewsItem, UserPagination },
    data() {
      return {
        limit: 12,
        page: 1,
        news: [],
        pageLength: 0
      }
    },
    async mounted() {
      await this.getAllNews()
    },
    methods: {
      openNewPage(id) {
        this.$router.push(this.localeLocation(`/news_id/${id}`))
      },
      updatePage(p) {
        this.page = p
        this.getAllNews()
      },
      async getAllNews() {
        try {
          const { data, status } = await getNews({ data: { l: this.limit, p: this.page - 1 } })
          if (status) {
            this.pageLength = Math.ceil(data.data.count / this.limit)
            this.news = data.data.news
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .news-page {
    padding: 60px 0px;
    @media (max-width: 768px) {
      padding: 40px 0px;
    }
    @media (max-width: 425px) {
      padding: 10px 0px;
    }
    // .news-page__container

    &__container {
    }

    // .news-page__head

    &__head {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      @media (max-width: 768px) {
        margin-bottom: 20px;
      }
    }

    // .news-page__title

    &__title {
      font-size: 30px;
      font-weight: 700;
      line-height: 36px;
      text-align: justify;
      color: var(--black);
      @media (max-width: 425px) {
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;
        text-align: left;
      }
    }

    // .news-page__body

    &__body {
      width: 100%;
      height: 100%;
    }

    // .news-page__items

    &__items {
      display: grid;
      column-gap: 10px;
      row-gap: 20px;
      grid-template-columns: repeat(4, 1fr);
      @media (max-width: 900px) {
         grid-template-columns: repeat(3, 1fr)
      }
      @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 5px;
        row-gap: 5px;
      }
    }
  }
</style>
