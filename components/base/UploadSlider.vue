<template>
  <label class="uploader">
    <input v-if="!banner" @change="(e) => $emit('uploadImage', e)" type="file" class="uploader__input" />
    <div v-if="banner"  class="uploader__img-box">
      <img :src="img" class="uploader__img" @click="$emit('uploadImage')" />
    </div>
    <div v-else class="uploader__img-box">
      <img :src="img" class="uploader__img" />
    </div>
    <div class="uploader__show-area">
      <BaseIcon :name="icon" v-if="icon"/>
      <span class="uploader__show-area-title" v-if="text"> {{ text }} </span>
    </div>
  </label>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'
export default {
  emits: ['uploadImage'],
  components: { BaseIcon },
  props: {
    img: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: () => ''
    },
    icon: {
      type: String,
      default: () => ''
    },
    banner: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  width: 100%;
  height: 100%;
  padding-top: 60%;
  cursor: pointer;
  position: relative;
  // .uploader__input
  &__input {
    display: none !important;
    input[type='file'] {
      display: none;
    }
    input {
      display: none;
    }
  }

  &__img-box {
  }

  // .uploader__img

  &__img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    border-radius: 2px;
    border: 1px dashed var(--text-3);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  // .uploader__show-area

  &__show-area {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    border-radius: 2px;
  }
  &__show-area-title {
    border: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: var(--text-3);
    margin-top: 25px;
  }
}
</style>
