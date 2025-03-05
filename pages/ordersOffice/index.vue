<template>
  <div>
    <select-checkboxes
      @chechedFirst="openCheckedFirst"
      :title="$t('budgetary')"
      :label="$t('noneBudgetary')"
      :isActive="isActive"
      :activeCheck="activeCheck"
      @chechedSecond="openCheckedSecond"
      @sendOrder="openCars"
    />
  </div>
</template>

<script>
  import SelectCheckboxes from '@/components/ui/SelectCheckboxes.vue'

  export default {
    layout: 'default',
    components: { SelectCheckboxes },
    data() {
      return {
        activeCheck: false,
        isActive: false
      }
    },
    methods: {
      openCheckedFirst() {
        this.activeCheck = !this.activeCheck
        this.isActive = false
      },
      openCheckedSecond() {
        this.isActive = !this.isActive
        this.activeCheck = false
      },
      openCars() {
        if (this.activeCheck) {
          this.$router.push('/ordersCarTypesBudget')
        }
        if (this.isActive) {
          this.$router.push('/ordersCarTypesBrunch')
        }
      }
    }
  }
</script>

<style lang="scss" scoped></style>
