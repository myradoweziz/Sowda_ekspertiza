<template>
  <popup :travel="travel">
    <div class="travelers">
      <div class="travelers__inputs">
        <admin-count title="Gatnaw ugurlary" :number.sync="form.route" />
        <admin-input :en.sync="form.start_point" :ru.sync="form.start_point" :tm.sync="form.start_point" />
        <input-add title="Ugrayan" @addTime="addStart" @close="deleteStartItem" :times="form.start_time" />
        <admin-input :en.sync="form.end_point" :ru.sync="form.end_point" :tm.sync="form.end_point" />
        <input-add title="Barmaly" @addTime="addEnd" @close="deleteEndItem" :times="form.end_time" />
        <admin-count title="Aýlaw sany" :number.sync="form.count" />
      </div>
      <div class="travelers__btns">
        <div class="travelers__btn">
          <Button text="Cancel" @onClick="$emit('close')" secondary padding />
        </div>
        <div class="travelers__btn">
          <Button v-if="form.uuid" text="Save" @onClick="saveItem" primary padding />
          <Button v-else text="Add" @onClick="addItem" primary padding />
        </div>
      </div>
    </div>
  </popup>
</template>

<script>
  import AdminInput from '@/components/base/AdminInput.vue'
  import Popup from './Popup.vue'
  import Button from '@/components/base/Button.vue'
  import AdminCount from '@/components/base/AdminCount.vue'
  import InputAdd from '@/components/base/InputAdd.vue'

  export default {
    components: { AdminInput, Popup, Button, AdminCount, InputAdd },
    emits: ['close'],
    props: { form: { type: Object, default: () => {} }, travel: { type: Boolean, default: () => false } },
    data() {
      return {
        startTimes: [],
        endTimes: []
      }
    },
    methods: {
      saveItem() {
        this.$emit('save', this.form, this.form.start_time, this.form.end_time)
      },
      deleteStartItem(index) {
        this.form.start_time.splice(index, 1)
      },
      deleteEndItem(index) {
        this.form.end_time.splice(index, 1)
      },
      addItem() {
        this.$emit('add', this.form, this.form.start_time, this.form.end_time)
      },
      addStart(text) {
        this.form.start_time.push(text)
      },
      addEnd(text) {
        this.form.end_time.push(text)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .travelers {
    &__inputs {
      display: flex;
      flex-direction: column;
      gap: 20px;
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
