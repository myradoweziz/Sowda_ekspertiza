<template>
  <div :class="['input', {'input--error': error}]">
    <div class="input__title">{{ title }} <span v-if="important">*</span></div>
    <div class="input__body">
      <div v-if="prependIcon" class="input__prepend-icon">
        <base-icon :name="prependIcon" />
      </div>
      <div class="input__input">
        <input
          @input="(e) => update(e.target.value)"
          autocomplete="off"
          :type="type"
          v-model="modelValue"
          :placeholder="placeholder"
        />
      </div>
      <div v-if="appendIcon" @click="$emit('appendCliCk')" class="input__append-icon">
        <base-icon :name="appendIcon" />
      </div>
    </div>
  </div>
</template>

<script>
  import BaseIcon from '@/components/BaseIcon.vue'

  export default {
    components: {
      BaseIcon,
    },
    props: {
      title: { type: String, default: () => '' },
      placeholder: { type: String, default: () => '' },
      type: { type: String, default: () => '' },
      prependIcon: { type: String, default: () => '' },
      error: { type: Boolean, default: false },
      important: { type: Boolean, default: () => false },
      appendIcon: { type: String, default: () => '' },
      value: {
        type: [String, Number, Date],
        default: () => null,
      },
    },
    data() {
      return {
        modelValue: this.value,
      }
    },
    watch: {
      value: function (val) {
        this.modelValue = val
      },
    },
    methods: {
      update(text) {
        if (this.type === 'tel') {
        let x = this.modelValue
          .replace(/\D/g, '')
          .match(/(\d{0,3})(\d{0,1})(\d{0,1})(\d{0,2})(\d{0,2})(\d{0,2})/)
        this.modelValue = !x[2]
          ? '+993'
          : '+993' +
            (x[2] ? x[2] : '') +
            (x[3] ? x[3] : '') +
            (x[4] ? x[4] : '') +
            (x[5] ? x[5] : '') +
            (x[6] ? x[6] : '') +
            (x[7] ? x[7] : '')
          this.$emit('input', this.modelValue)
        } else {
          this.$emit('input', this.modelValue)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input {
    user-select: none;
    // .input__title

    &__title {
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      color: var(--black);
      margin-bottom: 15px;
      span {
        color:#FF0000;
      }
      @media screen and (max-width: 425px) {
        font-size: 13.56px;
        font-weight: 400;
        line-height: 16.28px;
        text-align: left;
      }
    }

    // .input__body

    &__body {
      position: relative;
      display: flex;
      gap: 10px;
      border: 1.44px solid #AFAFAF;
      border-radius: 5.75px;
      padding: 10px 14px;
    }

    // .input__prepend-icon

    &__prepend-icon {
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      pointer-events: none;
    }

    // .input__input

    &__input {
      flex: 1 1 auto;
      input,
      button {
        background-color: transparent;
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
        flex: 1 1 auto;
        width: 100%;
        position: relative;
        user-select: none;
        @media screen and (max-width: 425px) {
          font-size: 13.56px;
          font-weight: 400;
          line-height: 16.28px;
          text-align: left;
        }
        &::placeholder,
        .placeholder {
          font-size: 20px;
          font-weight: 400;
          line-height: 24px;
          text-align: left;
          color: #AFAFAF;
          @media screen and (max-width: 425px){
            font-size: 13.56px;
            font-weight: 400;
            line-height: 16.28px;
            text-align: left;
          }
        }
        &[type='submit'] {
          cursor: pointer;
        }
        &[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          user-select: none;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
      }
      &[type="date"]::placeholder {
          color: #AFAFAF; /* Change this to your desired color */
      }

      /* Vendor prefixes for wider browser support */
      &[type="date"]::-webkit-input-placeholder {
          color: #AFAFAF; /* For Chrome, Safari, and Opera */
      }

      &[type="date"]::-moz-placeholder {
          color: #AFAFAF; /* For Firefox 19+ */
      }

      &[type="date"]:-ms-input-placeholder {
          color: #AFAFAF; /* For Internet Explorer */
      }

      &[type="date"]:-moz-placeholder {
          color: #AFAFAF; /* For older versions of Firefox */
      }
      &[type="datetime-local"]::-webkit-calendar-picker-indicator {
        background: transparent;
        user-select: none;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
    }
    &[type="datetime-local"]::placeholder {
        color: #AFAFAF; /* Change this to your desired color */
    }

    /* Vendor prefixes for wider browser support */
    &[type="datetime-local"]::-webkit-input-placeholder {
        color: #AFAFAF; /* For Chrome, Safari, and Opera */
    }

    &[type="datetime-local"]::-moz-placeholder {
        color: #AFAFAF; /* For Firefox 19+ */
    }

    &[type="datetime-local"]:-ms-input-placeholder {
        color: #AFAFAF; /* For Internet Explorer */
    }

    &[type="datetime-local"]:-moz-placeholder {
        color: #AFAFAF; /* For older versions of Firefox */
    }
    }
    }

    &--error {
      animation: 0.2s invalid forwards;
      .input__label {
        // color: var(--warning);
      }
      .input__body {
        border-color: #FF0000;
      }
      .input__prepend-icon {
      }
      .input__append-icon {
      }
      .input__message {
      }
    }

    // .input__append-icon

    &__append-icon {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @keyframes invalid {
    0% {
      transform: translateX(0px);
    }
    25% {
      transform: translateX(5px);
    }
    50% {
      transform: translateX(0px);
    }
    75% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0px);
    }
  }
</style>
