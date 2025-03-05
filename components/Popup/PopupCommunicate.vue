<template>
  <popup travel>
    <div class="about-us__body">
      <div class="about-us__inputs">
        <admin-date :value.sync="form.phone" type="text" label="Tel | Faks" />
        <admin-date :value.sync="form.email" type="email" label="E-mail" />
        <admin-textarea :content="form" />
      </div>
    </div>
    <div class="about-us__btns">
      <div class="about-us__btn">
        <Button text="Cancel" @onClick="$emit('close')" secondary padding />
      </div>
      <div class="about-us__btn">
        <Button v-if="form.uuid" text="Save" @onClick="saveItem" primary  padding/>
        <Button v-else text="Add" @onClick="addItem" primary padding/>
      </div>
    </div>
  </popup>
</template>

<script>
  import Popup from './Popup.vue'
  import Button from '@/components/base/Button.vue'
  import AdminDate from '@/components/base/AdminDate.vue'
  import AdminTextarea from '@/components/base/AdminTextarea.vue'

  import { mapGetters } from 'vuex'

  export default {
    components: { Popup, AdminTextarea, Button, AdminDate },
    computed: { ...mapGetters(['imgURL']) },
    props: {
      form: { type: Object, default: () => {} },
      path: { type: String, default: () => '' }
    },
    methods: {
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
