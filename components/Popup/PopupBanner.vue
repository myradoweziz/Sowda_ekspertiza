<template>
  <popup>
    <div class="popup-slider__langs">
      <div
        v-for="lang in langs"
        :key="lang.id"
        @click="selectIndex(lang.key)"
        :class="['popup-slider__lang', { active: activeKey === lang.key }]"
      >
        {{ lang.name }}
      </div>
    </div>
    <div class="popup-slider__body">
      <upload-slider
        v-if="activeKey === 'tm'"
        @uploadImage="addFirstImg"
        :img="firstImg"
        icon="addPhotoIconAdmin"
        text="Add Photo"
      />
      <upload-slider
        v-if="activeKey === 'en'"
        @uploadImage="addSecondImg"
        :img="secondImg"
        icon="addPhotoIconAdmin"
        text="Add Photo"
      />
      <upload-slider
        v-if="activeKey === 'ru'"
        @uploadImage="addThirdImg"
        :img="thirdImg"
        icon="addPhotoIconAdmin"
        text="Add Photo"
      />
    </div>
    <div class="popup-slider__btns">
      <div class="popup-slider__btn">
        <Button text="Cancel" @onClick="$emit('close')" secondary />
      </div>
      <div class="popup-slider__btn">
        <Button v-if="item.uuid" text="Save" @onClick="saveSlider" primary padding  />
        <Button v-else text="Add" @onClick="addSlider" primary padding :disabled="disabled" />
      </div>
    </div>
  </popup>
</template>

<script>
  import BaseIcon from '@/components/BaseIcon.vue'
  import Button from '@/components/base/Button.vue'
  import UploadSlider from '@/components/base/UploadSlider.vue'
  import Popup from '@/components/Popup/Popup.vue'

  import { mapGetters } from 'vuex'

  export default {
    components: { Button, UploadSlider, BaseIcon, Popup },
    emits: ['close', 'save'],
    props: { item: { type: Object }, disabled: { type: Boolean, default: false } },
    computed: { ...mapGetters(['imgURL']) },
    mounted() {
      // if (this.item.image_tm && this.item.image_en && this.item.image_ru) {
      //   this.firstImg = `${this.imgURL}/uploads/slider/${this.item.image_tm}`
      //   this.secondImg = `${this.imgURL}/uploads/slider/${this.item.image_en}`
      //   this.thirdImg = `${this.imgURL}/uploads/slider/${this.item.image_ru}`
      // }
    },
    data() {
      return {
        firstImg: null,
        secondImg: null,
        thirdImg: null,
        activeKey: 'tm',
        langs: [
          { id: 1, name: 'TKM', key: 'tm' },
          { id: 2, name: 'RUS', key: 'ru' },
          { id: 3, name: 'ENG', key: 'en' }
        ]
      }
    },
    methods: {
      selectIndex(key) {
        this.activeKey = key
      },
      addFirstImg(e) {
        this.firstImg = URL.createObjectURL(e.target.files[0])
        this.item.file_tm = e.target.files[0]
      },
      addSecondImg(e) {
        this.secondImg = URL.createObjectURL(e.target.files[0])
        this.item.file_en = e.target.files[0]
      },
      addThirdImg(e) {
        this.thirdImg = URL.createObjectURL(e.target.files[0])
        this.item.file_ru = e.target.files[0]
      },
      addSlider() {
        this.$emit('add', this.item)
      },
      saveSlider() {
        this.$emit('save', this.item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .popup-slider {
    // .popup-slider__langs

    &__langs {
      display: flex;
      align-items: flex-end;
      gap: 5px;
    }

    // .popup-slider__lang

    &__lang {
      width: 80px;
      height: 30px;
      border-radius: 2px;
      padding: 10px;
      background-color: transparent;
      font-size: 12px;
      font-weight: 500;
      line-height: 14.16px;
      text-align: center;
      color: #969494;
      margin-bottom: 20px;
      cursor: pointer;
      &.active,
      &:hover {
        background: #F4F4F4;
        color: #333333;
      }
    }
    // .popup-slider__body

    &__body {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    // .popup-slider__btns

    &__btns {
      padding-top: 40px;
      display: flex;
      gap: 20px;
      width: 100%;
      justify-content: center;
    }

    // .popup-slider__btn

    &__btn {
      width: 200px;
    }
  }
</style>
