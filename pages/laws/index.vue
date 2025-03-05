<template>
  <div class="laws">
    <div class="laws__container __container">
      <div class="laws__head">
        <div class="laws__head-title">{{ $t('regulatory') }}</div>
        <user-pagination v-if="pageLength > 1" v-model="page" :page-count="pageLength" @click-page="updatePage" />
      </div>
      <div class="laws__body">
        <law-item v-for="item in documents" :key="item.uuid" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
  import LawItem from '@/components/ui/LawItem.vue'
  import UserPagination from '~/components/base/UserPagination.vue'

  import { getDocuments } from '@/api/user.api'

  export default {
    components: { LawItem, UserPagination },
    data() {
      return {
        documents: [],
        page: 1,
        limit: 12,
        pageLength: 0,
        file: null
      }
    },
    mounted() {
      this.fetchDocuments()
    },
    methods: {
      updatePage(p) {
        this.page = p
        this.fetchDocuments()
      },
      async fetchDocuments() {
        try {
          const { data, status } = await getDocuments({ data: { l: this.limit, p: this.page - 1 } })
          if (status) {
            this.pageLength = Math.ceil(data.data.count / this.limit)
            this.documents = data.data.documents
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .laws {
    padding: 60px 0px;
    @media (max-width: 768px) {
      padding: 40px 0px;
    }
    @media (max-width: 425px) {
      padding: 10px 0px;
    }
    // .laws__container

    &__head {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media (max-width: 768px) {
        margin-bottom: 20px;
      }
    }

    // .laws__head-title

    &__head-title {
      font-size: 36px;
      font-weight: 500;
      line-height: 43.2px;
      text-align: left;
      color: var(--black);
      @media (max-width: 425px) {
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;
        text-align: left;
        margin-bottom: 20px;
      }
    }



    &__body {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(3, 1fr);
      @media (max-width: 1055px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
</style>
