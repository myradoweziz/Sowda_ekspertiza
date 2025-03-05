<template>
  <popup>
    <div class="about-us__body">
      <div class="about-us__inputs">
        <admin-input :en.sync="form.title_en" :ru.sync="form.title_ru" :tm.sync="form.title_tm" />
        <admin-text :content="form" />
      </div>
      <uploader-video @changeFile="addVideo" :video="form.video_path" />
    </div>
    <div class="about-us__btns">
      <div class="about-us__btn">
        <Button text="Cancel" @onClick="$emit('close')" secondary  padding/>
      </div>
      <div class="about-us__btn">
        <Button v-if="form.uuid" text="Save" @onClick="saveItem" primary  padding/>
        <Button v-else text="Add" @onClick="addItem" primary padding />
      </div>
    </div>
  </popup>
</template>

<script>
  import Popup from './Popup.vue'
  import Button from '@/components/base/Button.vue'
  import UploaderVideo from '@/components/base/UploaderVideo.vue'
  import AdminInput from '@/components/base/AdminInput.vue'
  import AdminText from '@/components/base/AdminText.vue'

  import { mapGetters } from 'vuex'

  export default {
    components: { Popup, AdminInput, Button, UploaderVideo, AdminText },
    computed: { ...mapGetters(['imgURL']) },
    props: { form: { type: Object, default: () => {} } },
    data() {
      return { file: null }
    },
    mounted() {
      if (this.form.video_path) this.file = `${this.imgURL}/uploads/orders/${this.form.video_path}`
    },
    methods: {
      addVideo(e) {
        this.file = null
        this.form.video_path = e
      },
      saveItem() {
        this.$emit('save', this.form)
      },
      addItem() {
        this.$emit('add', this.form)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .about-us {
    &__body {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      align-items: flex-start;
    }
    &__inputs {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      gap: 20px;
    }
    &__date {
      padding-top: 20px;
    }
    &__btns {
      padding-top: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;
    }
    &__btn {
      width: 108px;
    }
  }
</style>
