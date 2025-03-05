<template>
  <div class="car-types">
    <div class="car-types__container __container">
      <div class="car-types__head">
        <div class="car-types__title">{{ $t('cars') }}</div>
      </div>
      <div class="news-page__body">
        <div class="car-types__items">
          <div v-for="item in orderCars" :key="item.UUID" @click="openContact(item)" class="car-types__item">
            <div class="car-types__name">
              <span>{{ item.name }}</span>
              <base-icon name="cars-order" />
            </div>
            <div class="car-types__bottom">
              <div class="car-types__prices">
                <div class="car-types__order-count">
                  {{ $t('numberSeats') }}: <span> {{ item.quantity }} {{ $t('place') }} </span>
                </div>
                <div class="car-types__price">
                  {{ $t('price') }}: <span> {{ `${item.vehicle} ${$t('hour')}. | ${item.price} TMT` }} </span>
                </div>
              </div>
              <div class="car-types__image">
                <img src="@/assets/img/car2-order.png" alt="car">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseIcon from '@/components/BaseIcon.vue'

  import { getOrderList } from '@/api/user.api'

  export default {
    components: { BaseIcon },
    data() {
      return {
        orderCars: [],
        bus: 2,
        yuridiki: 2
      }
    },
    async mounted() {
      await this.fetchCars()
    },
    methods: {
      openContact(uuid) {
        this.$cookie.set('yuridikiUuid', uuid)
        this.$router.push('/ordersTruckYuridikiContact')
      },
      async fetchCars() {
        try {
          const { data, status } = await getOrderList({ data: { v: this.bus, e: this.yuridiki } })
          if (status) this.orderCars = data.data
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .car-types {
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
         grid-template-columns: repeat(2, 1fr)
      }
      @media (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
        column-gap: 5px;
        row-gap: 5px;
      }
    }

    &__item {
      width: 100%;
      height: 178.42px;
      border: 1px solid #EBEBEB;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      padding: 10px 10px 20px 10px;
      border-radius: 6.88px;
      background: var(--white);
      cursor: pointer;
      transition: all 0.3 ease;
      &:hover {
        background: #F1F1F1;
        transition: all 0.3 ease;
      }
      @media (max-width: 768px) {
        height: max-content;
      }
    }
    &__name {
      width: 100%;
      font-size: 14px;
      font-weight: 600;
      line-height: 16.8px;
      text-align: left;
      color: var(--black);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding-bottom: 20px;
      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
    &__bottom {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 20px;
    }
    &__prices {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      gap: 10px;
      flex: 1 1 auto;
    }
    &__order-count {
      background: #E9E9E9;
      border-radius: 4px;
      padding: 10px;
      width: 100%;
      font-size: 14px;
      font-weight: 600;
      line-height: 16.8px;
      text-align: left;
      color: var(--black);
    }
    &__price {
      background: #E9E9E9;
      border-radius: 4px;
      padding: 10px;
      width: 100%;
      font-size: 14px;
      font-weight: 600;
      line-height: 16.8px;
      text-align: left;
      color: var(--black);
    }
    &__image {
      width: 86.42px;
      height: 86.42px;
      border-radius: 4px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
