<template>
  <label class="textarea">
    <div class="textarea__label">{{ title }}</div>
    <div class="textarea__content">
      <textarea
        @input="(e) => update(e.target.value)"
        class="textarea__textarea"
        :value="value"
        :placeholder="title"
      />
    </div>
  </label>
</template>

<script>
  export default {
    props: {
      title: { type: String, default: () => '' },
      value: { type: String, default: () => '' }
    },
    methods: {
      update(text) {
        this.$emit('input', text)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .textarea {
    // .textarea__label
    width: 100%;

    &__label {
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      margin-bottom: 15px;

      @media screen and (max-width: 425px){
        font-size: 13.92px;
        font-weight: 400;
        line-height: 16.71px;
        text-align: left;
      }
    }

    // .textarea__content

    &__content {
      width: 100%;
    }

    // .textarea__textarea

    &__textarea {
      width: 100%;
      padding: 10px 14px;
      background-color: transparent;
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      border: 1.44px solid #AFAFAF;
      border-radius: 7px;
      flex: 1 1;
      height: 113.48px;
      resize: none;
      @media screen and (max-width: 425px){
        font-size: 13.92px;
        font-weight: 400;
        line-height: 16.71px;
        text-align: left;
      }
      &::placeholder {
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
        color: #AFAFAF;
        @media screen and (max-width: 425px){
          font-size: 13.92px;
          font-weight: 400;
          line-height: 16.71px;
          text-align: left;
        }
      }
    }
  }
</style>
