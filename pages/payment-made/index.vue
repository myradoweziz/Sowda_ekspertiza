<template>
  <div v-if="isPaid" class="end">
    <div class="end__container __container">
      <div class="end__title">Töleg amala aşyryldy!</div>
    </div>
  </div>
</template>

<script>
  import { SEND_PAYMENT_MESSAGE } from '@/api/user.api'

  export default {
    data() {
      return {
        isPaid: false,
        SEND_PAYMENT_ERROR_CODE: '0'
      }
    },
    mounted() {
      this.sendMessage()
    },
    methods: {
      async sendMessage() {
        try {
          if (this.$route.query.orderId) {
            const { data } = await SEND_PAYMENT_MESSAGE({ data: { orderId: this.$route.query.orderId } })

            this.isPaymentSuccessful(data) ? (this.isPaid = true) : this.$router.push('/payment-was-not-made')
          }
        } catch (error) {
          console.error(error)
        }
      },
      isPaymentSuccessful(data) {
        return data?.data.ErrorCode === this.SEND_PAYMENT_ERROR_CODE && data?.data.OrderStatus === 2
      }
    }
  }
</script>

<style lang="scss" scoped>
  .end {
    padding: 80px 0px;
    padding-top: 80px;
    @media (max-width: 768px) {
      padding: 40px 0px;
    }
    @media (max-width: 425px) {
      padding: 10px 0px;
    }
    &__container {
    }
    &__title {
      text-align: center;
      padding: 30px 20px;
      background: var(--header-green);
      border-radius: 10px;
      font-weight: 600;
      font-size: 22px;
      line-height: 24px;
      color: var(--button-back);
    }
  }
</style>
