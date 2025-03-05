<template>
  <div class="big-service">
    <div class="big-service__container __container">
      <div class="big-service__box">
        <div class="big-service__title-box">
          <div class="big-service__icon"><BaseIcon name="busMini" /></div>
          <div class="big-service__title">{{ $t('label') }}</div>
        </div>
        <div class="big-service__text">
          {{ $t('desc') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.big-service {
  padding: 60px 0px;
  @media (max-width: 768px) {
    padding: 40px 0px;
  }
  @media (max-width: 425px) {
    padding: 10px 0px;
  }
  // .big-service__container

  &__container {
    position: relative;
  }

  // .big-service__back

  // .big-service__box

  &__box {
    width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
    @media (max-width: 425px) {
      gap: 10px;
    }
  }

  // .big-service__title-box

  &__title-box {
    display: flex;
    align-items: center;
    gap: 20px;
    @media (max-width: 425px) {
      gap: 10px;
    }
  }

  // .big-service__icon

  &__icon {
    :deep() {
      svg {
        width: 50px;
        height: 50px;
        @media (max-width: 425px) {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  // .big-service__title

  &__title {
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    text-align: justified;
    color: var(--black);
    @media (max-width: 425px) {
      font-size: 15px;
      font-weight: 600;
      line-height: 18px;
      text-align: left;
    }
  }

  // .big-service__text

  &__text {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: justify;
    color: #333333;
    width: 100%;
    height: max-content;
    @media (max-width: 425px) {
      font-size: 9.7px;
      font-weight: 400;
      line-height: 11.64px;
      text-align: justify;
    }
  }
}
</style>
