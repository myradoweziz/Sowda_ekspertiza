<template>
  <div class="end">
    <div class="end__container __container">
      <div class="end__title">Töleg amala aşyrylmady!</div>
    </div>
  </div>
</template>

<script>
  export default {}
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
      background: #f5fbf7;
      border-radius: 10px;
      font-weight: 600;
      font-size: 22px;
      line-height: 24px;
      color: var(--error);
    }
  }
</style>
