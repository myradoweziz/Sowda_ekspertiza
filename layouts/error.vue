<template>
  <div class="error">
    <div class="error__container __container">
      <div class="error__box">
        <div class="error__icon"><BaseIcon name="errorLogo" /></div>
        <div class="error__content">
          <div class="error__title">Извините, эта страница не найдена</div>
          <div class="error__text">Интернет-соединение не найдено, проверьте подключение и повторите попытку.</div>
          <!-- <div class="error__button"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseIcon from '../components/BaseIcon.vue'

  export default {
    components: {
      BaseIcon
    },
    layout: 'empty'
  }
</script>

<style lang="scss" scoped>
  .error {
    // .error__container

    &__container {
    }

    // .error__box

    &__box {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    // .error__icon

    &__icon {
      padding-bottom: 20px;
    }

    // .error__content

    &__content {
    }

    // .error__title

    &__title {
      font-weight: 600;
      font-size: 50px;
      line-height: 120%;
      color: #374957;
      padding-bottom: 20px;
      text-align: center;
      @media (max-width: 768px) {
        font-size: 35px;
      }
      @media (max-width: 425px) {
        font-size: 25px;
      }
    }

    // .error__text

    &__text {
      font-weight: 400;
      font-size: 22px;
      line-height: 120%;
      text-align: center;
      color: #374957;
      @media (max-width: 768px) {
        font-size: 18px;
      }
      @media (max-width: 425px) {
        font-size: 16px;
      }
    }
  }
</style>
