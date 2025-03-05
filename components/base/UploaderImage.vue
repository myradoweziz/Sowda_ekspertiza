<template>
  <label class="uploader">
    <input @change="(e) => $emit('uploadImage', e)" type="file" class="uploader__input" />
    <img :src="img" class="uploader__img" />
    <div class="uploader__show-area">
      <BaseIcon v-if="icon && !size" :name="icon" />
      <BaseIcon v-if="size" name="file" />
      <span v-if="!size" class="uploader__show-area-title"> {{ text }} </span>
      <span v-if="size" class="uploader__show-size">
        {{ formatBytes(size) }}
      </span>
    </div>
  </label>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'
export default {
  emits: ['uploadImage'],
  components: { BaseIcon },
  props: {
    img: { type: String, default: () => null },
    size: { type: String | Number, default: () => null },
    text: { type: String, default: () => '' },
    icon: { type: String, default: () => '' }
  },
  methods: {
    formatBytes(bytes, decimals = 2) {
      if (!+bytes) return '0 Bytes'
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  width: 300px;
  height: 300px;
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

  // .uploader__img

  &__img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    border-radius: 2px;
    border: 3.57px dashed var(--text-3);
    img {
      width: 100%;
      height: 100%;
      border-radius: 2px;
      object-fit: cover;
      object-position: center;
      border: none;
    }
  }

  // .uploader__show-area

  &__show-area {
    position: absolute;
    border-radius: 2px;
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
    background-color: var(--uploader-back);
  }
  &__show-area-title {
    border: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: var(--text-3);
    margin-top: 25px;
  }
  &__file-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: var(--file-title);
    padding-top: 12px;
    padding-bottom: 2px;
  }
  &__show-size {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-3);
  }
}
</style>
