<template>
  <div class="transport">
    <div class="transport__container __container">
      <div class="transport__title">{{ $t('schedule') }}</div>
      <div class="transport__box">
        <div class="transport__table">
          <the-table :items="commutes" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TheTable from '@/components/ui/TheTable.vue'

  import { getCommutes, getCities } from '@/api/user.api'

  export default {
    components: { TheTable },
    data() {
      return {
        commutes: [],
        limit: 5,
        page: 0,
        cities: []
      }
    },
    async mounted() {
      await this.fetchCity()
    },
    methods: {
      async fetchCity() {
        try {
          const { data, status } = await getCities()
          if (status) this.cities = data.data
          await this.fetchCommutes(this.cities[0].uuid)
        } catch (error) {
          console.error(error)
        }
      },
      async fetchCommutes(id) {
        try {
          const { data, status } = await getCommutes({ data: { uuid: id } })
          if (status) {
            this.commutes = data.data
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .transport {
    padding: 60px 0px;
    @media (max-width: 768px) {
      padding: 40px 0px;
    }
    @media (max-width: 425px) {
      padding: 10px 0px;
    }
    // .transport__container

    &__container {
      display: flex;
      flex-direction: column;
      gap: 25px;
      @media (max-width: 425px) {
        gap: 10px;
      }
    }

    // .transport__title

    &__title {
      font-size: 30px;
      font-weight: 700;
      line-height: 36px;
      text-align: justify;
      color: var(--black);
      @media (max-width: 425px) {
        font-size: 15px;
        font-weight: 600;
        line-height: 18px;
        text-align: left;
      }
    }

    // .transport__box

    &__box {
    }

    // .transport__table

    &__table {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
</style>
